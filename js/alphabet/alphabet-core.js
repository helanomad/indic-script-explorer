/* =========================================================
   Generic Alphabet Page Engine
   Used by Sinhala, Devanagari, Tamil, Brahmi, etc.
   ========================================================= */

import { playStrokeAnimation, drawGuideGlyph } from "../draw/stroke-player.js";

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;"
  }[c]));
}

function normalizeCell(value) {
  if (!value || value === "[n/a]") return "";
  return value;
}

/* ---------- Unicode → filename ---------- */

function glyphToCodepointSlug(glyph) {
  return [...glyph]
    .map(ch =>
      "U" + ch.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")
    )
    .join("_");
}

/* ---------- main init ---------- */

export function initAlphabetPage({
  mappings,
  alphabetOrder,
  romanAliases = {},
  audioRoot,        // "../../assets/audio/si" | "../../assets/audio/deva"
  scriptKey,        // "sinhala" | "devanagari" | etc
  fontPath
}) {
  const sectionsRoot = document.getElementById("sections");
  const q = document.getElementById("q");
  const count = document.getElementById("count");
  const mCanvas = document.getElementById("mCanvas");

  sectionsRoot.innerHTML = "";

  /* ---- build glyph → category map (vowels / consonants / signs) ---- */
  const glyphCategory = new Map();

  const add = (keys, category) => {
    for (const k of keys) {
      const entry = mappings[k];
      if (!entry) continue;
      const g = normalizeCell(entry[scriptKey]);
      if (!g) continue;
      glyphCategory.set(g, category);
    }
  };

  add(alphabetOrder.vowels, "vowels");
  add(alphabetOrder.signs, "signs");
  alphabetOrder.consonants.forEach(group => add(group.keys, "consonants"));

  const audioPathForGlyph = (glyph) => {
    const cat = glyphCategory.get(glyph);
    if (!cat) return null;
    return `${audioRoot}/${cat}/${glyphToCodepointSlug(glyph)}.mp3`;
  };

  /* ---------- card ---------- */

  let player = null;

  function playAudio(src) {
    if (!src) return;
    if (!player) player = new Audio();
    player.pause();
    player.currentTime = 0;
    player.src = src;
    player.play().catch(() => { });
  }

  function makeCard({ glyph, romans }) {
    const romanText = romans.join(" / ");
    const audioSrc = audioPathForGlyph(glyph);

    const el = document.createElement("div");
    el.className = "learn-card";
    el.dataset.search = `${glyph} ${romans.join(" ")}`.toLowerCase();

    el.innerHTML = `
    <div class="learn-glyph">${esc(glyph)}</div>
    <div class="learn-meta">
      <div class="learn-roman">${esc(romanText)}</div>
    </div>
  `;

    el.title =
      "Click or tap a letter to open details, copy the letter, hear its pronunciation, and visualize how it is written.";

    el.addEventListener("click", () => {
      openLetterModal({ glyph, romanText, audioSrc });
    });

    return el;
  }

  /* ---------- build sections ---------- */

  function buildItems(keys) {
    const map = new Map();

    for (const r of keys) {
      const entry = mappings[r];
      if (!entry) continue;
      const g = normalizeCell(entry[scriptKey]);
      if (!g) continue;

      if (!map.has(g)) map.set(g, new Set());
      map.get(g).add(r);
    }

    const items = [];
    for (const [g, set] of map.entries()) {
      let romans = [...set];
      const pref = romanAliases[g];
      if (pref) {
        romans = [...pref.filter(x => set.has(x)), ...romans.filter(x => !pref.includes(x))];
      } else {
        romans.sort();
      }
      items.push({ glyph: g, romans });
    }
    return items;
  }

  const sections = [
    { title: "Vowels", keys: alphabetOrder.vowels, grid: "learn-grid" },
    { title: "Signs", keys: alphabetOrder.signs, grid: "learn-grid" },
    ...alphabetOrder.consonants.map(c => ({
      title: c.title,
      keys: c.keys,
      grid: c.grid
    }))
  ];

  for (const s of sections) {
    const sec = document.createElement("section");
    sec.className = "learn-section";

    const h2 = document.createElement("h2");
    h2.className = "learn-h2";
    h2.textContent = s.title;

    const grid = document.createElement("div");
    grid.className = s.grid;

    buildItems(s.keys).forEach(i => grid.appendChild(makeCard(i)));

    sec.appendChild(h2);
    sec.appendChild(grid);
    sectionsRoot.appendChild(sec);
  }

  /* ---------- search ---------- */

  const applyFilter = (text) => {
    const t = text.trim().toLowerCase();
    document.querySelectorAll(".learn-card").forEach(el => {
      el.classList.toggle("learn-hidden", t && !el.dataset.search.includes(t));
    });
    count.textContent =
      document.querySelectorAll(".learn-card:not(.learn-hidden)").length + " shown";
  };

  q.addEventListener("input", () => applyFilter(q.value));
  applyFilter("");

  const modal = document.getElementById("letterModal");
  const mGlyph = document.getElementById("mGlyph");
  const mRoman = document.getElementById("mRoman");
  const mCopyGlyph = document.getElementById("mCopyGlyph");
  const mCopyRoman = document.getElementById("mCopyRoman");
  const mPlay = document.getElementById("mPlay");
  const mVisualize = document.getElementById("mVisualize");
  const mCanvasWrap = document.getElementById("mCanvasWrap");

  let currentModal = null;

  function glyphToSlug(glyph) {
    return [...glyph]
      .map(ch => "U" + ch.codePointAt(0).toString(16).toUpperCase().padStart(4, "0"))
      .join("_");
  }

  function closeModal() {
    if (mCanvas?._cancelAnim) mCanvas._cancelAnim();
    const ctx = mCanvas.getContext("2d");
    ctx.clearRect(0, 0, mCanvas.width, mCanvas.height);

    mCanvasWrap.classList.add("hidden");
    modal.classList.add("hidden");
    currentModal = null;
  }

  modal.querySelector(".letter-close").addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
  });

  let modalSession = 0;

  async function openLetterModal({ glyph, romanText, audioSrc }) {
    modalSession++;
    const session = modalSession;

    // kill any previous animation on the modal canvas
    if (mCanvas?._cancelAnim) mCanvas._cancelAnim();

    // clear canvas so user never sees old letter
    const ctx = mCanvas.getContext("2d");
    ctx.clearRect(0, 0, mCanvas.width, mCanvas.height);

    console.log("[modal] opening for glyph:", glyph);

    currentModal = { glyph, romanText, audioSrc };

    mGlyph.textContent = glyph;
    mRoman.textContent = romanText;

    // show modal + canvas area immediately (no blank UI)
    mCanvasWrap.classList.remove("hidden");
    modal.classList.remove("hidden");

    // draw faint guide immediately (good UX)
    await drawGuideGlyph(glyph, {
      canvas: mCanvas,
      fontUrl: fontPath
    });

    // actions
    mCopyGlyph.onclick = async () => navigator.clipboard.writeText(glyph);
    mCopyRoman.onclick = async () => navigator.clipboard.writeText(romanText);
    mPlay.onclick = () => playAudio(audioSrc);

    // default: disable visualize
    mVisualize.disabled = true;
    mVisualize.textContent = "Visualize";
    mVisualize.onclick = null;

    console.log("[modal] shown");

    // stroke file existence check (background)
    const slug = glyphToSlug(glyph);
    const strokeUrl = `${audioRoot.replace("/audio/", "/strokes/")}/${glyphCategory.get(glyph)}/${slug}.json`;

    console.log("[visualize] checking stroke file:", strokeUrl);

    try {
      const r = await fetch(strokeUrl);
      console.log("[visualize] fetch status:", r.status);

      // If user opened another letter while we were fetching, ignore this result
      if (session !== modalSession) return;

      if (!r.ok) {
        console.log("[visualize] no stroke file found");
        return; // keep button disabled
      }

      const data = await r.json();
      console.log("[visualize] stroke data loaded:", data);

      mVisualize.disabled = false;
      mVisualize.onclick = async () => {
        // cancel any previous animation before starting a new one
        if (mCanvas?._cancelAnim) mCanvas._cancelAnim();

        mCanvasWrap.classList.remove("hidden");
        playStrokeAnimation(glyph, data.strokes, {
          canvas: mCanvas, // make sure mCanvas is the <canvas> element
          fontUrl: fontPath,
          totalDurationMs: 3200,
          pauseMs: 220
        });
      };
    } catch (err) {
      console.log("[visualize] error:", err);
      // keep disabled, modal still open
    }
    console.log("[modal] shown");
  }
}
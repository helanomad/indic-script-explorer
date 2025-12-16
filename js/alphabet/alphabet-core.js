/* =========================================================
   Generic Alphabet Page Engine
   Used by Sinhala, Devanagari, Tamil, Brahmi, etc.
   ========================================================= */

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
}) {
  const sectionsRoot = document.getElementById("sections");
  const q = document.getElementById("q");
  const count = document.getElementById("count");

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
    player.play().catch(() => {});
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
      "Click or tap to copy and hear pronunciation. Shift+Click or Long-press to copy romanization.";

    let didLongPress = false;
    let pressTimer = null;

    el.addEventListener("click", async (e) => {
      if (didLongPress) return;

      if (e.shiftKey) {
        await navigator.clipboard.writeText(romanText);
        return;
      }

      await navigator.clipboard.writeText(glyph);
      playAudio(audioSrc);

      el.classList.add("copied");
      setTimeout(() => el.classList.remove("copied"), 600);
    });

    el.addEventListener("touchstart", () => {
      didLongPress = false;
      pressTimer = setTimeout(async () => {
        didLongPress = true;
        await navigator.clipboard.writeText(romanText);
        el.classList.add("copied");
        setTimeout(() => el.classList.remove("copied"), 600);
      }, 500);
    });

    el.addEventListener("touchend", () => {
      clearTimeout(pressTimer);
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
}
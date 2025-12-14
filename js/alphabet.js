import { mappings } from "./script-mappings.js";
import { sinhalaAlphabetOrder } from "./alphabet-data.js";
import { sinhalaRomanAliases } from "./roman-preferences.js";

/* ------------------ utils ------------------ */

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

/* ------------------ audio helpers ------------------ */

function buildSinhalaGlyphCategoryMap() {
  const map = new Map();

  const add = (keys, category) => {
    for (const k of keys) {
      const entry = mappings[k];
      if (!entry || !entry.sinhala || entry.sinhala === "[n/a]") continue;
      map.set(entry.sinhala, category);
    }
  };

  add(sinhalaAlphabetOrder.vowels, "vowels");
  add(sinhalaAlphabetOrder.signs, "signs");

  // all consonant groups
  sinhalaAlphabetOrder.consonants.forEach(group => {
    add(group.keys, "consonants");
  });

  return map;
}

const SINHALA_GLYPH_CATEGORY = buildSinhalaGlyphCategoryMap();

// Unicode-based slug: අ → U0D85, ං → U0D82, etc.
function glyphToCodepointSlug(glyph) {
  return [...glyph]
    .map(ch =>
      "U" + ch.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")
    )
    .join("_");
}

function audioPathForGlyph(glyph) {
  if (!glyph) return null;

  const category = SINHALA_GLYPH_CATEGORY.get(glyph);
  if (!category) return null; // safety

  return `../../assets/audio/si/${category}/${glyphToCodepointSlug(glyph)}.mp3`;
}

/* ------------------ card ------------------ */

function makeCard({ si, romans }) {
  const romanText = romans.join(" / ");
  const audioSrc = audioPathForGlyph(si);

  const el = document.createElement("div");
  el.className = "learn-card";
  el.dataset.search = `${si} ${romans.join(" ")}`.toLowerCase();

  el.innerHTML = `
    <div class="learn-glyph" aria-hidden="true">${esc(si)}</div>
    <div class="learn-meta">
      <div class="learn-roman">${esc(romanText)}</div>
    </div>
  `;

  el.title =
    "Click to copy Sinhala letter and hear it's pronounciation. Shift+Click to copy romanization.";

  /* ---- click behaviour ---- */
  el.addEventListener("click", async (e) => {
    // Shift+Click → copy romanization
    if (e.shiftKey) {
      try {
        await navigator.clipboard.writeText(romanText);
      } catch {
        alert("Clipboard blocked by browser.");
      }
      return;
    }

    // Normal click → copy glyph
    try {
      await navigator.clipboard.writeText(si);
    } catch {
      alert("Clipboard blocked by browser.");
    }

    // Optional: play audio if present
    if (audioSrc) {
      const audio = new Audio(audioSrc);
      audio.play().catch(() => {
        /* ignore autoplay restrictions */
      });
    }

    el.classList.add("copied");
    setTimeout(() => el.classList.remove("copied"), 600);
  });

  let pressTimer = null;

  el.addEventListener("touchstart", () => {
    pressTimer = setTimeout(async () => {
      try {
        await navigator.clipboard.writeText(romanText);
        el.classList.add("copied");
        setTimeout(() => el.classList.remove("copied"), 600);
      } catch {
        alert("Clipboard blocked by browser.");
      }
    }, 500); // 500ms = long press
  });

  el.addEventListener("touchend", () => {
    clearTimeout(pressTimer);
  });

  return el;
}

/* ------------------ section builder ------------------ */

function sectionBlock(title, items, gridClass = "learn-grid") {
  const section = document.createElement("section");
  section.className = "learn-section";

  const h2 = document.createElement("h2");
  h2.className = "learn-h2";
  h2.textContent = title;

  const grid = document.createElement("div");
  grid.className = gridClass;

  items.forEach(item => grid.appendChild(makeCard(item)));

  section.appendChild(h2);
  section.appendChild(grid);

  return section;
}

/* ------------------ data grouping ------------------ */

function buildSinhalaItemsGrouped(keys) {
  // Sinhala glyph → Set of roman keys
  const glyphToRomans = new Map();

  for (const roman of keys) {
    const entry = mappings[roman];
    if (!entry) continue;

    const si = normalizeCell(entry.sinhala);
    if (!si) continue;

    if (!glyphToRomans.has(si)) glyphToRomans.set(si, new Set());
    glyphToRomans.get(si).add(roman);
  }

  const items = [];

  for (const [si, romanSet] of glyphToRomans.entries()) {
    let romans = Array.from(romanSet);

    const preferred = sinhalaRomanAliases?.[si];
    if (preferred?.length) {
      const preferredInSet = preferred.filter(r => romanSet.has(r));
      const remaining = romans.filter(r => !preferredInSet.includes(r));
      romans = [...preferredInSet, ...remaining];
    } else {
      romans.sort((a, b) => a.localeCompare(b));
    }

    items.push({ si, romans });
  }

  return items;
}

/* ------------------ page init ------------------ */

export function initSinhalaAlphabetPage() {
  const sectionsRoot = document.getElementById("sections");
  const q = document.getElementById("q");
  const count = document.getElementById("count");

  sectionsRoot.innerHTML = "";

  const sections = [
    {
      heading: "Prāṇa / Svara — Vowels",
      keys: sinhalaAlphabetOrder.vowels,
      grid: "learn-grid"
    },
    {
      heading: "Ayogavāha (Neither Vowels nor Consonants)",
      keys: sinhalaAlphabetOrder.signs,
      grid: "learn-grid"
    },
    ...sinhalaAlphabetOrder.consonants.map(group => ({
      heading: group.title,
      keys: group.keys,
      grid: group.grid
    }))
  ];

  for (const s of sections) {
    const items = buildSinhalaItemsGrouped(s.keys);
    sectionsRoot.appendChild(sectionBlock(s.heading, items, s.grid));
  }

  /* ---- search ---- */

  const updateCount = () => {
    const visible = [...document.querySelectorAll(".learn-card")]
      .filter(el => !el.classList.contains("learn-hidden")).length;
    count.textContent = `${visible} shown`;
  };

  const applyFilter = (text) => {
    const term = (text || "").trim().toLowerCase();
    document.querySelectorAll(".learn-card").forEach(el => {
      const ok = !term || el.dataset.search.includes(term);
      el.classList.toggle("learn-hidden", !ok);
    });
    updateCount();
  };

  q.addEventListener("input", () => applyFilter(q.value));
  updateCount();
}
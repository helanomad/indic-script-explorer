import { mappings } from "./script-mappings.js";
import { sinhalaAlphabetOrder } from "./alphabet-data.js";
import { sinhalaRomanAliases } from "./roman-preferences.js";

function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#039;"
    }[c]));
}

function normalizeCell(value) {
    if (!value || value === "[n/a]") return "";
    return value;
}

function makeCard({ si, romans }) {
    const romanText = romans.join(" · ");
    const primaryRoman = romans[0] || "";

    const el = document.createElement("div");
    el.className = "learn-card";
    el.dataset.search = `${si} ${romans.join(" ")}`.toLowerCase();

    el.innerHTML = `
    <div class="learn-glyph" aria-hidden="true">${esc(si)}</div>
    <div class="learn-meta">
      <div class="learn-roman">${esc(romanText)}</div>
    </div>
  `;

    el.title = "Click to copy Sinhala letter. Shift+Click to copy romanization.";

    el.addEventListener("click", async (e) => {
        const textToCopy = e.shiftKey ? romanText : si;

        try {
            await navigator.clipboard.writeText(textToCopy);
            el.classList.add("copied");
            setTimeout(() => el.classList.remove("copied"), 600);
        } catch {
            alert("Clipboard blocked by browser. You can still select and copy manually.");
        }
    });

    return el;
}

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

function buildSinhalaItemsGrouped(keys) {
    // Map Sinhala glyph -> Set of romanizations
    const glyphToRomans = new Map();

    for (const roman of keys) {
        const entry = mappings[roman];
        if (!entry) continue;

        const si = normalizeCell(entry.sinhala);
        if (!si) continue;

        if (!glyphToRomans.has(si)) glyphToRomans.set(si, new Set());
        glyphToRomans.get(si).add(roman);
    }

    // Convert into items, with stable alias ordering
    const items = [];

    for (const [si, romanSet] of glyphToRomans.entries()) {
        let romans = Array.from(romanSet);

        // If we have a preferred ordering for this Sinhala glyph, apply it
        const preferred = sinhalaRomanAliases?.[si];
        if (preferred && preferred.length) {
            const preferredInSet = preferred.filter(r => romanSet.has(r));
            const remaining = romans.filter(r => !preferredInSet.includes(r));
            romans = [...preferredInSet, ...remaining];
        } else {
            // Otherwise: sort for consistency (keeps things predictable)
            romans.sort((a, b) => a.localeCompare(b));
        }

        items.push({ si, romans });
    }

    // Optional: sort Sinhala glyphs (keeps consistent layout even if Map order changes)
    // items.sort((a, b) => a.si.localeCompare(b.si));

    return items;
}

export function initSinhalaAlphabetPage() {
    const sectionsRoot = document.getElementById("sections");
    const q = document.getElementById("q");
    const count = document.getElementById("count");

    sectionsRoot.innerHTML = "";

    const sections = [
        { heading: "Prāna / Svara — Vowels", keys: sinhalaAlphabetOrder.vowels, grid: "learn-grid" },

        { heading: "Yogavāha (Neither Vowels nor Consonants)", keys: sinhalaAlphabetOrder.signs, grid: "learn-grid" },

        // Consonant groups (each chooses its own grid)
        ...sinhalaAlphabetOrder.consonantGroups.map(g => ({
            heading: g.title,
            keys: g.keys,
            grid: g.grid
        }))
    ];

    for (const s of sections) {
        const items = buildSinhalaItemsGrouped(s.keys);
        sectionsRoot.appendChild(sectionBlock(s.heading, items, s.grid));
    }

    const updateCount = () => {
        const visible = [...document.querySelectorAll(".learn-card")]
            .filter(x => !x.classList.contains("learn-hidden")).length;
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
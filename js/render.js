import { mappings } from './script-mappings.js';
import { IndicWord } from './syllable.js';
import { sinhalaRomanAliases } from './roman-preferences.js';

const vowelSigns = {
  brahmi: {
    "a": "",
    "ā": "𑀸", // U+11038

    "i": "𑀺", // U+1103A
    "ī": "𑀻", // U+1103B

    "u": "𑀼", // U+1103C
    "ū": "𑀽", // U+1103D

    "ṛ": "𑀾", // U+1103E
    "r̥": "𑀾", // U+1103E

    "ṝ": "𑀿", // U+1103F
    "r̥̄": "𑀿", // U+1103F

    "l̥": "𑁀", // U+11040
    "l̥̄": "𑁁",  // U+11041

    "e": "𑁂", // U+11042
    "ē": "𑁂", // often the same as 'e'

    "o": "𑁄", // U+11044
    "ō": "𑁄", // often the same as 'o'
    "au": "𑁅", // U+11045

    "ä": "", // Sinhala-only - approximated as 'a'
    "æ": "", // Sinhala-only - approximated as 'a'

    "ǟ": "𑀸", // Sinhala-only - approximated as 'ā'
    "ǣ": "𑀸" // Sinhala-only - approximated as 'ā'
  },
  sinhala: {
    "a": "",
    "ā": "ා",

    "i": "ි",
    "ī": "ී",

    "u": "ු",
    "ū": "ූ",

    "ṛ": "ෘ", // U+0DD8
    "r̥": "ෘ", // U+0DD8

    "ṝ": "ෲ",  // U+0DF2
    "r̥̄": "ෲ",  // U+0DF2

    "l̥": "ෟ", // U+0DDF
    "l̥̄": "ෳ",  // U+0DF3

    "e": "ෙ",
    "ē": "ේ",
    "ai": "ෛ",

    "o": "ො",
    "ō": "ෝ",
    "au": "ෞ",

    "ä": "ැ", // Sinhala-only
    "æ": "ැ", // Sinhala-only

    "ǟ": "ෑ", // Sinhala-only
    "ǣ": "ෑ" // Sinhala-only
  },
  tamil: {
    "a": "",
    "ā": "ா",

    "i": "ி",
    "ī": "ீ",

    "u": "ு",
    "ū": "ூ",

    "ṛ": "",
    "r̥": "",

    "ṝ": "",
    "r̥̄": "",

    "l̥": "",
    "l̥̄": "",

    "e": "ெ",
    "ē": "ே",
    "ai": "ை",

    "o": "ொ",
    "ō": "ோ",
    "au": "ௌ",

    "ä": "", // Sinhala-only - approximated as 'a'
    "æ": "", // Sinhala-only - approximated as 'a'

    "ǟ": "ா", // Sinhala-only - approximated as 'ā'
    "ǣ": "ா" // Sinhala-only - approximated as 'ā'
  },
  devanagari: {
    "a": "",
    "ā": "ा",
    "i": "ि",
    "ī": "ी",
    "u": "ु",
    "ū": "ू",

    "ṛ": "ृ", // U+0943
    "r̥": "ृ", // U+0943

    "ṝ": "ॄ", // U+0944
    "r̥̄": "ॄ", // U+0944

    "l̥": "ॢ", // U+0962
    "l̥̄": "ॣ", // U+0963

    "e": "े",
    "ē": "े",   // same as 'e'
    "ai": "ै",
    "o": "ो",
    "ō": "ो",   // same as 'o'
    "au": "ौ",

    "ä": "", // Sinhala-only - approximated as 'a'
    "æ": "", // Sinhala-only - approximated as 'a'

    "ǟ": "ा", // Sinhala-only - approximated as 'ā'
    "ǣ": "ा" // Sinhala-only - approximated as 'ā'
  }
};

const viramas = {
  brahmi: "𑁆",
  sinhala: "්",
  tamil: "்",
  devanagari: "्"
};

// Sinhala Classical Orthography: Rakārāṁśaya, Yaṁśaya, Rēphaya etc
function applySinhalaClassicalOrthography(text) {
  if (!text) return text;

  //    1) MANDATORY ORTHOGRAPHY (ALWAYS ON)
  //    These rules are required for standard, correct Sinhala rendering.

  //    1.1) Rakārāṁśaya (Post-consonant R)
  //    Examples: ක්ර → ක්‍ර, ප්‍ර → ප්‍ර
  text = text.replace(/([ක-ෆ])්ර([ැෑිීුූෙේොෝෛෞ]?)/g, "$1්‍ර$2");

  //    1.2) Yaṁśaya (Post-consonant Y)
  //    Examples: ක්ය → ක්‍ය (kya), ව්ය → ව්‍ය (vya)
  text = text.replace(/([ක-ෆ])්ය([ැෑිීුූෙේොෝෛෞ]?)/g, "$1්‍ය$2");

  //    1.3) Composite letter ඥ (jñ)
  text = text.replace(/ජ්ඤ/g, "ඥ");

  // --- 2. CLASSICAL ORTHOGRAPHY (TOGGLE DEPENDENT) ---
  // If toggle exists and Sinhala Classical Orthography is disabled, stop here
  if (typeof window !== 'undefined' && window.useSinhalaClassicalOrthography === false) {
    return text;
  }

  // 2.1) Rēphaya (Pre-consonant R) - Forces the "hook" style
  //    Example: ර්ම → ර්‍ම (dharma)
  text = text.replace(/ර්([ක-ෆ])/g, "ර්\u200D$1");

  // 2.2) Bændi Akuru (Joint Letters / Forced Stacks)
  // These rules use ZWJ (\u200D) to request specific classical stacking from the font.

  // kṣa (e.g. Kakṣa: ක්ෂ → ග්‍ධ)
  text = text.replace(/ක්ෂ/g, "ක්\u200Dෂ");

  // gdha (e.g. Mugdha: ග්ධ → ග්‍ධ)
  text = text.replace(/ග්ධ/g, "ග්\u200Dධ");

  // ndha (e.g. Bandha: න්ධ → න්‍ධ)
  text = text.replace(/න්ධ/g, "න්\u200Dධ");

  // tva (e.g. Tvaṁ: ත්ව → ත්‍ව)
  text = text.replace(/ත්ව/g, "ත්\u200Dව");

  // nda (e.g. Nanda: න්ද → න්‍ද)
  text = text.replace(/න්ද/g, "න්\u200Dද");

  // ttha (e.g. Hatthālavaka: ත්ථ → ත්‍ථ)
  text = text.replace(/ත්ථ/g, "ත්\u200Dථ");

  // dva (e.g. Dvitva: ද්ව → ද්‍ව)
  text = text.replace(/ද්ව/g, "ද්\u200Dව");

  // ddha (e.g. Prasiddha: ද්ධ → ද්‍ධ)
  text = text.replace(/ද්ධ/g, "ද්\u200Dධ");

  // ṭṭha (e.g. Aṭṭhakathā: ට්ඨ → ට්‍ඨ)
  text = text.replace(/ට්ඨ/g, "ට්\u200Dඨ");

  // ñca (e.g. Pañcāla: ඤ්ච → ඤ්‍ච)
  text = text.replace(/ඤ්ච/g, "ඤ්\u200Dච");

  return text;
}

export function renderSyllables(inputText) {
  const tbody = document.querySelector('#output tbody');
  if (!tbody) return;

  tbody.innerHTML = '';

  const words = inputText.trim().toLowerCase().split(/\s+/); // split by spaces

  for (const wordText of words) {
    if (!wordText) continue;

    const word = new IndicWord(wordText, mappings);

    // --- Per-syllable rows ---
    for (const syl of word.syllables) {
      const row = document.createElement('tr');
      row.classList.add('syllable-row');

      const romanized = document.createElement('td');
      const finalMark = syl.final || '';
      romanized.innerText = syl.consonant + syl.vowel + finalMark;
      row.appendChild(romanized);

      row.innerHTML += `<td class="brahmi">${syl.render('brahmi', mappings, vowelSigns, viramas)}</td>`;
      row.innerHTML += `<td class="sinhala">${syl.render('sinhala', mappings, vowelSigns, viramas)}</td>`;
      row.innerHTML += `<td class="tamil">${syl.render('tamil', mappings, vowelSigns, viramas)}</td>`;
      row.innerHTML += `<td class="devanagari">${syl.render('devanagari', mappings, vowelSigns, viramas)}</td>`;

      tbody.appendChild(row);
    }

    // --- Full word row ---
    const fullRow = document.createElement('tr');
    fullRow.classList.add('full-word');

    const label = document.createElement('td');
    label.innerHTML = `<strong>${wordText}</strong>`;
    fullRow.appendChild(label);

    for (const script of ['brahmi', 'sinhala', 'tamil', 'devanagari']) {
      let fullWord = word.syllables
        .map(s => s.render(script, mappings, vowelSigns, viramas))
        .join('');

      if (script === 'sinhala') {
        fullWord = applySinhalaClassicalOrthography(fullWord);
      }

      fullRow.innerHTML += `<td class="${script}">${fullWord}</td>`;
    }

    tbody.appendChild(fullRow);

    // --- Spacer row between words ---
    const spacer = document.createElement('tr');
    spacer.classList.add('spacer');
    spacer.innerHTML = '<td colspan="5"></td>';
    tbody.appendChild(spacer);
  }
}

/* ---------- Legend helpers ---------- */

// Treat "[n/a]" or undefined as empty cells, so legend looks clean
function normalizeCell(value) {
  if (!value || value === "[n/a]") return "";
  return value;
}

// Build the legend table from the shared `mappings` object
export function initLegend() {
  const tbody = document.querySelector('#legend-table tbody');
  if (!tbody) return;

  tbody.innerHTML = '';

  // Build reverse lookup: roman -> aliasGroupArray
  const romanToGroup = new Map();
  for (const aliases of Object.values(sinhalaRomanAliases)) {
    for (const r of aliases) romanToGroup.set(r, aliases);
  }

  const renderedGroups = new Set(); // key: joined aliases string
  const usedRoman = new Set();

  function td(text, className) {
    const cell = document.createElement('td');
    if (className) cell.classList.add(className);
    cell.textContent = text;
    return cell;
  }

  for (const [roman, map] of Object.entries(mappings)) {
    if (usedRoman.has(roman)) continue;

    const group = romanToGroup.get(roman);

    // If this roman is part of an alias group, render the group ONCE here
    if (group) {
      const groupKey = group.join('|');
      if (renderedGroups.has(groupKey)) continue;

      // choose base roman (first in group that exists in mappings)
      const baseRoman = group.find(a => mappings[a]) || roman;
      const baseMap = mappings[baseRoman];

      const tr = document.createElement('tr');
      tr.appendChild(td(group.join(' / '), 'legend-roman'));
      tr.appendChild(td(normalizeCell(baseMap.brahmi), 'brahmi'));
      tr.appendChild(td(normalizeCell(baseMap.sinhala), 'sinhala'));
      tr.appendChild(td(normalizeCell(baseMap.tamil), 'tamil'));
      tr.appendChild(td(normalizeCell(baseMap.devanagari), 'devanagari'));
      tbody.appendChild(tr);

      renderedGroups.add(groupKey);
      group.forEach(a => usedRoman.add(a));
      continue;
    }

    // Otherwise render normal single row
    const tr = document.createElement('tr');
    tr.appendChild(td(roman, 'legend-roman'));
    tr.appendChild(td(normalizeCell(map.brahmi), 'brahmi'));
    tr.appendChild(td(normalizeCell(map.sinhala), 'sinhala'));
    tr.appendChild(td(normalizeCell(map.tamil), 'tamil'));
    tr.appendChild(td(normalizeCell(map.devanagari), 'devanagari'));
    tbody.appendChild(tr);
  }

  // Wire up show/hide toggle
  const toggleBtn = document.getElementById('toggle-legend');
  const legendContent = document.getElementById('legend-content');

  if (toggleBtn && legendContent) {
    toggleBtn.addEventListener('click', () => {
      const isHidden = legendContent.classList.toggle('legend-hidden');
      toggleBtn.textContent = isHidden ? 'Show' : 'Hide';
    });
  }
}
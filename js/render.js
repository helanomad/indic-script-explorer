// js/render.js

import { mappings } from './script-mappings.js';
import { IndicWord } from './syllable.js';

const vowelSigns = {
  brahmi: {
    "a": "",
    "ā": "𑀸", // U+11038
    "i": "𑀺", // U+1103A
    "ī": "𑀻", // U+1103B
    "u": "𑀼", // U+1103C
    "ū": "𑀽", // U+1103D
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

// Sinhala saññaka ligatures, optionally applied
function applySinhalaLigatures(text) {
  if (!text) return text;

  // Check global toggle (default = on)
  if (typeof window !== 'undefined' && window.useSinhalaLigatures === false) {
    return text;
  }

  return text
    .replace(/ඞ්ග/g, "ඟ")  // ඞ් + ග → ඟ
    .replace(/ඤ්ජ/g, "ඦ")  // ඤ් + ජ → ඦ
    .replace(/ණ්ඩ/g, "ඬ") // ණ් + ඩ → ඬ
    .replace(/න්ද/g, "ඳ") // න් + ද → ඳ
    .replace(/ම්බ/g, "ඹ"); // ම් + බ → ඹ
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
        fullWord = applySinhalaLigatures(fullWord);
      }

      fullRow.innerHTML += `<td class="${script}">${fullWord}</td>`;
    }

    // 🔴 This line is critical – without it, the row doesn't show
    tbody.appendChild(fullRow);

    // --- Spacer row between words ---
    const spacer = document.createElement('tr');
    spacer.classList.add('spacer');
    spacer.innerHTML = '<td colspan="5"></td>';
    tbody.appendChild(spacer);
  }
}
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
    "ō": "𑁄",   // often the same as 'o'
    "au": "𑁅" // U+11045
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
    "au": "ෞ"
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
    "au": "ௌ"
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
    "au": "ौ"
  }
};

const viramas = {
  brahmi: "𑁆",
  sinhala: "්",
  tamil: "்",
  devanagari: "्"
};

export function renderSyllables(inputText) {
  const tbody = document.querySelector('#output tbody');
  tbody.innerHTML = '';

  const words = inputText.trim().toLowerCase().split(/\s+/); // split by space

  for (const wordText of words) {
    const word = new IndicWord(wordText, mappings);

    for (const syl of word.syllables) {
      const row = document.createElement('tr');
      const romanized = document.createElement('td');
      romanized.innerText = syl.consonant + syl.vowel;
      row.appendChild(romanized);

      row.innerHTML += `<td class="brahmi">${syl.render('brahmi', mappings, vowelSigns, viramas)}</td>`;
      row.innerHTML += `<td class="sinhala">${syl.render('sinhala', mappings, vowelSigns, viramas)}</td>`;
      row.innerHTML += `<td class="tamil">${syl.render('tamil', mappings, vowelSigns, viramas)}</td>`;
      row.innerHTML += `<td class="devanagari">${syl.render('devanagari', mappings, vowelSigns, viramas)}</td>`;

      tbody.appendChild(row);
    }

    // Add row for full word
    const fullRow = document.createElement('tr');
    fullRow.classList.add('full-word');

    const label = document.createElement('td');
    label.innerHTML = `<strong>${wordText}</strong>`;
    fullRow.appendChild(label);

    for (const script of ['brahmi', 'sinhala', 'tamil', 'devanagari']) {
      const fullWord = word.syllables.map(s => s.render(script, mappings, vowelSigns, viramas)).join('');
      fullRow.innerHTML += `<td class="${script}">${fullWord}</td>`;
    }

    tbody.appendChild(fullRow);

    // Add spacer row between words
    const spacer = document.createElement('tr');
    spacer.innerHTML = '<td colspan="5" style="height: 10px;"></td>';
    tbody.appendChild(spacer);
  }
}
import { renderSyllables, setSinhalaClassicalOrthography } from './render.js';

const inputEl = document.getElementById('input');
const syllableToggleEl = document.getElementById('show-syllables');
const sinhalaToggleEl = document.getElementById('toggle-sinhala-consonant-forms');

if (inputEl) {
  inputEl.addEventListener('input', e => {
    renderSyllables(e.target.value);
  });

  // Initial render (empty)
  renderSyllables(inputEl.value);
}

// Syllable breakdown toggle: add/remove body class
if (syllableToggleEl) {
  syllableToggleEl.addEventListener('change', e => {
    document.body.classList.toggle('collapsed-syllables', !e.target.checked);
  });
}

// Sinhala classical orthography toggle
if (sinhalaToggleEl) {
  sinhalaToggleEl.addEventListener('change', e => {
    setSinhalaClassicalOrthography(e.target.checked);
    document.body.classList.toggle('collapsed-sannaka', !e.target.checked);

    if (inputEl) {
      renderSyllables(inputEl.value);
    }
  });
}
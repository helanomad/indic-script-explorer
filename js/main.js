import { renderSyllables } from './render.js';

const inputEl = document.getElementById('input');
const syllableToggleEl = document.getElementById('show-syllables');
const sinhalaToggleEl = document.getElementById('toggle-sinhala-consonant-forms');

window.useSinhalaClassicalOrthography = true;

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

// Sinhala saññaka toggle
if (sinhalaToggleEl) {
  sinhalaToggleEl.addEventListener('change', e => {
    window.useSinhalaClassicalOrthography = e.target.checked;
    document.body.classList.toggle('collapsed-sannaka', !e.target.checked);

    // Re-render to apply/remove ligatures immediately
    if (inputEl) {
      renderSyllables(inputEl.value);
    }
  });
}
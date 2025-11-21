import { renderSyllables } from './render.js';

const inputEl = document.getElementById('input');
const toggleEl = document.getElementById('show-syllables');

inputEl.addEventListener('input', e => {
  renderSyllables(e.target.value);
});

// Toggle class on <body> to hide/show syllable rows
if (toggleEl) {
  toggleEl.addEventListener('change', e => {
    document.body.classList.toggle('collapsed-syllables', !e.target.checked);
  });
}
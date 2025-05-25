import { renderSyllables } from './render.js';

document.getElementById('input').addEventListener('input', e => {
  renderSyllables(e.target.value);
});
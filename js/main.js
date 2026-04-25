import { renderSyllables, setSinhalaClassicalOrthography, SCRIPTS, COPY_ICON, CHECK_ICON } from './render.js';

const inputEl = document.getElementById('input');
const syllableToggleEl = document.getElementById('show-syllables');
const sinhalaToggleEl = document.getElementById('toggle-sinhala-consonant-forms');

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function syncURL({ q, scripts } = {}) {
  const url = new URL(window.location);

  if (q !== undefined) {
    if (q) url.searchParams.set('q', q);
    else url.searchParams.delete('q');
  }

  if (scripts !== undefined) {
    if (scripts.length === SCRIPTS.length) {
      url.searchParams.delete('scripts');
    } else {
      url.searchParams.set('scripts', scripts.join(','));
    }
  }

  // Use toString() then replace encoded commas so the URL stays readable
  history.replaceState(null, '', url.toString().replace(/%2C/g, ','));
}

if (inputEl) {
  // Restore input from URL on load
  const initialQuery = new URL(window.location).searchParams.get('q') || '';
  if (initialQuery) {
    inputEl.value = initialQuery;
  }

  const debouncedRender = debounce(value => {
    renderSyllables(value);
    syncURL({ q: value });
  }, 150);

  inputEl.addEventListener('input', e => debouncedRender(e.target.value));

  // Initial render (uses URL value if present)
  renderSyllables(inputEl.value);
}

// Syllable breakdown toggle: add/remove body class
if (syllableToggleEl) {
  syllableToggleEl.addEventListener('change', e => {
    document.body.classList.toggle('collapsed-syllables', !e.target.checked);
  });
}

// Script visibility toggles
const STORAGE_KEY = 'ise-hidden-scripts';
const table = document.querySelector('#output');

function initScriptToggles() {
  const pills = document.querySelectorAll('.script-pill');
  if (!pills.length || !table) return;

  // URL takes precedence over localStorage
  const urlParam = new URL(window.location).searchParams.get('scripts');
  let hidden;
  if (urlParam !== null) {
    const active = urlParam ? urlParam.split(',').map(s => s.trim()).filter(s => SCRIPTS.includes(s)) : [];
    hidden = new Set(SCRIPTS.filter(s => !active.includes(s)));
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...hidden]));
  } else {
    hidden = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'));
  }

  pills.forEach(pill => {
    const script = pill.dataset.script;
    if (!hidden.has(script)) pill.classList.add('active');
    updateColumnVisibility(script, !hidden.has(script));

    pill.addEventListener('click', () => {
      const isActive = pill.classList.toggle('active');
      updateColumnVisibility(script, isActive);
      if (isActive) hidden.delete(script); else hidden.add(script);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...hidden]));
      syncURL({ scripts: SCRIPTS.filter(s => !hidden.has(s)) });
    });
  });
}

function updateColumnVisibility(script, visible) {
  if (!table) return;
  table.classList.toggle(`hide-${script}`, !visible);
}

// Copy-column buttons on each <th>
function addColCopyBtn(th, getCells) {
  const btn = document.createElement('button');
  btn.className = 'col-copy-btn';
  btn.title = `Copy all ${th.textContent.trim()}`;
  btn.setAttribute('aria-label', `Copy all ${th.textContent.trim()} words`);
  btn.innerHTML = COPY_ICON;

  btn.addEventListener('click', () => {
    const text = getCells().map(c => c.textContent).filter(t => t && t !== '(?)').join(' ');
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      btn.innerHTML = CHECK_ICON;
      btn.classList.add('col-copy-btn--done');
      setTimeout(() => {
        btn.innerHTML = COPY_ICON;
        btn.classList.remove('col-copy-btn--done');
      }, 1500);
    });
  });

  th.appendChild(btn);
}

function initColumnCopy() {
  if (!table) return;

  // Romanization column
  const romanTh = table.querySelector('thead th:first-child');
  if (romanTh) {
    addColCopyBtn(romanTh, () =>
      [...table.querySelectorAll('tbody tr.full-word td:first-child strong')]
    );
  }

  // Script columns
  for (const script of SCRIPTS) {
    const th = table.querySelector(`thead th.${script}`);
    if (!th) continue;
    addColCopyBtn(th, () =>
      [...table.querySelectorAll(`tbody tr.full-word td.${script} span`)]
    );
  }
}

initScriptToggles();
initColumnCopy();

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
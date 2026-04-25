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

// Reconstruct the URL with a human-readable query string.
// URLSearchParams gives us decoded values; we re-encode only chars that
// are structurally required (&, =, #, +, %) and leave everything else
// (Unicode diacritics, commas) as plain text.
function toReadableURL(urlStr) {
  try {
    const url = new URL(urlStr);
    const params = [];
    url.searchParams.forEach((val, key) => {
      const encoded = [...val].map(ch => {
        if (ch === ' ') return '+';
        if ('&=#+%'.includes(ch)) return encodeURIComponent(ch);
        return ch;
      }).join('');
      params.push(`${key}=${encoded}`);
    });
    return url.origin + url.pathname + (params.length ? '?' + params.join('&') : '');
  } catch {
    return urlStr;
  }
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

  history.replaceState(null, '', toReadableURL(url.toString()));
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

  // Normalize URL on load so any encoded chars are decoded in the address bar
  syncURL();
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

// Share button
const shareBtn = document.getElementById('share-btn');
if (shareBtn) {
  shareBtn.addEventListener('click', async () => {
    const url = toReadableURL(window.location.href);
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Indic Script Explorer', url });
      } catch {
        // user cancelled — do nothing
      }
    } else {
      await navigator.clipboard.writeText(url);
      const orig = shareBtn.innerHTML;
      shareBtn.innerHTML = '✓ Copied!';
      setTimeout(() => { shareBtn.innerHTML = orig; }, 1500);
    }
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
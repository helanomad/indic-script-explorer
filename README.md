# Hela Nomad - Indic Script Explorer

A lightweight web based tool by **Hela Nomad** for visually comparing how words and syllables appear across major Indic scripts — from ancient **Brahmi** to modern South Asian writing systems like **Sinhala**, **Tamil**, and **Devanagari**.

🌐 **Live demo**: [https://helanomad.github.io/indic-script-explorer/](https://helanomad.github.io/indic-script-explorer/)

---

## 🔤 What It Does

- Converts Latin-script syllables (e.g., `ti`, `dha`, `kā`) into:
  - **Brahmi**
  - **Sinhala**
  - **Tamil**
  - **Devanagari**
- Shows **syllable-by-syllable breakdown** and full word rendering.
- Uses **standard Unicode characters** and fonts for script accuracy.

---

## 💻 Tech Stack

This project is built using:

- ✅ HTML + CSS (fully static frontend)
- ✅ Modular JavaScript (ES modules)
  - `main.js` – handles user input and events
  - `render.js` – builds and renders the comparison table
  - `mappings.js` – stores script symbol data
  - `syllable.js` – defines how syllables and words are parsed
- ✅ Fonts from [Google Fonts](https://fonts.google.com/):
  - **Noto Sans Brahmi**
  - **Noto Sans Sinhala**
  - **Noto Sans Tamil**
  - **Noto Sans Devanagari**

---

## 🚀 Deployment

This tool is hosted on **GitHub Pages** and requires no backend.

To run locally:

```bash
python3 -m http.server
# then open http://localhost:8000
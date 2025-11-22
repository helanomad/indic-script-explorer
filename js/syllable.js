export class IndicSyllable {
  constructor(consonant, vowel) {
    this.consonant = consonant;
    this.vowel = vowel;
    this.final = null; // e.g. anusvara (ṃ) or visarga (ḥ)
  }

  render(script, mappings, vowelSigns, viramas) {
    let output = '';

    // Standalone vowel (no consonant)
    if (!this.consonant) {
      if (this.vowel) {
        const vowelEntry = mappings[this.vowel];
        output = vowelEntry?.[script] || '(?)';
      }
    } else {
      const base = mappings[this.consonant];
      if (!base || !base[script]) return '(?)';

      const consonantChar = base[script];
      const vowelSign = vowelSigns[script]?.[this.vowel];

      // If there's an explicit vowel, add the vowel sign
      if (vowelSign !== undefined) {
        output = consonantChar + vowelSign;
      } else {
        // If no explicit vowel, return the consonant + virama
        output = consonantChar + viramas[script];
      }
    }

    // Attach final marker (anusvara ṃ, visarga ḥ) to the syllable
    if (this.final) {
      const finalEntry = mappings[this.final];
      if (finalEntry?.[script]) {
        output += finalEntry[script];
      }
    }

    return output || '(?)';
  }
}

export class IndicWord {
  constructor(text, mappings) {
    this.text = text.toLowerCase();
    this.syllables = [];
    this.knownVowels = [
      'a', 'ā', 'i', 'ī', 'u', 'ū',
      'ṛ', 'r̥',
      'ṝ', 'r̥̄',
      'l̥', 'l̥̄',
      'e', 'ai', 'o', 'au', 'ō', 'ē',
      'ä', 'æ',
      'ǟ', 'ǣ'
    ];
    this.finalMarkers = ['ṃ', 'ṁ', 'ḥ']; // anusvara-isat, anusvara-iso-15919, visarga

    let i = 0;

    while (i < this.text.length) {
      let consonant = '';
      let vowel = '';
      let segmentLength = 0;
      let found = false;

      // 1) Handle final markers (ṃ, ḥ): attach to previous syllable
      // -----------------------------------------------------------
      let handledFinal = false;
      for (let len = 2; len >= 1; len--) {
        const seg = this.text.slice(i, i + len);
        if (this.finalMarkers.includes(seg)) {
          if (this.syllables.length > 0) {
            this.syllables[this.syllables.length - 1].final = seg;
          } else {
            // Edge case: word starts with ṃ or ḥ
            const syl = new IndicSyllable('', '');
            syl.final = seg;
            this.syllables.push(syl);
          }
          i += len;
          handledFinal = true;
          break;
        }
      }
      if (handledFinal) continue;

      // 2) Try to match the longest consonant sequence
      // ----------------------------------------------
      for (let len = 3; len >= 1; len--) {
        const cons = this.text.slice(i, i + len);
        if (mappings[cons] && !this.knownVowels.includes(cons) && !this.finalMarkers.includes(cons)) {
          consonant = cons;
          segmentLength = len;
          found = true;
          break;
        }
      }

      if (found) {
        i += segmentLength;

        // Try to find a following vowel
        for (let len = 2; len >= 1; len--) {
          const vol = this.text.slice(i, i + len);
          if (this.knownVowels.includes(vol)) {
            vowel = vol;
            i += len;
            break;
          }
        }
        this.syllables.push(new IndicSyllable(consonant, vowel));
      } else {
        // 3) Check for conjuncts or stacked consonants with no vowel
        // ---------------------------------------------------------
        for (let len = 3; len >= 1; len--) {
          const cons = this.text.slice(i, i + len);
          if (mappings[cons] && !this.knownVowels.includes(cons) && !this.finalMarkers.includes(cons)) {
            this.syllables.push(new IndicSyllable(cons, ''));
            i += len;
            found = true;
            break;
          }
        }

        if (!found) {
          // 4) Try to find a standalone vowel
          // ---------------------------------
          for (let len = 2; len >= 1; len--) {
            const vol = this.text.slice(i, i + len);
            if (this.knownVowels.includes(vol)) {
              this.syllables.push(new IndicSyllable('', vol));
              i += len;
              found = true;
              break;
            }
          }
        }

        if (!found) {
          i++; // Fallback on unknown segment
        }
      }
    }
  }
}
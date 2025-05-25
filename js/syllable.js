export class IndicSyllable {
  constructor(consonant, vowel) {
    this.consonant = consonant;
    this.vowel = vowel;
  }

  render(script, mappings, vowelSigns, viramas) {
    // Standalone vowel
    if (!this.consonant) {
      const vowelEntry = mappings[this.vowel];
      return vowelEntry?.[script] || '(?)';
    }

    const base = mappings[this.consonant];
    if (!base || !base[script]) return '(?)';

    const consonantChar = base[script];
    const vowelSign = vowelSigns[script]?.[this.vowel];

    // If there's an explicit vowel, add the vowel sign
    if (vowelSign !== undefined) {
      return consonantChar + vowelSign;
    } else {
      // If no explicit vowel, return the consonant + virama
      return consonantChar + viramas[script];
    }
  }
}

export class IndicWord {
  constructor(text, mappings) {
    this.text = text.toLowerCase();
    this.syllables = [];
    this.knownVowels = ['a', 'ā', 'i', 'ī', 'u', 'ū', 'ṛ', 'ṝ', 'e', 'ai', 'o', 'au', 'ō', 'ē'];
    let i = 0;

    while (i < this.text.length) {
      let consonant = '';
      let vowel = '';
      let segmentLength = 0;
      let found = false;

      // Try to match the longest consonant sequence
      for (let len = 3; len >= 1; len--) {
        const cons = this.text.slice(i, i + len);
        if (mappings[cons] && !this.knownVowels.includes(cons)) {
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
        // Check for conjuncts or stacked consonants with no vowel
        for (let len = 3; len >= 1; len--) {
          const cons = this.text.slice(i, i + len);
          if (mappings[cons] && !this.knownVowels.includes(cons)) {
            this.syllables.push(new IndicSyllable(cons, ''));
            i += len;
            found = true;
            break;
          }
        }

        if (!found) {
          // Try to find a standalone vowel
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
export const sinhalaAlphabetOrder = {
  vowels: [
    "a", "ā", "ä", "æ", "ǟ", "ǣ", "i", "ī", "u", "ū", "ṛ", "r̥", "ṝ", "r̥̄", "l̥", "l̥̄",
    "e", "ē", "ai", "o", "ō", "au"
  ],
  signs: ["ṃ", "ṁ", "ḥ"],
  consonants: [
    {
      title: "Varga — Grouped Consonants",
      grid: "learn-grid--6",
      keys: [
        "k", "kh", "g", "gh", "ṅ", "n̆g",
        "c", "ch", "j", "jh", "ñ", "n̆j",
        "ṭ", "ṭh", "ḍ", "ḍh", "ṇ", "n̆ḍ",
        "t", "th", "d", "dh", "n", "n̆d",
        "p", "ph", "b", "bh", "m", "m̆b"
      ]
    },
    {
      title: "Ardha-Svara — Semi-vowels",
      grid: "learn-grid",
      keys: ["y", "r", "l", "v"]
    },
    {
      title: "Fricatives and other consonants",
      grid: "learn-grid--6",
      keys: ["ś", "ṣ", "s", "h", "ḷ", "f"]
    }
  ]
};

export const devanagariAlphabetOrder = {
  vowels: [
    "a", "ā",
    "i", "ī",
    "u", "ū",
    "ṛ", "r̥",
    "ṝ", "r̥̄",
    "l̥", "l̥̄",
    "e", "ē",
    "ai",
    "o", "ō",
    "au"
  ],

  signs: ["ṃ", "ṁ", "ḥ"],

  consonants: [
    {
      title: "Varga — Grouped Consonants",
      grid: "learn-grid--5",
      keys: [
        "k", "kh", "g", "gh", "ṅ",
        "c", "ch", "j", "jh", "ñ",
        "ṭ", "ṭh", "ḍ", "ḍh", "ṇ",
        "t", "th", "d", "dh", "n",
        "p", "ph", "b", "bh", "m"
      ]
    },
    {
      title: "Ardha-Svara — Semi-vowels",
      grid: "learn-grid--5",
      keys: ["y", "r", "l", "v"]
    },
    {
      title: "Fricatives and other consonants",
      grid: "learn-grid--5",
      keys: ["ś", "ṣ", "s", "h"]
    },

    {
      title: "Extended (transliteration / regional)",
      grid: "learn-grid--5",
      keys: ["ḷ", "ḻ", "ṟ", "ṉ"]
    }
  ]
};

export const tamilAlphabetOrder = {
  vowels: ["a", "ā", "i", "ī", "u", "ū", "e", "ē", "ai", "o", "ō", "au"],
  signs: ["ṃ", "ḥ"],

  consonants: [
    {
      title: "Mei — Consonants",
      grid: "learn-grid--6",
      keys: [
        "k", "ṅ",
        "c", "ñ",
        "ṭ", "ṇ",
        "t", "n",
        "p", "m",
        "y", "r", "l", "v",
        "ḻ", "ḷ", "ṟ", "ṉ"
      ]
    },
    {
      title: "Grantha & Loan Letters",
      grid: "learn-grid--6",
      keys: [
        "j",
        "ś",
        "ṣ",
        "s",
        "h"
      ]
    }
  ]
};

export const brahmiAlphabetOrder = {
  vowels: [
    "a", "ā",
    "i", "ī",
    "u", "ū",
    "r̥", "ṛ",
    "r̥̄", "ṝ",
    "l̥", "l̥̄",
    "e", "ē",
    "ai",
    "o", "ō",
    "au"
  ],

  signs: ["ṃ", "ṁ", "ḥ"],

  consonants: [
    {
      title: "Varga — Grouped Consonants",
      grid: "learn-grid--5",
      keys: [
        "k", "kh", "g", "gh", "ṅ",
        "c", "ch", "j", "jh", "ñ",
        "ṭ", "ṭh", "ḍ", "ḍh", "ṇ",
        "t", "th", "d", "dh", "n",
        "p", "ph", "b", "bh", "m"
      ]
    },
    {
      title: "Ardha-Svara — Semi-vowels",
      grid: "learn-grid",
      keys: ["y", "r", "l", "v"]
    },
    {
      title: "Fricatives and other consonants",
      grid: "learn-grid--6",
      keys: ["ś", "ṣ", "s", "h", "ḷ"]
    }
  ]
};

export const tamilbrahmiAlphabetOrder = {
  vowels: [
    "a", "ā",
    "i", "ī",
    "u", "ū",
    "e", "ē",
    "ai",
    "o", "ō",
    "au"
  ],

  signs: ["ṃ", "ṁ"],

  consonants: [
    {
      title: "Core Consonants",
      grid: "learn-grid--6",
      keys: [
        "k", "ṅ",
        "c", "ñ",
        "ṭ", "ṇ",
        "t", "n",
        "p", "m",
        "y", "r", "l", "v"
      ]
    },
    {
      title: "Unique Tamil Consonants",
      grid: "learn-grid--6",
      keys: [
        "ḻ", "ḷ", "ṟ", "ṉ"
      ]
    },
    {
      title: "Extended / Prakrit Consonants",
      grid: "learn-grid--6",
      keys: [
        "j",
        "ś",
        "ṣ",
        "s",
        "h",
        "dh"
      ]
    }
  ]
};
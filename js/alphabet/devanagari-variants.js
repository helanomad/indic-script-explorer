export const DEVANAGARI_VARIANTS = {
    // Extended = show everything (same pattern as Sinhala NIE)
    extended: null,

    // Core = conservative/common set (Core excludes: "e", "o", "ḻ", "ṟ", "ṉ")
    // Note: core excludes "e" and "o" because in this chart those represent short forms (ऎ/ऒ).
    // Long forms are represented by "ē" and "ō" (ए/ओ).
    core: new Set([
        // Vowels (core)
        "a", "ā", "i", "ī", "u", "ū",
        "ṛ", "r̥", "ṝ", "r̥̄", "l̥", "l̥̄",
        "ē", "ai", "ō", "au",

        // Signs
        "ṃ", "ṁ", "ḥ",

        // Consonants (standard)
        "k", "kh", "g", "gh", "ṅ",
        "c", "ch", "j", "jh", "ñ",
        "ṭ", "ṭh", "ḍ", "ḍh", "ṇ",
        "t", "th", "d", "dh", "n",
        "p", "ph", "b", "bh", "m",
        "y", "r", "l", "v",
        "ś", "ṣ", "s", "h"
    ])
};
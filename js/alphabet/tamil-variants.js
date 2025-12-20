export const TAMIL_VARIANTS = {
    // Extended = show everything
    extended: null,

    // Core = hide Grantha/loan letters
    core: new Set([
        // vowels
        "a", "ā", "i", "ī", "u", "ū", "e", "ē", "ai", "o", "ō", "au",

        // signs (āytam)
        "ḥ",

        // core consonants (Mei)
        "k", "ṅ", "c", "ñ", "ṭ", "ṇ",
        "t", "n", "p", "m", "y", "r",
        "l", "v", "ḻ", "ḷ", "ṟ", "ṉ"
    ])
};
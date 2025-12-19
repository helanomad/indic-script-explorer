export const SINHALA_VARIANTS = {
  // null means "show everything"
  nie: null,

  // Miśra: expanded set = Amishra + aspirates + ś/ṣ + Sanskritic vowels
  miśra: new Set([
    ...[
      "a","ā","ä","æ","ǟ","ǣ","i","ī","u","ū","e","ē","ai","o","ō","au",
      "k","g","ṅ","c","j","ñ","ṭ","ḍ","ṇ","t","d","n","p","b","m",
      "y","r","l","v","s","h","ḷ",
      "ṁ","ṃ","ḥ"
    ],
    // extras present on the Sinhala learn page
    "kh","gh","ch","jh","ṭh","ḍh","th","dh","ph","bh",
    "ś","ṣ",
    // Sanskritic vowels that Sinhala supports in Unicode set
    "ṛ","r̥","ṝ","r̥̄","l̥","l̥̄"
  ]),
  
  // Amiśra: core Sinhala set (exclude Sanskrit/Pali-heavy extras)
  amiśra: new Set([
    // Vowels (include Sinhala-specific æ/ä & long forms)
    "a","ā","ä","æ","ǟ","ǣ","i","ī","u","ū","e","ē","o","ō",

    // Core consonants
    "k","g","j",
    "ṭ","ḍ","ṇ",
    "t","d","n",
    "p","b","m",
    "y","r","l","v",
    "s","h","ḷ",

    // Signs
    "ṁ","ṃ"
  ]),

  // Sidat: conservative classical baseline
  sidat: new Set([
    "a","ā","i","ī","u","ū","e","ē","o","ō",
    "k","g","j","ṭ","ḍ","ṇ","t","d","n","p","b","m",
    "y","r","l","v","s","h","ḷ",
    "ṁ","ṃ"
  ])
};
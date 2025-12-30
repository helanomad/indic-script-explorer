/**
 * Indic script mappings for Romanized syllables.
 * 
 * Sources:
 * - Brahmi (U+11000–U+1107F): https://www.unicode.org/charts/PDF/U11000.pdf
 * - Brahmi Names List: https://www.unicode.org/charts/nameslist/n_11000.html
 * - Sinhala (U+0D80–U+0DFF): https://www.unicode.org/charts/PDF/U0D80.pdf
 * - Tamil (U+0B80–U+0BFF): https://www.unicode.org/charts/PDF/U0B80.pdf
 * - Devanagari (U+0900–U+097F): https://www.unicode.org/charts/PDF/U0900.pdf
 * 
 * Unicode values were manually verified and cross-checked with these charts.
 * Script renderings are in native Unicode and intended for visual comparison.
 */
export const mappings = {
  // Independent Vowels
  "a": { devanagari: "अ", brahmi: "𑀅", tamilbrahmi: "𑀅", tamil: "அ", sinhala: "අ" }, // Devanagari: U+0905, Brahmi: U+11005, TamilBrahmi: U+11005, Tamil: U+0B85, Sinhala: U+0D85
  "ā": { devanagari: "आ", brahmi: "𑀆", tamilbrahmi: "𑀆", tamil: "ஆ", sinhala: "ආ" }, // Devanagari: U+0906, Brahmi: U+11006, TamilBrahmi: U+11006, Tamil: U+0B86, Sinhala: U+0D86  

  // Short ä/æ (Sinhala-specific 'ඇ', approximated as 'a' elsewhere)
  "æ": { devanagari: "अ", brahmi: "𑀅", tamilbrahmi: "𑀅", tamil: "அ", sinhala: "ඇ" }, // Devanagari: U+0905, Brahmi: U+11005, TamilBrahmi: U+11005, Tamil: U+0B85, Sinhala: U+0D87 (ISO 15919)
  "ä": { devanagari: "अ", brahmi: "𑀅", tamilbrahmi: "𑀅", tamil: "அ", sinhala: "ඇ" }, // Devanagari: U+0905, Brahmi: U+11005, TamilBrahmi: U+11005, Tamil: U+0B85, Sinhala: U+0D87 (German sources)
  // Long ǟ/ǣ (Sinhala-specific 'ඈ', approximated as 'ā' elsewhere)
  "ǣ": { devanagari: "आ", brahmi: "𑀆", tamilbrahmi: "𑀆", tamil: "ஆ", sinhala: "ඈ" }, // Devanagari: U+0905, Brahmi: U+11005, TamilBrahmi: U+11005, Tamil: U+0B85, Sinhala: U+0D88 (ISO 15919)
  "ǟ": { devanagari: "आ", brahmi: "𑀆", tamilbrahmi: "𑀆", tamil: "ஆ", sinhala: "ඈ" }, // Devanagari: U+0905, Brahmi: U+11005, TamilBrahmi: U+11005, Tamil: U+0B85, Sinhala: U+0D88 (German sources)

  "i": { devanagari: "इ", brahmi: "𑀇", tamilbrahmi: "𑀇", tamil: "இ", sinhala: "ඉ" }, // Devanagari: U+0907, Brahmi: U+11007, TamilBrahmi: U+11007, Tamil: U+0B87, Sinhala: U+0D89
  "ī": { devanagari: "ई", brahmi: "𑀈", tamilbrahmi: "𑀈", tamil: "ஈ", sinhala: "ඊ" }, // Devanagari: U+0908, Brahmi: U+11008, TamilBrahmi: U+11007, Tamil: U+0B88, Sinhala: U+0D8A

  "u": { devanagari: "उ", brahmi: "𑀉", tamilbrahmi: "𑀉", tamil: "உ", sinhala: "උ" }, // Devanagari: U+0909, Brahmi: U+11009, TamilBrahmi: U+11009, Tamil: U+0B89, Sinhala: U+0D8B
  "ū": { devanagari: "ऊ", brahmi: "𑀊", tamilbrahmi: "𑀊", tamil: "ஊ", sinhala: "ඌ" }, // Devanagari: U+090A, Brahmi: U+1100A, TamilBrahmi: U+1100A, Tamil: U+0B8A, Sinhala: U+0D8C

  "r̥": { devanagari: "ऋ", brahmi: "𑀋", tamilbrahmi: "[n/a]", tamil: "[n/a]", sinhala: "ඍ" }, // Devanagari: U+090B, Brahmi: U+1100B, TamilBrahmi: , Tamil: , Sinhala: U+0D8D (ISO 15919)
  "ṛ": { devanagari: "ऋ", brahmi: "𑀋", tamilbrahmi: "[n/a]", tamil: "[n/a]", sinhala: "ඍ" }, // Devanagari: U+090B, Brahmi: U+1100B, TamilBrahmi: , Tamil: , Sinhala: U+0D8D (ISAT)

  "r̥̄": { devanagari: "ॠ", brahmi: "𑀌", tamilbrahmi: "[n/a]", tamil: "[n/a]", sinhala: "ඎ" }, // Devanagari: U+0960, Brahmi: U+1100C, TamilBrahmi: , Tamil: , Sinhala: U+0D8E (ISO 15919)
  "ṝ": { devanagari: "ॠ", brahmi: "𑀌", tamilbrahmi: "[n/a]", tamil: "[n/a]", sinhala: "ඎ" }, // Devanagari: U+0960, Brahmi: U+1100C, TamilBrahmi: , Tamil: , Sinhala: U+0D8E (ISAT)

  "l̥": { devanagari: "ऌ", brahmi: "𑀍", tamilbrahmi: "[n/a]", tamil: "[n/a]", sinhala: "ඏ" }, // Devanagari: U+090C, Brahmi: U+1100D, TamilBrahmi: , Tamil: , Sinhala: U+0D8F
  "l̥̄": { devanagari: "ॡ", brahmi: "𑀎", tamilbrahmi: "[n/a]", tamil: "[n/a]", sinhala: "ඐ" }, // Devanagari: U+0961, Brahmi: U+1100E, TamilBrahmi: , Tamil: , Sinhala: U+0D90

  "e": { devanagari: "ऎ", brahmi: "𑀏", tamilbrahmi: "𑀏𑁆", tamil: "எ", sinhala: "එ" }, // Devanagari: U+090E, Brahmi: U+1100F, TamilBrahmi: U+11000F + U+11046, Tamil: U+0B8E, Sinhala: U+0D91
  "ē": { devanagari: "ए", brahmi: "𑀏", tamilbrahmi: "𑀏", tamil: "ஏ", sinhala: "ඒ" }, // Devanagari: U+090F, Brahmi: U+1100F, TamilBrahmi: U+1100F, Tamil: U+0B8F, Sinhala: U+0D92 (Brahmi often does not distinguish e/ē)
  "ai": { devanagari: "ऐ", brahmi: "𑀐", tamilbrahmi: "𑀐", tamil: "ஐ", sinhala: "ඓ" }, // Devanagari: U+0910, Brahmi: U+11010, TamilBrahmi: U+11010, Tamil: U+0B90, Sinhala: U+0D93

  "o": { devanagari: "ऒ", brahmi: "𑀑", tamilbrahmi: "𑀑𑁆", tamil: "ஒ", sinhala: "ඔ" }, // Devanagari: U+0912, Brahmi: U+11011, TamilBrahmi: U+11011 + U+11046, Tamil: U+0B92, Sinhala: U+0D94
  "ō": { devanagari: "ओ", brahmi: "𑀑", tamilbrahmi: "𑀑", tamil: "ஓ", sinhala: "ඕ" }, // Devanagari: U+0913, Brahmi: U+11011, TamilBrahmi: U+11011, Tamil: U+0B93, Sinhala: U+0D95 (Brahmi often does not distinguish o/ō)
  "au": { devanagari: "औ", brahmi: "𑀒", tamilbrahmi: "𑀒", tamil: "ஔ", sinhala: "ඖ" }, // Devanagari: U+0914, Brahmi: U+11012, TamilBrahmi: U+11012, Tamil: U+0B94, Sinhala: U+0D96

  // Consonants
  "k": { devanagari: "क", brahmi: "𑀓", tamilbrahmi: "𑀓", tamil: "க", sinhala: "ක" }, // Devanagari: U+0915, Brahmi: U+11013, TamilBrahmi: U+11013, Tamil: U+0B95, Sinhala: U+0D9A
  "kh": { devanagari: "ख", brahmi: "𑀔", tamilbrahmi: "𑀓", tamil: "க", sinhala: "ඛ" }, // Devanagari: U+0916, Brahmi: U+11014, TamilBrahmi: U+11013, Tamil: U+0B95, Sinhala: U+0D9B
  "g": { devanagari: "ग", brahmi: "𑀕", tamilbrahmi: "𑀓", tamil: "க", sinhala: "ග" }, // Devanagari: U+0917, Brahmi: U+11015, TamilBrahmi: U+11013, Tamil: U+0B95, Sinhala: U+0D9C
  "gh": { devanagari: "घ", brahmi: "𑀖", tamilbrahmi: "𑀓", tamil: "க", sinhala: "ඝ" }, // Devanagari: U+0918, Brahmi: U+11016, TamilBrahmi: U+11013, Tamil: U+0B95, Sinhala: U+0D9D
  "ṅ": { devanagari: "ङ", brahmi: "𑀗", tamilbrahmi: "𑀗", tamil: "ங", sinhala: "ඞ" }, // Devanagari: U+0919, Brahmi: U+11017, TamilBrahmi: U+11017, Tamil: U+0B99, Sinhala: U+0D9E

  "c": { devanagari: "च", brahmi: "𑀘", tamilbrahmi: "𑀘", tamil: "ச", sinhala: "ච" }, // Devanagari: U+091A, Brahmi: U+11018, TamilBrahmi: U+11018, Tamil: U+0B9A, Sinhala: U+0DA0
  "ch": { devanagari: "छ", brahmi: "𑀙", tamilbrahmi: "𑀘", tamil: "ச", sinhala: "ඡ" }, // Devanagari: U+091B, Brahmi: U+11019, TamilBrahmi: U+11018, Tamil: U+0B9A, Sinhala: U+0DA1
  "j": { devanagari: "ज", brahmi: "𑀚", tamilbrahmi: "𑀚", tamil: "ஜ", sinhala: "ජ" }, // Devanagari: U+091C, Brahmi: U+1101A, TamilBrahmi: U+1101A, Tamil: U+0B9C, Sinhala: U+0DA2
  "jh": { devanagari: "झ", brahmi: "𑀛", tamilbrahmi: "𑀚", tamil: "ஜ", sinhala: "ඣ" }, // Devanagari: U+091D, Brahmi: U+1101B, TamilBrahmi: U+1101A, Tamil: U+0B9C, Sinhala: U+0DA3
  "ñ": { devanagari: "ञ", brahmi: "𑀜", tamilbrahmi: "𑀜", tamil: "ஞ", sinhala: "ඤ" }, // Devanagari: U+091E, Brahmi: U+1101C, TamilBrahmi: U+1101C, Tamil: U+0B9E, Sinhala: U+0DA4

  "ṭ": { devanagari: "ट", brahmi: "𑀝", tamilbrahmi: "𑀝", tamil: "ட", sinhala: "ට" }, // Devanagari: U+091F, Brahmi: U+1101D, TamilBrahmi: U+1101D, Tamil: U+0B9F, Sinhala: U+0DA7
  "ṭh": { devanagari: "ठ", brahmi: "𑀞", tamilbrahmi: "𑀝", tamil: "ட", sinhala: "ඨ" }, // Devanagari: U+0920, Brahmi: U+1101E, TamilBrahmi: U+1101D, Tamil: U+0B9F, Sinhala: U+0DA8
  "ḍ": { devanagari: "ड", brahmi: "𑀟", tamilbrahmi: "𑀝", tamil: "ட", sinhala: "ඩ" }, // Devanagari: U+0921, Brahmi: U+1101F, TamilBrahmi: U+1101D, Tamil: U+0B9F, Sinhala: U+0DA9
  "ḍh": { devanagari: "ढ", brahmi: "𑀠", tamilbrahmi: "𑀝", tamil: "ட", sinhala: "ඪ" }, // Devanagari: U+0922, Brahmi: U+11020, TamilBrahmi: U+1101D, Tamil: U+0B9F, Sinhala: U+0DAA
  "ṇ": { devanagari: "ण", brahmi: "𑀡", tamilbrahmi: "𑀡", tamil: "ண", sinhala: "ණ" }, // Devanagari: U+0923, Brahmi: U+11021, TamilBrahmi: U+11021, Tamil: U+0BA3, Sinhala: U+0DAB

  "t": { devanagari: "त", brahmi: "𑀢", tamilbrahmi: "𑀢", tamil: "த", sinhala: "ත" }, // Devanagari: U+0924, Brahmi: U+11022, TamilBrahmi: U+11022, Tamil: U+0BA4, Sinhala: U+0DAD
  "th": { devanagari: "थ", brahmi: "𑀣", tamilbrahmi: "𑀢", tamil: "த", sinhala: "ථ" }, // Devanagari: U+0925, Brahmi: U+11023, TamilBrahmi: U+11022, Tamil: U+0BA4, Sinhala: U+0DAE
  "d": { devanagari: "द", brahmi: "𑀤", tamilbrahmi: "𑀢", tamil: "த", sinhala: "ද" }, // Devanagari: U+0926, Brahmi: U+11024, TamilBrahmi: U+11022, Tamil: U+0BA4, Sinhala: U+0DAF
  "dh": { devanagari: "ध", brahmi: "𑀥", tamilbrahmi: "𑀥", tamil: "த", sinhala: "ධ" }, // Devanagari: U+0927, Brahmi: U+11025, TamilBrahmi: U+11025, Tamil: U+0BA4, Sinhala: U+0DB0
  "n": { devanagari: "न", brahmi: "𑀦", tamilbrahmi: "𑀦", tamil: "ந", sinhala: "න" }, // Devanagari: U+0928, Brahmi: U+11026, TamilBrahmi: U+11026, Tamil: U+0BA8, Sinhala: U+0DB1

  "p": { devanagari: "प", brahmi: "𑀧", tamilbrahmi: "𑀧", tamil: "ப", sinhala: "ප" }, // Devanagari: U+092A, Brahmi: U+11027, TamilBrahmi: U+11027, Tamil: U+0BAA, Sinhala: U+0DB4
  "ph": { devanagari: "फ", brahmi: "𑀨", tamilbrahmi: "𑀧", tamil: "ப", sinhala: "ඵ" }, // Devanagari: U+092B, Brahmi: U+11028, TamilBrahmi: U+11027, Tamil: U+0BAA, Sinhala: U+0DB5
  "b": { devanagari: "ब", brahmi: "𑀩", tamilbrahmi: "𑀧", tamil: "ப", sinhala: "බ" }, // Devanagari: U+092C, Brahmi: U+11029, TamilBrahmi: U+11027, Tamil: U+0BAA, Sinhala: U+0DB6
  "bh": { devanagari: "भ", brahmi: "𑀪", tamilbrahmi: "𑀧", tamil: "ப", sinhala: "භ" }, // Devanagari: U+092D, Brahmi: U+1102A, TamilBrahmi: U+11027, Tamil: U+0BAA, Sinhala: U+0DB7
  "m": { devanagari: "म", brahmi: "𑀫", tamilbrahmi: "𑀫", tamil: "ம", sinhala: "ම" }, // Devanagari: U+092E, Brahmi: U+1102B, TamilBrahmi: U+1102B, Tamil: U+0BAE, Sinhala: U+0DB8

  "y": { devanagari: "य", brahmi: "𑀬", tamilbrahmi: "𑀬", tamil: "ய", sinhala: "ය" }, // Devanagari: U+092F, Brahmi: U+1102C, TamilBrahmi: U+1102C, Tamil: U+0BAF, Sinhala: U+0DBA
  "r": { devanagari: "र", brahmi: "𑀭", tamilbrahmi: "𑀭", tamil: "ர", sinhala: "ර" }, // Devanagari: U+0930, Brahmi: U+1102D, TamilBrahmi: U+1102D, Tamil: U+0BB0, Sinhala: U+0DBB
  "l": { devanagari: "ल", brahmi: "𑀮", tamilbrahmi: "𑀮", tamil: "ல", sinhala: "ල" }, // Devanagari: U+0932, Brahmi: U+1102E, TamilBrahmi: U+1102E, Tamil: U+0BB2, Sinhala: U+0DBD
  "v": { devanagari: "व", brahmi: "𑀯", tamilbrahmi: "𑀯", tamil: "வ", sinhala: "ව" }, // Devanagari: U+0935, Brahmi: U+1102F, TamilBrahmi: U+1102F, Tamil: U+0BB5, Sinhala: U+0DC0

  "ś": { devanagari: "श", brahmi: "𑀰", tamilbrahmi: "𑀰", tamil: "ஶ", sinhala: "ශ" }, // Devanagari: U+0936, Brahmi: U+11030, TamilBrahmi: U+11030, Tamil: U+0BB6, Sinhala: U+0DC1
  "ṣ": { devanagari: "ष", brahmi: "𑀱", tamilbrahmi: "𑀱", tamil: "ஷ", sinhala: "ෂ" }, // Devanagari: U+0937, Brahmi: U+11031, TamilBrahmi: U+11031, Tamil: U+0BB7, Sinhala: U+0DC2
  "s": { devanagari: "स", brahmi: "𑀲", tamilbrahmi: "𑀲", tamil: "ஸ", sinhala: "ස" }, // Devanagari: U+0938, Brahmi: U+11032, TamilBrahmi: U+11032, Tamil: U+0BB8, Sinhala: U+0DC3
  "h": { devanagari: "ह", brahmi: "𑀳", tamilbrahmi: "𑀳", tamil: "ஹ", sinhala: "හ" }, // Devanagari: U+0939, Brahmi: U+11033, TamilBrahmi: U+11033, Tamil: U+0BB9, Sinhala: U+0DC4
  "ḷ": { devanagari: "ळ", brahmi: "𑀴", tamilbrahmi: "𑀴", tamil: "ள", sinhala: "ළ" }, // Devanagari: U+0933, Brahmi: U+11034, TamilBrahmi: U+11034, Tamil: U+0BB3, Sinhala: U+0DC5
  "f": { devanagari: "फ़", brahmi: "[n/a]", tamilbrahmi: "[n/a]", tamil: "ஃப", sinhala: "ෆ" }, // Devanagari: U+095E, Brahmi: , TamilBrahmi: , Tamil: U+0B83 + U+0BAA, Sinhala: U+0DC6

  // Tamil-unique consonants
  // Note: Originally for Tamil/TamilBrahmi. Devanagari forms are historical / extension letters used to represent Dravidian sounds. Approximation for Brahmi/Sinhala.
  "ḻ": { devanagari: "ऴ", brahmi: "𑀴", tamilbrahmi: "𑀵", tamil: "ழ", sinhala: "ළ" }, // Devanagari: U+0934, Brahmi: U+11034, TamilBrahmi: U+11035, Tamil: U+0BB4, Sinhala: U+0DC5 (Approximation for: Brahmi/Sinhala)
  "ṉ": { devanagari: "ऩ", brahmi: "𑀦", tamilbrahmi: "𑀷", tamil: "ன", sinhala: "න" }, // Devanagari: U+0929, Brahmi: U+11026, TamilBrahmi: U+11037, Tamil: U+0BA9, Sinhala: U+0DB1 (Approximation for: Brahmi/Sinhala)
  "ṟ": { devanagari: "ऱ", brahmi: "𑀭", tamilbrahmi: "𑀶", tamil: "ற", sinhala: "ර" }, // Devanagari: U+0931, Brahmi: U+1102D, TamilBrahmi: U+11036, Tamil: U+0BB1, Sinhala: U+0DBB (Approximation for: Brahmi/Sinhala)

  // Special Signs
  "ṁ": { devanagari: "ं", brahmi: "𑀁", tamilbrahmi: "𑀫𑁆", tamil: "ஂ", sinhala: "ං" }, // Devanagari: U+0902, Brahmi: U+11001, TamilBrahmi: U+1102B + U+11070, Tamil: U+0B82, Sinhala: U+0D82 (Anusvara / ISO 15919) ? Tamil-Brahmi becomes am
  "ṃ": { devanagari: "ं", brahmi: "𑀁", tamilbrahmi: "𑀫𑁆", tamil: "ஂ", sinhala: "ං" }, // Devanagari: U+0902, Brahmi: U+11001, TamilBrahmi: U+1102B + U+11070, Tamil: U+0B82, Sinhala: U+0D82 (Anusvara / ISAT) ? Tamil-Brahmi becomes am
  "ḥ": { devanagari: "ः", brahmi: "𑀂", tamilbrahmi: "[n/a]", tamil: "ஃ", sinhala: "ඃ" },  // Devanagari: U+0903, Brahmi: U+11002, TamilBrahmi: , Tamil: U+0B83, Sinhala: U+0D83 (Visarga) ? Early Tamil-Brahmi inscriptions (3rd century BCE to 1st century CE) simply omitted aspirated sounds like ḥ because they were not native to the Tamil phonetic system.

  // Prenasalized consonants (Sinhala saññaka)
  "n̆g": { devanagari: "[n/a]", brahmi: "[n/a]", tamilbrahmi: "[n/a]", tamil: "[n/a]", sinhala: "ඟ" }, // Devanagari: , Brahmi: , TamilBrahmi: , Tamil: , Sinhala: U+0D9F
  "n̆j": { devanagari: "[n/a]", brahmi: "[n/a]", tamilbrahmi: "[n/a]", tamil: "[n/a]", sinhala: "ඦ" }, // Devanagari: , Brahmi: , TamilBrahmi: , Tamil: , Sinhala: U+0DA6
  "n̆ḍ": { devanagari: "[n/a]", brahmi: "[n/a]", tamilbrahmi: "[n/a]", tamil: "[n/a]", sinhala: "ඬ" }, // Devanagari: , Brahmi: , TamilBrahmi: , Tamil: , Sinhala: U+0DAC
  "n̆d": { devanagari: "[n/a]", brahmi: "[n/a]", tamilbrahmi: "[n/a]", tamil: "[n/a]", sinhala: "ඳ" }, // Devanagari: , Brahmi: , TamilBrahmi: , Tamil: , Sinhala: U+0DB3
  "m̆b": { devanagari: "[n/a]", brahmi: "[n/a]", tamilbrahmi: "[n/a]", tamil: "[n/a]", sinhala: "ඹ" }, // Devanagari: , Brahmi: , TamilBrahmi: , Tamil: , Sinhala: U+0DB9
};
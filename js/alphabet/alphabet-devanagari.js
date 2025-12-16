import { initAlphabetPage } from "./alphabet-core.js";
import { mappings } from "../script-mappings.js";
import { devanagariAlphabetOrder } from "./alphabet-data.js";
import { devanagariRomanAliases } from "../roman-preferences.js";

export function initDevanagariAlphabetPage() {
  initAlphabetPage({
    mappings,
    alphabetOrder: devanagariAlphabetOrder,
    romanAliases: devanagariRomanAliases,
    audioRoot: "../../assets/audio/deva",
    scriptKey: "devanagari",
    fontPath: "../../assets/fonts/NotoSansDevanagari.ttf"
  });
}
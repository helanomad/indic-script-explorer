import { initAlphabetPage } from "./alphabet-core.js";
import { mappings } from "../script-mappings.js";
import { devanagariAlphabetOrder } from "./alphabet-data.js";
import { devanagariRomanAliases } from "../roman-preferences.js"; // if you have it
import { DEVANAGARI_VARIANTS } from "./devanagari-variants.js";

export function initDevanagariAlphabetPage() {
  initAlphabetPage({
    mappings,
    alphabetOrder: devanagariAlphabetOrder,
    romanAliases: devanagariRomanAliases || {},
    audioRoot: "../../assets/audio/deva",
    scriptKey: "devanagari",
    fontPath: "../../assets/fonts/MartelSans-ExtraLight.ttf",
    variants: {
      defaultVariant: "core",
      sets: DEVANAGARI_VARIANTS,
      toolbarSelector: ".variant-btn"
    }
  });
}
import { initAlphabetPage } from "./alphabet-core.js";
import { mappings } from "../script-mappings.js";
import { sinhalaAlphabetOrder } from "./alphabet-data.js";
import { sinhalaRomanAliases } from "../roman-preferences.js";
import { SINHALA_VARIANTS } from "./sinhala-variants.js";

export function initSinhalaAlphabetPage() {
  initAlphabetPage({
    mappings,
    alphabetOrder: sinhalaAlphabetOrder,
    romanAliases: sinhalaRomanAliases,
    audioRoot: "../../assets/audio/si",
    scriptKey: "sinhala",
    fontPath: "../../assets/fonts/Hodipotha3.ttf",
    variants: {
      defaultVariant: "nie",
      sets: SINHALA_VARIANTS,
      toolbarSelector: ".variant-btn"
    }
  });
}
import { initAlphabetPage } from "./alphabet-core.js";
import { mappings } from "../script-mappings.js";
import { sinhalaAlphabetOrder } from "./alphabet-data.js";
import { sinhalaRomanAliases } from "../roman-preferences.js";

export function initSinhalaAlphabetPage() {
  initAlphabetPage({
    mappings,
    alphabetOrder: sinhalaAlphabetOrder,
    romanAliases: sinhalaRomanAliases,
    audioRoot: "../../assets/audio/si",
    scriptKey: "sinhala",
    fontPath: "../../assets/fonts/NotoSansSinhala.ttf"
  });
}
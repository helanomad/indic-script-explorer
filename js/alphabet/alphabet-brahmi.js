import { initAlphabetPage } from "./alphabet-core.js";
import { mappings } from "../script-mappings.js";
import { brahmiAlphabetOrder } from "./alphabet-data.js";
import { brahmiRomanAliases } from "../roman-preferences.js";

export function initBrahmiAlphabetPage() {
  initAlphabetPage({
    mappings,
    alphabetOrder: brahmiAlphabetOrder,
    romanAliases: brahmiRomanAliases,
    audioRoot: "../../assets/audio/",
    scriptKey: "brahmi",
    fontPath: "../../assets/fonts/NotoSansBrahmi.ttf"
  });
}
import { initAlphabetPage } from "./alphabet-core.js";
import { mappings } from "../script-mappings.js";
import { tamilbrahmiAlphabetOrder } from "./alphabet-data.js";
import { tamilbrahmiRomanAliases } from "../roman-preferences.js";

export function initTamilBrahmiAlphabetPage() {
  initAlphabetPage({
    mappings,
    alphabetOrder: tamilbrahmiAlphabetOrder,
    romanAliases: tamilbrahmiRomanAliases,
    audioRoot: "../../assets/audio/tamilbrahmi",
    scriptKey: "tamilbrahmi",
    fontPath: "../../assets/fonts/Adinatha.otf"
  });
}
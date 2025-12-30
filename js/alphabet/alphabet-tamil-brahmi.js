import { initAlphabetPage } from "./alphabet-core.js";
import { mappings } from "../script-mappings.js";
import { tamilbrahmiAlphabetOrder } from "./alphabet-data.js";

export function initTamilBrahmiAlphabetPage() {
  initAlphabetPage({
    mappings,
    alphabetOrder: tamilbrahmiAlphabetOrder,
    romanAliases: {},
    audioRoot: "../../assets/audio/tamilbrahmi",
    scriptKey: "tamilbrahmi",
    fontPath: "../../assets/fonts/Adinatha.otf"
  });
}
import { initAlphabetPage } from "./alphabet-core.js";
import { mappings } from "../script-mappings.js";
import { tamilAlphabetOrder } from "./alphabet-data.js";

export function initTamilAlphabetPage() {
  initAlphabetPage({
    mappings,
    alphabetOrder: tamilAlphabetOrder,
    romanAliases: {},
    audioRoot: "../../assets/audio/ta",
    scriptKey: "tamil",
    fontPath: "../../assets/fonts/NotoSansTamil.ttf"
  });
}
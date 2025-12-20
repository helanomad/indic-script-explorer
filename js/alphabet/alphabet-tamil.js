import { initAlphabetPage } from "./alphabet-core.js";
import { mappings } from "../script-mappings.js";
import { tamilAlphabetOrder } from "./alphabet-data.js";
import { TAMIL_VARIANTS } from "./tamil-variants.js";

export function initTamilAlphabetPage() {
  initAlphabetPage({
    mappings,
    alphabetOrder: tamilAlphabetOrder,
    romanAliases: {},
    audioRoot: "../../assets/audio/ta",
    scriptKey: "tamil",
    fontPath: "../../assets/fonts/NotoSansTamil.ttf",
    variants: {
      defaultVariant: "core",
      sets: TAMIL_VARIANTS,
      toolbarSelector: ".variant-btn"
    }
  });
}
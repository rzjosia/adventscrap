import {extractJemCollection} from "./src/extract.jem.js";
import {extractDlgCollection} from "./src/extract.dlg.js";
import {extractJemKidsCollection} from "./src/extract.jemkids.js";
import {extractHymnesEtLouangesCollection} from "./src/extract.hl.js";
import {extractAtgCollection} from "./src/extract.atg.js";

console.time("extract-collections");

await Promise.all([
    extractJemCollection(),
    extractHymnesEtLouangesCollection(),
    extractDlgCollection(),
    extractJemKidsCollection(),
    extractAtgCollection(),
]);

console.timeLog("extract-collections");
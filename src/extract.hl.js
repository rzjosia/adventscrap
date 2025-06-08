import {extractLyricsCollections, extractLyricsFromTroisanges, fetchFormattedLyrics} from "./fetch.lyrics.js";
import {createFile} from "./utils.js";

export async function extractHymnesEtLouangesCollection() {
    await extractLyricsCollections("./output/hymnes_et_louanges", 654, async (number, dir) => {
        number = `${number}`.padStart(3, "0");
        const url = `https://troisanges.org/Musique/HymnesEtLouanges/H${number}.html`;
        const formattedLyrics = await fetchFormattedLyrics(url, "H&L", extractLyricsFromTroisanges);
        await createFile(`${dir}/hl-${number}.txt`, formattedLyrics);
    });
}
import {extractLyricsCollections, extractLyricsFromTroisanges, fetchFormattedLyrics} from "./fetch.lyrics.js";
import {createFile} from "./utils.js";

export async function extractDlgCollection() {
    await extractLyricsCollections('./output/dlg', 520, async (number, dir) => {
        number = `${number}`.padStart(3, "0");
        const url = `https://troisanges.org/Musique/DonnezLuiGloire/D${number}.html`;
        const formattedLyrics = await fetchFormattedLyrics(url, "DLG", extractLyricsFromTroisanges);
        await createFile(`${dir}/dlg-${number}.txt`, formattedLyrics);
    })
}
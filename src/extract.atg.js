import {createFile} from "./utils.js";
import {extractLyricsCollections, extractLyricsFromJemaf, fetchFormattedLyrics} from "./fetch.lyrics.js";


export async function extractAtgCollection() {
    await extractLyricsCollections("./output/atg", 400, async (number, dir) => {
        number = `${number}`.padStart(3, "0");
        const url = `https://www.jemaf.fr/v-jemaf-el/chant=atg${number}`;
        const formattedLyrics = await fetchFormattedLyrics(url, "JEM", extractLyricsFromJemaf);
        await createFile(`${dir}/jem-${number}.txt`, formattedLyrics);
    });
}
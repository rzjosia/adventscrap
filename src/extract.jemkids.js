import {createFile} from "./utils.js";
import {extractLyricsCollections, extractLyricsFromJemaf, fetchFormattedLyrics} from "./fetch.lyrics.js";


export async function extractJemKidsCollection() {
    await extractLyricsCollections("./output/jem_kids", 196, async (number, dir) => {
        number = `${number}`.padStart(3, "0");
        const url = `https://www.jemaf.fr/v-jemaf-el/chant=jemk${number}`;
        const formattedLyrics = await fetchFormattedLyrics(url, "JEM KIDS", extractLyricsFromJemaf);
        await createFile(`${dir}/jemk-${number}.txt`, formattedLyrics);
    });
}
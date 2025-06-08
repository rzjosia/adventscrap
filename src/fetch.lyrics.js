import {operationWithRetry, removeAllFilesInFolder} from "./utils.js";
import pLimit from "p-limit";
import {format} from "./propresenter.format.js";
import {JSDOM} from "jsdom";
import iconv from "iconv-lite";
import jschardet from "jschardet";
import got from "got";

const CONCURRENCY = 10;
const RETRY_ATTEMPTS = 3;
const BASE_DELAY_MS = 1000;
const limiter = pLimit(CONCURRENCY);

// Cache d'encodage par domaine
const ENCODING_MAP = {
  "troisanges.org": "windows-1252",
  "jemaf.fr": "utf-8",
};

export async function fetchFormattedLyrics(url, collection, callbackExtractor) {
    const domain = new URL(url).hostname;
    return limiter(() =>
        // 3. Application du limiteur de concurrence
        operationWithRetry(
            async () => {
                const response = await got(url, {
                    responseType: "buffer",
                    timeout: { request: 15000 },
                    headers: {
                        "User-Agent":
                            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                        "Accept-Language": "fr-FR,fr;q=0.9",
                    },
                });

                // Détection d'encodage optimisée
                const encoding =
                    ENCODING_MAP[domain] ||
                    jschardet.detect(response.body)?.encoding?.toLowerCase() ||
                    "utf-8";

                const html = iconv.decode(response.body, encoding);
                const dom = new JSDOM(html, {
                    pretendToBeVisual: true,
                });
                const [title, lyrics] = callbackExtractor(dom.window.document, collection);
                return format(title, lyrics, { splitLine: 2, lineLength: 100 });
            },
            {
                retries: RETRY_ATTEMPTS,
                factor: 2,
                minTimeout: BASE_DELAY_MS,
                maxTimeout: BASE_DELAY_MS * 4,
            }
        )
    );
}

export function extractLyricsFromJemaf(document, collection) {
    const titleBlock = document.querySelector("#contenu > .chant > h1 > span");
    const mainTitle = titleBlock?.firstChild?.textContent?.trim() || "";
    let number = document.title.replace(/^(JEM|JEMK|ATG)(\d+)(.+)$/, "$2");

    if (number < 1000) {
        number = number.padStart(3, "0");
    }

    const title = `${mainTitle} - ${collection} ${number}`;

    // Extraction des paroles structurées
    const lyricsSections = Array.from(
        document.querySelectorAll("div > .refrain, div > .strophe")
    ).map((el) => {
        const prefix = el.className === "refrain" ? "Refrain\n" : "";
        return `${prefix}${el.textContent}`;
    });

    // Assemblage final avec sauts de ligne
    const lyrics = lyricsSections.join("\n");
    return [title, lyrics];
}

export function extractLyricsFromTroisanges(document, collection) {
    let title = (document.querySelector("h1")?.textContent || "")
        .trim()
        .replace(/^(\d+) - (.*)$/, `$2 - ${collection} $1`);
    const p = Array.from(document.querySelectorAll("p")).find((p) =>
        p.querySelector("b")
    );
    const lyrics = p ? p.textContent : "";
    return [title, lyrics];
}

export async function extractLyricsCollections(dir, countCollectionItems, extractorFunction) {
    await removeAllFilesInFolder(dir);

    for (let i = 1; i <= countCollectionItems; i += CONCURRENCY) {
        const allProcess = [];
        const limit = Math.min(countCollectionItems, i + CONCURRENCY);

        for (let j = i; j <= limit; ++j) {
            allProcess.push(extractorFunction(j, dir));
        }

        await Promise.all(allProcess);
    }
}

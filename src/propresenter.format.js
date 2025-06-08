// Constants for section names and formatting
const SECTIONS = {
  VERSE: "Couplet",
  CHORUS: "Refrain",
  BRIDGE: "Pont",
  PRE_CHORUS: "Pré-refrain"
}

const SECTION_NAMES = Object.values(SECTIONS).join("|")

// Regex patterns
const PATTERNS = {
  verse: /Strophe/gim,
  numericVerse: /^(\d+)[.-\s]*(.+)/gim,
  section: new RegExp(`^(${SECTION_NAMES})(\\s*\\d*)\\n`, "gim"),
  sectionMatcher: `\\[(${SECTION_NAMES})\\s*\\d*\\]\\n+`
}

export function format(title, lyrics, options = {}) {
  const { splitLine = 2, lineLength = 38 } = options

  if (isEmptyContent(title, lyrics)) {
    return ""
  }

  const formattedLyrics = formatLyrics(lyrics, splitLine, lineLength)
  const finalTitle = title || extractTitleFromLyrics(formattedLyrics)

  return buildFinalOutput(finalTitle, formattedLyrics)
}

export function wrapText(text, chunkSize = 38) {
  if (chunkSize < 20) {
    throw new Error(
      `Chunk size must be at least 20. Given chunk size ${chunkSize}`
    )
  }

  const regex = new RegExp(`.{1,${chunkSize}}(\\s|$)`, "g")
  return (
    text
      .trim()
      .match(regex)
      ?.map(subText => subText.trim()) || []
  )
}

function isEmptyContent(title, lyrics) {
  return title.trim() === "" && lyrics.trim() === "";
}

function formatLyrics(lyrics, splitLine, lineLength) {
  const matcher = new RegExp(
    `(${PATTERNS.sectionMatcher})?((.+\\n+)(?<!(${PATTERNS.sectionMatcher}))){1,${splitLine}}`,
    "gim"
  )

  return (
    wrapText(lyrics, lineLength)
      .join("\n")
      .replace(PATTERNS.numericVerse, `${SECTIONS.VERSE} $1\n$2\n`)
      .replace(PATTERNS.verse, SECTIONS.VERSE)
      .replace(PATTERNS.section, "[$1$2]\n")
      .concat("\n")
      .replace(/:?\n+/gi, "\n")
      .match(matcher)
      ?.join("\n")
      .trim() ?? ""
  )
}

function extractTitleFromLyrics(formattedLyrics) {
  const firstLineRegex = new RegExp(`^(?!${PATTERNS.sectionMatcher}).+`, "mi")
  const firstLineMatch = formattedLyrics.match(firstLineRegex) || [""]
  return firstLineMatch[0]
}

function buildFinalOutput(title, formattedLyrics) {
  return `Title: ${title}\n\n[Introduction]\n${title}\n\n${formattedLyrics}\n\n[Conclusion]\n\n`
}

/**
 * SKU + Title Parser
 *
 * Detects searches like "MCK68785601 LG Dishwasher Blower Cover"
 * and extracts part number + title words.
 */

/**
 * Check if a token looks like a part number
 * Supports formats like:
 * - MCK69725201 (letters + digits)
 * - DC92-02003A (letters + digits + hyphen + digits + letter)
 * - W10447783 (letter + digits)
 * - 4396508 (digits only)
 */
export function isPartNumberToken(token: string): boolean {
  const trimmed = token.trim().toUpperCase()

  // Must have minimum length (excluding hyphens)
  const withoutHyphens = trimmed.replace(/-/g, "")
  if (withoutHyphens.length < 6 || withoutHyphens.length > 20) {
    return false
  }

  // Must have at least 4 digits total
  const digitCount = (trimmed.match(/\d/g) || []).length
  if (digitCount < 4) {
    return false
  }

  // Must be alphanumeric (with optional hyphens)
  if (!/^[A-Z0-9-]+$/i.test(trimmed)) {
    return false
  }

  // Must start with letter or digit (not hyphen)
  if (/^-/.test(trimmed)) {
    return false
  }

  // Should have significant digit ratio (at least 40% digits)
  const digitRatio = digitCount / withoutHyphens.length
  if (digitRatio < 0.4) {
    return false
  }

  return true
}

/**
 * Extract part number from a token that may have WPL prefix
 * "WPL  MCK68785601" -> "MCK68785601"
 * "MCK68785601" -> "MCK68785601"
 */
export function extractPartNumber(token: string): string {
  const trimmed = token.trim().toUpperCase()

  // Check for WPL prefix with double space
  const wplMatch = trimmed.match(/^WPL\s{2}(.+)$/i)
  if (wplMatch) {
    return wplMatch[1]
  }

  // Check for WPL prefix with single space
  const wplSingleMatch = trimmed.match(/^WPL\s(.+)$/i)
  if (wplSingleMatch) {
    return wplSingleMatch[1]
  }

  // Check for WPL prefix without space
  const wplNoSpaceMatch = trimmed.match(/^WPL(.+)$/i)
  if (wplNoSpaceMatch && wplNoSpaceMatch[1].length >= 6) {
    return wplNoSpaceMatch[1]
  }

  return trimmed
}

export interface SkuTitleParseResult {
  partNumber: string
  titleWords: string[]
}

/**
 * Parse a query to extract part number and title words
 * Returns null if the query doesn't match SKU + title pattern
 */
export function parseSkuTitleQuery(query: string): SkuTitleParseResult | null {
  const trimmed = query.trim()
  if (!trimmed) return null

  // Split into tokens
  const tokens = trimmed.split(/\s+/)

  // Need at least 2 tokens (part number + title word)
  if (tokens.length < 2) return null

  // First token should be part number (or WPL prefix + part number)
  let partNumber: string
  let titleStartIndex: number

  // Check if first token is WPL prefix
  if (tokens[0].toUpperCase() === "WPL" && tokens.length >= 3) {
    // "WPL MCK68785601 LG Dishwasher" format
    partNumber = extractPartNumber(tokens[1])
    titleStartIndex = 2

    // Validate the extracted part number
    if (!isPartNumberToken(partNumber)) {
      return null
    }
  } else {
    // Check for "WPL  MCK68785601" combined token or just "MCK68785601"
    const extracted = extractPartNumber(tokens[0])

    if (!isPartNumberToken(extracted)) {
      return null
    }

    partNumber = extracted
    titleStartIndex = 1
  }

  // Get remaining tokens as title words
  const titleWords = tokens.slice(titleStartIndex)

  // Must have at least 1 title word
  if (titleWords.length === 0) {
    return null
  }

  return {
    partNumber,
    titleWords,
  }
}

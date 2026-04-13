/**
 * SKU Pattern Detector
 *
 * Detects if a search query looks like a SKU or part number.
 */

/**
 * Common SKU/Part Number patterns in the catalog:
 * - W10295370A
 * - EDR1RXD1
 * - W10276924
 * - WPL W10447783 (with prefix)
 * - WPLW10447783 (prefix without space)
 *
 * Characteristics:
 * - Alphanumeric (letters + numbers)
 * - Usually starts with 1-4 letters
 * - Contains 4+ consecutive digits
 * - May have 1-2 letter suffix
 * - Length typically 6-15 characters (excluding WPL prefix)
 */

export const SKU_PATTERNS = {
  /**
   * Standard part number: W10447783, EDR1RXD1, W10295370A
   * Pattern: 1-4 letters, 4+ digits, optional 1-2 letter suffix
   */
  STANDARD: /^[A-Z]{1,4}\d{4,}\w{0,2}$/i,

  /**
   * With WPL prefix: WPL W10447783, WPLW10447783
   * Pattern: WPL + optional space + standard part number
   */
  WITH_PREFIX: /^WPL\s*[A-Z]{1,4}\d{4,}\w{0,2}$/i,

  /**
   * Numeric-heavy: 10447783, 295370
   * Pattern: 6+ digits (some SKUs are mostly numeric)
   */
  NUMERIC: /^\d{6,}$/,

  /**
   * Short alphanumeric with high digit ratio: W12345, A9876
   * Pattern: 1-2 letters + 4+ digits
   */
  SHORT_ALPHA: /^[A-Z]{1,2}\d{4,}$/i,

  /**
   * GE-style interleaved part numbers: WR24X469, WB57K41, WH05X0246, WR71X10329
   * Pattern: 2 letters + digits + letter + digits (letter-digit-letter-digit mixing)
   * These have no 4+ consecutive digit run but are clearly part numbers
   */
  GE_INTERLEAVED: /^[A-Z]{2}\d{1,4}[A-Z]\d{1,5}$/i,
} as const

/**
 * Minimum length for a valid SKU query
 * Prevents matching very short queries like "W1" or "AB"
 */
const MIN_SKU_LENGTH = 6

/**
 * Maximum length for a valid SKU query
 * Prevents matching long product descriptions
 */
const MAX_SKU_LENGTH = 20

/**
 * Detects if a search query appears to be a SKU or part number
 *
 * @param query - The search query string
 * @returns true if query looks like a SKU/part number
 *
 * @example
 * isSkuLikeQuery("W10447783")        // true
 * isSkuLikeQuery("WPL W10447783")    // true
 * isSkuLikeQuery("EDR1RXD1")         // true
 * isSkuLikeQuery("10447783")         // true (numeric SKU)
 * isSkuLikeQuery("whirlpool pump")   // false (descriptive search)
 * isSkuLikeQuery("pump")             // false (too short, no digits)
 * isSkuLikeQuery("W1")               // false (too short)
 */
export function isSkuLikeQuery(query: string): boolean {
  const trimmed = query.trim()

  // Length check
  if (trimmed.length < MIN_SKU_LENGTH || trimmed.length > MAX_SKU_LENGTH) {
    return false
  }

  // Normalize: remove extra spaces, convert to uppercase for pattern matching
  const normalized = trimmed.replace(/\s+/g, " ").toUpperCase()

  // Check against SKU patterns
  if (SKU_PATTERNS.STANDARD.test(normalized)) return true
  if (SKU_PATTERNS.WITH_PREFIX.test(normalized)) return true
  if (SKU_PATTERNS.NUMERIC.test(normalized)) return true
  if (SKU_PATTERNS.SHORT_ALPHA.test(normalized)) return true
  if (SKU_PATTERNS.GE_INTERLEAVED.test(normalized)) return true

  // Additional heuristic: must have at least 4 consecutive digits
  // This catches edge cases not covered by patterns
  const hasSignificantDigits = /\d{4,}/.test(normalized)
  if (!hasSignificantDigits) return false

  // Additional heuristic: should not have more than 2 words
  // SKUs are typically single tokens or "WPL W10447783" (2 tokens)
  const wordCount = normalized.split(" ").length
  if (wordCount > 2) return false

  // Additional heuristic: high digit ratio (at least 50% digits)
  const digitCount = (normalized.match(/\d/g) || []).length
  const digitRatio = digitCount / normalized.replace(/\s/g, "").length
  if (digitRatio >= 0.5) return true

  return false
}

/**
 * Examples for testing
 */
export const SKU_EXAMPLES = {
  valid: [
    "W10447783",
    "WPL W10447783",
    "WPLW10447783",
    "W10295370A",
    "W10276924",
    "10447783",
    "A123456",
    "AB12345",
    "WR24X469",     // GE interleaved
    "WB57K41",      // GE interleaved (short)
    "WH05X0246",    // GE interleaved (zero-padded)
    "WR71X10329",   // GE interleaved (longer)
  ],
  invalid: [
    "whirlpool",
    "pump",
    "whirlpool pump",
    "refrigerator filter",
    "W1",
    "ABC",
    "12345",  // Too short
    "whirlpool refrigerator water filter replacement", // Too long
  ],
} as const

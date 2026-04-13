/**
 * Model Number Detection
 *
 * Detects appliance model numbers in search queries and extracts
 * the part description for combined model+part searches.
 */

import { MODEL_PATTERNS } from "./patterns.js"

export interface ModelPartCombo {
  modelNumber: string // Detected model number (e.g., "WED5220RW0")
  partQuery: string // Remaining text after model (e.g., "pump")
  originalQuery: string // Original search query
}

// Noise words to strip from part query
const NOISE_WORDS = new Set([
  "parts",
  "part",
  "for",
  "the",
  "and",
  "replacement",
  "replace",
  "replaces",
  "compatible",
  "fits",
  "model",
])

// Brand names/aliases to strip from part query (prevents "whirlpool WED5220RW0" → part=whirlpool)
const BRAND_WORDS = new Set([
  // Whirlpool Corp brands
  "whirlpool", "wpl",
  "maytag",
  "kitchenaid", "kitchen-aid",
  "amana",
  "jenn-air", "jennair",
  "roper",
  "estate",
  "inglis",
  "admiral",
  "magic-chef", "magicchef",
  "crosley",
  // LG / Samsung
  "lg", "lge",
  "samsung",
  // GE / Electrolux
  "ge", "general-electric", "generalelectric",
  "electrolux",
  "frigidaire",
  "gibson",
  "kelvinator",
  "westinghouse",
  "tappan",
  "white-westinghouse",
  // Bosch / BSH
  "bosch", "bsh",
  "thermador",
  "gaggenau",
  // Haier
  "haier",
  "hotpoint",
  // Sears
  "kenmore",
  "craftsman",
  // Speed Queen
  "speed-queen", "speedqueen",
  // Other common
  "miele",
  "sub-zero", "subzero",
  "wolf",
  "viking",
  "dacor",
  "monogram",
  "cafe",
  "profile",
])

/**
 * Check if a token looks like a model number
 *
 * Strategy:
 * - Long strings (10+ chars) with letters+digits → likely a model, check DB
 * - Short strings (4-9 chars) → use patterns to avoid false positives like "pump123"
 * - All-digit strings → only if original had separators (Kenmore style like "253.443924")
 *   Pure digit strings like "12002355" are likely part numbers, not models
 */
export function isModelNumber(token: string): boolean {
  if (!token || token.length < 4 || token.length > 30) {
    return false
  }

  const trimmed = token.trim()

  // Clean the token (remove special chars like ^, *, -, .)
  const cleaned = trimmed.replace(/[^A-Z0-9]/gi, "")

  if (cleaned.length < 4) {
    return false
  }

  // Must contain at least one digit
  if (!/\d/.test(cleaned)) {
    return false
  }

  // Check if all-digits after cleaning
  const isAllDigits = /^\d+$/.test(cleaned)

  if (isAllDigits) {
    // All-digit strings: treat as model if:
    // 1. Original had separators (Kenmore style like "253.443924" or "30-3349-23-05")
    // 2. OR it's 10+ digits (long Sears/Kenmore model like "10650042717")
    // Part numbers are typically 6-8 digits, so 10+ digits is likely a model
    const hadSeparators = /[.\-\/]/.test(trimmed)
    if (hadSeparators) return true
    return cleaned.length >= 10
  }

  // Long alphanumeric strings (10+ chars) with letters+digits = likely model
  // False positive cost is just one DB query, then fallback to parts search
  if (cleaned.length >= 10 && /[A-Z]/i.test(cleaned)) {
    return true
  }

  // Short strings → use patterns to filter out false positives
  return MODEL_PATTERNS.some((pattern) => pattern.test(cleaned))
}

/**
 * Normalize a model number for database lookup
 * Strips manufacturer prefix if present
 */
export function normalizeModelNumber(raw: string): string {
  let normalized = raw.trim().toUpperCase()

  // Strip manufacturer prefix (e.g., "WPL-" or "WPL ")
  const prefixMatch = normalized.match(/^([A-Z]{3})[-\s](.+)$/)
  if (prefixMatch) {
    normalized = prefixMatch[2]
  }

  return normalized
}

/**
 * Parse a search query for model + part combo patterns
 *
 * Handles:
 * - "WED5220RW0 pump" → model + part
 * - "pump WED5220RW0" → part + model (reverse)
 * - "WED5220RW0 drain pump" → model + multi-word part
 * - "WED5220RW0 parts" → model only (strips noise)
 *
 * Returns null if no model number detected
 */
export function parseModelPartCombo(query: string): ModelPartCombo | null {
  if (!query || query.trim().length < 6) {
    return null
  }

  const tokens = query.trim().split(/\s+/)

  // Find the model number token
  let modelIndex = -1
  let modelNumber = ""

  for (let i = 0; i < tokens.length; i++) {
    if (isModelNumber(tokens[i])) {
      modelIndex = i
      modelNumber = normalizeModelNumber(tokens[i])
      break
    }
  }

  if (modelIndex === -1) {
    return null
  }

  // Extract remaining tokens as part query (excluding model)
  const remainingTokens = [...tokens.slice(0, modelIndex), ...tokens.slice(modelIndex + 1)]

  // Filter out noise words and brand names
  const partTokens = remainingTokens.filter((t) => {
    const lower = t.toLowerCase()
    return !NOISE_WORDS.has(lower) && !BRAND_WORDS.has(lower)
  })

  const partQuery = partTokens.join(" ").trim()

  return {
    modelNumber,
    partQuery,
    originalQuery: query.trim(),
  }
}

/**
 * Check if a query contains only a model number (no part description)
 */
export function isModelOnlyQuery(query: string): boolean {
  const combo = parseModelPartCombo(query)
  return combo !== null && combo.partQuery === ""
}

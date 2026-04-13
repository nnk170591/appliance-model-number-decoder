/**
 * OEM Manufacturer Code to Brand Slug Mapping
 *
 * Maps manufacturer codes used in appliance industry databases
 * to URL-friendly brand slugs.
 */
export const OEM_BRAND_MAP: Record<string, string> = {
  WPL: "whirlpool",
  GEN: "ge",
  LGE: "lg",
  SMG: "samsung",
  BOS: "bosch",
  WCI: "frigidaire",
  FPA: "fisher-paykel",
}

/**
 * Brand families — maps parent OEM codes to all sub-brands
 * that appear in their product lines.
 */
export const OEM_BRAND_FAMILIES: Record<string, string[]> = {
  WPL: ["whirlpool", "maytag", "kitchenaid", "jenn-air", "amana", "roper", "estate", "inglis", "admiral", "magic-chef", "crosley", "gladiator", "ikea"],
  GEN: ["ge", "general-electric", "hotpoint", "haier", "monogram", "cafe", "profile"],
  LGE: ["lg", "kenmore"],
  SMG: ["samsung"],
  BOS: ["bosch", "thermador", "gaggenau", "siemens", "neff"],
  WCI: ["electrolux", "frigidaire", "westinghouse", "gibson", "kelvinator", "tappan", "white-westinghouse"],
  FPA: ["fisher-paykel", "dcs"],
}

/**
 * Whirlpool Model Number Decoder
 *
 * Decodes WPL-family model numbers into brand, product type,
 * configuration, year, and color using the official Whirlpool
 * nomenclature system.
 *
 * @see https://oemparthub.com — See it in action
 */

export interface WhirlpoolModelDecode {
  brand: string | null
  productType: string | null
  configuration: string | null
  yearCode: string | null
  colorCode: string | null
  raw: string
}

const BRAND_CODES: Record<string, string> = {
  W: "Whirlpool",
  K: "KitchenAid",
  M: "Maytag",
  A: "Amana",
  J: "Jenn-Air",
  I: "IKEA",
  T: "Estate",
  R: "Roper",
  C: "Crosley",
}

const PRODUCT_CODES: Record<string, string> = {
  R: "Freestanding Refrigerator",
  B: "Built-In Refrigerator",
  U: "Undercounter Refrigeration",
  Z: "Freezer",
  D: "Dishwasher",
  F: "Range",
  C: "Cooktop",
  O: "Wall Oven",
  E: "Dryer",
  G: "Gas Dryer",
  M: "Microwave",
  A: "Ventilation",
  T: "Top-Load Washer",
  V: "Laundry Tower",
  H: "Pedestal",
  S: "Side-by-Side Refrigerator",
}

const CONFIG_BY_PRODUCT: Record<string, Record<string, string>> = {
  R: { F: "French Door", M: "4-Door French Door", V: "5-Door French Door", X: "Quad-Door", S: "Side-by-Side", Q: "Quad-Door", T: "Top Mount", B: "Bottom Mount", R: "All Refrigerator" },
  D: { T: "Top Control", P: "Pocket Handle", F: "Front Control" },
  F: { G: "Gas", E: "Electric Radiant", I: "Induction", C: "Electric Coil", D: "Dual Fuel" },
  E: { D: "Standard Dryer", T: "Stacked/Tower" },
  G: { D: "Standard Gas Dryer" },
  O: { S: "Single Oven", D: "Double Oven", C: "Microwave Combo", E: "Electric Combo" },
  M: { H: "Microwave Hood", L: "Low Profile Hood", M: "Flush Mount", C: "Countertop", B: "Built-In", T: "Built-In with Trim" },
  C: { G: "Gas", E: "Electric", I: "Induction" },
  Z: { F: "Upright Freezer", C: "Chest Freezer" },
  T: { W: "Washer" },
}

const YEAR_CODES: Record<string, string> = {
  B: "2013", D: "2014", E: "2015", F: "2016", G: "2017",
  H: "2018", J: "2019", K: "2020", L: "2021", M: "2022",
  P: "2023", R: "2024",
}

const COLOR_CODES: Record<string, string> = {
  B: "Black",
  S: "Stainless Steel",
  SS: "Stainless Steel",
  W: "White",
  WH: "White",
  V: "Fingerprint Resistant Black Stainless",
  Z: "Fingerprint Resistant Stainless",
  PA: "Panel Ready",
  BL: "Black",
  BS: "Black Stainless",
}

/**
 * Decode a Whirlpool-family model number.
 *
 * Works for Whirlpool, KitchenAid, Maytag, Amana, Jenn-Air,
 * Estate, Roper, Crosley, and IKEA models that follow the
 * standard WPL nomenclature.
 *
 * @example
 * decodeWhirlpoolModel("WRF555SDFZ")
 * // { brand: "Whirlpool", productType: "Freestanding Refrigerator",
 * //   configuration: "French Door", yearCode: "2016", colorCode: "Fingerprint Resistant Stainless" }
 */
export function decodeWhirlpoolModel(modelNumber: string): WhirlpoolModelDecode | null {
  if (!modelNumber || modelNumber.length < 3) return null

  const upper = modelNumber.trim().toUpperCase()

  // Handle Gladiator (GA prefix)
  if (upper.startsWith("GA")) {
    return {
      brand: "Gladiator",
      productType: null,
      configuration: null,
      yearCode: null,
      colorCode: null,
      raw: upper,
    }
  }

  // Handle Y-prefix (variant/Canadian models)
  const effective = upper.startsWith("Y") ? upper.slice(1) : upper

  const brandChar = effective[0]
  const brand = BRAND_CODES[brandChar] ?? null

  if (!brand) return null

  const productChar = effective[1]
  const productType = PRODUCT_CODES[productChar] ?? null

  const configChar = effective[2]
  const configMap = CONFIG_BY_PRODUCT[productChar]
  const configuration = configMap?.[configChar] ?? null

  // Year code: scan for a known year code in positions 5-8
  let yearCode: string | null = null
  for (let i = 4; i < Math.min(effective.length, 9); i++) {
    const code = YEAR_CODES[effective[i]]
    if (code) {
      yearCode = code
      break
    }
  }

  // Color code: check last 1-2 characters
  let colorCode: string | null = null
  if (effective.length >= 2) {
    const last2 = effective.slice(-2)
    const last1 = effective.slice(-1)
    colorCode = COLOR_CODES[last2] ?? COLOR_CODES[last1] ?? null
  }

  return { brand, productType, configuration, yearCode, colorCode, raw: upper }
}

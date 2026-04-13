/**
 * Whirlpool Brand Prefix Detection
 *
 * Detects the specific brand (KitchenAid, Maytag, Jenn-Air, etc.)
 * from a WPL-family model number prefix.
 *
 * Derived from analysis of 44,783 models.
 */

// Jenn-Air J-prefixes (verified)
const JENNAIR_PREFIXES = new Set([
  "JMW", "JJW", "JGC", "JDB", "JED", "JES", "JMV", "JDS", "JMC",
  "JEC", "JGS", "JXW", "JFC", "JGD", "JIC", "JDR", "JFI", "JUB",
  "JUW", "JB3", "JER", "JUR", "JIM", "JGR", "JF4", "JXD", "JUD",
  "JIS", "JFX", "JXU", "JXI",
])

// Maytag J-prefixes (exceptions to J=Jenn-Air rule)
const MAYTAG_J_PREFIXES = new Set([
  "JBL", "JCD", "JS4", "JWD", "JBR", "JRT", "JRS", "JSD", "JXT",
  "JEW", "JCB", "JSM", "JTB", "JXA", "JEA",
])

// Maytag legacy prefixes (non-M)
const MAYTAG_LEGACY = new Set([
  "LDE", "LDG", "HJ6", "CRE", "HE3", "HE2", "PAR", "HR6", "GDE",
  "GDG", "CLY", "ARS", "RC2", "AWM", "CER", "CDU", "CCG", "LAT",
  "CDE", "CE3", "FCE", "CVE", "HRE", "HP4", "HP5", "PER", "ASI",
  "PAC", "CGR", "GT1", "DWU", "YE2", "CCE", "CEW", "CGW", "ASD",
  "AEM", "PYE", "AGM", "RTD", "AAV",
])

// Amana prefixes
const AMANA_PREFIXES = new Set([
  "AMV", "ADB", "ABB", "AGR", "ATB", "ACE", "CTB", "NTW", "AMC",
  "CTF", "AFI", "NGD", "AT1", "AFD", "ATF", "ACR", "NED", "ACC",
  "AWO", "AT2", "NFW", "AQU", "AQC",
])

// Roper prefixes
const ROPER_PREFIXES = new Set([
  "RT1", "RUD", "FEP", "RS2", "RT2", "RGX", "REX", "FGP", "RAS",
  "RGL", "REL", "RAX", "RAB", "FES", "FGS", "RGS", "RES", "RTW",
  "RED", "MHE", "RGD",
])

// Estate prefixes
const ESTATE_PREFIXES = new Set([
  "TUD", "TT1", "TS2", "TAW", "TMH", "TED", "TGD", "TGS", "TES",
  "TGP", "TCF", "TEP", "TT2", "TER", "TVF", "ETW", "EED", "EGD",
])

// Crosley prefixes
const CROSLEY_PREFIXES = new Set([
  "CAW", "CED", "CGD", "CS2", "CDB", "CUD", "CAH", "CA1", "CAR",
])

// IKEA prefixes
const IKEA_PREFIXES = new Set([
  "IUD", "IBS", "IMH", "ICS", "ICR", "IHW", "IES", "IGS", "ITW",
  "IME", "IKT", "IMT", "IPT", "IBM", "IPU", "ISC",
])

// Gladiator prefixes
const GLADIATOR_PREFIXES = new Set(["GAW", "GAG", "GAR", "GAF"])

// Whirlpool DU-prefix splits
const WHIRLPOOL_DU = new Set(["DU0", "DU1", "DU8", "DU9", "DUC", "DUF", "DUL"])
const MAYTAG_DU = new Set(["DU2", "DU3", "DU4", "DU5", "DU6", "DU7", "DUR"])

/**
 * Detect the specific brand from a WPL-family model number.
 *
 * @example
 * detectWhirlpoolBrand("KSM150PSER") // "KitchenAid"
 * detectWhirlpoolBrand("WTW5000DW1") // "Whirlpool"
 * detectWhirlpoolBrand("JFC2290REM") // "Jenn-Air"
 * detectWhirlpoolBrand("MED5500FW0") // "Maytag"
 */
export function detectWhirlpoolBrand(modelNumber: string): string | null {
  if (!modelNumber || modelNumber.length < 3) return null

  let upper = modelNumber.trim().toUpperCase()

  // Y-prefix = variant model — look at the letter AFTER Y
  if (upper.startsWith("Y") && upper.length > 1) {
    upper = upper.slice(1)
  }

  const first = upper[0]
  const prefix3 = upper.slice(0, 3)

  // Kenmore: digit-dot-digit pattern
  if (/^\d{3}\.\d{5,}/.test(modelNumber.trim())) {
    return "Kenmore"
  }

  // K = always KitchenAid
  if (first === "K") return "KitchenAid"

  // I = always IKEA
  if (first === "I" && IKEA_PREFIXES.has(prefix3)) return "IKEA"
  if (first === "I") return "IKEA"

  // Gladiator (GA prefix)
  if (GLADIATOR_PREFIXES.has(prefix3)) return "Gladiator"
  if (upper.startsWith("GA")) return "Gladiator"

  // J prefix: mostly Jenn-Air, some Maytag exceptions
  if (first === "J") {
    if (MAYTAG_J_PREFIXES.has(prefix3)) return "Maytag"
    return "Jenn-Air"
  }

  // T prefix: Estate
  if (first === "T" && ESTATE_PREFIXES.has(prefix3)) return "Estate"
  if (first === "T") return "Estate"

  // M prefix: Maytag
  if (first === "M") return "Maytag"

  // A prefix: check Amana vs other
  if (first === "A" && AMANA_PREFIXES.has(prefix3)) return "Amana"
  if (first === "A") return "Amana"

  // C prefix: Crosley
  if (first === "C" && CROSLEY_PREFIXES.has(prefix3)) return "Crosley"

  // DU prefix split
  if (upper.startsWith("DU")) {
    if (WHIRLPOOL_DU.has(prefix3)) return "Whirlpool"
    if (MAYTAG_DU.has(prefix3)) return "Maytag"
  }

  // R prefix: check Roper vs Whirlpool
  if (first === "R") {
    if (ROPER_PREFIXES.has(prefix3)) return "Roper"
    // RB, RH2-5 = Whirlpool
    if (upper.startsWith("RB") || upper.startsWith("RH")) return "Whirlpool"
    return "Roper"
  }

  // Maytag legacy prefixes
  if (MAYTAG_LEGACY.has(prefix3)) return "Maytag"

  // Estate non-T prefixes
  if (ESTATE_PREFIXES.has(prefix3)) return "Estate"

  // W prefix: Whirlpool
  if (first === "W") return "Whirlpool"

  // G-prefix Whirlpool (GU, GS, GB, etc.)
  if (first === "G") return "Whirlpool"

  // S-prefix Whirlpool (SF, SC)
  if (first === "S") return "Whirlpool"

  // E-prefix: check Estate vs Whirlpool
  if (first === "E") {
    if (ESTATE_PREFIXES.has(prefix3)) return "Estate"
    return "Whirlpool"
  }

  return null
}

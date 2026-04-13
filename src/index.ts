// Model Number Detection
export { isModelNumber, parseModelPartCombo, normalizeModelNumber, isModelOnlyQuery } from "./model-number/detector.js"
export type { ModelPartCombo } from "./model-number/detector.js"
export { MODEL_PATTERNS } from "./model-number/patterns.js"
export { decodeWhirlpoolModel } from "./model-number/nomenclature.js"
export type { WhirlpoolModelDecode } from "./model-number/nomenclature.js"
export { detectWhirlpoolBrand } from "./model-number/brand-prefixes.js"

// Appliance Type Detection
export { detectApplianceType } from "./appliance-type/detector.js"
export type { ApplianceType } from "./appliance-type/detector.js"

// Part Type Classification
export { getPartType } from "./part-type/classifier.js"
export type { PartTypeResult } from "./part-type/classifier.js"

// Repair Skill Level
export { getSkillLevel, isNonPartDescription } from "./skill-level/classifier.js"
export type { SkillLevel, SkillRating } from "./skill-level/classifier.js"

// Part Number / SKU Detection
export { isSkuLikeQuery, SKU_PATTERNS, SKU_EXAMPLES } from "./part-number/detector.js"
export { isPartNumberToken, extractPartNumber, parseSkuTitleQuery } from "./part-number/parser.js"
export type { SkuTitleParseResult } from "./part-number/parser.js"

// Brand Constants
export { OEM_BRAND_MAP, OEM_BRAND_FAMILIES } from "./brand/constants.js"

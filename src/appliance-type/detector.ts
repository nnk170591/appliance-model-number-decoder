/**
 * Appliance Type Detection
 *
 * Detect appliance type from model description strings.
 * 27 supported types with 33 regex patterns.
 * Order matters: more specific patterns first to avoid false matches.
 */

/** Appliance types that have symptom definitions */
export type ApplianceType =
  | "Refrigerator"
  | "Washer"
  | "Dryer"
  | "Dishwasher"
  | "Range"
  | "Oven"
  | "Cooktop"
  | "Microwave"
  | "Freezer"
  | "AC"
  | "Washer Dryer Combo"
  | "Dehumidifier"
  | "Trash Compactor"
  | "Disposer"
  | "Warming Drawer"
  | "Grill"
  | "Vacuum"
  | "Water Heater"
  | "Ice Maker"
  | "Furnace"
  | "Ventilation"
  | "Mixer"
  | "Blender"
  | "Food Processor"
  | "Coffee Maker"
  | "Juicer"
  | "Kettle"
  | "Wine and Beverage Cooler"
  | "Water Filter System"

// ── Appliance type detection ─────────────────────────────────────
// Order matters: more specific patterns first to avoid false matches.

const APPLIANCE_PATTERNS: [RegExp, ApplianceType][] = [
  // ── Small appliances — must be first (their descriptions often contain
  //    generic words like "oven", "range" that would false-match below) ──
  [/\bmixer\b|stand mixer|hand mixer/i, "Mixer"],
  [/\bblender\b/i, "Blender"],
  [/food processor/i, "Food Processor"],
  [/coffee maker|coffeemaker|coffee machine|espresso|coffee brewer|siphon coffee|cold brew coffee|coffee grinder/i, "Coffee Maker"],
  [/\bjuicer\b/i, "Juicer"],
  [/\bkettle\b|electric kettle/i, "Kettle"],
  [/wine\s*(?:cooler|cellar|refrigerator|center)|beverage\s*(?:cooler|center)/i, "Wine and Beverage Cooler"],
  [/water\s*filter\s*(?:system|unit)/i, "Water Filter System"],
  // ── Major appliances ──
  [/washer.{0,3}dryer\s*combo|laundry center|laundry tower|stacked\s*washer\s*dryer|stacked.*(?:dryer|gas).*\/.*washer|dryer\/washer/i, "Washer Dryer Combo"],
  [/refrigerator|fridge|\bref[-_ ]|\bref$/i, "Refrigerator"],
  [/dishwasher|dish\s*wm/i, "Dishwasher"],
  [/washer|\bwm[-_ ]|\bwm$/i, "Washer"], // must be after dishwasher & combo
  [/dryer/i, "Dryer"],
  [/freezer/i, "Freezer"],
  [/microwave|advantium|\bmwo[-_ ]|\bmwo$|\botr\b|convection,.*otr/i, "Microwave"], // before oven
  [/(?:electric|gas)\s*range.*cooktop/i, "Range"], // "Electric Range Ceran Cooktop" is a range, not cooktop
  [/cooktop|gas hob/i, "Cooktop"],
  [/wall oven/i, "Oven"], // before range (wall ovens are not ranges)
  [/range\s*hood/i, "Ventilation"], // before range — "range hood" is ventilation, not range
  [/range|stove/i, "Range"],
  [/oven/i, "Oven"],
  [/air.?conditioner|zoneline|ptac|room.?air|window\s*ac|window\s*air|\brac[-,\s]|\brac$/i, "AC"],
  [/dehumidifier/i, "Dehumidifier"],
  [/compactor/i, "Trash Compactor"],
  [/disposer/i, "Disposer"],
  [/warm(?:er|ing)\s*drawer/i, "Warming Drawer"],
  [/gas grill/i, "Grill"],
  [/vacuum|bagless canister|\brobotic\s*vc\b/i, "Vacuum"],
  [/water heater/i, "Water Heater"],
  [/ice\s*maker/i, "Ice Maker"],
  [/furnace/i, "Furnace"],
  [/hood|ventilation|vent\s*fan|exhaust\s*fan|down\s*draft/i, "Ventilation"],
  // Fallback compound patterns — must stay after primary patterns
  [/(?=.*(?:freestanding|slide.?in))(?=.*(?:gas|electric|dual fuel|induction))/i, "Range"],
  [/(?=.*(?:top.?load|front.?load))(?!.*dryer)/i, "Washer"],
  [/side.by.side|bottom.mount|top.mount|french.door/i, "Refrigerator"],
]

/**
 * Detect normalized appliance type from a model description string.
 * Returns null for unsupported types (HVAC, soundbar, etc.)
 */
export function detectApplianceType(
  modelDescription: string | null | undefined
): ApplianceType | null {
  if (!modelDescription) return null
  for (const [pattern, type] of APPLIANCE_PATTERNS) {
    if (pattern.test(modelDescription)) return type
  }
  return null
}

# appliance-model-number-decoder

Decode appliance model numbers (Whirlpool, GE, LG, Samsung) into brand, type, and configuration — used in production appliance parts search systems.

Built from production data at [OEM Part Hub](https://oemparthub.com) — an appliance parts search engine serving 185,000+ models.

## Try It

```bash
npx appliance-model-number-decoder WRF555SDFZ
```

```json
{
  "input": "WRF555SDFZ",
  "isModelNumber": true,
  "brand": "Whirlpool",
  "productType": "Freestanding Refrigerator",
  "configuration": "French Door",
  "yearCode": "2016",
  "colorCode": "Fingerprint Resistant Stainless"
}
```

See this decoder in action on [OEM Part Hub's model search](https://oemparthub.com/search).

## Install

```bash
npm install appliance-model-number-decoder
```

## Features

- **Model Number Validation** — 170+ regex patterns covering Whirlpool, GE, LG, Samsung, Bosch, Frigidaire, KitchenAid, Maytag, and more
- **Whirlpool Model Decoder** — Extract brand, product type, configuration, year, and color from any WPL-family model number
- **Brand Detection** — Identify which brand (KitchenAid, Maytag, Jenn-Air, etc.) a WPL-family model belongs to
- **Appliance Type Detection** — Identify appliance type from model descriptions (27 types, 33 patterns)
- **Part Type Classification** — Classify part descriptions into 72 industry-standard categories (1200+ rules)
- **Repair Difficulty Rating** — 4-tier skill level system validated against 600 real parts
- **SKU / Part Number Detection** — Distinguish part numbers from search queries

## Quick Start

```typescript
import {
  isModelNumber,
  decodeWhirlpoolModel,
  detectWhirlpoolBrand,
  detectApplianceType,
  getPartType,
  getSkillLevel,
  isSkuLikeQuery,
} from "appliance-model-number-decoder"

// Validate a model number
isModelNumber("WRF555SDFZ")  // true
isModelNumber("pump")        // false

// Decode a Whirlpool-family model
decodeWhirlpoolModel("WRF555SDFZ")
// { brand: "Whirlpool", productType: "Freestanding Refrigerator",
//   configuration: "French Door", yearCode: "2016",
//   colorCode: "Fingerprint Resistant Stainless" }

// Detect brand from model prefix
detectWhirlpoolBrand("KSM150PSER")  // "KitchenAid"
detectWhirlpoolBrand("MED5500FW0")  // "Maytag"
detectWhirlpoolBrand("JFC2290REM")  // "Jenn-Air"

// Detect appliance type from description
detectApplianceType("Front Load Washer")       // "Washer"
detectApplianceType("French Door Refrigerator") // "Refrigerator"
detectApplianceType("Stand Mixer")              // "Mixer"

// Classify a part description
getPartType("Water Filter")      // { slug: "filter", name: "Filter" }
getPartType("Drive Belt")        // { slug: "belt", name: "Belt" }
getPartType("Compressor")        // { slug: "compressor-sealed-system", name: "Compressor & Sealed System" }

// Rate repair difficulty (1-4)
getSkillLevel("Water Filter")    // { level: 1, label: "Easy", summary: "No tools needed..." }
getSkillLevel("Drive Belt")      // { level: 2, label: "Moderate", summary: "Basic tools..." }
getSkillLevel("Compressor")      // { level: 4, label: "Professional", summary: "Sealed system..." }

// Detect part numbers vs search queries
isSkuLikeQuery("W10447783")        // true (part number)
isSkuLikeQuery("whirlpool pump")   // false (search query)
```

## Use Cases

- **Appliance repair shop tools** — Decode model numbers to identify brand and appliance type
- **Parts lookup & eCommerce** — Classify parts into browsable categories automatically
- **Insurance/warranty claims** — Validate model numbers and assess repair complexity
- **Home inspection software** — Identify appliance types from model plates
- **Inventory management** — Auto-categorize parts by type and difficulty

## API Reference

### Model Number Detection

| Function | Description |
|----------|-------------|
| `isModelNumber(token)` | Check if a string looks like an appliance model number |
| `normalizeModelNumber(raw)` | Strip manufacturer prefix (e.g., "WPL-") |
| `parseModelPartCombo(query)` | Parse "WED5220RW0 pump" into model + part description |
| `isModelOnlyQuery(query)` | Check if query contains only a model number |

### Whirlpool Decoder

| Function | Description |
|----------|-------------|
| `decodeWhirlpoolModel(model)` | Decode brand, type, config, year, color from WPL model |
| `detectWhirlpoolBrand(model)` | Detect brand (KitchenAid, Maytag, etc.) from model prefix |

### Classification

| Function | Description |
|----------|-------------|
| `detectApplianceType(description)` | Identify appliance type (27 types) from description |
| `getPartType(description)` | Classify part into 72 categories from description |
| `getSkillLevel(description)` | Rate repair difficulty (1-4 scale) |
| `isNonPartDescription(description)` | Check if description is a manual/literature, not a part |

### SKU / Part Number

| Function | Description |
|----------|-------------|
| `isSkuLikeQuery(query)` | Check if query looks like a SKU/part number |
| `isPartNumberToken(token)` | Validate part number format |
| `extractPartNumber(token)` | Strip WPL prefix from part number |
| `parseSkuTitleQuery(query)` | Parse "MCK68785601 LG Dishwasher Cover" into part + title |

## Reference Docs

- [Complete Whirlpool Model Number Breakdown](./docs/model-nomenclature.md) — How Whirlpool encodes brand, type, year, and color into model numbers
- [Whirlpool Brand Prefix Guide](./docs/brand-prefix-guide.md) — Map any WPL-family model prefix to its brand (KitchenAid, Maytag, Jenn-Air & more)

## Who Uses This

This library powers the parts lookup and search systems at [oemparthub.com](https://oemparthub.com). If you need to look up actual parts for an appliance model, try the [model search](https://oemparthub.com/search) on OEM Part Hub.

## License

MIT

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

---

> **Looking for appliance parts?** [oemparthub.com](https://oemparthub.com) compares prices from 6+ sellers across 185,000+ models. Find the cheapest replacement part for your appliance.

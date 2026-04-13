#!/usr/bin/env node

/**
 * CLI for appliance-model-number-decoder
 *
 * Usage: npx appliance-model-number-decoder WRF555SDFZ
 */

import { isModelNumber } from "./model-number/detector.js"
import { decodeWhirlpoolModel } from "./model-number/nomenclature.js"
import { detectWhirlpoolBrand } from "./model-number/brand-prefixes.js"

const args = process.argv.slice(2)

if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
  console.log(`
appliance-model-number-decoder

Usage:
  npx appliance-model-number-decoder <model-number>
  npx appliance-model-number-decoder WRF555SDFZ
  npx appliance-model-number-decoder KSM150PSER
  npx appliance-model-number-decoder --help

Options:
  --help, -h    Show this help message

Learn more: https://oemparthub.com
`)
  process.exit(0)
}

const model = args[0]

const result: Record<string, unknown> = {
  input: model,
  isModelNumber: isModelNumber(model),
}

const decoded = decodeWhirlpoolModel(model)
if (decoded) {
  result.brand = decoded.brand
  result.productType = decoded.productType
  result.configuration = decoded.configuration
  result.yearCode = decoded.yearCode
  result.colorCode = decoded.colorCode
}

const brandFromPrefix = detectWhirlpoolBrand(model)
if (brandFromPrefix && !result.brand) {
  result.brand = brandFromPrefix
}

console.log(JSON.stringify(result, null, 2))

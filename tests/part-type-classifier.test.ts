import { describe, it, expect } from "vitest"
import { getPartType } from "../src/part-type/classifier.js"

describe("getPartType", () => {
  const cases: [string, string][] = [
    ["Water Filter", "filter"],
    ["Drive Belt", "belt"],
    ["Door Gasket", "gasket-door-seal"],
    ["Compressor", "compressor-sealed-system"],
    ["Drain Pump", "pump"],
    ["Ice Maker", "ice-maker"],
    ["Water Valve", "valve-float"],
    ["Control Board", "control-board-electronic-control"],
    ["Heating Element", "heating-element"],
    ["Blower Wheel", "blower-wheel-fan-blade"],
    ["Door Handle", "handle"],
    ["Shelf Support", "shelf-shelf-support"],
    ["Wire Harness", "power-cord-wire-harness-connector"],
    ["Igniter", "igniter-spark-module"],
    ["Thermostat", "temperature-control-thermostat"],
    ["Agitator", "agitator-auger"],
    // GE reversed word order
    ["VALVE WATER", "valve-float"],
    // Sealed system hardware → bracket, not compressor
    ["Bracket Compressor", "bracket-flange"],
    // Drum roller → axle/roller, not drum
    ["Drum Roller", "axle-roller-shaft-wheel"],
  ]

  for (const [input, expectedSlug] of cases) {
    it(`should classify "${input}" as ${expectedSlug}`, () => {
      const result = getPartType(input)
      expect(result).not.toBeNull()
      expect(result!.slug).toBe(expectedSlug)
    })
  }

  it("should return null for null/undefined", () => {
    expect(getPartType(null)).toBeNull()
    expect(getPartType(undefined)).toBeNull()
  })
})

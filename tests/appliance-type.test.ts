import { describe, it, expect } from "vitest"
import { detectApplianceType } from "../src/appliance-type/detector.js"

describe("detectApplianceType", () => {
  const cases: [string, string][] = [
    ["Front Load Washer", "Washer"],
    ["Top Load Dryer", "Dryer"],
    ["French Door Refrigerator", "Refrigerator"],
    ["Built-In Dishwasher", "Dishwasher"],
    ["Gas Range", "Range"],
    ["Wall Oven", "Oven"],
    ["Microwave Hood Combination", "Microwave"],
    ["Chest Freezer", "Freezer"],
    ["Room Air Conditioner", "AC"],
    ["Stand Mixer", "Mixer"],
    ["Washer Dryer Combo", "Washer Dryer Combo"],
    ["Gas Cooktop", "Cooktop"],
    ["Range Hood", "Ventilation"],
    ["Coffee Maker", "Coffee Maker"],
    ["Blender", "Blender"],
    ["Food Processor", "Food Processor"],
    ["Electric Kettle", "Kettle"],
    ["Wine Cooler", "Wine and Beverage Cooler"],
    ["Ice Maker", "Ice Maker"],
    ["Dehumidifier", "Dehumidifier"],
    ["Trash Compactor", "Trash Compactor"],
  ]

  for (const [input, expected] of cases) {
    it(`should detect "${input}" as ${expected}`, () => {
      expect(detectApplianceType(input)).toBe(expected)
    })
  }

  it("should return null for unknown types", () => {
    expect(detectApplianceType("Soundbar")).toBeNull()
    expect(detectApplianceType("Television")).toBeNull()
  })

  it("should return null for null/undefined input", () => {
    expect(detectApplianceType(null)).toBeNull()
    expect(detectApplianceType(undefined)).toBeNull()
    expect(detectApplianceType("")).toBeNull()
  })
})

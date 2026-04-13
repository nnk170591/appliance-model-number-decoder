import { describe, it, expect } from "vitest"
import { isModelNumber, normalizeModelNumber, parseModelPartCombo, isModelOnlyQuery } from "../src/model-number/detector.js"

describe("isModelNumber", () => {
  const validModels = [
    "WED5220RW0",
    "WFW5620HW",
    "YWED5220RW0",
    "B18ID80NLP",
    "WRF555SDFZ",
    "KSM150PSER",
    "MED5500FW0",
    "WTW5000DW1",
    "LSU180HEV",
    "WRS325SDHZ",
    "5KSM195PSAER6",
    "253.443924",
    "10650042717",
  ]

  for (const model of validModels) {
    it(`should detect "${model}" as a model number`, () => {
      expect(isModelNumber(model)).toBe(true)
    })
  }

  const invalidModels = [
    "",
    "abc",
    "pump",
    "W1",
    "12345",
  ]

  for (const invalid of invalidModels) {
    it(`should reject "${invalid}" as a model number`, () => {
      expect(isModelNumber(invalid)).toBe(false)
    })
  }
})

describe("normalizeModelNumber", () => {
  it("should strip WPL prefix with hyphen", () => {
    expect(normalizeModelNumber("WPL-WED5220RW0")).toBe("WED5220RW0")
  })

  it("should strip WPL prefix with space", () => {
    expect(normalizeModelNumber("WPL WED5220RW0")).toBe("WED5220RW0")
  })

  it("should uppercase the result", () => {
    expect(normalizeModelNumber("wed5220rw0")).toBe("WED5220RW0")
  })
})

describe("parseModelPartCombo", () => {
  it('should parse "WED5220RW0 pump"', () => {
    const result = parseModelPartCombo("WED5220RW0 pump")
    expect(result).not.toBeNull()
    expect(result!.modelNumber).toBe("WED5220RW0")
    expect(result!.partQuery).toBe("pump")
  })

  it('should parse "pump WED5220RW0" (reversed)', () => {
    const result = parseModelPartCombo("pump WED5220RW0")
    expect(result).not.toBeNull()
    expect(result!.modelNumber).toBe("WED5220RW0")
    expect(result!.partQuery).toBe("pump")
  })

  it("should strip noise words", () => {
    const result = parseModelPartCombo("WED5220RW0 parts replacement")
    expect(result).not.toBeNull()
    expect(result!.partQuery).toBe("")
  })

  it("should strip brand names from part query", () => {
    const result = parseModelPartCombo("whirlpool WED5220RW0 pump")
    expect(result).not.toBeNull()
    expect(result!.partQuery).toBe("pump")
  })

  it("should return null for no model", () => {
    expect(parseModelPartCombo("whirlpool pump")).toBeNull()
  })
})

describe("isModelOnlyQuery", () => {
  it("should return true for model-only query", () => {
    expect(isModelOnlyQuery("WED5220RW0")).toBe(true)
  })

  it("should return false for model + part", () => {
    expect(isModelOnlyQuery("WED5220RW0 pump")).toBe(false)
  })
})

import { describe, it, expect } from "vitest"
import { isSkuLikeQuery, SKU_EXAMPLES } from "../src/part-number/detector.js"
import { isPartNumberToken, extractPartNumber, parseSkuTitleQuery } from "../src/part-number/parser.js"

describe("isSkuLikeQuery", () => {
  for (const sku of SKU_EXAMPLES.valid) {
    it(`should detect "${sku}" as SKU`, () => {
      expect(isSkuLikeQuery(sku)).toBe(true)
    })
  }

  for (const query of SKU_EXAMPLES.invalid) {
    it(`should reject "${query}" as SKU`, () => {
      expect(isSkuLikeQuery(query)).toBe(false)
    })
  }
})

describe("isPartNumberToken", () => {
  it("should accept standard part numbers", () => {
    expect(isPartNumberToken("MCK69725201")).toBe(true)
    expect(isPartNumberToken("W10447783")).toBe(true)
    expect(isPartNumberToken("DC92-02003A")).toBe(true)
  })

  it("should reject short tokens", () => {
    expect(isPartNumberToken("ABC")).toBe(false)
    expect(isPartNumberToken("12")).toBe(false)
  })
})

describe("extractPartNumber", () => {
  it("should strip WPL prefix", () => {
    expect(extractPartNumber("WPL  MCK68785601")).toBe("MCK68785601")
    expect(extractPartNumber("WPL MCK68785601")).toBe("MCK68785601")
  })

  it("should return token as-is when no prefix", () => {
    expect(extractPartNumber("MCK68785601")).toBe("MCK68785601")
  })
})

describe("parseSkuTitleQuery", () => {
  it('should parse "MCK68785601 LG Dishwasher Blower Cover"', () => {
    const result = parseSkuTitleQuery("MCK68785601 LG Dishwasher Blower Cover")
    expect(result).not.toBeNull()
    expect(result!.partNumber).toBe("MCK68785601")
    expect(result!.titleWords).toEqual(["LG", "Dishwasher", "Blower", "Cover"])
  })

  it("should return null for single token", () => {
    expect(parseSkuTitleQuery("MCK68785601")).toBeNull()
  })
})

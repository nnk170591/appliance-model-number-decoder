import { describe, it, expect } from "vitest"
import { decodeWhirlpoolModel } from "../src/model-number/nomenclature.js"
import { detectWhirlpoolBrand } from "../src/model-number/brand-prefixes.js"

describe("decodeWhirlpoolModel", () => {
  it("should decode WRF555SDFZ (Whirlpool French Door Refrigerator)", () => {
    const result = decodeWhirlpoolModel("WRF555SDFZ")
    expect(result).not.toBeNull()
    expect(result!.brand).toBe("Whirlpool")
    expect(result!.productType).toBe("Freestanding Refrigerator")
    expect(result!.configuration).toBe("French Door")
    expect(result!.colorCode).toBe("Fingerprint Resistant Stainless")
  })

  it("should decode WTW5000DW1 (Whirlpool Top Load Washer)", () => {
    const result = decodeWhirlpoolModel("WTW5000DW1")
    expect(result).not.toBeNull()
    expect(result!.brand).toBe("Whirlpool")
    expect(result!.productType).toBe("Top-Load Washer")
    expect(result!.configuration).toBe("Washer")
  })

  it("should decode KDT780SSSS (KitchenAid Dishwasher)", () => {
    const result = decodeWhirlpoolModel("KDT780SSSS")
    expect(result).not.toBeNull()
    expect(result!.brand).toBe("KitchenAid")
    expect(result!.productType).toBe("Dishwasher")
  })

  it("should decode MED5500FW0 (Maytag Dryer)", () => {
    const result = decodeWhirlpoolModel("MED5500FW0")
    expect(result).not.toBeNull()
    expect(result!.brand).toBe("Maytag")
    expect(result!.productType).toBe("Dryer")
  })

  it("should handle Y-prefix (Canadian variant)", () => {
    const result = decodeWhirlpoolModel("YWED5220RW0")
    expect(result).not.toBeNull()
    expect(result!.brand).toBe("Whirlpool")
    expect(result!.productType).toBe("Dryer")
  })

  it("should handle Gladiator (GA prefix)", () => {
    const result = decodeWhirlpoolModel("GAW09HYNRK")
    expect(result).not.toBeNull()
    expect(result!.brand).toBe("Gladiator")
  })

  it("should return null for non-WPL models", () => {
    expect(decodeWhirlpoolModel("LSU180HEV")).toBeNull()
    expect(decodeWhirlpoolModel("")).toBeNull()
    expect(decodeWhirlpoolModel("AB")).toBeNull()
  })
})

describe("detectWhirlpoolBrand", () => {
  it("should detect KitchenAid (K prefix)", () => {
    expect(detectWhirlpoolBrand("KSM150PSER")).toBe("KitchenAid")
    expect(detectWhirlpoolBrand("KDT780SSSS")).toBe("KitchenAid")
  })

  it("should detect Jenn-Air (J prefix)", () => {
    expect(detectWhirlpoolBrand("JFC2290REM")).toBe("Jenn-Air")
    expect(detectWhirlpoolBrand("JMW2430DS")).toBe("Jenn-Air")
  })

  it("should detect Maytag J-prefix exceptions", () => {
    expect(detectWhirlpoolBrand("JBL2088HES")).toBe("Maytag")
  })

  it("should detect Maytag (M prefix)", () => {
    expect(detectWhirlpoolBrand("MED5500FW0")).toBe("Maytag")
    expect(detectWhirlpoolBrand("MGD6000XW1")).toBe("Maytag")
  })

  it("should detect Whirlpool (W prefix)", () => {
    expect(detectWhirlpoolBrand("WTW5000DW1")).toBe("Whirlpool")
    expect(detectWhirlpoolBrand("WRF555SDFZ")).toBe("Whirlpool")
  })

  it("should detect Estate (T prefix)", () => {
    expect(detectWhirlpoolBrand("TUD4000SQ")).toBe("Estate")
  })

  it("should detect IKEA (I prefix)", () => {
    expect(detectWhirlpoolBrand("IUD8010DS")).toBe("IKEA")
  })

  it("should detect Kenmore (digit.digit pattern)", () => {
    expect(detectWhirlpoolBrand("110.25902400")).toBe("Kenmore")
  })

  it("should handle Y-prefix variants", () => {
    expect(detectWhirlpoolBrand("YWED5220RW0")).toBe("Whirlpool")
    expect(detectWhirlpoolBrand("YMED5500FW0")).toBe("Maytag")
  })

  it("should return null for non-WPL models", () => {
    expect(detectWhirlpoolBrand("")).toBeNull()
    expect(detectWhirlpoolBrand("AB")).toBeNull()
  })
})

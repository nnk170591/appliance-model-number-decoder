import { describe, it, expect } from "vitest"
import { getSkillLevel, isNonPartDescription } from "../src/skill-level/classifier.js"

describe("getSkillLevel", () => {
  it("should rate water filter as Easy (1)", () => {
    const result = getSkillLevel("Water Filter")
    expect(result).not.toBeNull()
    expect(result!.level).toBe(1)
  })

  it("should rate shelf as Easy (1)", () => {
    const result = getSkillLevel("Refrigerator Shelf")
    expect(result).not.toBeNull()
    expect(result!.level).toBe(1)
  })

  it("should rate drive belt as Moderate (2)", () => {
    const result = getSkillLevel("Drive Belt")
    expect(result).not.toBeNull()
    expect(result!.level).toBe(2)
  })

  it("should rate pump as Moderate (2)", () => {
    const result = getSkillLevel("Drain Pump")
    expect(result).not.toBeNull()
    expect(result!.level).toBe(2)
  })

  it("should rate drum as Advanced (3)", () => {
    const result = getSkillLevel("Drum Assembly")
    expect(result).not.toBeNull()
    expect(result!.level).toBe(3)
  })

  it("should rate main control board as Advanced (3)", () => {
    const result = getSkillLevel("Main Control Board")
    expect(result).not.toBeNull()
    expect(result!.level).toBe(3)
  })

  it("should rate compressor as Professional (4)", () => {
    const result = getSkillLevel("Compressor")
    expect(result).not.toBeNull()
    expect(result!.level).toBe(4)
  })

  it("should rate evaporator as Professional (4)", () => {
    const result = getSkillLevel("Evaporator")
    expect(result).not.toBeNull()
    expect(result!.level).toBe(4)
  })

  it("should return null for manuals/literature", () => {
    expect(getSkillLevel("Installation Manual")).toBeNull()
    expect(getSkillLevel("Owner's Guide")).toBeNull()
  })

  it("should default to Moderate (2) for unknown descriptions", () => {
    const result = getSkillLevel("Some Unknown Part XYZ")
    expect(result).not.toBeNull()
    expect(result!.level).toBe(2)
  })

  // Override tests: sealed-system accessories should NOT be professional
  it("should rate compressor bracket as Easy (1), not Professional", () => {
    const result = getSkillLevel("Bracket Compressor")
    expect(result).not.toBeNull()
    expect(result!.level).toBe(1)
  })

  it("should rate condenser fan as Moderate (2), not Professional", () => {
    const result = getSkillLevel("Condenser Fan Motor")
    expect(result).not.toBeNull()
    expect(result!.level).toBe(2)
  })
})

describe("isNonPartDescription", () => {
  it("should detect manuals", () => {
    expect(isNonPartDescription("Installation Manual")).toBe(true)
    expect(isNonPartDescription("Use & Care Guide")).toBe(true)
  })

  it("should not flag real parts", () => {
    expect(isNonPartDescription("Water Filter")).toBe(false)
    expect(isNonPartDescription("Compressor")).toBe(false)
  })
})

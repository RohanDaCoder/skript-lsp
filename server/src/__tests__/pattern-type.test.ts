import { describe, it, expect } from "vitest";
import { PatternType, SubstitutablePatterns, canHaveSubPattern, canBeSubPattern } from "../Pattern/pattern-type";

describe("PatternType", () => {
    it("should have correct enum values", () => {
        expect(PatternType.effect).toBe(0);
        expect(PatternType.expression).toBe(1);
        expect(PatternType.condition).toBe(2);
        expect(PatternType.event).toBe(3);
        expect(PatternType.type).toBe(4);
        expect(PatternType.count).toBe(5);
    });
});

describe("SubstitutablePatterns", () => {
    it("should include expression and type", () => {
        expect(SubstitutablePatterns).toContain(PatternType.expression);
        expect(SubstitutablePatterns).toContain(PatternType.type);
        expect(SubstitutablePatterns).toHaveLength(2);
    });
});

describe("canHaveSubPattern", () => {
    it("should return true for effect", () => {
        expect(canHaveSubPattern(PatternType.effect)).toBe(true);
    });

    it("should return true for expression", () => {
        expect(canHaveSubPattern(PatternType.expression)).toBe(true);
    });

    it("should return true for condition", () => {
        expect(canHaveSubPattern(PatternType.condition)).toBe(true);
    });

    it("should return true for event", () => {
        expect(canHaveSubPattern(PatternType.event)).toBe(true);
    });

    it("should return false for type", () => {
        expect(canHaveSubPattern(PatternType.type)).toBe(false);
    });
});

describe("canBeSubPattern", () => {
    it("should return true for expression", () => {
        expect(canBeSubPattern(PatternType.expression)).toBe(true);
    });

    it("should return true for type", () => {
        expect(canBeSubPattern(PatternType.type)).toBe(true);
    });

    it("should return false for effect", () => {
        expect(canBeSubPattern(PatternType.effect)).toBe(false);
    });

    it("should return false for condition", () => {
        expect(canBeSubPattern(PatternType.condition)).toBe(false);
    });

    it("should return false for event", () => {
        expect(canBeSubPattern(PatternType.event)).toBe(false);
    });
});

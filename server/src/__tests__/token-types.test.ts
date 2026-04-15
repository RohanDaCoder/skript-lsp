import { describe, it, expect } from "vitest";
import { TokenTypes } from "../token-types";

describe("TokenTypes", () => {
    it("should have standard token types", () => {
        expect(TokenTypes.namespace).toBe(0);
        expect(TokenTypes.class).toBe(1);
        expect(TokenTypes.comment).toBe(2);
    });

    it("should have skript custom types", () => {
        expect(TokenTypes.pattern).toBeGreaterThanOrEqual(20);
        expect(TokenTypes.permission).toBeGreaterThanOrEqual(20);
        expect(TokenTypes.effect).toBeGreaterThanOrEqual(20);
        expect(TokenTypes.expression).toBeGreaterThanOrEqual(20);
        expect(TokenTypes.condition).toBeGreaterThanOrEqual(20);
    });

    it("should have length as last element", () => {
        expect(TokenTypes.length).toBe(TokenTypes.condition + 1);
    });
});

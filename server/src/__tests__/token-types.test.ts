import { expect, test, describe } from "bun:test";
import { TokenTypes } from "../token-types";

describe("TokenTypes", () => {
    test("should have standard token types", () => {
        expect(TokenTypes.namespace).toBe(0);
        expect(TokenTypes.class).toBe(1);
        expect(TokenTypes.comment).toBe(2);
    });

    test("should have skript custom types", () => {
        expect(TokenTypes.pattern).toBeGreaterThanOrEqual(20);
        expect(TokenTypes.permission).toBeGreaterThanOrEqual(20);
        expect(TokenTypes.effect).toBeGreaterThanOrEqual(20);
        expect(TokenTypes.expression).toBeGreaterThanOrEqual(20);
        expect(TokenTypes.condition).toBeGreaterThanOrEqual(20);
    });

    test("should have length as last element", () => {
        expect(TokenTypes.length).toBe(TokenTypes.condition + 1);
    });
});

import { expect, test, describe } from "bun:test";
import { SkriptVariable } from "../skript/storage/skript-variable";

describe("SkriptVariable", () => {
    describe("convertNameStringToPattern", () => {
        test("should convert simple name to pattern", () => {
            expect(SkriptVariable.convertNameStringToPattern("test")).toBe("test");
        });

        test("should convert name with percent signs to pattern", () => {
            expect(SkriptVariable.convertNameStringToPattern("test%string%var")).toBe("test*var");
        });

        test("should handle multiple percent pairs", () => {
            expect(SkriptVariable.convertNameStringToPattern("%player%")).toBe("*");
            expect(SkriptVariable.convertNameStringToPattern("%player%-%integer%")).toBe("*-*");
        });

        test("should handle nested percent pairs", () => {
            expect(SkriptVariable.convertNameStringToPattern("a%b%c")).toBe("a*c");
        });

        test("should handle no percent signs", () => {
            expect(SkriptVariable.convertNameStringToPattern("simple")).toBe("simple");
        });
    });

    describe("overlap", () => {
        test("should detect exact match", () => {
            const variable = new SkriptVariable({ uri: "", range: {} } as any, "test");
            expect(variable.overlap("test")).toBe(true);
        });

        test("should not match different names", () => {
            const variable = new SkriptVariable({ uri: "", range: {} } as any, "test");
            expect(variable.overlap("other")).toBe(false);
        });

        test("should require same number of parts", () => {
            const variable = new SkriptVariable({ uri: "", range: {} } as any, "a::b");
            expect(variable.overlap("a")).toBe(false);
            expect(variable.overlap("a::b::c")).toBe(false);
        });

        test("should handle array-style variables with wildcard on last part", () => {
            const variable = new SkriptVariable({ uri: "", range: {} } as any, "array::1");
            expect(variable.overlap("array::*")).toBe(true);
            expect(variable.overlap("array::2")).toBe(false); // exact match only for non-last part
        });

        test("should allow wildcard only on last part with multiple parts", () => {
            const variable = new SkriptVariable({ uri: "", range: {} } as any, "a::b::*");
            expect(variable.overlap("a::b::c")).toBe(true);
            expect(variable.overlap("a::b::d")).toBe(true);
            expect(variable.overlap("a::c::*")).toBe(false); // middle part must match
        });
    });

    describe("constructor", () => {
        test("should set isParameter when provided", () => {
            const variable = new SkriptVariable({ uri: "", range: {} } as any, "test", true);
            expect(variable.isParameter).toBe(true);
        });

        test("should not set isParameter when not provided", () => {
            const variable = new SkriptVariable({ uri: "", range: {} } as any, "test");
            expect(variable.isParameter).toBeUndefined();
        });
    });
});

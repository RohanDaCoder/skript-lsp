import { expect, test, describe } from "bun:test";
import { IndentData } from "../skript/validation/indent-data";

describe("IndentData", () => {
    describe("getIndentationEndIndex", () => {
        test("should return 0 for empty string", () => {
            expect(IndentData.getIndentationEndIndex("")).toBe(0);
        });

        test("should return position of first non-whitespace", () => {
            expect(IndentData.getIndentationEndIndex("\t\thello")).toBe(2);
            expect(IndentData.getIndentationEndIndex("  hello")).toBe(2);
        });

        test("should return string length if no non-whitespace found", () => {
            expect(IndentData.getIndentationEndIndex("\t\t")).toBe(2);
            expect(IndentData.getIndentationEndIndex("    ")).toBe(4);
        });
    });

    describe("getIndentData", () => {
        test("should detect colon at end of line", () => {
            const result = IndentData.getIndentData("test:");
            expect(result.hasColon).toBe(true);
        });

        test("should not detect colon when not present", () => {
            const result = IndentData.getIndentData("test");
            expect(result.hasColon).toBe(false);
        });

        test("should calculate endIndex correctly", () => {
            const result = IndentData.getIndentData("\t\thello");
            expect(result.endIndex).toBe(2);
        });
    });

    describe("constructor", () => {
        test("should initialize with default values", () => {
            const data = new IndentData();
            expect(data.endIndex).toBe(0);
            expect(data.unit).toBe("");
            expect(data.current).toBe(0);
            expect(data.expected).toBe(0);
            expect(data.hasColon).toBe(false);
        });
    });
});

import { expect, test, describe } from "bun:test";
import { URISeparator, addToPath } from "../file-system/file-functions";

describe("file-functions", () => {
    describe("URISeparator", () => {
        test("should be a forward slash", () => {
            expect(URISeparator).toBe("/");
        });
    });

    describe("addToPath", () => {
        test("should add path component with separator", () => {
            expect(addToPath("file:///path", "file")).toBe("file:///path/file");
        });

        test("should handle empty base path", () => {
            expect(addToPath("", "file")).toBe("/file");
        });

        test("should handle path with trailing separator", () => {
            expect(addToPath("file:///path/", "file")).toBe("file:///path//file");
        });
    });
});

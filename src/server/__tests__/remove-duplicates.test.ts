import { expect, test, describe } from "bun:test";
import { removeDuplicates } from "../Pattern/remove-duplicates";

describe("removeDuplicates", () => {
    test("should remove duplicate elements", () => {
        const arr = [1, 2, 2, 3, 3, 3, 4];
        expect(removeDuplicates(arr)).toEqual([1, 2, 3, 4]);
    });

    test("should return empty array for empty input", () => {
        expect(removeDuplicates([])).toEqual([]);
    });

    test("should handle strings", () => {
        const arr = ["a", "b", "a", "c", "b"];
        expect(removeDuplicates(arr)).toEqual(["a", "b", "c"]);
    });

    test("should preserve order of first occurrence", () => {
        const arr = [5, 3, 1, 2, 3, 4, 1, 5];
        expect(removeDuplicates(arr)).toEqual([5, 3, 1, 2, 4]);
    });

    test("should handle all unique elements", () => {
        const arr = [1, 2, 3, 4];
        expect(removeDuplicates(arr)).toEqual([1, 2, 3, 4]);
    });

    test("should handle all duplicate elements", () => {
        const arr = [1, 1, 1, 1];
        expect(removeDuplicates(arr)).toEqual([1]);
    });
});

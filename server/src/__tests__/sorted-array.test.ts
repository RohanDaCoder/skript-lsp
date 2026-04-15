import { describe, it, expect } from "vitest";
import { sortedIndex, insertSorted, getMaxElement } from "../sorted-array";

describe("sortedIndex", () => {
    it("should find the correct index for insertion", () => {
        const arr = [1, 3, 5, 7, 9];
        const result = sortedIndex(arr, 4, (a, b) => a < b);
        expect(result).toBe(2);
    });

    it("should return 0 for empty array", () => {
        const arr: number[] = [];
        const result = sortedIndex(arr, 5, (a, b) => a < b);
        expect(result).toBe(0);
    });

    it("should return array length for value larger than all elements", () => {
        const arr = [1, 2, 3];
        const result = sortedIndex(arr, 10, (a, b) => a < b);
        expect(result).toBe(3);
    });

    it("should work with custom compare function", () => {
        const arr = [{ a: 1 }, { a: 2 }, { a: 3 }];
        const result = sortedIndex(arr, { a: 1.5 }, (item, val) => item.a < val.a);
        expect(result).toBe(1);
    });
});

describe("insertSorted", () => {
    it("should insert value at correct position", () => {
        const arr = [1, 3, 5];
        insertSorted(arr, 4, (a, b) => a < b);
        expect(arr).toEqual([1, 3, 4, 5]);
    });

    it("should maintain sorted order after multiple insertions", () => {
        const arr: number[] = [];
        insertSorted(arr, 5, (a, b) => a < b);
        insertSorted(arr, 2, (a, b) => a < b);
        insertSorted(arr, 8, (a, b) => a < b);
        insertSorted(arr, 1, (a, b) => a < b);
        expect(arr).toEqual([1, 2, 5, 8]);
    });
});

describe("getMaxElement", () => {
    it("should return the maximum element", () => {
        const arr = [1, 5, 3, 9, 2];
        const result = getMaxElement(arr, 0, (a, b) => a < b);
        expect(result).toBe(9);
    });

    it("should return the initial value for empty array", () => {
        const arr: number[] = [];
        const result = getMaxElement(arr, 0, (a, b) => a < b);
        expect(result).toBe(0);
    });

    it("should work with single element", () => {
        const arr = [42];
        const result = getMaxElement(arr, 0, (a, b) => a < b);
        expect(result).toBe(42);
    });
});

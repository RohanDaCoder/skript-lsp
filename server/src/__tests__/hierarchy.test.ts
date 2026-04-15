import { expect, test, describe } from "bun:test";
import { Hierarchy } from "../Hierarchy";

describe("Hierarchy", () => {
    test("should initialize with empty children", () => {
        const hierarchy = new Hierarchy();
        expect(hierarchy.children).toEqual([]);
        expect(hierarchy.parent).toBeUndefined();
    });

    test("should accept parent in constructor", () => {
        const parent = new Hierarchy();
        const child = new Hierarchy(parent);
        expect(child.parent).toBe(parent);
    });

    test("should accept children in constructor", () => {
        const child1 = new Hierarchy();
        const child2 = new Hierarchy();
        const parent = new Hierarchy(undefined, [child1, child2]);
        expect(parent.children).toHaveLength(2);
        expect(parent.children).toContain(child1);
        expect(parent.children).toContain(child2);
    });

    test("should allow adding children dynamically", () => {
        const parent = new Hierarchy();
        const child = new Hierarchy();
        parent.children.push(child);
        expect(parent.children).toHaveLength(1);
        expect(parent.children[0]).toBe(child);
    });

    test("should allow setting parent", () => {
        const parent = new Hierarchy();
        const child = new Hierarchy();
        child.parent = parent;
        expect(child.parent).toBe(parent);
    });
});

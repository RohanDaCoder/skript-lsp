import { expect, test, describe } from "bun:test";
import { PatternTreeNode } from "../Pattern/pattern-tree-node/pattern-tree-node";

describe("PatternTreeNode", () => {
    test("should initialize with empty children maps", () => {
        const node = new PatternTreeNode();
        expect(node.stringOrderedChildren).toBeInstanceOf(Map);
        expect(node.instanceTypeChildren).toBeInstanceOf(Map);
        expect(node.staticTypeChildren).toBeInstanceOf(Map);
        expect(node.regExpOrderedChildren).toBeInstanceOf(Map);
        expect(node.parentGroups).toEqual([]);
    });

    test("should initialize with empty patterns array", () => {
        const node = new PatternTreeNode();
        expect(node.patternsEndedHere).toEqual([]);
    });

    test("should allow adding children via maps", () => {
        const parent = new PatternTreeNode();
        const child = new PatternTreeNode();
        parent.stringOrderedChildren.set("a", child);
        expect(parent.stringOrderedChildren.size).toBe(1);
        expect(parent.stringOrderedChildren.get("a")).toBe(child);
    });

    test("should allow multiple parent groups", () => {
        const node = new PatternTreeNode();
        const group1 = new Map<string, PatternTreeNode>();
        const group2 = new Map<string, PatternTreeNode>();
        node.parentGroups.push(group1, group2);
        expect(node.parentGroups).toHaveLength(2);
    });
});

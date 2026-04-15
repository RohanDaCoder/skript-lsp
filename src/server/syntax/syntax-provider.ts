import type { SyntaxEntry, ResolvedConfig } from "../config/skript-config";
import type { CompletionItem, Hover, MarkupContent } from "vscode-languageserver";
import { MarkupKind } from "vscode-languageserver";

let syntaxData: SyntaxEntry[] = [];
let loaded = false;
let loadError: Error | null = null;

export async function loadSyntax(syntaxPath: string): Promise<void> {
    if (loaded) return;

    try {
        const fs = await import("fs/promises");
        const path = await import("path");

        const absolutePath = path.isAbsolute(syntaxPath)
            ? syntaxPath
            : path.join(process.cwd(), syntaxPath);

        const content = await fs.readFile(absolutePath, "utf-8");
        syntaxData = JSON.parse(content);
        loaded = true;
        console.log(`[SyntaxProvider] Loaded ${syntaxData.length} syntax entries from ${absolutePath}`);
    } catch (err) {
        loadError = err instanceof Error ? err : new Error(String(err));
        console.error(`[SyntaxProvider] Failed to load syntax: ${loadError.message}`);
    }
}

export function isSyntaxLoaded(): boolean {
    return loaded;
}

export function getLoadError(): Error | null {
    return loadError;
}

export function getSyntaxCount(): number {
    return syntaxData.length;
}

export function filterSyntax(config: ResolvedConfig): SyntaxEntry[] {
    if (!config.minecraftVersion && !config.skriptVersion && config.addons.size === 0) {
        return syntaxData;
    }

    const { filterByConfig } = require("../config/skript-config");
    return syntaxData.filter((entry) => filterByConfig(entry, config));
}

export function searchSyntax(query: string, limit: number = 50): SyntaxEntry[] {
    const lowerQuery = query.toLowerCase();
    const results: Array<{ entry: SyntaxEntry; score: number }> = [];

    for (const entry of syntaxData) {
        let score = 0;

        if (entry.t.toLowerCase().startsWith(lowerQuery)) {
            score = 100;
        } else if (entry.t.toLowerCase().includes(lowerQuery)) {
            score = 50;
        } else if (entry.p.toLowerCase().includes(lowerQuery)) {
            score = 20;
        }

        if (score > 0) {
            results.push({ entry, score });
        }
    }

    results.sort((a, b) => b.score - a.score);
    return results.slice(0, limit).map((r) => r.entry);
}

export function createCompletionItem(entry: SyntaxEntry): CompletionItem {
    const kindMap: Record<string, number> = {
        expression: 6,
        effect: 1,
        condition: 2,
        type: 7,
        event: 10,
        section: 12,
        structure: 12,
        function: 3,
    };

    return {
        label: entry.t,
        kind: kindMap[entry.y] ?? 1,
        detail: entry.r ?? entry.y,
        documentation: createMarkupContent(entry),
        insertText: entry.p,
    };
}

export function createHover(entry: SyntaxEntry): Hover {
    return {
        contents: createMarkupContent(entry),
    };
}

function createMarkupContent(entry: SyntaxEntry): MarkupContent {
    const lines: string[] = [];

    lines.push(`**${entry.t}** (${entry.y})`);

    if (entry.r) {
        lines.push(`Returns: \`${entry.r}\``);
    }

    if (entry.a?.n) {
        lines.push(`Addon: [${entry.a.n}](${entry.a.l})`);
    }

    if (entry.d) {
        lines.push("", entry.d.substring(0, 500));
        if (entry.d.length > 500) {
            lines.push("...");
        }
    }

    lines.push("", "```skript", entry.p, "```");

    return {
        kind: MarkupKind.Markdown,
        value: lines.join("\n"),
    };
}

export function extractPlaceholders(pattern: string): string[] {
    const placeholderRegex = /%([^%]+)%/g;
    const placeholders: string[] = [];
    let match;

    while ((match = placeholderRegex.exec(pattern)) !== null) {
        const placeholder = match[1];

        if (placeholder.includes("|")) {
            const alternatives = placeholder.split("|");
            placeholders.push(...alternatives);
        } else if (placeholder.startsWith("-")) {
            placeholders.push(placeholder.substring(1));
        } else {
            placeholders.push(placeholder);
        }
    }

    return [...new Set(placeholders)];
}

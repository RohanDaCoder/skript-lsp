export interface SkriptConfig {
    minecraftVersion?: string;
    skriptVersion?: string;
    addons?: string[];
    syntax?: {
        source: "local" | "skripthub";
        path?: string;
    };
}

export interface ResolvedConfig {
    minecraftVersion: string | null;
    skriptVersion: string | null;
    addons: Set<string>;
    syntaxPath: string;
}

const DEFAULT_CONFIG_PATHS = [
    ".skriptrc.json",
    "skript.config.json",
    ".intelliskript.json",
];

const DEFAULT_SYNTAX_PATH = "./syntax.json";

function parseConfigFile(content: string): SkriptConfig | null {
    try {
        return JSON.parse(content);
    } catch {
        return null;
    }
}

function compareVersions(configVersion: string, syntaxVersion: string): boolean {
    if (!configVersion || !syntaxVersion) return true;

    const configParts = normalize(configVersion);
    const syntaxParts = normalize(syntaxVersion);

    const maxLen = Math.max(configParts.length, syntaxParts.length);
    for (let i = 0; i < maxLen; i++) {
        const cfg = configParts[i] ?? 0;
        const syn = syntaxParts[i] ?? 0;
        if (syn < cfg) return true;
        if (syn > cfg) return false;
    }
    return true;
}

function normalize(v: string): number[] {
    const parts = v.replace(/[^\d.]/g, "").split(".");
    return parts.map((p) => parseInt(p, 10) || 0);
}

export async function findConfigFile(workspacePath: string): Promise<string | null> {
    const fs = await import("fs/promises");
    const path = await import("path");

    for (const filename of DEFAULT_CONFIG_PATHS) {
        const fullPath = path.join(workspacePath, filename);
        try {
            await fs.access(fullPath);
            return fullPath;
        } catch {
            continue;
        }
    }
    return null;
}

export async function loadConfig(workspacePath: string): Promise<SkriptConfig | null> {
    const configPath = await findConfigFile(workspacePath);
    if (!configPath) return null;

    const fs = await import("fs/promises");
    const content = await fs.readFile(configPath, "utf-8");
    return parseConfigFile(content);
}

export function resolveConfig(config: SkriptConfig | null): ResolvedConfig {
    if (!config) {
        return {
            minecraftVersion: null,
            skriptVersion: null,
            addons: new Set(),
            syntaxPath: DEFAULT_SYNTAX_PATH,
        };
    }

    return {
        minecraftVersion: config.minecraftVersion ?? null,
        skriptVersion: config.skriptVersion ?? null,
        addons: new Set(config.addons ?? []),
        syntaxPath: config.syntax?.path ?? DEFAULT_SYNTAX_PATH,
    };
}

export function filterByConfig(
    entry: SyntaxEntry,
    config: ResolvedConfig
): boolean {
    const { minecraftVersion, skriptVersion, addons } = config;

    if (minecraftVersion && entry.v) {
        if (!compareVersions(minecraftVersion, entry.v)) {
            return false;
        }
    }

    if (skriptVersion && entry.c) {
        if (!compareVersions(skriptVersion, entry.c)) {
            return false;
        }
    }

    if (addons.size > 0 && entry.a?.n) {
        if (!addons.has(entry.a.n)) {
            return false;
        }
    }

    return true;
}

export interface SyntaxEntry {
    i: number;
    t: string;
    d: string;
    p: string;
    y: string;
    r: string | null;
    a: { n: string; l: string } | null;
    v: string;
    c: string;
}

export function createDefaultConfig(): SkriptConfig {
    return {
        minecraftVersion: "",
        skriptVersion: "",
        addons: [],
        syntax: {
            source: "local",
            path: "./syntax.json",
        },
    };
}

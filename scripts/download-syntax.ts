const SYNTAX_API_URL = "https://skripthub.net/api/v1/addonsyntaxlist/";
const OUTPUT_PATH = "./syntax/syntax.json";

const COMPRESS_KEYS: Record<string, string> = {
    id: "i",
    title: "t",
    description: "d",
    syntax_pattern: "p",
    syntax_type: "y",
    return_type: "r",
    addon: "a",
    compatible_addon_version: "c",
    compatible_minecraft_version: "v",
};

interface AddonInfo {
    name: string;
    link_to_addon: string;
}

interface RawSyntaxEntry {
    id: number;
    title: string;
    description: string;
    syntax_pattern: string;
    syntax_type: string;
    return_type: string | null;
    addon: AddonInfo | null;
    compatible_addon_version: string;
    compatible_minecraft_version: string;
}

interface CompressedAddon {
    n: string;
    l: string;
}

interface CompressedEntry {
    i: number;
    t: string;
    d: string;
    p: string;
    y: string;
    r: string | null;
    a: CompressedAddon | null;
    c: string;
    v: string;
}

function compressEntry(entry: RawSyntaxEntry): CompressedEntry {
    return {
        i: entry.id,
        t: entry.title,
        d: entry.description,
        p: entry.syntax_pattern,
        y: entry.syntax_type,
        r: entry.return_type,
        a: entry.addon ? { n: entry.addon.name, l: entry.addon.link_to_addon } : null,
        c: entry.compatible_addon_version,
        v: entry.compatible_minecraft_version,
    };
}

async function downloadSyntax(): Promise<void> {
    console.log("Fetching syntax from SkriptHub...");

    const response = await fetch(SYNTAX_API_URL);
    if (!response.ok) {
        throw new Error(`Failed to fetch syntax: ${response.status} ${response.statusText}`);
    }

    const data: RawSyntaxEntry[] = await response.json();
    console.log(`Received ${data.length} syntax entries`);

    const compressed = data.map(compressEntry);

    const fs = await import("fs/promises");
    const path = await import("path");

    await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
    await fs.writeFile(OUTPUT_PATH, JSON.stringify(compressed), "utf-8");

    const originalSize = JSON.stringify(data).length;
    const compressedSize = JSON.stringify(compressed).length;
    const savings = ((1 - compressedSize / originalSize) * 100).toFixed(1);

    console.log(`Saved to ${OUTPUT_PATH}`);
    console.log(`Original: ${(originalSize / 1024 / 1024).toFixed(2)}MB -> Compressed: ${(compressedSize / 1024 / 1024).toFixed(2)}MB (${savings}% savings)`);
}

downloadSyntax().catch((err) => {
    console.error(err);
    process.exit(1);
});

import fs from "node:fs";
import path from "node:path";

const SRC_DIR = path.resolve("src");

function processFile(filePath) {
    let content = fs.readFileSync(filePath, "utf8");

    const updated = content.replace(
        /(from\s+["'])(\.{1,2}\/[^"']+)(["'])/g,
        (match, start, importPath, end) => {
            if (
                importPath.endsWith(".js") ||
                importPath.endsWith(".json") ||
                importPath.endsWith(".mjs") ||
                importPath.endsWith(".cjs")
            ) {
                return match;
            }

            return `${start}${importPath}.js${end}`;
        }
    );

    if (updated !== content) {
        fs.writeFileSync(filePath, updated, "utf8");
        console.log(`✔ Updated: ${path.relative(process.cwd(), filePath)}`);
    }
}

function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            walk(fullPath);
            continue;
        }

        if (
            entry.isFile() &&
            fullPath.endsWith(".ts") &&
            !fullPath.endsWith(".d.ts")
        ) {
            processFile(fullPath);
        }
    }
}

if (!fs.existsSync(SRC_DIR)) {
    console.error(`Source directory not found: ${SRC_DIR}`);
    process.exit(1);
}

walk(SRC_DIR);

console.log("\nDone.");
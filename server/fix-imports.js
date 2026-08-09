import fs from 'fs';
import path from 'path';

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            walkDir(filePath);
        } else if (filePath.endsWith('.ts') && !filePath.endsWith('.d.ts')) {
            let content = fs.readFileSync(filePath, 'utf8');

            // লোকাল রিলেটিভ ইমপোর্ট যেমন: from "./config/env" বা from "../shared/errors" ধরবে
            // কিন্তু নোড মডিউল বা অলিয়াস (@/) হ্যান্ডেল করবে না
            content = content.replace(/from\s+["'](\.[^"']+)(?<!\.js)(?<!\.ts)["']/g, (match, p1) => {
                return `from "${p1}.js"`;
            });

            fs.writeFileSync(filePath, content, 'utf8');
        }
    }
}

walkDir('./src');
console.log('All relative imports updated with .js extensions successfully!');
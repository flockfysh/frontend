const path = require('path');
const fs = require('fs');

async function main() {
    await fs.promises.mkdir('./icons/main');
    const files = await fs.promises.readdir('./icons/base');
    for (const file of files) {
        if (file.endsWith('.svg')) {
            const data = (await fs.promises.readFile(path.join('./icons/base', file))).toString();
            const newData = data.replaceAll(/(['"])#[0-9A-F]{6}\1/gi, '"currentColor"');
            await fs.promises.writeFile(path.join('./icons/main', file), newData);
        }
    }
}

main().then();

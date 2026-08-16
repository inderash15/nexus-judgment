import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';

const ASSET_EXTENSIONS = [
  '.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif', '.bmp', '.tiff', '.ico',
  '.svg',
  '.mp4', '.webm', '.mov', '.m4v', '.avi',
  '.mp3', '.wav', '.ogg', '.m4a', '.flac',
  '.woff', '.woff2', '.ttf', '.otf', '.eot',
  '.json', '.xml', '.txt', '.lottie', '.glb', '.gltf', '.obj'
];

// Directories to ignore during scanning for assets
const IGNORE_DIRS = ['.git', 'node_modules', '.vercel', '.output', 'dist', 'build', '.cache'];

async function walkDir(dir, callback) {
  const files = await fs.readdir(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (IGNORE_DIRS.some(ignored => fullPath.includes(ignored))) continue;
    
    const stat = await fs.stat(fullPath);
    if (stat.isDirectory()) {
      await walkDir(fullPath, callback);
    } else {
      await callback(fullPath, stat);
    }
  }
}

async function getHash(filePath) {
  const content = await fs.readFile(filePath);
  return crypto.createHash('md5').update(content).digest('hex');
}

async function main() {
  const assets = [];
  const sourceCodeFiles = [];

  await walkDir('.', async (filePath, stat) => {
    const ext = path.extname(filePath).toLowerCase();
    // Exclude generic json/txt if they are config files
    if (['package.json', 'package-lock.json', 'tsconfig.json', '.gitignore', 'README.md', 'bun.lock'].some(f => filePath.endsWith(f))) return;

    if (ASSET_EXTENSIONS.includes(ext)) {
      const hash = await getHash(filePath);
      assets.push({
        path: filePath.replace(/\\/g, '/'),
        size: stat.size,
        ext,
        hash
      });
    }

    // Source code files for searching references
    if (['.ts', '.tsx', '.js', '.jsx', '.css', '.html'].includes(ext)) {
       sourceCodeFiles.push(filePath);
    }
  });

  // Calculate duplicates
  const hashes = {};
  for (const asset of assets) {
    if (!hashes[asset.hash]) hashes[asset.hash] = [];
    hashes[asset.hash].push(asset.path);
  }
  
  // Search for references
  const fileContents = {};
  for (const sf of sourceCodeFiles) {
    fileContents[sf] = await fs.readFile(sf, 'utf-8');
  }

  for (const asset of assets) {
    const baseName = path.basename(asset.path);
    const baseNameWithoutExt = path.parse(baseName).name;
    let referencesCount = 0;
    const referencedIn = [];

    for (const [sf, content] of Object.entries(fileContents)) {
      if (content.includes(baseName) || content.includes(baseNameWithoutExt)) {
        referencesCount++;
        referencedIn.push(sf);
      }
    }
    asset.referenced = referencesCount > 0;
    asset.referencedIn = referencedIn;
  }

  const result = {
    totalScanned: assets.length,
    assets: assets.map(a => ({
      path: a.path,
      size: (a.size / 1024 / 1024).toFixed(2) + ' MB',
      referenced: a.referenced,
      refs: a.referencedIn.length,
      duplicates: hashes[a.hash].length > 1 ? hashes[a.hash] : false
    }))
  };

  await fs.writeFile('audit-report.json', JSON.stringify(result, null, 2));
  console.log("Audit complete. Written to audit-report.json");
}

main().catch(console.error);

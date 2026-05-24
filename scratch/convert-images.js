import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const targetDir = 'public/images/heropage';

async function convert() {
  const dirPath = path.resolve(targetDir);
  console.log(`Scanning directory: ${dirPath}`);
  
  if (!fs.existsSync(dirPath)) {
    console.error(`Directory not found: ${dirPath}`);
    process.exit(1);
  }
  
  const files = fs.readdirSync(dirPath);
  const jpgFiles = files
    .filter(file => file.startsWith('ezgif-frame-') && file.endsWith('.jpg'))
    .sort();
    
  if (jpgFiles.length === 0) {
    console.log('No JPG frames found matching pattern "ezgif-frame-*.jpg"');
    return;
  }
  
  console.log(`Found ${jpgFiles.length} JPG frames to convert to WebP...`);
  
  for (let i = 0; i < jpgFiles.length; i++) {
    const filename = jpgFiles[i];
    const sourcePath = path.join(dirPath, filename);
    
    // Generate sequential name 0001.webp, 0002.webp...
    const padNum = String(i + 1).padStart(4, '0');
    const targetFilename = `${padNum}.webp`;
    const targetPath = path.join(dirPath, targetFilename);
    
    console.log(`Converting ${filename} -> ${targetFilename}`);
    
    await sharp(sourcePath)
      .webp({ quality: 85 })
      .toFile(targetPath);
  }
  
  console.log('All frames converted successfully!');
}

convert().catch(err => {
  console.error('Error during conversion:', err);
  process.exit(1);
});

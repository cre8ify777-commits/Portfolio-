import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Use the original high-quality frames from "New Hero Section Vid"
const INPUT_DIR = path.resolve('C:\\Users\\Asus\\Documents\\Antigravity_Portfolio_Example\\New Hero Section Vid');
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'hero-webp');

const SOURCE_FRAME_COUNT = 144;
const SKIP = 2; // take every 2nd frame: 144 → 72

async function convertFrames() {
  // Clear and recreate output directory
  if (fs.existsSync(OUTPUT_DIR)) {
    fs.rmSync(OUTPUT_DIR, { recursive: true });
  }
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  let outputIndex = 0;
  let totalInputSize = 0;
  let totalOutputSize = 0;

  for (let i = 0; i < SOURCE_FRAME_COUNT; i += SKIP) {
    const num = i.toString().padStart(3, '0');
    const inputFile = path.join(INPUT_DIR, `frame_${num}_delay-0.055s.png`);
    
    if (!fs.existsSync(inputFile)) {
      console.warn(`Warning: Missing ${inputFile}`);
      continue;
    }

    const outNum = outputIndex.toString().padStart(3, '0');
    const outputFile = path.join(OUTPUT_DIR, `frame_${outNum}.webp`);

    const inputStats = fs.statSync(inputFile);
    totalInputSize += inputStats.size;

    await sharp(inputFile)
      .resize(1280, 720, { fit: 'cover' })
      .webp({ quality: 82, effort: 4 })
      .toFile(outputFile);

    const outputStats = fs.statSync(outputFile);
    totalOutputSize += outputStats.size;

    outputIndex++;
    process.stdout.write(`\r  Converting: ${outputIndex}/${Math.ceil(SOURCE_FRAME_COUNT / SKIP)} frames...`);
  }

  console.log('\n');
  console.log(`Done! Converted ${outputIndex} frames from original "New Hero Section Vid"`);
  console.log(`   Input:  ${(totalInputSize / 1024 / 1024).toFixed(2)} MB (${SOURCE_FRAME_COUNT} original PNGs)`);
  console.log(`   Output: ${(totalOutputSize / 1024 / 1024).toFixed(2)} MB (${outputIndex} WebPs)`);
  console.log(`   Reduction: ${(100 - (totalOutputSize / totalInputSize) * 100).toFixed(1)}%`);
}

convertFrames().catch(console.error);

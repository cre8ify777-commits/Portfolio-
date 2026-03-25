import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const INPUT_DIR = path.join(process.cwd(), 'public', 'sequence');
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'hero-webp');

// We skip every other frame: 144 → 72 frames
const SOURCE_FRAME_COUNT = 144;
const SKIP = 2; // take every 2nd frame

async function convertFrames() {
  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let outputIndex = 0;
  let totalInputSize = 0;
  let totalOutputSize = 0;

  for (let i = 0; i < SOURCE_FRAME_COUNT; i += SKIP) {
    const num = i.toString().padStart(3, '0');
    const inputFile = path.join(INPUT_DIR, `frame_${num}_delay-0.055s.png`);
    
    if (!fs.existsSync(inputFile)) {
      console.warn(`⚠ Missing: ${inputFile}`);
      continue;
    }

    const outNum = outputIndex.toString().padStart(3, '0');
    const outputFile = path.join(OUTPUT_DIR, `frame_${outNum}.webp`);

    const inputStats = fs.statSync(inputFile);
    totalInputSize += inputStats.size;

    await sharp(inputFile)
      .resize(1280, 720, { fit: 'cover' }) // Resize to 720p (crisp enough for full-screen CSS stretch)
      .webp({ quality: 82, effort: 4 })     // High quality WebP, good compression
      .toFile(outputFile);

    const outputStats = fs.statSync(outputFile);
    totalOutputSize += outputStats.size;

    outputIndex++;
    process.stdout.write(`\r  Converting: ${outputIndex}/${Math.ceil(SOURCE_FRAME_COUNT / SKIP)} frames...`);
  }

  console.log('\n');
  console.log(`✅ Done! Converted ${outputIndex} frames`);
  console.log(`   Input:  ${(totalInputSize / 1024 / 1024).toFixed(2)} MB (${SOURCE_FRAME_COUNT} PNGs)`);
  console.log(`   Output: ${(totalOutputSize / 1024 / 1024).toFixed(2)} MB (${outputIndex} WebPs)`);
  console.log(`   Reduction: ${(100 - (totalOutputSize / totalInputSize) * 100).toFixed(1)}%`);
}

convertFrames().catch(console.error);

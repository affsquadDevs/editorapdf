/**
 * Icon Generator Script
 * Generates all required icon sizes from a single source image
 * 
 * Requirements:
 * - npm install sharp
 * - Source image: public/source-icon.png (1024x1024 recommended)
 * 
 * Usage:
 * node scripts/generate-icons.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const SOURCE_IMAGE = 'public/source-icon.png';
const OUTPUT_DIR = 'public';
const BACKGROUND_COLOR = { r: 15, g: 23, b: 42, alpha: 1 }; // #0f172a (surface-900)

// Icon sizes to generate
const SIZES = [
  { size: 72, name: 'icon-72.png', transparent: true },
  { size: 96, name: 'icon-96.png', transparent: true },
  { size: 128, name: 'icon-128.png', transparent: true },
  { size: 144, name: 'icon-144.png', transparent: true },
  { size: 152, name: 'icon-152.png', transparent: true },
  { size: 192, name: 'icon-192.png', transparent: true },
  { size: 384, name: 'icon-384.png', transparent: true },
  { size: 512, name: 'icon-512.png', transparent: true },
  { size: 180, name: 'apple-touch-icon.png', transparent: false },
  { size: 512, name: 'logo.png', transparent: true },
  { size: 32, name: 'favicon-32x32.png', transparent: true },
  { size: 16, name: 'favicon-16x16.png', transparent: true },
];

// Check if source image exists
if (!fs.existsSync(SOURCE_IMAGE)) {
  console.error('❌ Error: Source image not found!');
  console.log('');
  console.log('Please create a source icon:');
  console.log(`  1. Create a 1024x1024px PNG image`);
  console.log(`  2. Save it as: ${SOURCE_IMAGE}`);
  console.log('  3. Run this script again');
  console.log('');
  console.log('Design tips:');
  console.log('  - Use transparent background');
  console.log('  - Keep important elements in center 80%');
  console.log('  - Use your brand colors');
  console.log('  - Make it simple and recognizable at small sizes');
  process.exit(1);
}

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

console.log('🎨 Icon Generator');
console.log('==================');
console.log('');
console.log(`Source: ${SOURCE_IMAGE}`);
console.log(`Output: ${OUTPUT_DIR}/`);
console.log('');

// Generate icons
async function generateIcons() {
  let successCount = 0;
  let errorCount = 0;

  for (const config of SIZES) {
    try {
      const outputPath = path.join(OUTPUT_DIR, config.name);
      
      const sharpInstance = sharp(SOURCE_IMAGE)
        .resize(config.size, config.size, {
          fit: 'contain',
          background: config.transparent 
            ? { r: 0, g: 0, b: 0, alpha: 0 }
            : BACKGROUND_COLOR
        });

      // For favicon, also generate ICO file
      if (config.name.includes('favicon')) {
        await sharpInstance.png().toFile(outputPath);
      } else {
        await sharpInstance.png().toFile(outputPath);
      }

      console.log(`✅ Generated: ${config.name} (${config.size}x${config.size})`);
      successCount++;
    } catch (error) {
      console.error(`❌ Failed: ${config.name}`);
      console.error(`   Error: ${error.message}`);
      errorCount++;
    }
  }

  console.log('');
  console.log('==================');
  console.log(`✅ Success: ${successCount}/${SIZES.length}`);
  if (errorCount > 0) {
    console.log(`❌ Errors: ${errorCount}`);
  }
  console.log('==================');
  console.log('');

  if (successCount > 0) {
    console.log('Next steps:');
    console.log('1. Generate favicon.ico from favicon-32x32.png');
    console.log('   - Use: https://www.favicon-generator.org/');
    console.log('   - Or: https://realfavicongenerator.net/');
    console.log('');
    console.log('2. Create Open Graph image (1200x630px)');
    console.log('   - File: public/og-image.png');
    console.log('   - Include logo, tagline, and brand colors');
    console.log('');
    console.log('3. Create screenshots');
    console.log('   - Desktop: 1280x720px → public/screenshot-desktop.png');
    console.log('   - Mobile: 750x1334px → public/screenshot-mobile.png');
    console.log('');
    console.log('4. Test your icons:');
    console.log('   - npm run dev');
    console.log('   - Open http://localhost:3000');
    console.log('   - Check browser tab icon');
    console.log('   - Try "Add to Home Screen" on mobile');
  }
}

// Run the generator
generateIcons().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});

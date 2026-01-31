#!/usr/bin/env node
/**
 * Script to convert logo.svg to logo.png
 * Requires: sharp package or ImageMagick
 * 
 * Usage:
 *   npm install sharp
 *   node scripts/convert-logo-to-png.js
 */

const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, '../public/logo.svg');
const pngPath = path.join(__dirname, '../public/logo.png');

async function convertSvgToPng() {
  try {
    // Try using sharp (if installed)
    let sharp;
    try {
      sharp = require('sharp');
    } catch (e) {
      console.error('❌ Error: sharp package not found.');
      console.log('\n📦 To install sharp, run:');
      console.log('   npm install sharp --save-dev');
      console.log('\n💡 Alternative: Convert logo.svg to logo.png manually using:');
      console.log('   - Online tool: https://cloudconvert.com/svg-to-png');
      console.log('   - ImageMagick: convert -background none -density 300 public/logo.svg public/logo.png');
      process.exit(1);
    }

    const svgBuffer = fs.readFileSync(svgPath);
    
    await sharp(svgBuffer)
      .resize(120, 40, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 } // Transparent background
      })
      .png()
      .toFile(pngPath);

    console.log('✅ Successfully converted logo.svg to logo.png');
    console.log(`   Output: ${pngPath}`);
  } catch (error) {
    console.error('❌ Error converting logo:', error.message);
    console.log('\n💡 Manual conversion options:');
    console.log('   1. Online: https://cloudconvert.com/svg-to-png');
    console.log('   2. ImageMagick: convert -background none public/logo.svg public/logo.png');
    console.log('   3. Inkscape: inkscape --export-type=png --export-filename=logo.png logo.svg');
    process.exit(1);
  }
}

convertSvgToPng();

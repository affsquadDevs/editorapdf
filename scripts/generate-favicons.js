#!/usr/bin/env node
/**
 * Script to generate favicon files from favicon.svg
 * Generates: favicon.ico, favicon.png, apple-touch-icon.png
 * 
 * Requirements:
 *   npm install sharp --save-dev
 * 
 * Usage:
 *   node scripts/generate-favicons.js
 */

const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, '../public/favicon.svg');
const publicDir = path.join(__dirname, '../public');

async function generateFavicons() {
  try {
    // Check if sharp is installed
    let sharp;
    try {
      sharp = require('sharp');
    } catch (e) {
      console.error('❌ Error: sharp package not found.');
      console.log('\n📦 To install sharp, run:');
      console.log('   npm install sharp --save-dev');
      console.log('\n💡 Alternative: Use online tools:');
      console.log('   - https://realfavicongenerator.net/');
      console.log('   - https://favicon.io/favicon-converter/');
      process.exit(1);
    }

    // Check if SVG exists
    if (!fs.existsSync(svgPath)) {
      console.error(`❌ Error: ${svgPath} not found`);
      process.exit(1);
    }

    const svgBuffer = fs.readFileSync(svgPath);
    console.log('🔄 Generating favicon files from favicon.svg...\n');

    // Generate favicon.ico (multi-size: 16x16, 32x32, 48x48)
    // Note: sharp doesn't support ICO directly, so we'll create PNG and suggest conversion
    console.log('📦 Generating favicon.png (32x32)...');
    await sharp(svgBuffer)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toFile(path.join(publicDir, 'favicon.png'));

    // Generate apple-touch-icon.png (180x180)
    console.log('🍎 Generating apple-touch-icon.png (180x180)...');
    await sharp(svgBuffer)
      .resize(180, 180, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toFile(path.join(publicDir, 'apple-touch-icon.png'));

    // Generate additional sizes for better compatibility
    console.log('📱 Generating icon-192.png (192x192)...');
    await sharp(svgBuffer)
      .resize(192, 192, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toFile(path.join(publicDir, 'icon-192.png'));

    console.log('📱 Generating icon-512.png (512x512)...');
    await sharp(svgBuffer)
      .resize(512, 512, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toFile(path.join(publicDir, 'icon-512.png'));

    console.log('\n✅ Successfully generated favicon files!');
    console.log('   - favicon.png (32x32)');
    console.log('   - apple-touch-icon.png (180x180)');
    console.log('   - icon-192.png (192x192)');
    console.log('   - icon-512.png (512x512)');
    console.log('\n⚠️  Note: favicon.ico needs to be created manually or using online tool:');
    console.log('   https://favicon.io/favicon-converter/');
    console.log('   Upload favicon.png and download favicon.ico');
    
  } catch (error) {
    console.error('❌ Error generating favicons:', error.message);
    process.exit(1);
  }
}

generateFavicons();

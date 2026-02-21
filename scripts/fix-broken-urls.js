const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, '../app/blog');

function fixBrokenUrls(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Fix broken image URLs - missing url: ${siteUrl} part
  // Pattern: { /blog1.png`, or { /og/og-image.png`,
  if (content.includes('        /blog1.png`') || content.includes('      /og/og-image.png`')) {
    // Fix blog1.png
    content = content.replace(
      /\{\s*\/blog1\.png`/g,
      '{\n        url: `${siteUrl}/blog1.png`'
    );
    
    // Fix og-image.png
    content = content.replace(
      /\{\s*\/og\/og-image\.png`/g,
      '{\n        url: `${siteUrl}/og/og-image.png`'
    );
    
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Fixed ${filePath}`);
    return true;
  }

  return false;
}

function processBlogPosts(dir) {
  const files = fs.readdirSync(dir);
  let fixedCount = 0;

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      fixedCount += processBlogPosts(filePath);
    } else if (file === 'page.tsx') {
      if (fixBrokenUrls(filePath)) {
        fixedCount++;
      }
    }
  }

  return fixedCount;
}

console.log('Fixing broken image URLs in blog posts...\n');
const fixedCount = processBlogPosts(blogDir);
console.log(`\n✓ Fixed ${fixedCount} files`);

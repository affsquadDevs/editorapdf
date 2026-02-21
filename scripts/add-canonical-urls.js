const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, '../app/blog');

function addCanonicalToFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if canonical already exists
  if (content.includes('alternates') || content.includes('canonical')) {
    console.log(`✓ ${filePath} already has canonical URL`);
    return false;
  }

  // Find the metadata object
  const metadataMatch = content.match(/export const metadata: Metadata = \{([\s\S]*?)\n\}/);
  if (!metadataMatch) {
    console.log(`⚠ ${filePath} - Could not find metadata object`);
    return false;
  }

  // Find the closing brace of metadata before the closing of export
  const metadataStart = content.indexOf('export const metadata: Metadata = {');
  const metadataEnd = content.indexOf('}', metadataStart + 'export const metadata: Metadata = {'.length);
  
  // Find where to insert (before the closing brace)
  const beforeClosing = content.lastIndexOf('}', metadataEnd);
  const insertPosition = beforeClosing;
  
  // Check if twitter exists, insert after it
  const twitterMatch = content.substring(metadataStart, metadataEnd).match(/twitter:\s*\{[\s\S]*?\n\s*\},?/);
  if (twitterMatch) {
    const twitterEnd = content.indexOf('}', content.indexOf('twitter:', metadataStart) + twitterMatch[0].length);
    const insertPos = content.indexOf('\n', twitterEnd) + 1;
    
    // Insert canonical after twitter
    const indent = '  ';
    const canonical = `  alternates: {\n    canonical: postUrl,\n  },\n`;
    
    content = content.substring(0, insertPos) + canonical + content.substring(insertPos);
  } else {
    // Insert before closing brace
    const indent = '  ';
    const canonical = `  alternates: {\n    canonical: postUrl,\n  },\n`;
    content = content.substring(0, insertPosition) + canonical + content.substring(insertPosition);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Added canonical URL to ${filePath}`);
  return true;
}

function processBlogPosts(dir) {
  const files = fs.readdirSync(dir);
  let modifiedCount = 0;

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      modifiedCount += processBlogPosts(filePath);
    } else if (file === 'page.tsx') {
      if (addCanonicalToFile(filePath)) {
        modifiedCount++;
      }
    }
  }

  return modifiedCount;
}

console.log('Adding canonical URLs to blog posts...\n');
const modifiedCount = processBlogPosts(blogDir);
console.log(`\n✓ Modified ${modifiedCount} files`);

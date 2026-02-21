const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, '../app/blog');

function fixCanonicalInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Fix broken canonical URLs that were inserted incorrectly
  if (content.includes('url: `${siteUrl  alternates')) {
    // Remove the broken insertion
    content = content.replace(/url: `\$\{siteUrl\s+alternates: \{[\s\S]*?canonical: postUrl,[\s\S]*?\},?\n\s*\}/g, '');
    
    // Find the correct place to insert (after twitter block)
    const twitterMatch = content.match(/twitter:\s*\{[\s\S]*?\n\s*\},?\n/);
    if (twitterMatch) {
      const twitterEnd = content.indexOf(twitterMatch[0]) + twitterMatch[0].length;
      const canonical = '  alternates: {\n    canonical: postUrl,\n  },\n';
      content = content.substring(0, twitterEnd) + canonical + content.substring(twitterEnd);
      modified = true;
    }
  } else if (!content.includes('alternates:') && !content.includes('canonical:')) {
    // Add canonical if it doesn't exist
    const twitterMatch = content.match(/twitter:\s*\{[\s\S]*?\n\s*\},?\n/);
    if (twitterMatch) {
      const twitterEnd = content.indexOf(twitterMatch[0]) + twitterMatch[0].length;
      const canonical = '  alternates: {\n    canonical: postUrl,\n  },\n';
      content = content.substring(0, twitterEnd) + canonical + content.substring(twitterEnd);
      modified = true;
    }
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
      if (fixCanonicalInFile(filePath)) {
        fixedCount++;
      }
    }
  }

  return fixedCount;
}

console.log('Fixing canonical URLs in blog posts...\n');
const fixedCount = processBlogPosts(blogDir);
console.log(`\n✓ Fixed ${fixedCount} files`);

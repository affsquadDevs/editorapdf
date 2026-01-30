# Image Requirements for SEO Optimization

To complete the SEO setup, you need to create the following images. All images should maintain the DocuFlow brand identity with the gradient color scheme (primary: blue/purple, accent: teal/cyan).

## 🎨 Required Images

### 1. Favicon
**File**: `/public/favicon.ico`
- **Size**: 32x32px (multi-resolution ICO file recommended)
- **Format**: ICO
- **Description**: Small icon for browser tabs
- **Design**: Simplified DocuFlow logo or "DF" monogram

### 2. PWA Icons

#### Icon 72x72
**File**: `/public/icon-72.png`
- **Size**: 72x72px
- **Format**: PNG with transparency
- **Purpose**: Small PWA icon

#### Icon 96x96
**File**: `/public/icon-96.png`
- **Size**: 96x96px
- **Format**: PNG with transparency

#### Icon 128x128
**File**: `/public/icon-128.png`
- **Size**: 128x128px
- **Format**: PNG with transparency

#### Icon 144x144
**File**: `/public/icon-144.png`
- **Size**: 144x144px
- **Format**: PNG with transparency

#### Icon 152x152
**File**: `/public/icon-152.png`
- **Size**: 152x152px
- **Format**: PNG with transparency

#### Icon 192x192
**File**: `/public/icon-192.png`
- **Size**: 192x192px
- **Format**: PNG with transparency
- **Purpose**: Standard PWA icon, maskable

#### Icon 384x384
**File**: `/public/icon-384.png`
- **Size**: 384x384px
- **Format**: PNG with transparency

#### Icon 512x512
**File**: `/public/icon-512.png`
- **Size**: 512x512px
- **Format**: PNG with transparency
- **Purpose**: Large PWA icon, splash screen, maskable

### 3. Apple Touch Icon
**File**: `/public/apple-touch-icon.png`
- **Size**: 180x180px
- **Format**: PNG (no transparency, use solid background)
- **Purpose**: iOS home screen icon
- **Design**: Full-bleed logo with background

### 4. Open Graph / Social Media Image
**File**: `/public/og-image.png`
- **Size**: 1200x630px
- **Format**: PNG or JPEG
- **Purpose**: Facebook, LinkedIn, Discord previews
- **Design Elements**:
  - DocuFlow logo (top or center)
  - Tagline: "Professional PDF Editor"
  - Subtext: "Edit, Annotate, Export - 100% Private"
  - Gradient background matching brand
  - Preview of app interface (optional)
  - Text should be readable at smaller sizes

### 5. Logo
**File**: `/public/logo.png`
- **Size**: 512x512px minimum
- **Format**: PNG with transparency
- **Purpose**: General branding, schema markup
- **Design**: Full DocuFlow logo with icon and text

### 6. Screenshots

#### Desktop Screenshot
**File**: `/public/screenshot-desktop.png`
- **Size**: 1280x720px (16:9 aspect ratio)
- **Format**: PNG or JPEG
- **Purpose**: PWA app store, promotional
- **Content**: 
  - Show the main editor interface
  - PDF document loaded
  - Toolbar visible
  - Professional, clean screenshot
  - Hide any personal/sensitive info

#### Mobile Screenshot
**File**: `/public/screenshot-mobile.png`
- **Size**: 750x1334px (iPhone aspect ratio)
- **Format**: PNG or JPEG
- **Purpose**: PWA app store, mobile promotion
- **Content**:
  - Mobile-responsive view
  - Touch-optimized interface
  - Clear, usable UI elements

## 🛠️ Design Tools & Resources

### Recommended Tools
1. **Figma** (free) - Professional design tool
2. **Canva** (free) - Easy templates for social images
3. **GIMP** (free) - Open-source image editor
4. **Photopea** (free, online) - Photoshop alternative
5. **RealFaviconGenerator** (https://realfavicongenerator.net/) - Generate all icon sizes

### Color Palette (From Current Design)
```css
/* Primary Colors */
--primary-400: #60a5fa;  /* Light blue */
--primary-500: #3b82f6;  /* Blue */
--primary-600: #2563eb;  /* Dark blue */

/* Accent Colors */
--accent-400: #22d3ee;  /* Light cyan */
--accent-500: #06b6d4;  /* Cyan */

/* Background */
--surface-900: #0f172a;  /* Dark navy */
--surface-800: #1e293b;  /* Navy */
```

### Icon Generation Script (Node.js)
You can use this script to generate multiple icon sizes from one source:

```javascript
// generate-icons.js
const sharp = require('sharp');
const fs = require('fs');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const sourceImage = 'source-icon.png'; // Your high-res source (1024x1024 recommended)

sizes.forEach(size => {
  sharp(sourceImage)
    .resize(size, size, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png()
    .toFile(`public/icon-${size}.png`)
    .then(() => console.log(`Generated icon-${size}.png`))
    .catch(err => console.error(err));
});

// Apple Touch Icon (no transparency)
sharp(sourceImage)
  .resize(180, 180, { fit: 'contain', background: { r: 15, g: 23, b: 42 } })
  .png()
  .toFile('public/apple-touch-icon.png')
  .then(() => console.log('Generated apple-touch-icon.png'))
  .catch(err => console.error(err));
```

Install dependencies: `npm install sharp`

## 📋 Design Guidelines

### Icon Design (All PWA Icons)
- **Simple**: Clear at small sizes (72px)
- **Recognizable**: Instant brand recognition
- **Consistent**: Same design across all sizes
- **Safe Area**: 80% of canvas (10% padding on each side for maskable icons)
- **Background**: Transparent PNG preferred
- **Format**: PNG-24 with alpha channel

### Social Image Design (OG Image)
- **Text Size**: Large enough to read on mobile (min 60px for headlines)
- **Contrast**: High contrast for readability
- **Brand Colors**: Use consistent color scheme
- **Logo Placement**: Top-left or center
- **Call-to-Action**: Subtle but present
- **Test**: Preview at 400px width (WhatsApp/Discord size)

### Screenshot Guidelines
- **Clean UI**: Remove any clutter or test data
- **Realistic**: Show actual features
- **Professional**: High quality, crisp
- **Diverse**: Show different features if multiple screenshots
- **Privacy**: No personal information visible

## ✅ Quick Verification Checklist

After creating all images:

- [ ] All files are in `/public/` directory
- [ ] File names match exactly (case-sensitive)
- [ ] Sizes are correct (use image viewer or `file` command)
- [ ] PNGs have transparency where needed
- [ ] OG image looks good in preview (test with https://www.opengraph.xyz/)
- [ ] Icons look good at small sizes
- [ ] No compression artifacts
- [ ] Colors match brand

## 🔗 Testing Your Images

### Open Graph Testing
- **Facebook**: https://developers.facebook.com/tools/debug/
- **Twitter**: https://cards-dev.twitter.com/validator
- **LinkedIn**: https://www.linkedin.com/post-inspector/
- **Generic**: https://www.opengraph.xyz/

### PWA Testing
- **Chrome**: DevTools > Application > Manifest
- **Lighthouse**: Run PWA audit
- **Browser**: Add to Home Screen test

### Favicon Testing
- **Real Favicon Checker**: https://realfavicongenerator.net/favicon_checker
- **Browser Tabs**: Check in Chrome, Firefox, Safari

## 💡 Optional: Automated Generation

If you have a brand identity guideline or Figma file, you can use:

1. **Figma Export**: Export all sizes at once
2. **ImageMagick**: Batch resize command-line tool
3. **PWA Asset Generator**: `npm install -g pwa-asset-generator`
   ```bash
   pwa-asset-generator logo.svg public --icon-only
   ```

## 📞 Need Help?

If you don't have design skills:
- Hire on Fiverr ($5-20 for icon set)
- Use Canva templates (free)
- AI tools like DALL-E or Midjourney for initial concepts
- Stock icons from Flaticon or Icons8 (attribution required)

---

**Priority**: High (required for full SEO benefits)
**Estimated Time**: 1-3 hours with design tools
**Difficulty**: Easy to Medium (depending on design skills)

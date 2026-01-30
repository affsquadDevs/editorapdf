# SEO Setup Scripts

Helpful scripts to automate SEO setup tasks.

## 📁 Available Scripts

### 1. `update-domain.sh`
**Purpose**: Automatically replace the placeholder domain with your actual domain across all SEO files.

**Usage**:
```bash
# Make executable
chmod +x scripts/update-domain.sh

# Run with your domain
./scripts/update-domain.sh yourdomain.com
```

**What it does**:
- Replaces `docuflow.app` with your domain in:
  - `app/layout.tsx`
  - `app/sitemap.ts`
  - `app/robots.ts`
  - `public/robots.txt`
  - `public/.well-known/security.txt`
- Creates `.backup` files before making changes
- Validates domain format
- Shows summary of changes

**Example**:
```bash
./scripts/update-domain.sh myawesomepdf.com
```

---

### 2. `generate-icons.js`
**Purpose**: Generate all required icon sizes from a single source image.

**Requirements**:
```bash
npm install sharp
```

**Setup**:
1. Create a high-resolution icon (1024x1024px recommended)
2. Save as `public/source-icon.png`
3. Use transparent background
4. Keep important elements in center 80% (for maskable icons)

**Usage**:
```bash
node scripts/generate-icons.js
```

**What it generates**:
- ✅ `icon-72.png` through `icon-512.png` (PWA icons)
- ✅ `apple-touch-icon.png` (iOS)
- ✅ `logo.png` (General branding)
- ✅ `favicon-32x32.png` and `favicon-16x16.png`

**After running**:
- Convert `favicon-32x32.png` to `favicon.ico` using:
  - https://www.favicon-generator.org/
  - https://realfavicongenerator.net/

---

## 🚀 Complete Setup Workflow

### Step 1: Install Dependencies
```bash
npm install sharp
```

### Step 2: Prepare Source Icon
Create `public/source-icon.png`:
- Size: 1024x1024px
- Format: PNG with transparency
- Design: Your logo/icon
- Colors: Use your brand colors

**Design Tips**:
- Simple and recognizable
- Works at small sizes (16px)
- Centered design
- 10% padding for safe area

### Step 3: Generate Icons
```bash
node scripts/generate-icons.js
```

### Step 4: Generate Favicon.ico
Visit https://realfavicongenerator.net/ and upload `public/favicon-32x32.png`

### Step 5: Create Additional Images

#### Open Graph Image
**File**: `public/og-image.png`
- Size: 1200x630px
- Include: Logo, tagline, brand colors
- Text should be readable at 400px width

#### Screenshots
**Desktop**: `public/screenshot-desktop.png` (1280x720px)
**Mobile**: `public/screenshot-mobile.png` (750x1334px)

### Step 6: Update Domain
```bash
chmod +x scripts/update-domain.sh
./scripts/update-domain.sh yourdomain.com
```

### Step 7: Update Contact Info
Manually update:
- Email in `public/.well-known/security.txt`
- Twitter handle in `app/layout.tsx` (line ~69)
- GitHub URL in `app/layout.tsx` (line ~166)

### Step 8: Test Locally
```bash
npm run dev
```

Verify:
- [ ] Favicon appears in browser tab
- [ ] All pages load without errors
- [ ] Check `/robots.txt`
- [ ] Check `/sitemap.xml`
- [ ] Check `/manifest.json`

### Step 9: Deploy
```bash
npm run build
npm run start
```

### Step 10: Post-Deployment
See `SEO_CHECKLIST.md` for complete post-deployment tasks.

---

## 🔧 Troubleshooting

### "Module 'sharp' not found"
```bash
npm install sharp
```

### "Permission denied" on update-domain.sh
```bash
chmod +x scripts/update-domain.sh
```

### Icons look blurry
- Use higher resolution source image (2048x2048)
- Ensure source has transparent background
- Use PNG-24 format

### Domain not updating
- Check file paths are correct
- Try manual replacement with find/replace in your editor
- Check for typos in domain name

### OG image not showing on social media
- Verify size is exactly 1200x630
- Clear cache: Facebook Debugger, Twitter Card Validator
- Wait 24 hours for CDN cache to clear

---

## 📚 Additional Resources

### Design Tools
- **Figma**: https://figma.com (free)
- **Canva**: https://canva.com (free, templates)
- **GIMP**: https://gimp.org (free, open-source)
- **Photopea**: https://photopea.com (free, online)

### Icon Generators
- **RealFaviconGenerator**: https://realfavicongenerator.net/
- **Favicon.io**: https://favicon.io/
- **PWA Asset Generator**: `npm install -g pwa-asset-generator`

### Testing Tools
- **Schema Validator**: https://validator.schema.org/
- **Rich Results Test**: https://search.google.com/test/rich-results
- **OG Debugger**: https://developers.facebook.com/tools/debug/
- **Twitter Card**: https://cards-dev.twitter.com/validator

---

## 💡 Tips

### For Icon Design
1. Start with vector (SVG) if possible
2. Export to PNG at high resolution
3. Use simple, bold shapes
4. Ensure good contrast
5. Test at 16x16 to verify readability

### For OG Images
1. Use templates from Canva
2. Include clear call-to-action
3. Don't put text too close to edges
4. Use brand colors consistently
5. Test at mobile size (400px width)

### For Screenshots
1. Use incognito mode (clean browser)
2. Hide personal information
3. Use dummy/example data
4. Show key features
5. High resolution, no compression artifacts

---

## ✅ Verification Checklist

After running all scripts:

- [ ] All icon files exist in `/public/`
- [ ] Favicon appears in browser tab
- [ ] Domain is correct in all files (no "docuflow.app")
- [ ] Contact email updated in security.txt
- [ ] Social handles updated in layout.tsx
- [ ] OG image looks good (test with debugger)
- [ ] Screenshots are professional
- [ ] All files pass validation
- [ ] No console errors in browser

---

**Need Help?** See `SEO_CHECKLIST.md` or `IMAGE_REQUIREMENTS.md` for more details.

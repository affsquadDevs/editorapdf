# Favicon Setup for EditoraPDF

## Current Favicon Files

✅ **favicon.svg** - Modern SVG favicon (32x32)
- Primary favicon for modern browsers
- Scalable vector format
- Blue PDF document with checkmark icon

## Missing Files (Optional)

If you want full browser compatibility, create these files:

### favicon.ico (16x16, 32x32, 48x48 multi-size)
Use an online converter:
1. Go to https://favicon.io/favicon-converter/
2. Upload `logo.svg` or `favicon.svg`
3. Download the generated favicon.ico
4. Place it in `/public/favicon.ico`

### Apple Touch Icons (Optional)
- **apple-touch-icon.png** (180x180) - For iOS home screen
- Use the same converter to generate

### PWA Icons (Optional but recommended)
- icon-192.png (192x192)
- icon-512.png (512x512)

You can use the logo.svg to generate these at:
- https://realfavicongenerator.net/
- https://favicon.io/

## Quick Generate Command

If you have ImageMagick installed:

```bash
# Convert SVG to ICO
convert public/favicon.svg -define icon:auto-resize=16,32,48 public/favicon.ico

# Generate PNG icons
convert public/favicon.svg -resize 192x192 public/icon-192.png
convert public/favicon.svg -resize 512x512 public/icon-512.png
convert public/favicon.svg -resize 180x180 public/apple-touch-icon.png
```

## Current Browser Support

✅ Modern browsers (Chrome, Firefox, Safari, Edge) - **favicon.svg**
⚠️ Older browsers (IE11, old Safari) - Need **favicon.ico**

Next.js will automatically serve favicon.svg to modern browsers and fall back to favicon.ico for older ones if both are present.

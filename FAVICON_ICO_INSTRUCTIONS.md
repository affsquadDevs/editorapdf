# How to Create favicon.ico

## Quick Method (Online Converter)

1. Visit: https://favicon.io/favicon-converter/
2. Upload: `public/favicon.png`
3. Download the generated `favicon.ico`
4. Place it in: `public/favicon.ico`

## Alternative Methods

### Method 1: ImageMagick (if installed)
```bash
convert public/favicon.png -define icon:auto-resize=16,32,48 public/favicon.ico
```

### Method 2: Online Tools
- https://favicon.io/favicon-converter/
- https://realfavicongenerator.net/
- https://www.favicon-generator.org/

### Method 3: Using existing favicon.png
The `favicon.png` (32x32) already exists. Simply convert it to ICO format using any of the above methods.

## Verification

After creating `favicon.ico`, verify it's accessible:
- URL: `https://editorapdf.com/favicon.ico`
- Should return the icon file (not 404)

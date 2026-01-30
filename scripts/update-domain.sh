#!/bin/bash

# Script to update domain across all SEO files
# Usage: ./scripts/update-domain.sh yourdomain.com

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if domain argument is provided
if [ -z "$1" ]; then
  echo -e "${RED}Error: Domain argument is required${NC}"
  echo "Usage: ./scripts/update-domain.sh yourdomain.com"
  echo "Example: ./scripts/update-domain.sh myawesomepdfapp.com"
  exit 1
fi

NEW_DOMAIN="$1"
OLD_DOMAIN="docuflow.app"

# Validate domain format (basic check)
if [[ ! "$NEW_DOMAIN" =~ ^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$ ]]; then
  echo -e "${RED}Error: Invalid domain format${NC}"
  echo "Domain should be in format: example.com or subdomain.example.com"
  exit 1
fi

echo -e "${YELLOW}================================${NC}"
echo -e "${YELLOW}SEO Domain Update Script${NC}"
echo -e "${YELLOW}================================${NC}"
echo ""
echo -e "Old domain: ${RED}$OLD_DOMAIN${NC}"
echo -e "New domain: ${GREEN}$NEW_DOMAIN${NC}"
echo ""
read -p "Continue with domain replacement? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo -e "${YELLOW}Cancelled.${NC}"
  exit 0
fi

echo ""
echo -e "${YELLOW}Updating files...${NC}"
echo ""

# Array of files to update
FILES=(
  "app/layout.tsx"
  "app/sitemap.ts"
  "app/robots.ts"
  "public/robots.txt"
  "public/.well-known/security.txt"
)

# Track success
SUCCESS_COUNT=0
TOTAL_COUNT=${#FILES[@]}

# Update each file
for FILE in "${FILES[@]}"; do
  if [ -f "$FILE" ]; then
    # Create backup
    cp "$FILE" "$FILE.backup"
    
    # Replace domain
    if [[ "$OSTYPE" == "darwin"* ]]; then
      # macOS
      sed -i '' "s/${OLD_DOMAIN}/${NEW_DOMAIN}/g" "$FILE"
    else
      # Linux
      sed -i "s/${OLD_DOMAIN}/${NEW_DOMAIN}/g" "$FILE"
    fi
    
    echo -e "${GREEN}✓${NC} Updated: $FILE"
    ((SUCCESS_COUNT++))
  else
    echo -e "${RED}✗${NC} File not found: $FILE"
  fi
done

echo ""
echo -e "${YELLOW}================================${NC}"
echo -e "${GREEN}Updated $SUCCESS_COUNT/$TOTAL_COUNT files${NC}"
echo -e "${YELLOW}================================${NC}"
echo ""
echo -e "${YELLOW}Backup files created with .backup extension${NC}"
echo -e "${YELLOW}If something went wrong, restore with:${NC}"
echo "  mv app/layout.tsx.backup app/layout.tsx"
echo ""
echo -e "${GREEN}✓ Domain update complete!${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Review the changes in each file"
echo "2. Update Twitter handle in app/layout.tsx if different"
echo "3. Update contact email in public/.well-known/security.txt"
echo "4. Create required images (see IMAGE_REQUIREMENTS.md)"
echo "5. Test locally: npm run dev"
echo "6. Deploy to production"
echo "7. Submit sitemap to search engines"
echo ""
echo -e "${GREEN}For detailed instructions, see SEO_CHECKLIST.md${NC}"

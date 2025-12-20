# 90toZero Assets Guide

## Overview
This directory contains all visual assets used in the 90toZero landing page.

## Directory Structure

```
public/images/
├── logos/
│   └── companies/          # Company partner logos
│       ├── tcs.png
│       ├── infosys.png
│       ├── wipro.png
│       ├── accenture.png
│       ├── deloitte.png
│       ├── kpmg.png
│       ├── ey.png
│       ├── pwc.png
│       ├── amazon.png
│       ├── google.png
│       ├── microsoft.png
│       ├── flipkart.png
│       ├── paytm.png
│       ├── zomato.png
│       └── swiggy.png
├── icons/                  # SVG icons for industries & user types
│   ├── technology.svg      ✅ Created
│   ├── consulting.svg      ✅ Created
│   ├── finance.svg         ✅ Created
│   ├── healthcare.svg      ✅ Created
│   ├── ecommerce.svg       ✅ Created
│   ├── banking.svg         ✅ Created
│   ├── fintech.svg         ✅ Created
│   ├── startups.svg        ✅ Created
│   ├── user-candidate.svg  ✅ Created
│   ├── user-company.svg    ✅ Created
│   └── user-nbfc.svg       ✅ Created
└── avatars/                # Future: Real user testimonial photos
```

## Component Usage

### LogoMarquee Component
**Location:** `src/components/landing/LogoMarquee.tsx`

**Uses:**
- **Company Logos:** All 15 PNG files from `logos/companies/`
- **Industry Icons:** All 8 SVG files (technology, consulting, finance, healthcare, ecommerce, banking, fintech, startups)

**Features:**
- Infinite scroll marquee (companies scroll left, industries scroll right)
- Grayscale hover effect on company logos
- Automatic fallback to text if logo missing
- Responsive design with gradient fade edges

**Status:**
- ✅ Icons: All created and working
- ⏳ Logos: Need to be downloaded (see instructions below)

### BetaTestimonials Component
**Location:** `src/components/landing/BetaTestimonials.tsx`

**Uses:**
- **User Avatar:** `icons/user-candidate.svg` (for all 3 testimonials)

**Features:**
- Professional avatar icons instead of emojis
- Circular avatar with gradient background
- Scales proportionally

**Status:** ✅ Complete

### SpeakWithUs Component
**Location:** `src/components/landing/SpeakWithUs.tsx`

**Uses:**
- `icons/user-candidate.svg` - Job Seeker tab
- `icons/user-company.svg` - Company tab
- `icons/user-nbfc.svg` - NBFC Partner tab

**Features:**
- Tab-based user type selection
- Icons displayed in both tab buttons and detail panels
- Responsive sizing (48x48px in tabs, 64x64px in details)

**Status:** ✅ Complete

## How to Download Company Logos

### Option 1: Using the Helper Script
```bash
cd frontend
./download-logos.sh
```
This displays all download instructions and specifications.

### Option 2: Manual Download

#### Indian IT Companies
1. **TCS** → https://www.tcs.com (footer or press page)
2. **Infosys** → https://www.infosys.com (footer or about page)
3. **Wipro** → https://www.wipro.com (footer or media page)

#### Global Tech Companies
4. **Amazon** → https://www.amazon.jobs/en/landing_pages/logo
5. **Google** → https://about.google/brand-resource-center/
6. **Microsoft** → https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks
7. **Flipkart** → https://www.flipkart.com (footer or about page)

#### Consulting Firms
8. **Accenture** → https://www.accenture.com (press page)
9. **Deloitte** → https://www2.deloitte.com (about/media page)
10. **KPMG** → https://home.kpmg (brand center)
11. **EY** → https://www.ey.com (about page)
12. **PwC** → https://www.pwc.com (about/media page)

#### Indian Startups
13. **Paytm** → https://paytm.com (footer or about page)
14. **Zomato** → https://www.zomato.com (footer or about page)
15. **Swiggy** → https://www.swiggy.com (footer or about page)

### Option 3: Free Logo Resources
- **Brandfetch:** https://www.brandfetch.com/ (best quality, official logos)
- **WorldVectorLogo:** https://worldvectorlogo.com/ (vector formats)
- **LogoDownload:** https://logodownload.org/ (PNG/SVG downloads)
- **Clearbit Logo API:** `https://logo.clearbit.com/tcs.com` (dynamic)

## Logo Specifications

### Required Format
- **File Type:** PNG (with transparent background preferred)
- **Aspect Ratio:** ~3:1 (e.g., 200x60px, 300x100px)
- **Max Height:** 40-60px (will be displayed at 32px height - h-8)
- **File Size:** < 50KB per logo (for web optimization)
- **Color:** Full color (grayscale filter applied via CSS on load)

### Naming Convention
All lowercase, no spaces:
```
tcs.png        ✅ Correct
TCS.png        ❌ Incorrect
tcs-logo.png   ❌ Incorrect
```

### Where to Save
```bash
/Users/namanshukla/Downloads/CODING/90toZero/frontend/public/images/logos/companies/
```

## Testing Your Logos

### Check if logos are loading:
1. Start the dev server: `npm run dev`
2. Open browser to http://localhost:5173
3. Look for the "Target Partners & Industries" section
4. Open browser DevTools → Network tab → Filter by "images"
5. Check for 404 errors on logo files

### Fallback Behavior
If a logo is missing, the component automatically:
1. Hides the `<img>` element
2. Shows company name as text (previously hidden)
3. No console errors, graceful degradation

## Icon Details

All SVG icons are custom-created with:
- **Size:** 24x24 viewBox (scales automatically)
- **Colors:** Brand-aligned (blue, purple, green, red, orange, etc.)
- **Style:** Outline style with 2px stroke
- **Format:** Inline SVG code (no external dependencies)

### Icon Color Mapping
- 💻 Technology → Blue (#3B82F6)
- 📊 Consulting → Purple (#8B5CF6)
- 💳 Finance → Green (#10B981)
- 🏥 Healthcare → Red (#EF4444)
- 🛍️ E-commerce → Orange (#F59E0B)
- 🏦 Banking → Indigo (#6366F1)
- 📱 Fintech → Teal (#14B8A6)
- 🚀 Startups → Pink (#EC4899)

## Future Enhancements

### Phase 2: Real Testimonial Photos
Location: `public/images/avatars/`
- Replace SVG avatars with actual user photos (with permission)
- Format: 96x96px circular crop, JPG or PNG
- Naming: `priya-sharma.jpg`, `rahul-kumar.jpg`, etc.

### Phase 3: Additional Icons
- Payment provider logos (Razorpay, Paytm, etc.)
- Trust badges (SSL, SOC2, RBI, etc.)
- Feature icons (clock, shield, graph, etc.)

## Legal & Compliance

### Trademark Usage
All company logos are trademarks of their respective owners. Usage guidelines:
1. **Non-endorsement:** Disclaimer added ("Target companies... partnerships under development")
2. **No distortion:** Logos displayed as-is, grayscale filter only
3. **Removable:** Can be removed upon request from trademark holder
4. **Educational/informational purpose:** Showing target markets, not claiming partnerships

### Best Practices
- Always download from official brand resources when possible
- Maintain original aspect ratios
- Don't modify logo colors or design
- Include alt text with company name
- Keep disclaimer visible

## Optimization Tips

### Before Committing Logos
```bash
# Install imagemagick (if needed)
brew install imagemagick

# Optimize all logos
cd public/images/logos/companies
for img in *.png; do
  convert "$img" -resize x60 -strip -quality 85 "$img"
done
```

### Check file sizes
```bash
ls -lh public/images/logos/companies/
# All files should be < 50KB
```

## Quick Reference

| Component | Assets Used | Status |
|-----------|-------------|--------|
| LogoMarquee | 15 company logos + 8 industry icons | Icons ✅, Logos ⏳ |
| BetaTestimonials | 1 user avatar icon | ✅ Complete |
| SpeakWithUs | 3 user type icons | ✅ Complete |

**Total Assets:**
- ✅ 11 SVG icons (all created)
- ⏳ 15 company logos (need download)

## Support

For issues or questions:
1. Check browser DevTools Console for errors
2. Verify file paths match exactly
3. Ensure file permissions allow reading
4. Clear browser cache if logos don't update

## Next Steps

1. **Download Logos:** Run `./download-logos.sh` for instructions
2. **Save to Directory:** Place all 15 PNG files in `public/images/logos/companies/`
3. **Test:** Start dev server and verify marquee displays logos
4. **Optimize:** Compress images if needed (target < 50KB each)
5. **Commit:** Add to git once all logos are in place

---

**Last Updated:** December 20, 2025
**Maintained By:** 90toZero Dev Team

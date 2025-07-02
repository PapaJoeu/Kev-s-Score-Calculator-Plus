# Icons Implementation Guide

## Overview
This folder contains icons for the Score Calculator interface. All icons are currently **placeholder SVGs** that need to be replaced with final artwork.

## File Structure
```
assets/icons/
├── main/                    # Final main logo location
├── sections/                # Final section icons location  
├── placeholders/            # Current placeholder files (REPLACE THESE)
│   ├── scoreboard-placeholder.svg
│   ├── parents-placeholder.svg
│   ├── child-placeholder.svg
│   └── poe-placeholder.svg
└── README.md               # This file
```

## Icon Requirements

### 1. Scoreboard Logo (Main Header)
- **File**: `scoreboard-placeholder.svg` → Replace with final design
- **Theme**: Sports scoreboard with digital display
- **Size**: 32px × 32px (desktop), 28px × 28px (mobile)
- **Color**: Black and white SVG
- **Usage**: Left of main page title "Kev's Bitchin' Score Calculator"

### 2. Sheet Icon (Photo)
- **File**: `sheet-photo.jpg` or `sheet-photo.png` → Replace with your photo
- **Theme**: Personal photo (woman with brown hair as provided)
- **Concept**: Sheet as "parent" container holding documents
- **Size**: 24px × 24px (desktop), 20px × 20px (mobile)
- **Format**: JPG, PNG, or any web image format
- **Styling**: Maintains original aspect ratio, no cropping
- **Usage**: Left of "SHEET" section header

### 3. Document Icon (Child)
- **File**: `child-placeholder.svg` → Replace with final design
- **Theme**: Child/boy figure silhouette
- **Concept**: Document as "child" contained within sheet "parent"
- **Size**: 24px × 24px (desktop), 20px × 20px (mobile)
- **Color**: Black and white SVG
- **Usage**: Left of "DOCUMENT" section header

### 4. Gutter Icon (Edgar Allan Poe)
- **File**: `poe-placeholder.svg` → Replace with final design
- **Theme**: Edgar Allan Poe portrait silhouette or raven symbol
- **Concept**: "Gutter" reference to printing/publishing (Poe as writer)
- **Size**: 24px × 24px (desktop), 20px × 20px (mobile)
- **Color**: Black and white SVG
- **Usage**: Left of "GUTTER" section header

## How to Replace Placeholders

### Option 1: Replace Placeholder Files
1. Create your final icon files (SVG or photo formats):
   - `scoreboard-placeholder.svg` (scoreboard design)
   - `sheet-photo.jpg` or `sheet-photo.png` (your photo)
   - `child-placeholder.svg` (child figure)
   - `poe-placeholder.svg` (Poe/raven design)
2. Replace the files in `assets/icons/placeholders/`
3. No code changes needed - photos keep their original aspect ratio!

### Option 2: Use Final File Structure
1. Place final icons in appropriate folders:
   - `assets/icons/main/scoreboard-logo.svg`
   - `assets/icons/sections/sheet-parents.svg`
   - `assets/icons/sections/document-child.svg`
   - `assets/icons/sections/gutter-poe.svg`
2. Update HTML file paths in `index.html`:
   ```html
   <!-- Update these src paths -->
   <img src="assets/icons/main/scoreboard-logo.svg" alt="Scoreboard" class="main-logo">
   <img src="assets/icons/sections/sheet-parents.svg" alt="Sheet" class="section-icon">
   <img src="assets/icons/sections/document-child.svg" alt="Document" class="section-icon">
   <img src="assets/icons/sections/gutter-poe.svg" alt="Gutter" class="section-icon">
   ```

## Technical Specifications

### SVG Requirements
- **Format**: SVG (Scalable Vector Graphics)
- **Colors**: Black and white only
- **Stroke width**: 1-2px for optimal visibility
- **ViewBox**: Match placeholder dimensions
- **Optimization**: Keep file sizes small (<5KB each)

### Accessibility
- Icons are decorative and include proper `alt` attributes
- Icons enhance visual understanding but don't affect functionality
- Text remains primary source of information

### Responsive Behavior
- Icons automatically resize based on screen size
- Mobile: 20px/28px, Desktop: 24px/32px
- Proper spacing maintained at all sizes

## Testing Checklist
- [ ] Icons load correctly in all browsers
- [ ] Mobile sizing works properly
- [ ] Icons align correctly with text
- [ ] Black and white theme consistent
- [ ] File sizes optimized
- [ ] Alt text descriptive but concise

## Current Status
✅ **Implemented**: Placeholder system, CSS styling, HTML integration  
⚠️ **Pending**: Final icon artwork replacement  
🎯 **Next**: Replace placeholder SVGs with final designs

---
**Last Updated**: July 2, 2025  
**Implementation**: Complete (pending final artwork)  
**Ready for**: Final icon file replacement

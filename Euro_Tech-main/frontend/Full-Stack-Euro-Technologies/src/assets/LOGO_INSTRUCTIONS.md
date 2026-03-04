# Logo Instructions

## Add Your Company Logo

To display the Eurocore Technologies logo in the header:

1. Place your logo image file in this `assets` folder
2. Name it `logo.png` (or update the filename in `header.component.html`)
3. Recommended logo specifications:
   - Format: PNG with transparent background
   - Dimensions: 200x50 pixels (or similar aspect ratio)
   - File size: Under 100KB for optimal loading

## Current Implementation

The logo is referenced in:
- `src/app/components/header/header.component.html`

If the logo file is not found, it will be hidden automatically and only the text "Eurocore Technologies" will display.

## Alternative: Use Icon Only

If you prefer to use only the icon without a logo image, you can remove the `<img>` tag from the header component.

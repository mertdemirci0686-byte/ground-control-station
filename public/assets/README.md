# Assets Directory

This directory contains static assets for the Ground Control Station application.

## Structure

- `images/` - Application images and icons
- `fonts/` - Custom fonts (if any)
- `videos/` - Demo videos or tutorials
- `sounds/` - Audio notifications and alerts

## Usage

Assets in this directory are copied to the build output and can be referenced using relative paths from the public directory.

Example:
```jsx
<img src="/assets/images/logo.png" alt="Logo" />
```

## Guidelines

- Keep assets optimized for web delivery
- Use appropriate file formats (WebP for images, etc.)
- Organize assets in subdirectories by type
- Document any third-party assets with proper attribution

# ❄️ SnowGlobe.js v1.0

![Demo](https://media.giphy.com/media/your-demo-gif.gif)

Beautiful interactive snow effects with 8 curated presets and full customization.

## Features

- 8 themed presets (`winter`, `blizzard`, `frosty`, etc.)
- Mouse interaction system
- GPU-optimized animations
- Tiny footprint (~3KB gzipped)
- Framework agnostic

## Installation

```bash
npm install snowglobejs
```

Or via CDN:
```html
<script src="https://cdn.jsdelivr.net/npm/snowglobejs@1.0/dist/snowglobe.min.js"></script>
```

## Basic Usage

```javascript
// Simple implementation
addSnow(document.body);

// With preset
addSnow(containerElement, 'blizzard');

// With custom options
addSnow(containerElement, {
  speed: 8,
  count: 100,
  wind: true
});
```

[View full documentation →](docs/API.md)
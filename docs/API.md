# ❄️ SnowGlobe.js Documentation

## Table of Contents
- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Presets](#presets)
- [API Reference](#api-reference)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)

## Installation

### Via NPM
```bash
npm install snowglobejs
```

### Via CDN
```html
<script src="https://cdn.jsdelivr.net/npm/snowglobejs@1.0/dist/snowglobe.min.js"></script>
```

## Basic Usage

```javascript
// Simplest implementation
addSnow(document.getElementById('container'));

// With options
addSnow(containerElement, {
  speed: 8,
  count: 100,
  color: '#e0f7fa'
});
```

## Presets

| Preset      | Description                  | Preview |
|------------|----------------------------|---------|
| `winter`   | Gentle classic snowfall     | ![Winter](../images/winter-preview.gif) |
| `blizzard` | Intense snowstorm           | ![Blizzard](../images/blizzard-preview.gif) |
| `frosty`   | Light playful flakes        | ![Frosty](../images/frosty-preview.gif) |
| `enchanted`| Magical fairy-tale snow     | ![Enchanted](../images/enchanted-preview.gif) |
| `avalanche`| Heavy, fast snowfall       | ![Avalanche](../images/avalanche-preview.gif) |
| `whisper`  | Delicate, barely-there snow| ![Whisper](../images/whisper-preview.gif) |
| `snowdance`| Swirling, dancing flakes    | ![Snowdance](../images/snowdance-preview.gif) |
| `northpole`| Christmas-themed snow       | ![Northpole](../images/northpole-preview.gif) |

## API Reference

### `addSnow(container, [options])`
Creates a new snow effect instance.

**Parameters:**
- `container` (HTMLElement): DOM element to contain the effect
- `options` (Object|String): Configuration object or preset name

**Available Options:**
| Option        | Type    | Default | Description |
|--------------|---------|---------|-------------|
| `speed`      | Number  | 5       | Falling speed (1-20) |
| `interaction`| Number  | 15      | Mouse influence strength (0-50) |
| `count`      | Number  | 50      | Number of flakes (10-500) |
| `size`       | Number  | 1       | Base flake size (0.5-3) |
| `opacity`    | Number  | 0.8     | Base opacity (0.1-1) |
| `color`      | String  | '#ffffff'| Flake color |
| `wind`       | Boolean | false   | Enable wind effect |
| `windSpeed`  | Number  | 1       | Wind strength (-5 to 5) |
| `twinkle`    | Boolean | false   | Enable twinkling effect |
| `shape`      | String  | '•'     | Flake character/symbol |

### Instance Methods
```javascript
const snow = addSnow(container);
```

| Method | Description |
|--------|-------------|
| `snow.updateOptions(newOptions)` | Updates configuration |
| `snow.usePreset(presetName)` | Applies a preset |
| `snow.getPresetNames()` | Returns available presets |
| `snow.addFlakes(count)` | Adds more flakes |
| `snow.removeFlakes(count)` | Removes flakes |
| `snow.pause()` | Pauses animation |
| `snow.resume()` | Resumes animation |
| `snow.destroy()` | Removes effect completely |

## Examples

### Basic Setup
[View basic example](examples/basic-setup.md)

### Using Presets
[View presets example](examples/presets.md)

### Advanced Controls
[View advanced example](examples/advanced.md)

## Troubleshooting

**Q: Snowflakes aren't appearing**
- Verify container has non-zero dimensions
- Check for CSS conflicts (overflow: hidden, etc.)

**Q: Performance issues with many flakes**
- Reduce flake count
- Use simpler shapes
- Disable twinkle effect

**Q: Mouse interaction not working**
- Ensure container isn't blocking pointer events
- Check interaction value > 0
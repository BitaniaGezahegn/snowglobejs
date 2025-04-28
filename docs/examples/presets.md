# Presets Example

```javascript
// Switch between presets dynamically
const container = document.getElementById('snow-container');
const snow = addSnow(container, 'winter');

document.getElementById('blizzard-btn').addEventListener('click', () => {
  snow.usePreset('blizzard');
});
```
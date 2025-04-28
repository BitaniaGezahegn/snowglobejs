# Basic Setup Example

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    #snow-container {
      height: 100vh;
      background: #121212;
    }
  </style>
</head>
<body>
  <div id="snow-container"></div>
  <script src="https://cdn.jsdelivr.net/npm/snowglobejs@1.0/dist/snowglobe.min.js"></script>
  <script>
    addSnow(document.getElementById('snow-container'));
  </script>
</body>
</html>
```
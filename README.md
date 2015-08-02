# slicr
A spritesheet utility for webgames

# Installation
```
$ npm install slicr
```

# Usage
*slicr* takes two parameters and returns a promise.

```javascript
slicr(src, options) -> Promise([Image])
```

### src
The src url of the image, or a preloaded image element. Returns a promise either way.

### options
```javascript
{
  width // the width of the individual tile
  height // the height of the individual tile
  slices // the amount of slices, overrules width if width is defined
}
```
alternatively pass a number representing the amount of slices

## Example
```javascript
var slicr = require('slicr');

slicr('my_tileset.png', 3)
  .then(function(tiles) {
    for (var i = 0; i < tiles.length; i++) {
      document.body.appendChild(tiles[i]);
    }
  });

slicr('my_2d_tileset.png', { width: 16, height: 16 })
  .then(function(tiles) {
    for (var i = 0; i < tiles.length; i++) {
      document.body.appendChild(tiles[i]);
    }
  });
```

## License
The MIT License (MIT)

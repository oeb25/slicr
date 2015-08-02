// slicr :: ((String|Image), (Object|Number)) -> Promise([Image])
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = slicr;
exports.slicrAll = slicrAll;

function slicr(img, ops) {
  if (typeof img === 'string') {
    return loadImage(img).then(function (img) {
      return slicr(img, ops);
    });
  }

  if (!img.width) {
    throw new Error('Image is not yet loaded, or has a width of 0');
  }

  if (typeof ops == 'number') {
    ops = { slices: ops };
  }

  var width = ops.slices ? Math.floor(width / ops.slices) : ops.width || img.width;

  var height = ops.height || img.height;

  var hslices = ops.slices || Math.floor(img.width / width);
  var vslices = Math.floor(img.height / height);

  var canvases = new Array(vslices * hslices).join(',').split(',').map(function (_, i) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;

    var x = i % hslices * width;
    var y = Math.floor(i / hslices) * height;

    ctx.drawImage(img, x, y, width, height, 0, 0, width, height);

    return canvas;
  });

  return new Promise(function (resolve) {
    resolve(canvases);
  });
}

// loadImage :: String -> Promise(Image)
function loadImage(url) {
  var img = document.createElement('img');
  var didResolve = false;

  return new Promise(function (resolve, reject) {
    var notFound = setTimeout(function () {
      if (didResolve) return;

      reject('Error in loading image');
    }, 3000);;

    img.addEventListener('load', function () {
      didResolve = true;

      clearTimeout(notFound);

      resolve(img);
    });

    img.src = url;
  });
}

// slicrAll :: [Object] -> Promise([[Image]])

function slicrAll(arr) {
  return Promise.all(arr.map(function (a) {
    return slicr(a.src, a);
  }));
}
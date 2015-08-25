"use strict";

// slicr :: (Image, (Object|Number)) -> [Image]
exports["default"] = slicr;


// slicr :: (String, (Object|Number)) -> Promise([Image])
exports.async = async;


// slicrAll :: [Object] -> Promise([[Image]])
exports.slicrAll = slicrAll;
function slicr(img, ops) {
  if (typeof img == "string") {
    console.error("slicr is now synchronous. That means you will have to pass a image object instead of a string. For previous results use slicr.async instead.");
    return async(img, ops);
  }

  if (!img.width) {
    throw new Error("Image is not yet loaded, or has a width of 0");
  }

  if (typeof ops == "number") {
    ops = { slices: ops };
  }

  var width = ops.slices ? Math.floor(img.width / ops.slices) : ops.width || img.width;

  var height = ops.height || img.height;

  var hslices = ops.slices || Math.floor(img.width / width);
  var vslices = Math.floor(img.height / height);

  var canvases = new Array(vslices * hslices).join(",").split(",").map(function (_, i) {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");

    canvas.width = width;
    canvas.height = height;

    var x = i % hslices * width;
    var y = Math.floor(i / hslices) * height;

    ctx.drawImage(img, x, y, width, height, 0, 0, width, height);

    return canvas;
  });

  return canvases;
}function async(url, ops) {
  return loadImage(url).then(function (img) {
    return slicr(img, ops);
  });
}

slicr.async = async;

// loadImage :: String -> Promise(Image)
function loadImage(url) {
  var img = document.createElement("img");
  var didResolve = false;

  return new Promise(function (resolve, reject) {
    var notFound = setTimeout(function () {
      if (didResolve) return;

      reject("Error in loading image");
    }, 3000);;

    img.addEventListener("load", function () {
      didResolve = true;

      clearTimeout(notFound);

      resolve(img);
    });

    img.src = url;
  });
}function slicrAll(arr) {
  return Promise.all(arr.map(function (a) {
    return slicr(a.src, a);
  }));
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
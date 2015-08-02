// slicr :: ((String|Image), (Object|Number)) -> Promise([Image])
export default function slicr(img, ops) {
  if (typeof img === 'string') {
    return loadImage(img).then(img => slicr(img, ops));
  }

  if (!img.width) {
    throw new Error('Image is not yet loaded, or has a width of 0');
  }

  if (typeof ops == 'number') {
    ops = { slices: ops };
  }

  let width =
    ops.slices ? Math.floor(width / ops.slices) :
    ops.width || img.width;

  let height = ops.height || img.height;

  let hslices = ops.slices || Math.floor(img.width / width)
  let vslices = Math.floor(img.height / height);

  let canvases = new Array(vslices * hslices).join(',').split(',').map((_, i) => {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;

    let x = (i % hslices) * width;
    let y = Math.floor(i / hslices) * height;

    ctx.drawImage(img, x, y, width, height, 0, 0, width, height);

    return canvas
  });

  return new Promise((resolve) => {
    resolve(canvases);
  });
}

// loadImage :: String -> Promise(Image)
function loadImage(url) {
  let img = document.createElement('img');
  let didResolve = false;

  return new Promise((resolve, reject) => {
    let notFound = setTimeout(() => {
      if (didResolve) return;

      reject('Error in loading image');
    }, 3000);;

    img.addEventListener('load', () => {
      didResolve = true;

      clearTimeout(notFound);

      resolve(img);
    });

    img.src = url;
  });
}

// slicrAll :: [Object] -> Promise([[Image]])
export function slicrAll(arr) {
  return Promise.all(arr.map(a => slicr(a.src, a)));
}

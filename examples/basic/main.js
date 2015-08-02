import slicr from '../../';

let a = slicr('assets/grass.png', 3);
let b = slicr('assets/grass.png', { width: 16 });
let c = slicr('assets/grass.png', { width: 16, height: 16 });

let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');

document.body.appendChild(canvas);

Promise.all([a,b,c])
  .then((imgs, huh) =>
    imgs.map(img =>
      img.map(v => document.body.appendChild(v))));

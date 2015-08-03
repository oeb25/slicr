import slicr from '../src/slicr';

let a = slicr('grass.png', 3);
let b = slicr('grass.png', { width: 16 });
let c = slicr('grass.png', { width: 16, height: 16 });

Promise.all([a,b,c])
  .then((imgs, huh) =>
    imgs.map(img =>
      img.map(v => document.body.appendChild(v))));

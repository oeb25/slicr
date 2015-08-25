import slicr from '../src/slicr';

let draw = tilesets =>
  tilesets.map(tileset =>
    tileset.map(tile => document.body.appendChild(tile)));

let grass = new Image();
grass.onload = () => {
  draw([
    slicr(grass, 3),
    slicr(grass, { width: 16 }),
    slicr(grass, { width: 16, height: 16 })
  ]);
};

grass.src = 'grass.png';

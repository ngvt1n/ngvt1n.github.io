const RATE = 0
const ymax_ch = 20;
const xmax_ch = 58;
const ymax_pt = ymax_ch * 4;
const xmax_pt = xmax_ch * 2;
const xoff = 25;
const yoff = 65;


const rows = 12;
const cols = 12;
let cy = 7; //center
let cx = 7; // center 

const g_map_braille = [
  [0, 1, 2, 6],
  [3, 4, 5, 7]
];

let frame = []
let buffer1 = []
let buffer2 = []

buffer(buffer1);
buffer(buffer2);

function buffer(b) {
  for (let y = 0; y < ymax_pt; y++) {
    b[y] = [];
    for (let x = 0; x < xmax_pt; x++) {
    }
  }
}

// function advance_buffer(buffer1, buffer2) {
//   for (let y = 1; y < ymax_pt - 1; y++) {
//     for (let x = 1; x < xmax_pt - 1; x++) {
//       buffer2[y][x] = ((buffer1[y - 1][x] + buffer1[y][x - 1] + buffer1[y + 1][x] + buffer1[y][x + 1]) >> 1) - buffer1[y][x];
//       buffer2[y][x] *= .5;
//     }
//   }
//   return [buffer2, buffer1];
// }

function advance_buffer(buffer) {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let r = Math.sqrt((cx - x) * (cx - x) + (cy - y) * (cy - y));
      buffer[y][x] = Math.sin(2 * r - count / 3);
      // buffer[y][x] = (y + x + count) % 3 + .1;
    }
  }
  return buffer;
}

function drawline(x1, y1, x2, y2) {
  // console.log("drawline", x1, y1, x2, y2);
  let dx = Math.abs(x2 - x1);
  let dy = Math.abs(y2 - y1);
  let sx = (x1 < x2) ? 1 : -1;
  let sy = (y1 < y2) ? 1 : -1;
  let err = dx - dy;
  let length = dx > dy ? dx : dy;

  if (dx + dx > xmax_pt * ymax_pt) return;

  for (let i = 0; i < length; ++i) {
    // setPixel(Math.round(y1), Math.round(x1)); // Round to nearest integer
    setPixel(Math.round(y1), Math.round(x1)); // Round to nearest integer
    let e2 = 2 * err;
    if (e2 > -dy) { err -= dy; x1 += sx; }
    if (e2 < dx) { err += dx; y1 += sy; }
  }
}


function clear(frame) {
  for (let y = 0; y < ymax_ch; y++) {
    frame[y] = [];
    for (let x = 0; x < xmax_ch; x++) {
      frame[y][x] = 0;
    }
  }
}

function setPixel(y, x) {
  let cellX = Math.floor(x / 2);
  let cellY = Math.floor(y / 4);
  if (cellX < 0 || cellX >= xmax_ch || cellY < 0 || cellY >= ymax_ch) return;
  let dotX = x % 2;
  let dotY = y % 4;

  const bit = g_map_braille[dotX][dotY];
  frame[cellY][cellX] |= 1 << bit;
}

function plot3d(buffer) {
  // r = x + cos(theta) y + 0z =  5x + 3y 
  // c = 0x -sin(theta) y - z  =  - 5y - 5z
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (x != 0) {
        drawline(
          xoff + 5 * (x - 1) + 3 * y, yoff - 5 * y - 5 * buffer[y][x - 1],
          xoff + 5 * (x - 0) + 3 * y, yoff - 5 * y - 5 * buffer[y][x]);
      }
      if (y != 0) {
        drawline(
          xoff + 5 * x + 3 * (y - 1), yoff - 5 * (y - 1) - 5 * buffer[y - 1][x],
          xoff + 5 * x + 3 * (y - 0), yoff - 5 * y - 5 * buffer[y][x]);
      }
    }
  }
}

function render_frame(frame) {
  let output = [];
  for (let row of frame) {
    let line = [];
    for (let cell of row) {
      line.push(String.fromCharCode(cell + 0x2800));
    }
    output.push(line);
  }
  for (let x = 6; x < xmax_ch; x+=2) {
    output[ymax_ch - 1][x] = '_'
    output[ymax_ch - 1][x + 1] = '/'
  }
  output[ymax_ch - 1][xmax_ch - 1] = '>';
  output[ymax_ch - 1][xmax_ch] = ' x';
  for (let y = 0; y < ymax_ch; y+=2) {
    output[y][6] = '|'
    output[y + 1][6] = '-'
  }
  output[0][6] = '^';
  output[1][5] = 'z';

  for (let i = 1; i < 12; i++) {
    output[ymax_ch - 1 - i][6 + i] = '/';
    output[ymax_ch - 1 - i][6 + i + 1] = '_';
  }

  output[ymax_ch - 1][6] = 'O';
  output[ymax_ch - 1 - 12][6 + 12] = '/';
  output[ymax_ch - 1 - 12][6 + 12] = 'y';
  return output.map(row => row.join("")).join("\n");
}


const plot = document.getElementById('plot3d');
let count = 0;
advance_frame();

const plot_bound = plot.getBoundingClientRect();
const plot_px2pt_y = plot_bound.height / ymax_pt;
const plot_px2pt_x = plot_bound.width / xmax_pt;

// plot.addEventListener('mousemove', function(e) {
//   let r = e.offsetX;
//   let c = e.offsetY;
//   cy = Math.round(-.2 * (c / plot_px2pt_y - yoff))
//   cx = Math.round(.2 * (r / plot_px2pt_x - xoff - 3 * cy));
//   advance_frame();
//   count += 0.5;
// });

function advance_frame() {
  clear(frame);
  buffer2 = advance_buffer(buffer2);
  plot3d(buffer2);
  return render_frame(frame);
}

function plotframes_generator(_) {
  let frames = [];
  for(count = 0; count < 19; count++) {
      frames.push(advance_frame());
  }
  return frames;
}

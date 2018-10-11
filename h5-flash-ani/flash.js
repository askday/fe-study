const canvas = document.getElementsByTagName('canvas')[0];
const ctx = canvas.getContext('2d');
let _step;
let _timer;
let _lightCount = 40;
let _lightWidth;

let _imgData;
let _poiData;
let _percent;

function ina(sx, sy, ex, ey, kai, hai, bai) {
  const rx = (ex - sx) / 3;
  const ry = (ey - sy) / 3;
  let a = (Math.random() - 0.5) * bai;
  const x1 = sx + rx - ry * a;
  const y1 = sy + ry + rx * a;
  a = (Math.random() - 0.5) * bai;
  const x2 = sx + rx * 2 - ry * a;
  const y2 = sy + ry * 2 + rx * a;
  if (kai) {
    ina(sx, sy, x1, y1, kai - 1, hai, bai);
    ina(x1, y1, x2, y2, kai - 1, hai, bai);
    ina(x2, y2, ex, ey, kai - 1, hai, bai);
  } else {
    hai.push(sx, sy, x1, y1, x2, y2);
  }
}

function duma(sx, sy, ex, ey, kai, s) {
  let a; let b; let c; let d;
  for (c = 0; c < 3; c++) {
    a = [];
    ina(sx, sy, ex, ey, kai, a, 1.3);
    a.push(ex, ey);
    ctx.beginPath();
    for (b = 0; b < a.length; b += 2) ctx.lineTo(a[b], a[b + 1]);

    for (d = 0; d < 3; d++) {
      ctx.lineWidth = s + d * 2;
      ctx.stroke();
    }
  }
}

function pika(tx, ty, s) {
  let a; let b; let c; let r;
  let x; let y; let p;
  s *= 1 - Math.random() / 3;
  const max = (20 + s * 7) || 0;
  r = 0;
  for (c = 0; c < 3; c++) {
    p = [];
    for (a = 0; a < max; a++) {
      b = 0.1 + Math.random();
      x = Math.cos(r) * (b + c / 2);
      y = Math.sin(r) * (b + c / 2);
      p.push([x, y]);
      r += Math.PI * 2 / max;
    }
    ctx.beginPath();
    for (a = 0; a < max; a++) ctx.lineTo(tx + p[a][0] * s, ty + p[a][1] * s);
    ctx.fill();
  }

  ctx.beginPath();
  ctx.arc(tx, ty, s / 2, 0, Math.PI * 2, 0);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(tx, ty, s / 4, 0, Math.PI * 2, 0);
  ctx.fill();

  ctx.lineWidth = s / 10;
  ctx.beginPath();
  ctx.arc(tx, ty, s * 0.8, 0, Math.PI * 2, 0);
  ctx.stroke();

  ctx.lineWidth = s / 20;
  ctx.beginPath();
  ctx.arc(tx, ty, s * 1.2, 0, Math.PI * 2, 0);
  ctx.stroke();
}

function bem(x1, y1, x2, y2, col, ban, s) {
  let a; let b; let c; let e; let f; let g;
  let x; let y;
  let p1; let p2; let len;
  let ft2;
  let grd; let tm; let t;

  ctx.strokeStyle = `hsla(${col},60%,60%,0.3)`;
  ctx.fillStyle = `hsla(${col},60%,60%,0.3)`;

  grd = ctx.createRadialGradient(x1, y1, 0, x1, y1, _lightWidth * 70);
  grd.addColorStop(0, `hsla(${col},60%,60%,0.9)`);
  grd.addColorStop(1, `hsla(${col},60%,60%,0.0)`);
  ctx.fillStyle = grd;
  ctx.strokeStyle = grd;

  pika(x1, y1, _lightWidth * 70);
  x = x1 + (x2 - x1) * 0.97;
  y = y1 + (y2 - y1) * 0.97;
  grd = ctx.createRadialGradient(x, y, 0, x, y, _lightWidth * 100);
  grd.addColorStop(0, `hsla(${col},60%,60%,0.4)`);
  grd.addColorStop(1, `hsla(${col},60%,60%,0.0)`);
  ctx.fillStyle = grd;
  ctx.strokeStyle = grd;

  pika(x, y, _lightWidth * 100);

  ctx.strokeStyle = `hsla(${col},60%,60%,0.1)`;
  ctx.fillStyle = `hsla(${col},60%,60%,0.1)`;

  duma(x1, y1, x2, y2, 6, s * _lightWidth * 2);
  ctx.strokeStyle = `hsla(${col},60%,60%,0.15)`;
  ctx.fillStyle = `hsla(${col},60%,60%,0.15)`;

  const ft = ((_step / _lightCount * 5 + ban / 2) % 1) * 1.4 - 0.2;
  ban += x1 * 13 + y1 * 23;

  a = Math.atan2((y2 - y1), (x2 - x1));
  const px = Math.cos(a);
  const py = Math.sin(a);
  const max = 100;
  const hon = 100;

  for (g = 0; g < hon; g++) {
    tm = g / hon * Math.PI;
    ft2 = ((_step / _lightCount * 3 + g / hon + ban / 3) % 1) * 1.4 - 0.2;

    t = ((_step / _lightCount + g / hon * 7) % 1) * 3 - 1;
    p1 = [];
    for (a = 0; a < max; a++) {
      b = t + a / max;
      if (b < 0 || b > 1) continue;
      c = Math.sin(_percent + tm * 3 + b * 7) * 20
        + Math.sin(_percent * 2 + tm * 7 + g * 2 - b * 17) * 15
        + Math.sin(_percent * 3 + tm * 11 + g * 3 - b * 37) * 5;
      c *= _lightWidth * s;

      e = 1;
      if (b < 0.2) e = b / 0.2;
      if (b > 0.8) e = (1 - b) / 0.2;

      f = 0;
      if (b > ft && b < ft + 0.2) {
        f = (ft + 0.2 - b);
        e += (ft + 0.2 - b) / 0.2;
      }
      if (b > ft2 && b < ft2 + 0.2) {
        f += (ft2 + 0.2 - b) / 2;
        e += (ft2 + 0.2 - b) / 0.3;
      }

      e *= 1 - Math.random() / 4;
      p1.push([x1 + (x2 - x1) * (b - f) + py * c * e, y1 + (y2 - y1) * (b - f) - px * c * e, e]);
    }

    if (p1.length < 2) continue;
    len = p1.length;
    p2 = [];
    for (a = 0; a < len - 1; a++) {
      b = p1[a];
      c = p1[a + 1];
      x = b[0] - c[0];
      y = b[1] - c[1];
      b = Math.atan2(-y, x) + Math.PI / 2;
      x = Math.cos(b);
      y = Math.sin(b);
      e = 1;
      if (a < 3) e *= a / 3;
      if (a > len - 5) e *= (len - 2 - a) / 3;
      p2.push([x * e, y * e]);
    }
    ctx.beginPath();

    f = 7 * _lightWidth * s;
    for (a = 0; a < len - 1; a++) {
      b = p1[a];
      c = p2[a];
      ctx.lineTo(b[0] + c[0] * f, b[1] - c[1] * f);
    }
    for (a = len - 2; a >= 0; a--) {
      b = p1[a];
      c = p2[a];
      ctx.lineTo(b[0] - c[0] * f, b[1] + c[1] * f);
    }
    ctx.fill();
  }
}

function _run() {
  ctx.putImageData(_imgData, 0, 0);
  ctx.globalCompositeOperation = 'source-over';
  ctx.globalCompositeOperation = 'lighter';

  _percent = _step / _lightCount * Math.PI * 2;

  const x1 = _poiData[0][0];
  const y1 = _poiData[0][1];
  const x2 = _poiData[1][0];
  const y2 = _poiData[1][1];
  const a = 0.5 + Math.sin(_percent) * 0.2 + Math.cos(_percent * 11) * 0.03;
  const tx = x1 + (x2 - x1) * a;
  const ty = y1 + (y2 - y1) * a;

  bem(x1, y1, tx, ty, 222, 0, a * 2);
  bem(x2, y2, tx, ty, 333, 1, (1 - a) * 2);
}


function _preRender() {
  _step = 0;
  _lightCount = 40;
  _lightWidth = 3.0 / 10;

  const x1 = _poiData[0][0];
  const y1 = _poiData[0][1];
  const x2 = _poiData[1][0];
  const y2 = _poiData[1][1];

  const a = Math.atan2((y2 - y1), (x2 - x1));
  const px = Math.cos(a) * _lightWidth * 100;
  const py = Math.sin(a) * _lightWidth * 100;

  let grd = ctx.createLinearGradient(x1 - py, y1 + px, x1 + py, y1 - px);
  grd.addColorStop(0, 'rgba(0,0,0,0)');
  grd.addColorStop(0.5, 'rgba(0,0,0,1)');
  grd.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = grd;

  ctx.beginPath();
  ctx.lineTo(x1 - py, y1 + px);
  ctx.lineTo(x2 - py, y2 + px);
  ctx.lineTo(x2 + py, y2 - px);
  ctx.lineTo(x1 + py, y1 - px);
  ctx.fill();

  grd = ctx.createRadialGradient(x1, y1, 0, x1, y1, _lightWidth * 100);
  grd.addColorStop(0, 'rgba(0,0,0,1)');
  grd.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = grd;

  ctx.beginPath();
  ctx.arc(x1, y1, _lightWidth * 100, a + Math.PI / 2, a + Math.PI * 1.5, 0);
  ctx.fill();

  grd = ctx.createRadialGradient(x2, y2, 0, x2, y2, _lightWidth * 100);
  grd.addColorStop(0, 'rgba(0,0,0,1)');
  grd.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = grd;

  ctx.beginPath();
  ctx.arc(x2, y2, _lightWidth * 100, a + Math.PI * 1.5, a + Math.PI / 2, 0);
  ctx.fill();
  _imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function _loop() {
  if (_timer) clearTimeout(_timer);
  _timer = setTimeout(_loop, 40);
  _run();
  _step++;
}

function init() {
  canvas.width = 800;
  canvas.height = 300;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const _startX = (canvas.width / 4) || 0;
  const _startY = (canvas.height / 2) || 0;
  const _endX = canvas.width - _startX;
  const _endY = _startY;
  _poiData = [
    [_startX, _startY],
    [_endX, _endY],
  ];
  _preRender();
  _loop();
}

init();

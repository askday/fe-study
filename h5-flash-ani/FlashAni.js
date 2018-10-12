let _step;
let _timer;
let _lightCount = 40;
let _lightWidth;

let _poiDatas;
let _percent;

class FlashAni extends Laya.Sprite {
  _ina(sx, sy, ex, ey, kai, hai, bai) {
    const rx = (ex - sx) / 3;
    const ry = (ey - sy) / 3;
    let a = (Math.random() - 0.5) * bai;
    const x1 = sx + rx - ry * a;
    const y1 = sy + ry + rx * a;
    a = (Math.random() - 0.5) * bai;
    const x2 = sx + rx * 2 - ry * a;
    const y2 = sy + ry * 2 + rx * a;
    if (kai) {
      this._ina(sx, sy, x1, y1, kai - 1, hai, bai);
      this._ina(x1, y1, x2, y2, kai - 1, hai, bai);
      this._ina(x2, y2, ex, ey, kai - 1, hai, bai);
    } else {
      hai.push(sx, sy, x1, y1, x2, y2);
    }
  }

  duma(sx, sy, ex, ey, kai, s, strokeStyle) {
    let a; let b; let c; let d;
    for (c = 0; c < 3; c++) {
      a = [];
      this._ina(sx, sy, ex, ey, kai, a, 1.3);
      a.push(ex, ey);

      const arr = [];
      for (b = 0; b < a.length; b += 2) {
        arr.push(a[b] - a[0], a[b + 1] - a[1]);
      }
      for (d = 0; d < 3; d++) {
        this.graphics.drawLines(a[0], a[1], arr, strokeStyle, s + d * 2);
      }
    }
  }

  _pika(tx, ty, s, fillStyle, strokeStyle) {
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
      const arr = [];
      const _sx = tx + p[0][0] * s;
      const _sy = ty + p[0][1] * s;

      for (a = 0; a < max; a++) {
        if (a === 0) {
          arr.push(['moveTo', tx + p[a][0] * s - _sx, ty + p[a][1] * s - _sy]);
        } else {
          arr.push(['lineTo', tx + p[a][0] * s - _sx, ty + p[a][1] * s - _sy]);
        }
      }
      arr.push(['closePath']);
      this.graphics.drawPath(_sx, _sy, arr, { fillStyle });
    }

    this.graphics.drawPie(tx, ty, s / 2, 0, (Math.PI * 2) * 180 / Math.PI, fillStyle);
    this.graphics.drawPie(tx, ty, s / 4, 0, (Math.PI * 2) * 180 / Math.PI, fillStyle);
    this.graphics.drawPie(tx, ty, s * 0.8, 0, (Math.PI * 2) * 180 / Math.PI, fillStyle, strokeStyle, s / 10);
    this.graphics.drawPie(tx, ty, s * 1.2, 0, (Math.PI * 2) * 180 / Math.PI, fillStyle, strokeStyle, s / 20);
  }

  _bem(x1, y1, x2, y2, col, ban, s) {
    let a; let b; let c; let e; let f; let g;
    let x; let y;
    let p1; let p2; let len;
    let ft2;
    let tm; let t;

    const grd = Laya.Browser.context.createRadialGradient(x1, y1, 0, x1, y1, _lightWidth * 70);
    grd.addColorStop(0, `hsla(${col},60%,60%,0.9)`);
    grd.addColorStop(1, `hsla(${col},60%,60%,0.0)`);
    this._pika(x1, y1, _lightWidth * 70, grd, grd);

    // x = x1 + (x2 - x1) * 0.97;
    // y = y1 + (y2 - y1) * 0.97;
    // grd = Laya.Browser.context.createRadialGradient(x, y, 0, x, y, _lightWidth * 100);
    // grd.addColorStop(0, `hsla(${col},60%,60%,0.4)`);
    // grd.addColorStop(1, `hsla(${col},60%,60%,0.0)`);
    // this._pika(x, y, _lightWidth * 100, grd, grd);

    this.duma(x1, y1, x2, y2, 6, s * _lightWidth * 2, `hsla(${col},60%,60%,0.1)`);

    const strokeStyle = `hsla(${col},100%,100%,0.15)`;
    const ft = ((_step / _lightCount * 5 + ban / 2) % 1) * 1.4 - 0.2;
    ban += x1 * 13 + y1 * 23;
    a = Math.atan2((y2 - y1), (x2 - x1));
    const px = Math.cos(a);
    const py = Math.sin(a);
    const max = 100;
    const hon = 150;
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

      f = 7 * _lightWidth * s;

      const arr = [];
      const _sx = p1[0][0] + p2[0][0] * f;
      const _sy = p1[0][1] - p2[0][1] * f;

      for (a = 0; a < len - 1; a++) {
        b = p1[a];
        c = p2[a];
        arr.push(b[0] + c[0] * f - _sx, b[1] - c[1] * f - _sy);
      }

      for (a = len - 2; a >= 0; a--) {
        b = p1[a];
        c = p2[a];
        arr.push(b[0] - c[0] * f - _sx, b[1] + c[1] * f - _sy);
      }

      this.graphics.drawLines(_sx, _sy, arr, strokeStyle, f);
    }
  }

  _run(index) {
    console.log('run');

    _percent = _step / _lightCount * Math.PI * 2;

    const x1 = _poiDatas[index][0][0];
    const y1 = _poiDatas[index][0][1];
    const x2 = _poiDatas[index][1][0];
    const y2 = _poiDatas[index][1][1];
    const a = 0.5 + Math.sin(_percent) * 0.2 + Math.cos(_percent * 11) * 0.03;
    const tx = x1 + (x2 - x1) * a;
    const ty = y1 + (y2 - y1) * a;

    this.blendMode = 'lighter';
    this._bem(x1, y1, tx, ty, 5, 0, a * 2);
    this._bem(x2, y2, tx, ty, 6, 1, (1 - a) * 2);
  }


  _preRender(index) {
    console.log('preRender');
    const x1 = _poiDatas[index][0][0];
    const y1 = _poiDatas[index][0][1];
    const x2 = _poiDatas[index][1][0];
    const y2 = _poiDatas[index][1][1];

    const a = Math.atan2((y2 - y1), (x2 - x1));
    const px = Math.cos(a) * _lightWidth * 100;
    const py = Math.sin(a) * _lightWidth * 100;

    const _sx = x1 - py;
    const _sy = y1 + px;
    const paths = [
      ['moveTo', x1 - py - _sx, y1 + px - _sy],
      ['lineTo', x2 - py - _sx, y2 + px - _sy],
      ['lineTo', x2 + py - _sx, y2 - px - _sy],
      ['lineTo', x1 + py - _sx, y1 - px - _sy],
      ['closePath'],
    ];
    const grd0 = Laya.Browser.context.createLinearGradient(x1 - py, y1 + px, x1 + py, y1 - px);
    grd0.addColorStop(0, 'rgba(0,0,0,0)');
    grd0.addColorStop(0.5, 'rgba(0,0,0,1)');
    grd0.addColorStop(1, 'rgba(0,0,0,0)');
    // _grds.push(grd0);
    this.graphics.drawPath(_sx, _sy, paths, { fillStyle: grd0 });

    const grd1 = Laya.Browser.context.createRadialGradient(x1, y1, 0, x1, y1, _lightWidth * 100);
    grd1.addColorStop(0, 'rgba(0,0,0,1)');
    grd1.addColorStop(1, 'rgba(0,0,0,0)');
    // _grds.push(grd1);
    this.graphics.drawPie(x1, y1, _lightWidth * 100, (a + Math.PI / 2) * 180 / Math.PI, (a + Math.PI * 1.5) * 180 / Math.PI, grd1);

    const grd2 = Laya.Browser.context.createRadialGradient(x2, y2, 0, x2, y2, _lightWidth * 100);
    grd2.addColorStop(0, 'rgba(0,0,0,1)');
    grd2.addColorStop(1, 'rgba(0,0,0,0)');
    // _grds.push(grd2);
    this.graphics.drawPie(x2, y2, _lightWidth * 100, (a + Math.PI * 1.5) * 180 / Math.PI, (a + Math.PI / 2) * 180 / Math.PI, grd2);
  }

  _loop() {
    if (_timer) clearTimeout(_timer);
    _timer = setTimeout(() => {
      this._loop();
    }, 40);
    console.log(_step);
    this.graphics.clear();
    for (let i = 0; i < _poiDatas.length; i++) {
      this._preRender(i);
      this._run(i);
    }
    _step++;
  }

  init(pois) {
    _poiDatas = pois;
    _step = 0;
    _lightCount = 5;
    _lightWidth = 2.0 / 10;
    this._loop();
  }
}

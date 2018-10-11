var canvas, ctx, count, ho, canvas2, ctx2, gmax, timer, isstart, futosa,
  nowbit, nowpin, kari, tan8, bgr, mousex, mousey, nowpo, poi, tim,
  sax, say, isrend, mae, isma, posize, imas;

canvas = document.getElementsByTagName('canvas')[0];
ctx = canvas.getContext('2d');
canvas2 = document.getElementsByTagName('canvas')[1];
ctx2 = canvas2.getContext('2d');
ctx2.fillStyle = "rgba(0,0,0,0.4)";
ctx2.fillRect(0, 0, canvas2.width, canvas2.height);

document.getElementsByTagName('span')[0].style.visibility = "hidden";
document.getElementById("tome").style.visibility = "hidden";
document.body.onselectstart = function () {
  return false;
};
window.onscroll = function () {
  var a = document.documentElement.scrollTop || document.body.scrollTop;
  canvas2.style.top = a + "px";
};

mousex = mousey = nowpo = 0;
if (navigator.userAgent.indexOf('iPhone') > 0 ||
  navigator.userAgent.indexOf('iPad') > 0 ||
  navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
  canvas.addEventListener('touchstart', mdn);
  canvas.addEventListener('touchmove', mmv);
  canvas.addEventListener('touchend', function () {
    nowpo = 0;
  });
  document.body.removeEventListener('touchmove', 0, false);
  posize = 16;
  isma = 1;
} else {
  document.onmouseup = function () {
    nowpo = 0;
  };
  canvas.addEventListener('mousemove', mmv);
  canvas.addEventListener('mousedown', mdn);
  posize = 5;
}

gmax = 12;
imas = [];
init();

function init() {
  var a, b, c;
  count = 0;
  canvas.width = namnam("wid", 3, 5000, 400);
  canvas.height = namnam("hei", 3, 5000, 300);
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  b = (canvas.width / 4) | 0;
  c = (canvas.height / 2) | 0;
  poi = [
    [b, c],
    [canvas.width - b, c],
    [canvas.width / 2, posize]
  ];
  byo();
}

function namnam(id, min, max, def) {
  var a = document.getElementById(id);
  var b = a.value;
  if (isNaN(b)) b = def;
  if (b < min) b = min;
  if (b > max) b = max;
  b = b | 0;
  a.value = b;
  return b;
}

function aaa() {
  var a, x1, y1, x2, y2, tx, ty;
  ctx.putImageData(bgr, 0, 0);
  ctx.globalCompositeOperation = "source-over";
  ctx.globalCompositeOperation = "lighter";
  tim = count / gmax * Math.PI * 2;
  x1 = poi[0][0];
  y1 = poi[0][1];
  x2 = poi[1][0];
  y2 = poi[1][1];
  a = 0.5 + Math.sin(tim) * 0.2 + Math.cos(tim * 11) * 0.03;
  tx = x1 + (x2 - x1) * a;
  ty = y1 + (y2 - y1) * a;
  bem(x1, y1, tx, ty, 222, 0, a * 2);
  bem(x2, y2, tx, ty, 333, 1, (1 - a) * 2);
}

function ina(sx, sy, ex, ey, kai, hai, bai) {
  var a, rx, ry, x1, y1, x2, y2;
  rx = (ex - sx) / 3;
  ry = (ey - sy) / 3;
  a = (Math.random() - 0.5) * bai;
  x1 = sx + rx - ry * a;
  y1 = sy + ry + rx * a;
  a = (Math.random() - 0.5) * bai;
  x2 = sx + rx * 2 - ry * a;
  y2 = sy + ry * 2 + rx * a;
  if (kai) {
    ina(sx, sy, x1, y1, kai - 1, hai, bai);
    ina(x1, y1, x2, y2, kai - 1, hai, bai);
    ina(x2, y2, ex, ey, kai - 1, hai, bai);
  } else {
    hai.push(sx, sy, x1, y1, x2, y2);
  }
}

function duma(sx, sy, ex, ey, kai, s) {
  var a, b, c, d;
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

function bem(x1, y1, x2, y2, col, ban, s) {
  var a, b, c, d, e, f, g, x, y, px, py, max, p1, p2, len, hon, ft, ft2, grd, tm, t;
  ctx.strokeStyle = ctx.fillStyle = "hsla(" + col + ",60%,60%,0.3)";
  grd = ctx.createRadialGradient(x1, y1, 0, x1, y1, futosa * 70);
  grd.addColorStop(0, "hsla(" + col + ",60%,60%,0.9)");
  grd.addColorStop(1, "hsla(" + col + ",60%,60%,0.0)");
  ctx.fillStyle = ctx.strokeStyle = grd;

  pika(x1, y1, futosa * 70);
  x = x1 + (x2 - x1) * 0.97;
  y = y1 + (y2 - y1) * 0.97;
  grd = ctx.createRadialGradient(x, y, 0, x, y, futosa * 100);
  grd.addColorStop(0, "hsla(" + col + ",60%,60%,0.4)");
  grd.addColorStop(1, "hsla(" + col + ",60%,60%,0.0)");
  ctx.fillStyle = ctx.strokeStyle = grd;
  pika(x, y, futosa * 100);

  ctx.strokeStyle = ctx.fillStyle = "hsla(" + col + ",60%,60%,0.1)";
  duma(x1, y1, x2, y2, 6, s * futosa * 2);
  ctx.strokeStyle = ctx.fillStyle = "hsla(" + col + ",60%,60%,0.15)";

  ft = ((count / gmax * 5 + ban / 2) % 1) * 1.4 - 0.2;
  ban += x1 * 13 + y1 * 23;

  a = Math.atan2((y2 - y1), (x2 - x1));
  px = Math.cos(a);
  py = Math.sin(a);
  max = 100;
  hon = 100;

  for (g = 0; g < hon; g++) {
    tm = g / hon * Math.PI;
    ft2 = ((count / gmax * 3 + g / hon + ban / 3) % 1) * 1.4 - 0.2;

    t = ((count / gmax + g / hon * 7) % 1) * 3 - 1;
    p1 = [];
    for (a = 0; a < max; a++) {


      b = t + a / max;
      if (b < 0 || b > 1) continue;
      c = Math.sin(tim + tm * 3 + b * 7) * 20 +
        Math.sin(tim * 2 + tm * 7 + g * 2 - b * 17) * 15 +
        Math.sin(tim * 3 + tm * 11 + g * 3 - b * 37) * 5;
      c *= futosa * s;

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

    f = 7 * futosa * s;
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

function pika(tx, ty, s) {
  var a, b, c, r, x, y, p, max;
  s *= 1 - Math.random() / 3;
  max = (20 + s * 7) | 0;
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

function byo() {
  var a, b, c, d, e, x, y, dt, hb;
  ctx.globalCompositeOperation = "source-over";

  ctx.fillStyle = "rgb(0,0,0)";
  x = poi[2][0];

  if (imas[0]) {
    ctx.drawImage(imas[0], 0, 0, x, canvas.height);
  } else {
    ctx.fillRect(0, 0, x, canvas.height);
  }

  if (imas[1]) {
    ctx.drawImage(imas[1], x, 0, canvas.width - x, canvas.height);
  } else {
    ctx.fillRect(x, 0, canvas.width, canvas.height);
  }

  for (a = 0; a < poi.length; a++) {
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(poi[a][0] - posize - 1, poi[a][1] - posize - 1, posize * 2 + 2, posize * 2 + 2);
    if (a % 3 === 0) {
      ctx.fillStyle = "hsl(" + (0) + ",90%,50%)";
    } else if (a % 3 == 1) {
      ctx.fillStyle = "hsl(" + (244) + ",90%,50%)";
    } else {
      ctx.fillStyle = "hsl(" + (111) + ",90%,50%)";
    }
    ctx.fillRect(poi[a][0] - posize, poi[a][1] - posize, posize * 2, posize * 2);
  }
}

function mmv(e) {
  var a, x, y;
  if (!nowpo) return;
  if (isma) e.preventDefault();
  a = nowpo - 1;
  loc(e);
  x = mousex + sax;
  y = mousey + say;

  if (a === 2) {

    if (x < 10) x = 10;
    if (x > canvas.width - 10) x = canvas.width - 10;

    poi[a][0] = x;

  } else {
    if (x < 0) x = 0;
    if (x > canvas.width) x = canvas.width;
    if (y < 0) y = 0;
    if (y > canvas.height) y = canvas.height;
    poi[a][0] = x;
    poi[a][1] = y;
  }
  byo();
}

function loc(e) {
  var x, y, sx, sy;
  sx = document.body.scrollLeft || document.documentElement.scrollLeft;
  sy = document.body.scrollTop || document.documentElement.scrollTop;

  if (isma) {
    x = e.changedTouches[0].pageX - canvas.offsetLeft;
    y = e.changedTouches[0].pageY - canvas.offsetTop;

  } else {

    x = e.clientX - canvas.offsetLeft + sx;
    y = e.clientY - canvas.offsetTop + sy;
  }
  mousex = x;
  mousey = y;
}

function mdn(e) {
  var a, b, c, x, y;
  if (isstart) return;
  loc(e);
  for (a = poi.length - 1; a >= 0; a--) {
    x = poi[a][0] - mousex;
    y = poi[a][1] - mousey;
    if (Math.abs(x) <= posize && Math.abs(y) <= posize) {
      if (isma) e.preventDefault();
      nowpo = a + 1;
      sax = x;
      say = y;
      return;
    }
  }
}

function yomi(a) {
  var b, c;
  a = +a;
  b = document.getElementsByTagName('input')[a].files[0];
  c = new FileReader();
  c.readAsDataURL(b);
  c.onload = function (e) {
    e = e.target.result;
    var image = new Image();
    image.src = e;
    imas[a] = image;
    if (isma) {
      timer = setTimeout(byo, 80);
    } else {
      byo();
    }
  };
}

function pre() {
  var a, x, y, x1, y1, x2, y2, grd, px, py;
  count = 0;
  gmax = namnam("maisuu", 2, 1000, 40);
  futosa = namnam("futosa", 1, 10, 5) / 10;
  ctx.fillStyle = "rgb(0,0,0)";
  x = poi[2][0];
  if (imas[0]) {
    ctx.drawImage(imas[0], 0, 0, x, canvas.height);
  } else {
    ctx.fillRect(0, 0, x, canvas.height);
  }

  if (imas[1]) {
    ctx.drawImage(imas[1], x, 0, canvas.width - x, canvas.height);
  } else {
    ctx.fillRect(x, 0, canvas.width, canvas.height);
  }

  x1 = poi[0][0];
  y1 = poi[0][1];
  x2 = poi[1][0];
  y2 = poi[1][1];

  a = Math.atan2((y2 - y1), (x2 - x1));
  px = Math.cos(a) * futosa * 100;
  py = Math.sin(a) * futosa * 100;

  ctx.globalCompositeOperation = "source-over";

  grd = ctx.createLinearGradient(x1 - py, y1 + px, x1 + py, y1 - px);

  grd.addColorStop(0, "rgba(0,0,0,0)");
  grd.addColorStop(0.5, "rgba(0,0,0,1)");
  grd.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = grd;


  ctx.beginPath();
  ctx.lineTo(x1 - py, y1 + px);
  ctx.lineTo(x2 - py, y2 + px);
  ctx.lineTo(x2 + py, y2 - px);
  ctx.lineTo(x1 + py, y1 - px);
  ctx.fill();


  grd = ctx.createRadialGradient(x1, y1, 0, x1, y1, futosa * 100);
  grd.addColorStop(0, "rgba(0,0,0,1)");
  grd.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = grd;

  ctx.beginPath();
  ctx.arc(x1, y1, futosa * 100, a + Math.PI / 2, a + Math.PI * 1.5, 0);
  ctx.fill();

  grd = ctx.createRadialGradient(x2, y2, 0, x2, y2, futosa * 100);
  grd.addColorStop(0, "rgba(0,0,0,1)");
  grd.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = grd;

  ctx.beginPath();
  ctx.arc(x2, y2, futosa * 100, a + Math.PI * 1.5, a + Math.PI / 2, 0);
  ctx.fill();
  bgr = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function ch() {
  if (isstart == 1) {
    isstart = 0;
    return;
  }

  document.getElementById("stb").value = "停止";
  isstart = 1;
  pre();
  timer = setTimeout(dou, 0);
}

function dou() {
  var a, b;
  clearTimeout(timer);
  if (isstart === 0) {
    document.getElementById("stb").value = "动作检验";
    byo();
    return;
  }
  timer = setTimeout(dou, 40);
  aaa();
  count++;
}

function gifka() {
  var a, b, c, r;
  clearTimeout(timer);

  if (!imas[0] && !imas[1]) {
    alert("请选择图片");
    return;
  }

  mae = [];
  document.getElementsByTagName('span')[0].style.visibility = "visible";
  document.getElementsByTagName('img')[0].src = "";
  isrend = 1;
  isstart = 0;
  pre();
  ho = [];
  timer = setTimeout(douga, 0);
}

function douga() {
  clearTimeout(timer);
  if (!isrend) {
    document.getElementsByTagName('span')[0].style.visibility = "hidden";
    ho = kari = tan8 = 0;
    byo();
    return;
  }
  aaa();
  count++;
  document.getElementById("sin").style.width = ((count / gmax * 300 * 0.5) | 0) + "px";
  document.getElementById("tyoku").innerHTML = "drawing" + count + "/" + gmax;
  ho.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
  if (ho.length >= gmax) {
    document.getElementById("tyoku").innerHTML = "make palette";
    timer = setTimeout(cgif, 0);
    return;
  }
  timer = setTimeout(douga, 0);
}

function tome() {
  a = document.getElementsByTagName('img')[0];
  if (a.style.visibility == "visible") {
    a.style.visibility = "hidden";
  } else {
    a.style.visibility = "visible";
  }
}

function mdcut() {
  var a, b, c, d, e, f, g, dt, tb, ch, n1, n2;
  var x, y, z, x1, y1, z1, x2, y2, z2;

  ch = [];
  e = [];
  for (a = 0; a < ho.length; a++) {
    dt = ho[a].data;
    for (b = 0; b < dt.length; b += 4) {
      c = String.fromCharCode(dt[b], dt[b + 1], dt[b + 2]);
      if (!ch[c]) {
        e.push([dt[b], dt[b + 1], dt[b + 2], c, 0]);
        ch[c] = 1;
      }
    }
  }

  if (e.length <= 256) {
    pare = [];
    for (a = 0; a < e.length; a++) {
      pare.push([e[a][0], e[a][1], e[a][2]]);
      ch[e[a][3]] = pare.length;
    }

    for (b = a; b < 256; b++) pare.push([0, 0, 0]);
    pare.ch = ch;
    return;
  }

  tb = [e];
  for (f = 0; f < 2000; f++) {
    c = 0;
    g = 0;
    for (b = 0; b < tb.length; b++) {
      if (tb[b].length < 2) continue;
      if (tb[b].length > c) {
        c = tb[b].length;
        g = b;
      }
    }

    a = tb[g];
    e = [];
    e[0] = e[1] = e[2] = 256;
    x2 = y2 = z2 = 0;

    for (b = 0; b < a.length; b++) {
      c = a[b];
      if (c[0] < e[0]) e[0] = c[0];
      if (c[1] < e[1]) e[1] = c[1];
      if (c[2] < e[2]) e[2] = c[2];

      if (c[0] > x2) x2 = c[0];
      if (c[1] > y2) y2 = c[1];
      if (c[2] > z2) z2 = c[2];
    }

    d = [];
    d[0] = x2 - e[0];
    d[1] = y2 - e[1];
    d[2] = z2 - e[2];

    c = 0;
    if (d[1] >= d[0] && d[1] >= d[2]) c = 1;
    if (d[2] >= d[1] && d[2] >= d[0]) c = 2;

    d = e[c] + d[c] / 2;
    n1 = [];
    n2 = [];
    for (b = 0; b < a.length; b++) {
      e = a[b];
      if (e[c] > d) {
        n1.push(e);
      } else {
        n2.push(e);
      }
    }

    tb[g] = n1;
    tb.push(n2);
    if (tb.length >= 255) break;
  }

  pare = [
    [0, 0, 0]
  ];

  for (f = 0; f < tb.length; f++) {
    a = tb[f];
    x = y = z = 0;
    for (b = 0; b < a.length; b++) {
      x += a[b][0];
      y += a[b][1];
      z += a[b][2];
    }
    b = a.length;
    x = Math.floor(x / b);
    y = Math.floor(y / b);
    z = Math.floor(z / b);
    for (b = 0; b < a.length; b++) ch[a[b][3]] = pare.length;
    pare.push([x, y, z]);
  }
  pare.ch = ch;
}

function cgif() {
  var a, b, c, d, e, im;
  clearTimeout(timer);

  mdcut();


  count = 0;
  im = ho[0];
  tan8 = [];

  nowbit = 0;
  a = [];
  b = [71, 73, 70, 56, 57, 97];
  for (c = 0; c < 6; c++) putbit(a, b[c], 8);
  b = im.width;
  putbit(a, b >> 0 & 0xFF, 8);
  putbit(a, b >> 8 & 0xFF, 8);
  b = im.height;
  putbit(a, b >> 0 & 0xFF, 8);
  putbit(a, b >> 8 & 0xFF, 8);

  putbit(a, 1, 1); //调色板
  putbit(a, 7, 3);
  putbit(a, 0, 1);
  putbit(a, 7, 3);
  putbit(a, 0, 8); //背景色
  putbit(a, 0, 8); //縦横比



  for (c = 0; c < 256; c++) {
    for (d = 0; d < 3; d++) {
      putbit(a, pare[c][d], 8);
    }
  }

  //Application Extension

  putbit(a, 33, 8);
  putbit(a, 255, 8);
  putbit(a, 11, 8);

  b = "NETSCAPE2.0";
  for (c = 0; c < 11; c++) putbit(a, b.charCodeAt(c), 8);

  putbit(a, 3, 8);
  putbit(a, 1, 8); //?

  b = 0; //回数
  putbit(a, b >> 0 & 0xFF, 8);
  putbit(a, b >> 8 & 0xFF, 8);

  putbit(a, 0, 8);
  kari = a;
  timer = setTimeout(dset, 0);
}

function dset() {
  var a, b, c, d, e, f, g, h, z, im, tm, jisyo, n1, n2, dt, min, max, kuri, ed, sokudo;
  clearTimeout(timer);
  if (!isrend) {
    document.getElementsByTagName('span')[0].style.visibility = "hidden";
    ho = kari = tan8 = 0;
    byo();
    return;
  }
  document.getElementById("sin").style.width = (((count / gmax * 0.4 + 0.6) * 300) | 0) + "px";
  document.getElementById("tyoku").innerHTML = "compression" + count + "/" + gmax;

  //Graphic Control Extension
  a = kari;
  im = ho[count];
  putbit(a, 33, 8);
  putbit(a, 249, 8);
  putbit(a, 4, 8);

  putbit(a, 0, 7); //3项
  putbit(a, 1, 1); //透过

  sokudo = 6;
  putbit(a, sokudo >> 0 & 0xFF, 8);
  putbit(a, sokudo >> 8 & 0xFF, 8);
  putbit(a, 0, 8); //透明调色板
  putbit(a, 0, 8);

  //Image Data
  putbit(a, 44, 8);
  putbit(a, 0, 16); //左移位
  putbit(a, 0, 16); //上移位
  b = im.width;
  putbit(a, b >> 0 & 0xFF, 8);
  putbit(a, b >> 8 & 0xFF, 8);
  b = im.height;
  putbit(a, b >> 0 & 0xFF, 8);
  putbit(a, b >> 8 & 0xFF, 8);

  putbit(a, 0, 8); //5项

  min = 8;
  putbit(a, min, 8); //最小位

  c = nowbit;
  b = lzwe(im, min);
  nowbit = c;

  h = 0;
  c = b.length / 8;
  for (d = 0; d < 1000; d++) {
    e = c;
    if (e > 255) e = 255;
    c -= e;
    putbit(a, e, 8);
    for (f = 0; f < e; f++) {
      for (g = 0; g < 8; g++) {
        a[nowbit] = b[h] ? 1 : 0;
        nowbit++;
        h++;
      }
    }
    if (c <= 0) break;
  }

  putbit(a, 0, 8);
  ho[count] = 0;

  count++;

  if (count >= ho.length) {
    putbit(a, 59, 8);
  } else {
    if (a.length > 8000000) {
      tan8.push(to8(a));
      kari = [];
      nowbit = 0;
    }
  }
  if (count < ho.length) {
    timer = setTimeout(dset, 0);
  } else {
    timer = setTimeout(rend, 0);
  }
}

function to8(a) {
  var b, c, d, e;
  b = new Uint8Array(Math.ceil(a.length / 8));
  d = 0;
  for (c = 0; c < b.length; c++) {
    for (e = 0; e < 8; e++) {
      b[c] += a[d] << (7 - e);
      d++;
    }
  }
  return b;

}

function rend() {
  var a, b, c, d, e, src, blob, img;
  if (!tan8.length) {
    b = to8(kari);
  } else {
    tan8.push(to8(kari));
    c = 0;
    for (a = 0; a < tan8.length; a++) c += tan8[a].length;
    b = new Uint8Array(c);
    d = 0;
    for (a = 0; a < tan8.length; a++) {
      for (c = 0; c < tan8[a].length; c++) {
        b[d] = tan8[a][c];
        d++;
      }
    }
  }
  a = ((b.length / 1024 / 1024 * 100) | 0) / 100 + "Mb";
  document.getElementById("mega").innerHTML = a;

  blob = new Blob([b], {
    'type': 'image/gif'
  });
  b = window.URL || window.webkitURL;
  src = b.createObjectURL(blob);
  img = document.getElementsByTagName('img')[0];
  img.src = src;
  img.style.visibility = "visible";

  document.getElementsByTagName('span')[0].style.visibility = "hidden";
  document.getElementById("tome").style.visibility = "visible";
  kari = tan8 = isrend = 0;
  byo();

}

function lzwe(im, min) {
  var a, b, c, d, e, jisyo, kuri, max, len, mmin, ch, n1, n2, n3, nm;
  ch = pare.ch;
  a = [];
  nm = [];

  nowbit = 0;
  dt = im.data;

  kuri = 1 << min;
  ed = kuri + 1;
  len = ed + 1;
  min++;
  mmin = min;
  max = 1 << min;

  b = 0;
  nowpin = 7;
  jisyo = [];
  for (c = 0; c < len; c++) jisyo[c + "a"] = c;
  putbit2(a, kuri, min);

  for (z = 0; z < 1000000; z++) {

    e = c = ch[String.fromCharCode(dt[b], dt[b + 1], dt[b + 2])];
    if (c == mae[b]) c = 0;
    nm[b] = e;



    n3 = n1 = jisyo[c + "a"] + "a";
    if (b + 4 >= dt.length) {
      putbit2(a, jisyo[c + "a"], min);
      break;
    }
    for (d = 0; d < 1000000; d++) {

      e = c = ch[String.fromCharCode(dt[b + 4], dt[b + 5], dt[b + 6])];
      if (c == mae[b + 4]) c = 0;
      nm[b + 4] = e;
      n2 = n1 + jisyo[c + "a"] + "a";

      if (!jisyo[n2]) {
        jisyo[n2] = len;
        len++;
        putbit2(a, jisyo[n3], min);
        if (len >= max + 1) {
          min++;
          max = 1 << min;
          if (min > 12) {
            putbit2(a, kuri, 12);
            min = mmin;
            max = 1 << min;
            len = ed + 1;
            jisyo = [];
            for (c = 0; c < len; c++) jisyo[c + "a"] = c;
          }
        }
        break;
      } else {
        n3 = n2;
        n1 = jisyo[n2] + "a";
      }
      b += 4;
    }
    b += 4;
    if (b >= dt.length) break;
  }
  putbit2(a, ed, min);
  jisyo = [];
  mae = nm;
  return a;
}

function putbit2(retu, atai, naga) {
  for (var a = 0; a < naga; a++) {
    retu[nowbit + nowpin] = (atai >> a) & 1;
    nowpin--;
    if (nowpin < 0) {
      nowpin = 7;
      nowbit += 8;
    }
  }
}

function putbit(retu, atai, naga) {
  for (var a = 0; a < naga; a++) {
    retu[nowbit + a] = (atai >> (naga - a - 1)) & 1;
  }
  nowbit += naga;
}
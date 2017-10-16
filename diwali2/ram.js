var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
//var fps = document.getElementById('fps');

var W = canvas.width = innerWidth;
var H = canvas.height = innerHeight;

var raf = requestAnimationFrame;
var running = false;

var TAU = Math.PI*2;
'floor|random|round|abs|sqrt|PI|atan2|sin|cos|pow'
  .split('|')
  .forEach(function(p) { this[p] = Math[p]; });

function randint(n) { return floor(n*random()); }
function choose() { return arguments[randint(arguments.length)]; }



var Cos = cos(PI/77);
var Sin = sin(PI/77);

/*---------------------------------------------------------------------------*/

function loop(t) {
  if (running) raf(loop);
  update();
  draw();
}

document.onclick = function() {
  if ((running = !running)) raf(loop);
};

document.onkeydown = function(e) {
  if (e.which !== 27) return;
  running = false;
  setTimeout(reset, 50);
};

/*---------------------------------------------------------------------------*/

function Bot(x, y, vx, vy) {
  this.x0 = this.x = x;
  this.y0 = this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.age = 40;
  this.color = grey(random());
  this.radius = random()*15;
  this.decay = choose(0.99, 0.98, 0.97, 0.96, 0.95);
}

var black = 'rgba(0, 0, 0, 0.1)';
var white = 'rgba(255, 255, 255, 0.1)';

function grey(nn) {
  var n = floor((1-nn) * 255);
  return 'rgba('+n+',0,0,'+0.3+')';
}


Bot.prototype.update = function() {
  this.x += this.vx;
  this.y += this.vy;
  
  var sign = random() > 0.5 ? 1 : -1;
  var vx = this.vx, vy = this.vy;
  var c = Cos, s = sign*Sin;
  this.vx = vx*c - vy*s;
  this.vy = vx*s + vy*c;

  this.radius *= this.decay;
  if (this.radius < 0.3) {
    this.x = this.x0;
    this.y = this.y0;
    this.radius = 3;
    this.color = grey(random());
  }
};

Bot.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, TAU);
  ctx.closePath();
  ctx.fillStyle = this.color;
  ctx.fill();
};

/*---------------------------------------------------------------------------*/

var B = 500;
var bots;

function reset() {
  ctx.clearRect(0, 0, W, H);
  bots = new Array(B);
  for (var i = 0; i < B; i++) {
    var v = random()*4-2;
    var t = random()*TAU;
    bots[i] = new Bot(W/2, H/2, v*cos(t), v*sin(t));
  }
}

function update() {
  for (var i = 0; i < B; i++) bots[i].update();
}

function draw() {
  for (var i = 0; i < B; i++) bots[i].draw(ctx);
}

/*---------------------------------------------------------------------------*/


running = true;
reset();
raf(loop);// JavaScript Document
let theShader;
let pgShader;
let pg;
let teapot;
let rabbit;
let hatclock;
let teacup;
let realkey;
let mic;
let bg;

let howfast = 1;

let x;
let y;
let z;
let r;

let x1;
let y1;
let z1;
let r1;

let x2;
let y2;
let z2;
let r2;

let x3;
let y3;
let z3;
let r3;

let x4;
let y4;
let z4;
let r4;

let t;

let theta;
let theta1;
let theta2;
let theta3;
let theta4;

let mode;

let v; // 발사 초기 속력
let v1;
let v2;
let v3;
let v4;

let a = 5; // 가속도
let vel; //  
let k;

function preload() {
  theShader = loadShader('shader.vert', 'shader.frag');
  theShader2 = loadShader('shader2.vert', 'shader2.frag');
  theShader3 = loadShader('shader3.vert', 'shader3.frag');
  theShader4 = loadShader('shader4.vert', 'shader4.frag');

  teapot = loadModel('teapot.obj');
  hatclock = loadModel('clock.obj');
  realkey = loadModel('key.obj');
  teacup = loadModel('teacup.obj');
  rabbit = loadModel('rabbit.obj');
}

function setup() {
  bg = createCanvas(windowWidth, windowHeight, WEBGL);
  bg.mousePressed(userStartAudio);
  noStroke();

  pg = createGraphics(windowWidth, windowHeight, WEBGL);
  pg.noStroke();

  pg2 = createGraphics(windowWidth, windowHeight, WEBGL);
  pg2.noStroke();

  pg3 = createGraphics(windowWidth, windowHeight, WEBGL);
  pg3.noStroke();

  pg4 = createGraphics(windowWidth, windowHeight, WEBGL);
  pg4.noStroke();

  x = 0;
  y = 0;
  z = 0;

  x1 = 0;
  y1 = 0;
  z1 = 0;

  x2 = 0;
  y2 = 0;
  z2 = 0;

  x3 = 0;
  y3 = 0;
  z3 = 0;

  x4 = 0;
  y4 = 0;
  z4 = 0;

  t = 0;

  k = 0;

  theta =  PI;
  theta1 = PI / 9;
  theta2 = - PI*5 / 7;
  theta3 = -PI /5;
  theta4 = -PI / 8;

  v = 15;
  v1 = 25;
  v2 = 5;
  v3 = 10;
  v4 = 30

  voriginal=v;
  voriginal1=v1;
  voriginal2=v2;
  voriginal3=v3;
  voriginal4=v4;
  mode = 0;


  mic = new p5.AudioIn();
  mic.start();

}

function draw() {
  background(51);
  directionalLight(255, 255, 255, 1, 0, -1);
  // lights();
  let level = mic.getLevel();
  vel = level * 1000;


  
  if ((vel > 100) && (z == 0)&&(mode==0)) {
    print(v,v1,v2,v3,v4);
    v=vel;
    v1=vel;
    v2=vel;
    v3=vel;
    v4=vel;
    
    mode = 1;
  }
  // console.log(level); // mic lever 0.001 - 0.010

  shaders(shader3);
  push();
  translate(0, 0, 300);

  // sphere(50 + level * 1000);
  push()
  rotateX(PI / 2);
  //check();
  table();
  for (k = 0; k < 5; k++) {
    objects(k);
  }

  pop()

  pop();
  resetShader();

  shaders(shader1); //왼 위
  push();
  // translate(-windowWidth/4, -windowHeight/4, 0);
  texture(pg);
  box(windowWidth, windowHeight, 10);
  pop();
  resetShader();
}

function shaders(x) {
  if (x == shader2) {
    shader2();
  } else if (x == shader1) {
    shader1();
  } else if (x == shader3) {
    shader3();
  } else if (x == shader4) {
    shader4();
  }
}

function shader1() {
  pg.shader(theShader);
  theShader.setUniform("resolution", [width, height]);
  theShader.setUniform("time", frameCount * 0.02);
  theShader.setUniform("speed", [10, 10]);
  // theShader.setUniform("u_mouse", [mouseX, mouseY]);
  pg.rect(-windowWidth / 2, -windowHeight / 2, windowWidth, windowHeight);
}

function shader2() {
  pg2.shader(theShader2);
  theShader2.setUniform("u_resolution", [width, height]);
  theShader2.setUniform("u_time", frameCount * 0.01);
  theShader2.setUniform("u_mouse", [mouseX, mouseY]);
  pg2.rect(-windowWidth / 2, -windowHeight / 2, windowWidth, windowHeight);
}

function shader3() {
  pg3.shader(theShader3);
  theShader3.setUniform("u_resolution", [width, height]);
  theShader3.setUniform("u_time", frameCount * 0.03);
  theShader3.setUniform("u_mouse", [mouseX, mouseY]);
  pg3.rect(-windowWidth / 2, -windowHeight / 2, windowWidth, windowHeight);
}


function objects(n) {
  this.n = n;
  if(mode==1)t=t+0.01;
  if (this.n == 0) {
    push()
    translate(x, y, z - 45);
    coordinate(this.n);
    fill(0);
    texture(pg3);

    push()
    if (t < v / (2 * a)) {
      rotateX(map(t, 0, v / (2 * a), 0, PI *3/4));
      rotateY(map(t, 0, v / (2 * a), 0, PI /3));
      rotateZ(map(t, 0, v / (2 * a), 0, -PI / 2));
    } else if ((t >= v / (2 * a)) && (t <= (30 * a * PI / v) * PI + (v / (2 * a)))) {
      rotateX(map(t, v / (2 * a), (30 * a * PI / v) * PI + (v / (2 * a)), PI*3/4, 2 * PI));
      rotateY(map(t, v / (2 * a), (30 * a * PI / v) * PI + (v / (2 * a)), PI / 3, PI * 2));
      rotateZ(map(t, v / (2 * a), (30 * a * PI / v) * PI + (v / (2 * a)), -PI /2, -2 * PI));
    }

    modeling(this.n);
    pop();

    if (t < v / (2 * a)) {
      z = v * t - a * t * t;
      r = v * t - a * t * t;

    } else if ((t >= v / (2 * a)) && (t < (30 * a * PI / v) * PI + (v / (2 * a)))) {
      z = v * v / (8 * a) * cos((t - v / (2 * a)) / (150 * a * PI / (5 * v))) + v * v / (8 * a) + (v * v / (35 * a) * cos((t - v / (2 * a)) / (30 * a / (2 * v))) - v * v / (35 * a)) * map(t, v / (2 * a), (30 * a * PI / v) * PI + (v / (2 * a)), 1, 0);
      r = v * v / (8 * a) * cos((t - v / (2 * a)) / (150 * a * PI / (5 * v))) + v * v / (8 * a);
    } else if (t > (150 * a * PI / (5 * min(v, v1, v2, v3, v4))) * PI + (v / (2 * a))) {
      mode = 0;
      t = 0;
      v=voriginal;
    }
    //  theta = ang;
    x = r * cos(theta);
    y = r * sin(theta);

    pop();
  }
  if (this.n == 1) {
    push()
    translate(x1, y1, z1 - 45);
    coordinate(this.n);
    fill(0);
    texture(pg3);

    push()
    if (t < v1 / (2 * a)) {
      rotateX(map(t, 0, v1 / (2 * a), 0, PI*3 / 4));
      rotateY(map(t, 0, v1 / (2 * a), 0, -PI *3/ 5));
      rotateZ(map(t, 0, v1 / (2 * a), 0, PI /2));
    } else if ((t >= v1 / (2 * a)) && (t <= (30 * a * PI / v1) * PI + (v1 / (2 * a)))) {
      rotateX(map(t, v1 / (2 * a), (30 * a * PI / v1) * PI + (v1 / (2 * a)), PI * 3 / 4,2 * PI));
      rotateY(map(t, v1 / (2 * a), (30 * a * PI / v1) * PI + (v1 / (2 * a)), -PI  *3/ 5, -PI * 2));
      rotateZ(map(t, v1 / (2 * a), (30 * a * PI / v1) * PI + (v1 / (2 * a)), +PI/2,2*PI));
    }

    modeling(this.n);
    pop();

    if (t < v1 / (2 * a)) {
      z1 = v1 * t - a * t * t;
      r1 = v1 * t - a * t * t;

    } else if ((t >= v1 / (2 * a)) && (t < (30 * a * PI / v1) * PI + (v1 / (2 * a)))) {
      z1 = v1 * v1 / (8 * a) * cos((t - v1 / (2 * a)) / (150 * a * PI / (5 * v1))) + v1 * v1 / (8 * a) + (v1 * v1 / (35 * a) * cos((t - v1 / (2 * a)) / (30 * a / (2 * v1))) - v1 * v1 / (35 * a)) * map(t, v1 / (2 * a), (30 * a * PI / v1) * PI + (v1 / (2 * a)), 1, 0);
      r1 = v1 * v1 / (8 * a) * cos((t - v1 / (2 * a)) / (150 * a * PI / (5 * v1))) + v1 * v1 / (8 * a);
    } else if (t > (150 * a * PI / (5 * min(v, v1, v2, v3, v4))) * PI + (v1 / (2 * a))) {
      mode = 0;
      t = 0;
      v1=voriginal1;
    }

    x1 = r1 * cos(theta1);
    y1 = r1 * sin(theta1);

    pop();
  }
  if (this.n == 2) {
    push()
    translate(x2, y2, z2 - 45);
    coordinate(this.n);
    fill(0);
    texture(pg3);

    push()
    if (t < v2 / (2 * a)) {
      rotateX(map(t, 0, v2 / (2 * a), 0, -PI *3/4));
      rotateY(map(t, 0, v2 / (2 * a), 0, -PI * 3 / 5));
      rotateZ(map(t, 0, v2 / (2 * a), 0, PI / 2));
    } else if ((t >= v2 / (2 * a)) && (t <= (30 * a * PI / v2) * PI + (v2 / (2 * a)))) {
      rotateX(map(t, v2 / (2 * a), (30 * a * PI / v2) * PI + (v2 / (2 * a)), -PI * 3 / 4, -2 * PI));
      rotateY(map(t, v2 / (2 * a), (30 * a * PI / v2) * PI + (v2 / (2 * a)), -PI * 3 / 5, -PI * 2));
      rotateZ(map(t, v2 / (2 * a), (30 * a * PI / v2) * PI + (v2 / (2 * a)), PI / 2, 2 * PI));
    }

    modeling(this.n);
    pop();

    if (t < v2 / (2 * a)) {
      z2 = v2 * t - a * t * t;
      r2 = v2 * t - a * t * t;

    } else if ((t >= v2 / (2 * a)) && (t < (30 * a * PI / v2) * PI + (v2 / (2 * a)))) {
      z2 = v2 * v2 / (8 * a) * cos((t - v2 / (2 * a)) / (150 * a * PI / (5 * v2))) + v2 * v2 / (8 * a) + (v2 * v2 / (35 * a) * cos((t - v2 / (2 * a)) / (30 * a / (2 * v2))) - v2 * v2 / (35 * a)) * map(t, v2 / (2 * a), (30 * a * PI / v2) * PI + (v2 / (2 * a)), 1, 0);
      r2 = v2 * v2 / (8 * a) * cos((t - v2 / (2 * a)) / (150 * a * PI / (5 * v2))) + v2 * v2 / (8 * a);
    } else if (t > (150 * a * PI / (5 * min(v, v1, v2, v3, v4))) * PI + (v2 / (2 * a))) {
      mode = 0;
      t = 0;
      v2=voriginal2;
    }

    x2 = r2 * cos(theta2);
    y2 = r2 * sin(theta2);

    pop();
  }
  if (this.n == 3) {
    push()
    translate(x3, y3, z3 - 45);
    coordinate(this.n);
    fill(0);
    texture(pg3);

    push()
    if (t < v3 / (2 * a)) {
      rotateX(map(t, 0, v3 / (2 * a), 0, -PI * 3 / 4));
      rotateY(map(t, 0, v3 / (2 * a), 0, -PI * 3 / 5));
      rotateZ(map(t, 0, v3 / (2 * a), 0, +PI / 2));
    } else if ((t >= v3 / (2 * a)) && (t <= (30 * a * PI / v3) * PI + (v3 / (2 * a)))) {
      rotateX(map(t, v3 / (2 * a), (30 * a * PI / v3) * PI + (v3 / (2 * a)), -PI * 3 / 4, -2* PI));
      rotateY(map(t, v3 / (2 * a), (30 * a * PI / v3) * PI + (v3 / (2 * a)), -PI * 3 / 5, -PI * 2));
      rotateZ(map(t, v3 / (2 * a), (30 * a * PI / v3) * PI + (v3 / (2 * a)),PI / 2, +2 * PI));
    }

    modeling(this.n);
    pop();

    if (t < v3 / (2 * a)) {
      z3 = v3 * t - a * t * t;
      r3 = v3 * t - a * t * t;

    } else if ((t >= v3 / (2 * a)) && (t < (30 * a * PI / v3) * PI + (v3 / (2 * a)))) {
      z3 = v3 * v3 / (8 * a) * cos((t - v3 / (2 * a)) / (150 * a * PI / (5 * v3))) + v3 * v3 / (8 * a) + (v3 * v3 / (35 * a) * cos((t - v3 / (2 * a)) / (30 * a / (2 * v3))) - v3 * v3 / (35 * a)) * map(t, v3 / (2 * a), (30 * a * PI / v3) * PI + (v3 / (2 * a)), 1, 0);
      r3 = v3 * v3 / (8 * a) * cos((t - v3 / (2 * a)) / (150 * a * PI / (5 * v3))) + v3 * v3 / (8 * a);
    } else if (t > (150 * a * PI / (5 * min(v, v1, v2, v3, v4))) * PI + (v3 / (2 * a))) {
      mode = 0;
      t = 0;
      v3=voriginal3;
    }
    //  theta = ang;
    x3 = r3 * cos(theta3);
    y3 = r3 * sin(theta3);

    pop();
  }
  if (this.n == 4) {
    push()
    translate(x4, y4, z4 - 45);
    coordinate(this.n);
    fill(0);
    texture(pg3);

    push()
    if (t < v4 / (2 * a)) {
      rotateX(map(t, 0, v4 / (2 * a), 0, -PI * 3 / 4));
      rotateY(map(t, 0, v4 / (2 * a), 0, -PI * 2 / 3));
      rotateZ(map(t, 0, v4 / (2 * a), 0, -PI / 2));
    } else if ((t >= v4 / (2 * a)) && (t <= (30 * a * PI / v4) * PI + (v4 / (2 * a)))) {
      rotateX(map(t, v4 / (2 * a), (30 * a * PI / v4) * PI + (v4 / (2 * a)), -PI * 3 / 4, -2 * PI));
      rotateY(map(t, v4 / (2 * a), (30 * a * PI / v4) * PI + (v4 / (2 * a)), -PI * 2 / 3,- PI * 2));
      rotateZ(map(t, v4 / (2 * a), (30 * a * PI / v4) * PI + (v4 / (2 * a)), -PI / 2, -2 * PI));
    }

    modeling(this.n);
    pop();

    if (t < v4 / (2 * a)) {
      z4 = v4 * t - a * t * t;
      r4 = v4 * t - a * t * t;

    } else if ((t >= v4 / (2 * a)) && (t < (30 * a * PI / v4) * PI + (v4 / (2 * a)))) {
      z4 = v4 * v4 / (8 * a) * cos((t - v4 / (2 * a)) / (150 * a * PI / (5 * v4))) + v4 * v4 / (8 * a) + (v4 * v4 / (35 * a) * cos((t - v4 / (2 * a)) / (30 * a / (2 * v4))) - v4 * v4 / (35 * a)) * map(t, v / (2 * a), (30 * a * PI / v4) * PI + (v4 / (2 * a)), 1, 0);
      r4 = v4 * v4 / (8 * a) * cos((t - v4 / (2 * a)) / (150 * a * PI / (5 * v4))) + v4 * v4 / (8 * a);
    } else if (t > (150 * a * PI / (5 * min(v, v1, v2, v3, v4))) * PI + (v4 / (2 * a))) {
      t = 0;
      mode = 0;
      v4=voriginal4;
    }

    //  theta = ang;
    x4 = r4 * cos(theta4);
    y4 = r4 * sin(theta4);

    pop();
  }
}

function check() {
  push()
  strokeWeight(5);
  stroke(255, 0, 0);
  line(0, 0, 0, 100, 0, 0);
  stroke(0, 255, 0);
  line(0, 0, 0, 0, 100, 0);
  stroke(0, 0, 255);
  line(0, 0, 0, 0, 0, 100);
  pop();
} // 축 확인용

function table() {
  push()
  translate(0, 0, -160);
  push()
  translate(0, 0, 100);
  rotateX(-PI / 2);
  texture(pg3);
  cylinder(100, 30);
  pop()
  push()
  translate(50, 50, 50);
  rotateX(-PI / 2);
  texture(pg3);
  cylinder(17, 100);
  pop()
  push()
  translate(50, -50, 50);
  rotateX(-PI / 2);
  texture(pg3);
  cylinder(17, 100);
  pop()
  push()
  translate(-50, 50, 50);
  rotateX(-PI / 2);
  texture(pg3);
  cylinder(17, 100);
  pop()
  push()
  translate(-50, -50, 50);
  rotateX(-PI / 2);
  texture(pg3);
  cylinder(17, 100);
  pop()
  pop()
}

function modeling(num) {
  this.num = num;

  if (num == 0) //주전자
  {
    push();
    //translate(-40, 60, 0);
    scale(2);
    rotateZ(PI / 8);
    model(teapot);
    pop();

  }

  if (num == 1) //찻잔
  {
    push()
    //translate(-5, 80, 0);
    scale(2);
    rotateX(PI / 2);
    model(teacup);
    pop()
  }

  if (num == 2) //토끼
  {
    push();
    //translate(-40, -10, 0);
    scale(12);
    //rotateX(PI/2);
    rotateZ(PI * 4 / 5);
    model(rabbit);
    pop();
  }

  if (num == 3) //모자랑시계
  {
    push();
    //translate(50, -20, 0);
    scale(4);
    //rotateX(PI/2);
    rotateZ(PI + PI / 8);
    model(hatclock);
    pop();
  }

  if (num == 4) //열쇠
  {
    push();
    //translate(55, 65, 10);
    scale(0.15);
    rotateZ(PI + PI / 4);
    check();
    rotateY(PI / 2);
    //rotate(PI/3);
    model(realkey);
    pop();
  }
}

function coordinate(m) {
  this.m = m;
  if (this.m == 0) {
    translate(-40, 60, 0);
  }
  if (this.m == 1) {
    translate(-5, 80, 0);
  }
  if (this.m == 2) {
    translate(-40, -10, 0);
  }
  if (this.m == 3) {
    translate(50, -20, 0);
  }
  if (this.m == 4) {
    translate(55, 65, 10);
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

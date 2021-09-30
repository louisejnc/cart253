"use strict";

/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/
let covid1 = {
  x1: -25,
  y1: 235,
  x2: -25,
  y2: 265,
  x3: 0,
  y3: 250,
  size: 25,
  height: 30,
  vx: 0,
  vy: 0,
  speed:3,
  fill: {
    r: 0,
    g: 26,
    b: 255
  }
};

let covid2 = {
  x1: -25,
  y1: 235,
  x2: -25,
  y2: 265,
  x3: 0,
  y3: 250,
  size: 25,
  height: 30,
  vx: 0,
  vy: 0,
  speed:3,
  fill: {
    r: 0,
    g: 26,
    b: 255
  }
}

let covid3 = {
  x1: -25,
  y1: 235,
  x2: -25,
  y2: 265,
  x3: 0,
  y3: 250,
  size: 25,
  height: 30,
  vx: 0,
  vy: 0,
  speed:3,
  fill: {
    r: 0,
    g: 26,
    b: 255
  }
}

let user = {
  x: 250,
  y: 250,
  size: 70,
  fill: {
    r: 255,
    g: 255,
    b: 255
  }
};

let numStatic = 1000;

let pixelFont;

let gameOver = {
  x: 0,
  y: 0,
  fill: {
    r: 134,
    g: 255,
    b: 215
  }
};

let displayGameOver = false;

function preload(){
  pixelFont = loadFont('assets/04B_30__.ttf')
}


// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth,windowHeight);

  //Setup covid
  //1st triangle
  covid1.x3 = 0;
  //covid1.y3 = random(0,height);
  covid1.x1 = -covid1.size;
  covid1.y1 = covid1.y3 - covid1.height/2;
  covid1.x2 = -covid1.size;
  covid1.y2 = covid1.y3 + covid1.height/2;
  covid1.vx = covid1.speed;
  //2nd triangle
  covid2.x3 = 0;
  //covid2.y3 = random(0,height);
  covid2.x1 = -covid2.size;
  covid2.y1 = covid2.y3 - covid2.height/2;
  covid2.x2 = -covid2.size;
  covid2.y2 = covid2.y3 + covid2.height/2;
  covid2.vx = covid2.speed;
  //3rd triangle
  covid3.x3 = 0;
  //covid3.y3 = random(0,height);
  covid3.x1 = -covid3.size;
  covid3.y1 = covid3.y3 - covid3.height/2;
  covid3.x2 = -covid3.size;
  covid3.y2 = covid3.y3 + covid3.height/2;
  covid3.vx = covid3.speed;

  user.x = width/1.2
  user.y = height/2




  noCursor();

  textFont(pixelFont);
  textSize(width/5);
  textAlign(CENTER);



}

// Description of draw() goes here.
function draw() {
  background(0);

  // Display static
  for( let i = 0; i < numStatic; i++) {
    let x = random(0,width);
    let y = random(0,height);
    stroke(255);
    point(x,y);
  }

  // Display covid 19
  noStroke()
  //1st triangle
  fill(covid1.fill.r, covid1.fill.g, covid1.fill.b);
  triangle(covid1.x1, covid1.y1, covid1.x2, covid1.y2, covid1.x3, covid1.y3);
  //2nd triangle
  fill(covid2.fill.r, covid2.fill.g, covid2.fill.b);
  triangle(covid2.x1, covid2.y1, covid2.x2, covid2.y2, covid2.x3, covid2.y3);
  //3rd triangle
  fill(covid1.fill.r, covid3.fill.g, covid3.fill.b);
  triangle(covid1.x1, covid3.y1, covid3.x2, covid3.y2, covid3.x3, covid3.y3);


  // Covid 19 movement
  // 1st triangle
  covid1.x1 += covid1.vx;
  covid1.x2 += covid1.vx;
  covid1.x3 += covid1.vx;
  //2nd triangle
  covid2.x1 += covid2.vx;
  covid2.x2 += covid2.vx;
  covid2.x3 += covid2.vx;
  //3rd triangle
  covid3.x1 += covid3.vx;
  covid3.x2 += covid3.vx;
  covid3.x3 += covid3.vx;

  if(covid1.x1 > width) {
    covid1.x3 = 0;
    covid1.y3 = random(0,height);
    covid1.x1 = -covid1.size;
    covid1.y1 = covid1.y3 - covid1.height/2;
    covid1.x2 = -covid1.size;
    covid1.y2 = covid1.y3 + covid1.height/2;
  };

  if(covid2.x1 > width) {
    covid2.x3 = 0;
    covid2.y3 = random(0,height);
    covid2.x1 = -covid2.size;
    covid2.y1 = covid2.y3 - covid2.height/2;
    covid2.x2 = -covid2.size;
    covid2.y2 = covid2.y3 + covid2.height/2;
  };

  if(covid3.x1 > width) {
    covid3.x3 = 0;
    covid3.y3 = random(0,height);
    covid3.x1 = -covid3.size;
    covid3.y1 = covid3.y3 - covid3.height/2;
    covid3.x2 = -covid3.size;
    covid3.y2 = covid3.y3 + covid3.height/2;
  };


  // Display User
  fill(user.fill.r, user.fill.g, user.fill.b);
  ellipse(user.x, user.y, user.size);


  // Check for touching covid 19
  //1st triangle
  let d1 = dist(user.x, user.y, covid1.x3, covid1.y3);
  if(d1 < covid1.size/2 + user.size/2) {
    noLoop();
    displayGameOver = true}
  //2nd triangle
  let d2 = dist(user.x, user.y, covid2.x3, covid2.y3);
  if(d2 < covid2.size/2 + user.size/2) {
      noLoop();
      displayGameOver = true}
  //3rd triangle
  let d3 = dist(user.x, user.y, covid3.x3, covid3.y3);
  if(d3 < covid3.size/2 + user.size/2) {
        noLoop();
        displayGameOver = true}


  // Display GameOver
  if(displayGameOver) {
    push();
    fill(gameOver.fill.r,gameOver.fill.g,gameOver.fill.b);
    textAlign(CENTER);
    translate(width/2,height/2.3);
    text('GAME', gameOver.x, gameOver.y);
    pop();

    push();
    fill(gameOver.fill.r,gameOver.fill.g,gameOver.fill.b);
    textAlign(CENTER);
    translate(width/2,height/1.5);
    text('OVER',gameOver.x,gameOver.y);
    pop();
  };

  }

// User movement
function mouseDragged() {
  user.x = mouseX;
  user.y = mouseY;
}

function mousePressed() {
  user.fill.r = 250;
  user.fill.g = 166;
  user.fill.b = 255;
}

"use strict";

/**************************************************
Dodge Em Exercise
Louise JEAN-CAMPANA

Game were the user control with his mouse a circle.
Active user = pink circle
5triangles = covid, add 1 triangle after another.
The user have to avoid the triangles.

If they touch a triangle with the circle, they loose the game:
Screen freeze and show Game Over
**************************************************/

//background
let bg;

//Covid
//covid1
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
  ax: 0,
  ay: 0,
  acceleration: 2.5,
  minSpeed: 1.5,
  maxSpeed: 7,
  fill: {
    r: 0,
    g: 0,
    b: 255
  }
};

//covid2
let displayTriangle2 = false;

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
  ax: 0,
  ay: 0,
  acceleration: 2.5,
  minSpeed: 1.5,
  maxSpeed: 7,
  fill: {
    r: 0,
    g: 0,
    b: 255
  }
};

//covid3
let displayTriangle3 = false;

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
  ax: 0,
  ay: 0,
  acceleration: 2.5,
  minSpeed: 1.5,
  maxSpeed: 7,
  fill: {
    r: 0,
    g: 0,
    b: 255
  }
};

//covid4
let displayTriangle4 = false;

let covid4 = {
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
  ax: 0,
  ay: 0,
  acceleration: 2.5,
  minSpeed: 1.5,
  maxSpeed: 7,
  fill: {
    r: 0,
    g: 0,
    b: 255
  }
};

//covid5
let displayTriangle5 = false;

let covid5 = {
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
  ax: 0,
  ay: 0,
  acceleration: 2.5,
  minSpeed: 1.5,
  maxSpeed: 7,
  fill: {
    r: 0,
    g: 0,
    b: 255
  }
};

//user
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

//gresillement
let numStatic = 5000;

let dots = {
  color : {
    r: 134,
    g: 255,
    b: 215
  }
};

//Game Over
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

//Preload font GameOver
function preload(){
  pixelFont = loadFont('assets/04B_30__.TTF');
  bg = loadImage('assets/images/background.jpg');
}



// Define covid triangles shape & size + user size
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

  covid1.ax = covid1.acceleration;
  covid1.vx += covid1.ax;

  //2nd triangle
  covid2.x3 = 0;
  covid2.y3 = random(0,height);
  covid2.x1 = -covid2.size;
  covid2.y1 = covid2.y3 - covid2.height/2;
  covid2.x2 = -covid2.size;
  covid2.y2 = covid2.y3 + covid2.height/2;

  covid2.ax = covid2.acceleration;
  covid2.vx += covid2.ax;

  //3rd triangle
  covid3.x3 = 0;
  covid3.y3 = random(0,height);
  covid3.x1 = -covid3.size;
  covid3.y1 = covid3.y3 - covid3.height/2;
  covid3.x2 = -covid3.size;
  covid3.y2 = covid3.y3 + covid3.height/2;

  covid3.ax = covid3.acceleration;
  covid3.vx += covid3.ax;

  //4th triangle
  covid4.x3 = 0;
  covid4.y4 = random(0,height);
  covid4.x1 = -covid4.size;
  covid4.y1 = covid4.y3 - covid4.height/2;
  covid4.x2 = -covid4.size;
  covid4.y2 = covid4.y3 + covid4.height/2;

  covid4.ax = covid4.acceleration;
  covid4.vx += covid4.ax;

  //5th triangle
  covid5.x3 = 0;
  covid5.y4 = random(0,height);
  covid5.x1 = -covid5.size;
  covid5.y1 = covid5.y3 - covid5.height/2;
  covid5.x2 = -covid5.size;
  covid5.y2 = covid5.y3 + covid5.height/2;

  covid5.ax = covid5.acceleration;
  covid5.vx += covid5.ax;


  // User setup
  user.x = width/1.2
  user.y = height/2




  noCursor();

  textFont(pixelFont);
  textSize(width/5);
  textAlign(CENTER);

}

// Display User and covid triangles + movement
function draw() {
  background(bg);

  // Display covid 19
  noStroke()
  //1st triangle
  fill(covid1.fill.r, covid1.fill.g, covid1.fill.b);
  triangle(covid1.x1, covid1.y1, covid1.x2, covid1.y2, covid1.x3, covid1.y3);

  // Covid 19 movement
  // 1st triangle movement
  covid1.x1 += covid1.vx;
  covid1.x2 += covid1.vx;
  covid1.x3 += covid1.vx;

  if(covid1.x1 > width) {
    covid1.x3 = 0;
    covid1.y3 = random(0,height);
    covid1.x1 = -covid1.size;
    covid1.y1 = covid1.y3 - covid1.height/2;
    covid1.x2 = -covid1.size;
    covid1.y2 = covid1.y3 + covid1.height/2;

    covid1.acceleration = random(covid1.minSpeed,covid1.maxSpeed);
    covid1.ax = covid1.acceleration;
    covid1.vx = covid1.ax;
    displayTriangle2 = true;
  };

  //2nd triangle display & movement
  if(displayTriangle2) {
    fill(covid2.fill.r, covid2.fill.g, covid2.fill.b);
    triangle(covid2.x1, covid2.y1, covid2.x2, covid2.y2, covid2.x3, covid2.y3);
    //2nd triangle movement
    covid2.x1 += covid2.vx;
    covid2.x2 += covid2.vx;
    covid2.x3 += covid2.vx;
}

  if(covid2.x1 > width) {
    covid2.x3 = 0;
    covid2.y3 = random(0,height);
    covid2.x1 = -covid2.size;
    covid2.y1 = covid2.y3 - covid2.height/2;
    covid2.x2 = -covid2.size;
    covid2.y2 = covid2.y3 + covid2.height/2;

    covid2.acceleration = random(covid2.minSpeed,covid2.maxSpeed);
    covid2.ax = covid2.acceleration;
    covid2.vx = covid2.ax;
    displayTriangle3 = true;
  };

  //3rd triangle display & movement
  if(displayTriangle3) {
    fill(covid3.fill.r, covid3.fill.g, covid3.fill.b);
    triangle(covid3.x1, covid3.y1, covid3.x2, covid3.y2, covid3.x3, covid3.y3);
    //3rd triangle movement
    covid3.x1 += covid3.vx;
    covid3.x2 += covid3.vx;
    covid3.x3 += covid3.vx;
  }

  if(covid3.x1 > width) {
    covid3.x3 = 0;
    covid3.y3 = random(0,height);
    covid3.x1 = -covid3.size;
    covid3.y1 = covid3.y3 - covid3.height/2;
    covid3.x2 = -covid3.size;
    covid3.y2 = covid3.y3 + covid3.height/2;

    covid3.acceleration = random(covid3.minSpeed,covid3.maxSpeed);
    covid3.ax = covid3.acceleration;
    covid3.vx = covid3.ax;
    displayTriangle4 = true;
  };

  //4th triangle display & movement
  if(displayTriangle4) {
    fill(covid4.fill.r, covid4.fill.g, covid4.fill.b);
    triangle(covid4.x1, covid4.y1, covid4.x2, covid4.y2, covid4.x3, covid4.y3);
    //4th triangle movement
    covid4.x1 += covid4.vx;
    covid4.x2 += covid4.vx;
    covid4.x3 += covid4.vx;
  }

  if(covid4.x1 > width) {
    covid4.x3 = 0;
    covid4.y3 = random(0,height);
    covid4.x1 = -covid4.size;
    covid4.y1 = covid4.y3 - covid4.height/2;
    covid4.x2 = -covid4.size;
    covid4.y2 = covid4.y3 + covid4.height/2;

    covid4.acceleration = random(covid4.minSpeed,covid4.maxSpeed);
    covid4.ax = covid4.acceleration;
    covid4.vx = covid4.ax;
    displayTriangle5 = true;
  };

  //5th triangle display & movement
  if(displayTriangle5) {
    fill(covid5.fill.r, covid5.fill.g, covid5.fill.b);
    triangle(covid5.x1, covid5.y1, covid5.x2, covid5.y2, covid5.x3, covid5.y3);
    //5th triangle movement
    covid5.x1 += covid5.vx;
    covid5.x2 += covid5.vx;
    covid5.x3 += covid5.vx;
  }

  if(covid5.x1 > width) {
    covid5.x3 = 0;
    covid5.y3 = random(0,height);
    covid5.x1 = -covid5.size;
    covid5.y1 = covid5.y3 - covid5.height/2;
    covid5.x2 = -covid5.size;
    covid5.y2 = covid5.y3 + covid5.height/2;

    covid5.acceleration = random(covid5.minSpeed,covid5.maxSpeed);
    covid5.ax = covid5.acceleration;
    covid5.vx = covid5.ax;
    displayTriangle5 = true;
  };





  // Display User
  fill(user.fill.r, user.fill.g, user.fill.b);
  ellipse(user.x, user.y, user.size);

  // Check for touching covid 19
  //1st triangle
  let d1 = dist(user.x, user.y, covid1.x3, covid1.y3);
  if(d1 < covid1.size/2 + user.size/2) {
    noLoop();
    displayGameOver = true
  };

  //2nd triangle
  let d2 = dist(user.x, user.y, covid2.x3, covid2.y3);
  if(d2 < covid2.size/2 + user.size/2) {
    noLoop();
    displayGameOver = true
  };

  //3rd triangle
  let d3 = dist(user.x, user.y, covid3.x3, covid3.y3);
  if(d3 < covid3.size/2 + user.size/2) {
    noLoop();
    displayGameOver = true
  };

  //4th triangle
  let d4 = dist(user.x, user.y, covid4.x3, covid4.y3);
  if(d4 < covid4.size/2 + user.size/2) {
    noLoop();
    displayGameOver = true
  };

  //5th triangle
  let d5 = dist(user.x, user.y, covid5.x3, covid5.y3);
  if(d5 < covid5.size/2 + user.size/2) {
    noLoop();
    displayGameOver = true
  };

  // Display static
  for( let i = 0; i < numStatic; i++) {
    let x = random(0,width);
    let y = random(0,height);
    stroke(dots.color.r, dots.color.g, dots.color.b);
    point(x,y);
  }


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
    translate(width/2,height/1.1);
    text('OVER',gameOver.x,gameOver.y);
    pop();
  };

  }

// User movement
function mouseDragged() {
  user.x = mouseX;
  user.y = mouseY;
}
// User color when active
function mousePressed() {
  user.fill.r = 255;
  user.fill.g = 186;
  user.fill.b = 255;
}

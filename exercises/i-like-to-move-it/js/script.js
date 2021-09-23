"use strict";

/**************************************************
I like to move it!
Louise JEAN-CAMPANA

Draw a square, a circle and a triangle.
Differents sizes and colors
They move from top to bottom
constrain to stop their fall at the bottom of the canvas
mouseX to change their sizes
mouseY to change their colors
**************************************************/

let bg = {
  r: 255,
  g: 0,
  b: 255
}

let square = {
  x: 180,
  y: -100,
  fill: 255,
  size: 200,
  speed: 1
}

let t = {
  x1: 330,
  y1: 0,
  x2: 380,
  y2: 130,
  x3: 200,
  y3: 130,
  fill: 255,
  speed: 1.3
}


let circle = {
  x: 265,
  y: -50,
  fill: 255,
  size: 100,
  speed: 2
}


// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(500,500);
  //noStroke();
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(bg.r, bg.g, bg.b);

  //square
  rectMode(CENTER);
  square.y += square.speed;
  square.y = constrain(square.y,-500,400);
  fill(square.fill);
  rect(square.x, square.y, square.size);

  //triangle
  t.y1 += t.speed;
  t.y2 += t.speed;
  t.y3 += t.speed;
  t.y1 = constrain(t.y1,-500,370);
  t.y2 = constrain(t.y2,-500,500);
  t.y3 = constrain(t.y3,-500,500);

  fill(t.fill);
  triangle(t.x1,t.y1,t.x2,t.y2,t.x3,t.y3);


  //circle
  ellipseMode(CENTER);
  circle.y += circle.speed;
  circle.y = constrain(circle.y, -500, 450);
  fill(circle.fill);
  ellipse(circle.x, circle.y, circle.size);





}

"use strict";

/**************************************************
I like to move it!
Louise JEAN-CAMPANA

Draw a square, a circle and a triangle.
Differents sizes and colors
They move from top to bottom
constrain to stop their fall at the bottom of the canvas
map x for color change
mouseX to change their sizes
mouseY to change their colors
**************************************************/

let canvas = {
  w: 500,
  h: 500
}

let bg = {
  r: 255,
  g: 0,
  b: 255,
  fill: 50
}

let square = {
  x: 180,
  y: -100,
  fillr: 173,
  fillg: 178,
  fillb: 253,
  size: 200,
  speed: 1
}

let t = {
  x1: 330,
  y1: -130,
  x2: 380,
  y2: 0,
  x3: 200,
  y3: 0,
  fillr: 213,
  fillg: 255,
  fillb: 201,
  speed: 1.6,
  h: 130
}


let circle = {
  x: 265,
  y: -100,
  fillr: 250,
  fillg: 201,
  fillb: 255,
  size: 100,
  speed: 2
}


// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(canvas.w,canvas.h);
  noStroke();
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(bg.fill);
  bg.fill = map(mouseY,0,canvas.h,0,255);

  //square
  rectMode(CENTER);
  square.y += square.speed;
  square.y = constrain(square.y,-square.size,canvas.h-square.size/2);
  fill(square.fillr,square.fillg,square.fillb);
  square.speed = map(square.size,80,600,2.2,0.5);
  square.size = map(mouseX,0,canvas.w,80,640);
  //square.fill = map(mouseY,0,canvas.h,150,50);
  rect(square.x, square.y, square.size);

  //triangle
  t.y1 += t.speed;
  t.y2 += t.speed;
  t.y3 += t.speed;
  t.y1 = constrain(t.y1,-t.h,canvas.h-t.h);
  t.y2 = constrain(t.y2,0,canvas.h);
  t.y3 = constrain(t.y3,0,canvas.h);
  fill(t.fillr,t.fillg,t.fillb);
  t.fillr = map(t.y1,-t.h,canvas.h-t.h,202,247);
  t.fillb = map(t.y1,-t.h,canvas.h-t.h,213,202);
  triangle(t.x1,t.y1,t.x2,t.y2,t.x3,t.y3);


  //circle
  ellipseMode(CENTER);
  circle.y += circle.speed;
  circle.y = constrain(circle.y,-circle.size/2,canvas.h-circle.size/2);
  //circle.size = map(mouseY,0,canvas.w,50,200);

  fill(circle.fillr,circle.fillg,circle.fillb);
  circle.fillg = map(circle.y,-circle.size/2,canvas.h-circle.size/2,202,201);
  circle.fillb = map(circle.y,-circle.size/2,canvas.h-circle.size/2,202,255);
  ellipse(circle.x, circle.y, circle.size);





}

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
  fill: 0,
  size: 200,
  speed: 2
}

let circle = {
  x: 250,
  y: -50,
  fill: 0,
  size: 100,
  speed: 1
}


// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(500,500);
  noStroke();
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(bg.r, bg.g, bg.b);

  //square
  rectMode(CENTER);
  square.y += square.speed;
  square.y = constrain(square.y,-100,400);
  fill(square.fill);
  rect(square.x, square.y, square.size);


  //circle
  ellipseMode(CENTER);
  circle.y += circle.speed;
  circle.y = constrain(circle.y, -50, 450);
  fill(circle.fill);
  ellipse(circle.x, circle.y, circle.size);





}

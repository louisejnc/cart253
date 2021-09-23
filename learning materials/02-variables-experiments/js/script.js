"use strict";

/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

let backgroundShade = 1;
let circleX = 0;
let circleY = 250;
let circleSize = 200;
let circleSpeed = 2;


let circle = {
  x: 0,
  y: 250,
  size: 100,
  speed: 1,
  fill: 255
};

// setup()
//
// Description of setup() goes here.
function setup() {
createCanvas(windowWidth,windowHeight);
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(backgroundShade);
  circle.x += circle.speed;
  circle.x = constrain(circle.x,0,width);
  
  circle.fill = map(circle.x,0,width,0,255);
  fill(circle.fill);
  ellipse(circle.x, circle.y, circle.size);

  let randomNumber = random()

  console.log(randomNumber);
}

"use strict";

/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

let circleSize = 200 ;
let backgroundShade = 0;
let circleY = 200;
let circleX = 0;
let circleSpeed = 2;
let cicleAcceleration = 0.25;

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
  backgroundShade = backgroundShade+1;
  background(backgroundShade);
  circleX += circleSpeed;
  circleSpeed += cicleAcceleration;
  ellipse(circleX,circleY,circleSize);
}

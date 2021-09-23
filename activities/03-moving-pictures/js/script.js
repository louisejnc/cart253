/**
Activity 03: Moving objects
Louise JEAN-CAMPANA

Two circles, the left one bigger and more transparent than the right,
come in from either side of the screen, growing as they do so.
They stop in the centre while still growing.
The background goes from black to red.
*/

"use strict";


/**
Description of preload
*/
function preload() {

}
let bg = {
  r: 0,
  g: 0,
  b: 0
};

let circle1 = {
  x: 0,
  y: 250,
  size: 100,
  speed: 1,
  growthRate: 1,
  fill: 255,
  alpha: 200,
};

let circle2 = {
  x: 500,
  y: 250,
  size: 75,
  speed: -1,
  sizeRatio: 0.5,
  fill: 255,
  alpha: 200
};
/**
Description of setup
*/
function setup() {
  createCanvas(500,500);
  noStroke();
};

/**
Description of draw()
*/
function draw() {
  //background
  background(bg.r, bg.g, bg.b);
  bg.r = map(circle1.size,100,width,0,255);

  //left circle1
  circle1.x += circle1.speed;
  circle1.x = constrain(circle1.x, 0, width/2);
  circle1.size += circle1.growthRate;
  circle1.size = constrain(circle1.size, 0, width);
  fill(circle1.fill, circle1.alpha);
  ellipse(circle1.x, circle1.y, circle1.size);

  //right circle2
  circle2.x += circle2.speed;
  circle2.x = constrain(circle2.x, width/2, width);
  circle2.size = circle1.size * circle2.sizeRatio;
  fill(circle2.fill, circle2.alpha);
  ellipse(circle2.x, circle2.y, circle2.size);


}

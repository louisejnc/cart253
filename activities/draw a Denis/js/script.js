/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";


function setup() {

  createCanvas(640,640);

  background(195,255,208);

//basic drawing settings
  noStroke();

  rectMode(CENTER);

  //right arm
  fill(255,105,255);
  rect(351,345,20,200,10);//right

  //draw body
  fill(255,130,255);
  rect(320,320,70,150,14);
  //legs"
  rect(300,470,25,220,10);//left
  rect(340,470,25,220,10);//right

  //left arm
  fill(255,155,255);
  rect(290, 345,20,200,10);//left

//HEAD
ellipseMode(CORNER);
ellipse(280,160,80,80)



}


/**
Description of draw()
*/
function draw() {

}

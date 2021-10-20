/**
ROUTINE
Louise Jean-Campana

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

let bg = {
  fill:{
    r:0,
    g:0,
    b:0
  }
}

let user = {
  x:0,
  y:0,
  size:50,
  vx:0,
  vy:0,
  speed:1,
  fill:{
    r:255,
    g:255,
    b:255
  },
};

let appt = {
  x:0,
  y:0,
  width : 0,
  height : 0
};

let bed = {
  x:0,
  y:0
}

let state = `routine`; // Can be : title, routine, game over, bravo
/**
Description of preload
*/
function preload() {
  appt = loadImage('assets/images/plan_appartement.png');

}


/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth/1.05,windowHeight/1.1);
  setupAppt();
  setupBed();
  setupUser();
}

function setupAppt() {
  appt.width = width/1.1;
  appt.height = appt.width/1.95;
}

function setupBed() {
  // Set up bed in relation to apptImg center
  bed.x = width/2-appt.width/2.05;
  bed.y = appt.height/11.5;
}

function setupUser() {
  user.x = bed.x;
  user.y = bed.y;
  user.size = width/30;
}



/**
Description of draw()
*/
function draw() {
  background(bg.fill.r,bg.fill.g,bg.fill.b);

  if (state === `title`){
    title();
  }
  if (state === `routine`) {
    routine();
  }
}

function routine() {
  planAppt();
  displayUser();
  moveUser();
}
function planAppt() {
  // Display plan appartement
  push();
  imageMode(CENTER);
  translate(width/2,height/2);
  image(appt,0,0,appt.width,appt.height);
  pop();
}

function displayUser() {
  translate(width/2,height/2);
  // Display circle
  noFill();
  strokeWeight(user.size/20);
  stroke(user.fill.r,user.fill.g,user.fill.b);
  ellipse(user.x,user.y,user.size);

  // Display 'me'
  push();
  noStroke();
  textSize(user.size/3);
  fill(user.fill.r,user.fill.g,user.fill.b);
  textAlign(CENTER,CENTER);
  text(`me`,user.x,user.y);
  pop();
}
// User control with arrow keys
function moveUser() {
  if(keyIsDown(UP_ARROW)) {
    user.y -= user.speed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    user.y += user.speed;
  }
  else if (keyIsDown(LEFT_ARROW)) {
    user.x -= user.speed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    user.x += user.speed;
  }
}

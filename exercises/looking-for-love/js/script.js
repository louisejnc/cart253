
/**
Looking for Love
Louise JEAN-CAMPANA

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";



let circle1 = {
  x: undefined,
  y: 250,
  size: 75,
  vx: 0,
  vy: 0,
  speed: 3,
  fill : {
    r: 255,
    g: 255,
    b: 255,
  }
};

let circle2 = {
  x: undefined,
  y: 250,
  size: 75,
  vx: 0,
  vy: 0,
  speed: 3,
  fill : {
    r: 255,
    g: 255,
    b: 255,
  }
};

let state = `title`; // Can be: title, simulation, love, sadness


function setup() {
  createCanvas(500,500);
  setupCircles();
};

function setupCircles() {
  // Position circles separated from one another
  circle1.x = width / 3;
  circle2.x = 2 * width / 3;

  circle1.fill.r= random(0,255);
  circle1.fill.g= random(0,255);
  circle2.fill.r= random(0,255);
  circle2.fill.g= random(0,255);
};

function draw() {
  background(255);

  if (state === `title`) {
    title();
  }
  else if (state === `simulation`) {
    simulation();
  }
  else if (state === `love`) {
    love();
  }
  else if (state === `sadness`) {
    sadness();
  }
  else if(state === `perfectMatch`) {
  perfectMatch();
}
  nonUser();
};

function title() {
  push();
  textSize(64);
  fill(43,36,255);
  textAlign(CENTER,CENTER);
  text(`LOVE ?`,width/2,height/2);
  pop();
};

function simulation() {
  move();
  checkOffscreen();
  checkOverlap();
  checkColors();
  display();
};

function love() {
  push();
  textSize(64);
  fill(251,114,255);
  textAlign(CENTER,CENTER);
  text(`LOVE !`,width/2,height/2);
  pop();
};

function sadness() {
  push();
  textSize(64);
  fill(119,114,255);
  textAlign(CENTER,CENTER);
  text(`D:`,width/2,height/2);
  pop();
};

function perfectMatch() {
  push();
  textSize(64);
  fill(255,0,0);
  textAlign(CENTER,CENTER);
  text(`Happily ever after`,width/2,height/2);
  pop();
};

function nonUser() {
  nonUsermove();
  nonUsergrowth();
};

function nonUsermove() {
  // Non User movement
    let change = random();
    if(change < 0.05) {
      circle2.vx = random(-circle2.speed,circle2.speed);
      circle2.vy = random(-circle2.speed,circle2.speed);
    };
};

function nonUsergrowth() {
  // Non User growth if it approach the end of the canvas
  if (circle2.x < circle2.size || circle2.x > width - circle2.size || circle2.y < circle2.size || circle2.y > height - circle2.size) {
    circle2.size+=1;
  };
};

function move() {
  // Move the circles
  circle1.x = circle1.x + circle1.vx;
  circle1.y = circle1.y + circle1.vy;

  circle2.x = circle2.x + circle2.vx;
  circle2.y = circle2.y + circle2.vy;
};

function checkOffscreen() {
  // Check if the circles have gone offscreen
  if (isOffscreen(circle1) || isOffscreen(circle2)) {
    state = `sadness`;
  };
};

function isOffscreen(circle) {
  if (circle.x < 0 || circle.x > width || circle.y < 0 || circle.y > height) {
    return true;
  }
  else {
    return false;
  }
};

function checkOverlap() {
  // Check if the circles are overlapping
  let d = dist(circle1.x,circle1.y,circle2.x,circle2.y);
  if (d < circle1.size/2 + circle2.size/2) {
    state = `love`;
  };
};

function checkColors() {
  if (circle1.fill.r === circle2.fill.r & circle1.fill.g === circle2.fill.g) {
    state = `perfectMatch`;
  }
};

function display() {
  noStroke();
  // Circle 1 - User
  fill(circle1.fill.r, circle1.fill.g, circle1.fill.b);
  ellipse(circle1.x,circle1.y,circle1.size);

  // Circle 2 - Non User
  fill(circle2.fill.r, circle2.fill.g, circle2.fill.b);
  ellipse(circle2.x,circle2.y,circle2.size);
};

function mousePressed() {
  if (state === `title`) {
    state = `simulation`;
  }
};

function mouseDragged() {
  circle1.x = mouseX;
  circle1.y = mouseY;
};

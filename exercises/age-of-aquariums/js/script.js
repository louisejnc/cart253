/**
Age of Aquariums
Louise JEAN-CAMPANA

This is a simulation of an aquarium.
The user can add a fish byt pressing the mouse.
The color and speed of fish are random.
The user can change the background by pressing the space key.
the user can give food to fishes by pressing the F key.

If two fishes overlap, the aquarium is too small. -> state = bad
If two fishes are too far away from each other, fish are lonely. -> state = lonely
*/

"use strict";

let school = [];
let schoolSize = 1;

let images = [];
let displayImage;

let displayText = {
  fill : 255
}

let mer = {
  fill : {
    r: 128,
    g: 128,
    b: 255,
  }
}

let state = `aquarium`; // Can be : aquarium, bad, lonely

/**
Preload of background images*/
function preload() {
  for(let i = 0; i < 7; i++) {
    let merImage = loadImage(`assets/images/mer-${i}.jpg`);
    images.push(merImage);
  }
}


/**
set up of the aquarium (canvas),background(images), fish(ellipse)*/
function setup() {
  createCanvas(windowWidth/1.1,windowHeight/1.1);
  displayImage = random(images);

  for(let i = 0; i < schoolSize; i++) {
    let fish = createFish(random(0,width), random(0,height));
    school.push(fish);
  }

}

function createFish(x, y) {
  let fish = {
    x: x,
    y: y,
    size: random(50,100),
    vx: 0,
    vy:0,
    speed: random(0, 5),
    fill: {
      r: random(0,255),
      g: 150,
      b: 150
    }
  };
  return fish;
}
/**
AQUARIUM : beginning of simulation (one fish, random speed & color, background image)
  If two fishes overlap -> STATE = BAD
  If d(fish1,fish2) > width/1.1 -> STATE = LONELY
BAD : blue screen, 'this aquarium is too small for those fish'
LONELY : blue screen 'these fish are lonely'
*/
function draw() {
  background(0);

  if (state === `aquarium`) {
    aquarium();
  }
  if (state === `bad`) {
    bad();
  }
  if(state === `lonely`){
    lonely();
  }

  checkOverlap();
  checkLonely();
}

function aquarium() {
  // Display Background Image
  displayMer();

  //Display fishes
  for(let i = 0; i <school.length; i++) {
    moveFish(school[i]);
    displayFish(school[i]);
  }
}
function displayMer() {
  //Display background
  push();
  imageMode(CENTER);
  image(displayImage,width/2,height/2);
  pop();
}
function moveFish(fish){
  //Random movement of fish
  let change = random(0, 1);
  if(change < 0.05) {
    fish.vx = random(-fish.speed, fish.speed);
    fish.vy = random(-fish.speed, fish.speed);
  }

  fish.x += fish.vx;
  fish.y += fish.vy;

  fish.x = constrain(fish.x, 0, width);
  fish.y = constrain(fish.y, 0, height);
}

function displayFish(fish) {
  //Display fish
  push();
  fill(fish.fill.r,fish.fill.g,fish.fill.b);
  noStroke();
  ellipse(fish.x, fish.y, fish.size);
  pop();
}

function bad() {
  background(mer.fill.r,mer.fill.g,mer.fill.b)
  badText();
}
function badText() {
  push();
  textAlign(CENTER);
  textSize(width/20)
  fill(displayText.fill)
  text('this aquarium is to small for those fish',width/2,height/2);
  pop();
}


function lonely() {
  background(mer.fill.r,mer.fill.g,mer.fill.b)
  lonelyText();
}

function lonelyText() {
  push();
  textAlign(CENTER);
  textSize(width/20)
  fill(displayText.fill)
  text('these fish are lonely',width/2,height/2);
  pop();
}


function checkOverlap() {
  for(let i = 0; i < school.length; i++) {
    for (let j = i+1; j < school.length; j++) {
      let d = dist(school[i].x, school[i].y, school[j].x, school[j].y)
      if (d < school[i].size/2 + school[j].size/2){
        state = `bad`;
      }
    }
  }
}

function checkLonely() {
  for(let i = 0; i < school.length; i++) {
    for (let j = i+1; j < school.length; j++) {
      let d = dist(school[i].x, school[i].y, school[j].x, school[j].y)
      if (d > width/1.1){
        state = `lonely`;
      }
    }
  }
}


function mousePressed(){
  //Create a new fish by pressing the mouse
  let fish = createFish(mouseX,mouseY);
  school.push(fish);
}

function keyPressed() {
  // SPACE pressed = change of background
  if (keyCode === 32) {
    displayImage = random(images)
  }

  // 'F' pressed = give food
  if(keyCode === 70) {
    for(let i = 0; i <school.length; i++) {
    giveFood(school[i]);
  }
}
}
function giveFood(fish) {
  // When give food -> fish grow and slow down
  fish.size *= 1.25;
  fish.speed *= 0.75;
}

/**
ROUTINE
Louise Jean-Campana

This project is a simulation of a morning routine.

It begins with a white screen, the user have to move the mouse to the right to show the title screen and start the simulation.
The user control a white circle with 'me' written in his center. It takes place in a appartment map.
One Roomate in her room, the other is moving in the kitchen.
Once the user go talk (circles overlap) to one of them, a sequence of task begins.
Icons representing different tasks displays on the map.
The user have to touch them to do them. Once a task is done, the icon is displayed on the upper right corner.
Once the user have done all of them, the end screen displays.
The end screen is a black screen, the user have to move its mouse to show 'have a good day :)'.
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
  speed:1.5,
  fill:{
    r:255,
    g:255,
    b:255
  },
}

let sleepyRoomate = {
  x:0,
  y:0,
  size:50,
  vx:0,
  vy:0,
  speed:0.2,
  fill:{
    r:255,
    g:255,
    b:255
  },
}
let hungryRoomate = {
  x:0,
  y:0,
  size:50,
  vx:0,
  vy:0,
  speed:0.5,
  fill:{
    r:255,
    g:255,
    b:255
  },
}

let appt = {
  x:0,
  y:0,
  width : 0,
  height : 0
}

let shower = {
  x:0,
  y:0,
  width : 0,
  height : 0,
  size : 0
}
let clothes = {
  x:0,
  y:0,
  width : 0,
  height : 0,
  size : 0
}
let dej = {
  x:0,
  y:0,
  width : 0,
  height : 0,
  size : 0
}
let vaisselle = {
  x:0,
  y:0,
  width : 0,
  height : 0,
  size : 0
}
let vaisselleVide = {
  x:0,
  y:0,
  width : 0,
  height : 0,
  size : 0
}
let teeth = {
  x:0,
  y:0,
  width : 0,
  height : 0,
  size : 0
}

let bed = {
  x:0,
  y:0
}
let door ={
  x:0,
  y:0,
  x1:0,
  y1:0,
  x2:0,
  y2:0,
  size:0,
  fill: {
    r:139,
    g:255,
    b:182
  }
}

let routineTitle = {
  fill:{
    r:255,
    g:255,
    b:255
  }
}
let goodday = {
  fill:{
    r:0,
    g:0,
    b:0
  }
}

let circleOverLap = false;
let showClothes = false;
let showDej = false;
let showVaisselle = false;
let showVaisselleVide = false;
let showTeeth = false;

let endGame = false;

let state = `routine`; // Can be : title, routine, win(have a good day)
/**
Preload of the appartment map and tasks icons
*/
function preload() {
  // plan appt
  appt = loadImage('assets/images/plan_appartement.png');

  // Icons
  shower = loadImage('assets/images/showerIcon.png');
  clothes = loadImage('assets/images/clothesIcon.png');
  dej = loadImage('assets/images/petitdejIcon.png');
  vaisselle = loadImage('assets/images/vaisselleIcontourner.png');
  vaisselleVide = loadImage('assets/images/vaisselleVideIcon.png')
  teeth = loadImage('assets/images/brushteethIcon.png');

}


/**
APPARTMENT MAP : Addapt AppttMapSize to windowSize but keep img ratio
BED : position of the bed for beginning position of the user
DOOR : position to reach by user for the end of the game
USER : beginning position and addapt size to ApptMapSize
ROOMATES : positions and sizes = user
ICONS : positions and sizes of tasks's icons
*/
function setup() {
  createCanvas(windowWidth/1.05,windowHeight/1.1);
  setupAppt();
  setupBed();
  setupDoor();
  setupUser();
  setupRoomates();

  setupIcons();
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
function setupDoor(){
  // Set up door in relation to apptImg center
  door.x1 = -appt.width/22;
  door.y1 = -appt.height/5.5;
  door.x2 = -width/2+appt.width/1.81;
  door.y2 = -appt.height/5.5;

  door.size = -(door.x2-door.x1);
  door.x = door.size/2;
  door.y = door.size/2;
}
function setupUser() {
  user.x = bed.x;
  user.y = bed.y;
  user.size = width/32;
}
function setupRoomates(){
  //Sleepy Roomate
  sleepyRoomate.size = user.size;
  sleepyRoomate.x = width/2-appt.width/1.515;
  sleepyRoomate.y = appt.height/4.75;
  //Hungry Roomate
  hungryRoomate.size = user.size;
  hungryRoomate.x = appt.width/2.7;
  hungryRoomate.y = appt.height/4;
}
function setupIcons() {
  showerIcon();
  clothesIcon();
  dejIcon();
  vaisselleIcon();
  vaisselleVideIcon();
  teethIcon();
}

// POSITION = SHOWER
function showerIcon() {
  shower.width = appt.width/25;
  shower.height = shower.width;
  shower.size = shower.width

  shower.x = width/2-appt.width/8.35;
  shower.y = -appt.height/6;
}
// POSITION = DRESSER
function clothesIcon() {
  clothes.width = appt.width/25;
  clothes.height = clothes.width;
  clothes.size = clothes.width

  clothes.x = appt.width/13;
  clothes.y = appt.height/3.85;

}
// POSITION = FRIDGE
function dejIcon(){
  dej.width = appt.width/25;
  dej.height = dej.width;
  dej.size = dej.width

  dej.x = appt.width/2.34;
  dej.y = appt.height/8.6;
}
// POSITION = KITCHEN SINK
function vaisselleIcon(){
  vaisselle.width = appt.width/20;
  vaisselle.height = vaisselle.width;
  vaisselle.size = vaisselle.width

  vaisselle.x = appt.width/3.085;
  vaisselle.y = appt.height/4.965;

}
// POSITION = TASK DONE (upper right corner)
function vaisselleVideIcon(){
  vaisselleVide.width = appt.width/20;
  vaisselleVide.height = vaisselle.width;
  vaisselleVide.size = vaisselle.width

  vaisselleVide.x = appt.width/2 - 4*shower.size;
  vaisselleVide.y = - appt.height/2 - user.size
}
// POSITION = BATHROOM SINK
function teethIcon(){
  teeth.width = appt.width/27.5;
  teeth.height = teeth.width;
  teeth.size = teeth.width

  teeth.x = appt.width/2.6;
  teeth.y = -appt.height/9;
}




/**
SEQUENCE OF DIFFERENT STATES
TITLE : white background; mouseX = bg(255,0) to show the title 'ROUTINE'; mouseX > width triggers ROUTINE;
ROUTINE : map appt; roomates & user keyarrows controlled; talk to roomate triggers GAME;
  GAME : sequence of tasks to complete (shower,clothes,breakfast,dishes,brush teeth);
  once brush teeth task completed : triggers WIN;
WIN : black background; mouseX = bg(0,255) to show the end screen 'have a good day :)'
*/
function draw() {
  background(bg.fill.r,bg.fill.g,bg.fill.b);
  translate(width/2,height/2);

  if (state === `title`){
    title();
  }
  if (state === `routine`) {
    routine();
  }
  if (state === `gameOver`){
    gameOver();
  }
  if (state === `win`) {
    win();
  }
}

// TITLE STATE
function title() {
  displaytitle();
  backgroundColor();
  startRoutine();
}
function displaytitle(){
    // Display title : 'routine'
    push();
    noStroke();
    textSize(width/15);
    fill(routineTitle.fill.r,routineTitle.fill.g,routineTitle.fill.b);
    textAlign(CENTER,CENTER);
    text(`ROUTINE`,0,0);
    pop();
}
function backgroundColor() {
  // Background color controlled by mouse X
  translate(0,0);
  bg.fill.r = map(mouseX,0,width,255,0);
  bg.fill.g = map(mouseX,0,width,255,0);
  bg.fill.b = map(mouseX,0,width,255,0);
}
function startRoutine() {
  // Start routine state when background white
  if (mouseX > width) {
    state = `routine`;
  }
}

// ROUTINE STATE
function routine() {
  background(bg.fill.r,bg.fill.g,bg.fill.b);

  planAppt();
  // User
  displayUser();
  moveUser();
  // Roomates
  displaySleepyRoomate(); // Display immobile circle
  displayHungryRoomate(); // Display moving circle
  moveHungryRoomate(); // Automated movement
  checkCircleOverlap(); // display Hi or yo when roomates touched, starts sequence of tasks
  if (circleOverLap) {
    startGame();
  }
  checkUserDoor(); // TO CODE : to touch to end the game
}
function planAppt() {
  // Display plan appartement
  imageMode(CENTER);
  image(appt,0,0,appt.width,appt.height);
}

//Display User
function displayUser() {
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
function moveUser() {
  // User control with arrow keys
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

// Display Roomate
function displaySleepyRoomate(){
  // Display immobile circle in mgtRoom
  noFill();
  strokeWeight(sleepyRoomate.size/20);
  stroke(sleepyRoomate.fill.r,sleepyRoomate.fill.g,sleepyRoomate.fill.b);
  ellipse(sleepyRoomate.x,sleepyRoomate.y,sleepyRoomate.size);
}
function displayHungryRoomate(){
  // Display circle in kitchen
  noFill();
  strokeWeight(hungryRoomate.size/20);
  stroke(hungryRoomate.fill.r,hungryRoomate.fill.g,hungryRoomate.fill.b);
  ellipse(hungryRoomate.x,hungryRoomate.y,hungryRoomate.size);
}
function moveHungryRoomate(){
  // Automated Movement
  hungryRoomate.y -= hungryRoomate.speed;
    if (hungryRoomate.y < appt.height/30) {
      hungryRoomate.speed = -hungryRoomate.speed;
    }
    else if (hungryRoomate.y > appt.height/4) {
      hungryRoomate.speed = -hungryRoomate.speed;
    };
  }
function moveSleepyRoomate(){
  sleepyRoomate.y -= sleepyRoomate.speed;
  if(sleepyRoomate.y < 0) {
    sleepyRoomate.y = 0;
    sleepyRoomate.x += sleepyRoomate.speed;
  }

  if(sleepyRoomate.x > -appt.width/15){
    sleepyRoomate.x = -appt.width/15;
  }
}

// Talk & Begin GAME
function checkCircleOverlap(){
  // Check distance user hungryRoomate
  push();
  let d = dist(user.x,user.y,hungryRoomate.x,hungryRoomate.y);
  if(d < user.size/2 + hungryRoomate.size/2) {
    displayHi();
    circleOverLap = true
  }
  pop();
  //Check distance user sleepyRoomate
  push();
  let s = dist(user.x,user.y,sleepyRoomate.x,sleepyRoomate.y);
  if(s < user.size/2 + sleepyRoomate.size/2) {
    displayYo();
    circleOverLap = true
  }
  pop();
}

// GAME
function startGame() {
  displayShower();

  doShower();
  doClothes();
  doDej();
  doVaisselle();
  doTeeth();

  if(endGame){
    displayDoor();
  }

}
// Shower Task
function displayShower() {
  // Display Shower Icon
  imageMode(CENTER);
  image(shower,shower.x,shower.y,shower.width,shower.height);
}
function doShower(){
  let d1 = dist(user.x,user.y,shower.x,shower.y)
  if(d1 < user.size/2 + shower.size/2) {
    showerDone();
    showClothes = true;
  }
  if(showClothes) {
    displayClothes();
  }
}
function showerDone() {
  shower.x = appt.width/2 - shower.size;
  shower.y = - appt.height/2 - user.size;
}
// Clothes Task
function displayClothes(){
  // Display Shower Icon
  imageMode(CENTER);
  image(clothes,clothes.x,clothes.y,clothes.width,clothes.height);
}
function doClothes(){
  let d2 = dist(user.x,user.y,clothes.x,clothes.y)
  if(showClothes & d2 < user.size/2 + clothes.size/2) {
    clothesDone();
    showDej = true;
  }
  if(showDej) {
    displayDej();
    moveSleepyRoomate();
  }
}
function clothesDone() {
  clothes.x = appt.width/2 - 2*shower.size;
  clothes.y = - appt.height/2 - user.size
}
// Breakfast Task
function displayDej(){
  // Display Shower Icon
  imageMode(CENTER);
  image(dej,dej.x,dej.y,dej.width,dej.height);
}
function doDej(){
  let d3 = dist(user.x,user.y,dej.x,dej.y)
  if(showDej & d3 < user.size/2 + dej.size/2) {
    dejDone();
    showVaisselle = true;
  }
  if(showVaisselle) {
    displayVaisselle();
  }
}
function dejDone() {
  dej.x = appt.width/2 - 3*shower.size;
  dej.y = - appt.height/2 - user.size
}
// Dishes Task
function displayVaisselle(){
  // Display Shower Icon
  imageMode(CENTER);
  image(vaisselle,vaisselle.x,vaisselle.y,vaisselle.width,vaisselle.height);
}
function doVaisselle(){
  let d4 = dist(user.x,user.y,vaisselle.x,vaisselle.y)
  if(showVaisselle & d4 < user.size/2 + vaisselle.size/2) {
    vaisselleDone();
    showTeeth = true;
  }
  if(showTeeth) {
    displayTeeth();
    displayVaisselleVide();
  }
}
function vaisselleDone() {
  showVaisselle = false;
  showVaisselleVide = true;
  if(showVaisselleVide) {
    displayVaisselleVide();
  }
}
function displayVaisselleVide(){
  // Display Shower Icon
  imageMode(CENTER);
  image(vaisselleVide,vaisselleVide.x,vaisselleVide.y,vaisselleVide.width,vaisselleVide.height);
}
// Teeth Task
function displayTeeth(){
  // Display Shower Icon
  imageMode(CENTER);
  image(teeth,teeth.x,teeth.y,teeth.width,teeth.height);
}
function doTeeth(){
  let d5 = dist(user.x,user.y,teeth.x,teeth.y)
  if(showTeeth & d5 < user.size/2 + teeth.size/2) {
    teethDone();
    state = `win`;
  }
}
function teethDone() {
  teeth.x = appt.width/2 - 5*shower.size;
  teeth.y = - appt.height/2 - user.size;
}

// TO CODE : GREEN DOOR DISPLAY WHEN TASKS OVER
function displayDoor(){
  if(endgame){
    fill(door.fill.r,door.fill.g,door.fill.b);
    line(door.x1,door.y1,door.x2,door.y2);
  }
}


// Talking to Roomates
function displayHi(){
  // Display 'hi'
  push();
  noStroke();
  textSize(hungryRoomate.size/3);
  fill(hungryRoomate.fill.r,hungryRoomate.fill.g,hungryRoomate.fill.b);
  textAlign(CENTER,CENTER);
  text(`hi`,hungryRoomate.x,hungryRoomate.y);
  pop();
}
function displayYo(){
  //Display yo
  push();
  noStroke();
  textSize(sleepyRoomate.size/3);
  fill(sleepyRoomate.fill.r,sleepyRoomate.fill.g,sleepyRoomate.fill.b);
  textAlign(CENTER,CENTER);
  text(`yo`,sleepyRoomate.x,sleepyRoomate.y);
  pop();
}

// TO CODE : Triggering WIN STATE (touching green door)
function checkUserDoor(){
  let d = dist(user.x,user.y,door.x,door.y);
  if (endGame & d < user.size/2 + door.size/2) {
    state = `win`;
  }
}


// STATE WIN
function win(){
  background(bg.fill.r,bg.fill.g,bg.fill.b);
  displaywin();
  bgcolor();
}
function bgcolor(){
  // Background color controlled by mouse X
  translate(0,0);
  bg.fill.r = map(mouseX,0,width,0,255);
  bg.fill.g = map(mouseX,0,width,0,255);
  bg.fill.b = map(mouseX,0,width,0,255);
}
function displaywin() {
  // Display have a good day :)'
  push();
  noStroke();
  textSize(width/15);
  fill(goodday.fill.r,goodday.fill.g,goodday.fill.b);
  textAlign(CENTER,CENTER);
  text(`have a good day :)`,0,0);
  pop();
}

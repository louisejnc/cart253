/**
ROUTINE
Louise Jean-Campana

This project is a simulation of a morning routine.

User Perspective
It begins with a white screen, the user have to move the mouse to the right to show the title screen and start the simulation.
The user control a white circle with 'me' written in his center. It takes place in a appartment map.
One Roomate in her room, the other is moving in the kitchen.
Once the user go talk (circles overlap) to one of them, a sequence of task begins.
Icons representing different tasks displays on the map.
The user have to touch them to do them. Once a task is done, the icon is displayed on the upper right corner.
Once the user have done all of them, the end screen displays.
The end screen is a black screen, the user have to move its mouse to show 'have a good day :)'.

How the code works
The code allows us to display the appartment map on the black background, as the user circle and the roomates ones.
Its position depends on key is down on arrows. One circle (hungryRoomate) has an automated and repeted movement on y axis,
the other circle (sleepyRoomate) moves when the clothesDone and showDej is true, upwards to the height/2 then to the right to stop in the 'closet'.
When the user circle overlap one of the roomates circles, it displays text inside the circle roomate that simulates a start of conversation.
The first time the circles overlap, it triggers the start of the game that consists of a sequence of 'tasks'.
Those are presented as icons displayed one after another. The circle user has to overlap the task icon displayed at the moment to do it.
Once a task is done - the circle overlap the icon - the icon is displayed on the top right corner and the next icon in the sequence is displayed and the user can 'do' it.
Once the last task is done, a colored line is displayed on the front door. The circle user has to overlap the line to trigger the win state and finish the game.
*/

"use strict";

// Background
let bg = {
  fill:{
    r:0,
    g:0,
    b:0
  }
}

// User
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

// Circle as roomate in bedroom
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
// Circle as roomate in kitchen
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

// Appt map Background
let appt = {
  x:0,
  y:0,
  width: undefined,
  height: undefined
}
let neighborhood = {
  x:0,
  y:0,
  width: undefined,
  height: undefined
}

//COLOURED PLACES Icons
// Home Icon
let home = {
  x:0,
  y:0,
  width : 0,
  height : 0,
  size : 0
}
// University Icon
let univ = {
  x:0,
  y:0,
  width : 0,
  height : 0,
  size : 0
}
// supermarket Icon
let supermarket = {
  x:0,
  y:0,
  width : 0,
  height : 0,
  size : 0
}

//BLACK&WHITE PLACES Icons
// Home Icon
let homebw = {
  x:0,
  y:0,
  width : 0,
  height : 0,
  size : 0
}
// University Icon
let univbw = {
  x:0,
  y:0,
  width : 0,
  height : 0,
  size : 0
}
// supermarket Icon
let supermarketbw = {
  x:0,
  y:0,
  width : 0,
  height : 0,
  size : 0
}

//TASKS ICONS
// Array of Icons Names
let tasksIconsNames = [
  `showerIcon.png`,
  `clothesIcon.png`,
  `dejIcon.png`,
  `vaisselleIcon.png`,
  `vaisselleVideIcon.png`,
  `toothbrushIcon.png`,
];
// Array of Icons Images
let tasksIconsPNG = [];
// Array of Icons Object
let tasksIcons = [];
let currentIcon = 0;

// Bed location
let bed = {
  x: undefined,
  y: undefined
}
// Door location
let door ={
  x: undefined,
  y: undefined,
  x1: undefined,
  y1: undefined,
  x2: undefined,
  y2: undefined,
  size: undefined,
  fill: {
    r:139,
    g:255,
    b:182
  }
}

// Title 'ROUTINE'
let routineTitle = {
  fill:{
    r:255,
    g:255,
    b:255
  }
}
// Final state 'have a good day :)'
let goodday = {
  fill:{
    r:0,
    g:0,
    b:0
  }
}

// To check if User touch Roomates
let circleOverLap = false; // triggers Shower Icon & talk to roomates
let showClothes = false; // display Clothes Icon when true (triggered by ShowerDone)
let showDej = false; // display Dej Icon and move sleepyRoomate when true (triggered by ClothesDone)
let showVaisselle = false; // display Vaisselle Icon when true (triggered by DejDone)
let showVaisselleVide = false; // display VaisselleVide Icon = VaisselleDone when true
let showTeeth = false; // display TeethBrush Icon when true (triggered by VaisselleDone)

let endGame = false; // trigger the final state 'have a good day :)' when true

let state = `navNeighborhood`; // Can be : title, routine, win(have a good day)
/**
Preload of the appartment map and tasks icons
*/
function preload() {
  // plan appt
  appt = loadImage('assets/images/plan_appartement.png');
  neighborhood = loadImage('assets/images/plan_neighborhood.png');

  // Places Icons
  //Colors
  home = loadImage('assets/images/homeIcon.png');
  univ = loadImage('assets/images/univIcon.png');
  supermarket = loadImage('assets/images/supermarketIcon.png');
  //Black & White
  homebw = loadImage('assets/images/homeNB.png');
  univbw = loadImage('assets/images/univNB.png');
  supermarketbw = loadImage('assets/images/supermarketNB.png');


  // Tasks Icons
  for(let i = 0; i < tasksIconsNames.length; i++) {
    let icon = tasksIconsNames[i];
    let iconPNG = loadImage('assets/images/'+icon+'.png');
    tasksIconsPNG.push(iconPNG);
  }
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
  createCanvas(windowWidth/1.05,windowHeight/1.05);
  setupNeighborhood();
  setupAppt();
  setupBed();
  setupDoor();
  setupUser();
  setupRoomates();

  setupTasksIcons();
  setupPlacesIcons();


  for (i = 0)
}

function setupNeighborhood() {
  neighborhood.width = width/1.1;
  neighborhood.height = neighborhood.width/1.95;
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
function setupTasksIcons() {

// ICONS POSITIONS
  let iconPosition = [
    // Shower Icon
    {
      x : width/2-appt.width/8.35,
      y : -appt.height/6 } ,
    // Clothes Icon
    {
      x : appt.width/13,
      y : appt.height/3.85 } ,
    // Dej Icon
    {
      x : appt.width/2.34,
      y : appt.height/8.6},
    // Vaisselle Icon
    {
      x : appt.width/3.085,
      y : appt.height/4.965},
    // Vaisselle Vide Icon
    {
      x : appt.width/3.085,
      y : appt.height/4.965},
    // Toothbrush Icon
    {
      x : appt.width/2.6,
      y : -appt.height/9}
  ]

  for(let i = 0; i < tasksIconsNames.length; i++) {
    let icon = new Icon(iconsPosition[i].x, iconPosition[i].y,appt.width/25,tasksIconPNG);
    tasksIcons.push(icon);
  }
}


function setupPlacesIcons(){
  colouredIcons();
  bwIcons();
}

function colouredIcons() {
  homeIcon();
  univIcon();
  supermarketIcon();
}

// POSITION & SIZE HOME
function homeIcon(){
  home.width = appt.width/25;
  home.height = home.width;
  home.size = home.width

  home.x = width/2-appt.width/8.35;
  home.y = -appt.height/6;

}
// POSITION & SIZE UNIVERSITY
function univIcon() {
  univ.width = appt.width/25;
  univ.height = univ.width;
  univ.size = univ.width

  univ.x = width/2-appt.width/8.35;
  univ.y = -appt.height/6;

}
// POSITION & SIZE SUPERMARKET
function supermarketIcon(){
  supermarket.width = appt.width/25;
  supermarket.height = supermarket.width;
  supermarket.size = supermarket.width

  supermarket.x = width/2-appt.width/8.35;
  supermarket.y = -appt.height/6;

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
  else if (state === `navNeighborhood`){
    navNeighborhood();
  }
  else if (state === `routine`) {
    routine();
  }
  else if (state === `gameOver`){
    gameOver();
  }
  else if (state === `win`) {
    win();
  }
}

// TITLE STATE
function title() {
  displayTitle();
  backgroundColor();
  startRoutine();
}
function displayTitle(){
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

// NEIGHBORHOOD INTERFACE STATE
function navNeighborhood(){
  planNeighborhood();
  displayColouredPlacesIcons();
  displayBWPlacesIcons();
}

function planNeighborhood(){
  // Display neighborhood map
  imageMode(CENTER);
  image(neighborhood,0,0,neighborhood.width,neighborhood.height);
}

function displayColouredPlacesIcons(){
  colouredHome();
  colouredUniv();
  colouredSupermarket();
}

function colouredHome(){
  // Display Home Icon
  imageMode(CENTER);
  image(home,home.x,home.y,home.width,home.height);
}
function colouredUniv(){
  // Display Home Icon
  imageMode(CENTER);
  image(univ,univ.x,univ.y,univ.width,univ.height);
}
function colouredSupermarket(){
  // Display Home Icon
  imageMode(CENTER);
  image(supermarket,supermarket.x,supermarket.y,supermarket.width,supermarket.height);
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
    game();
  }
  checkUserDoor(); // TO CODE : to touch to end the game
}
function planAppt() {
  // Display appartement map
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

// Display and Move Roomates
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
  // Automated Movement on the y axis (kitchen)
  hungryRoomate.y -= hungryRoomate.speed;
    if (hungryRoomate.y < appt.height/30) {
      hungryRoomate.speed = -hungryRoomate.speed;
    }
    else if (hungryRoomate.y > appt.height/4) {
      hungryRoomate.speed = -hungryRoomate.speed;
    };
  }
function moveSleepyRoomate(){
  // Move upwards when clothesDone and showDej then to the right
  sleepyRoomate.y -= sleepyRoomate.speed;
  if(sleepyRoomate.y < 0) {
    sleepyRoomate.y = 0;
    sleepyRoomate.x += sleepyRoomate.speed;
  }

  // Stop Roomate in the closet
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
function game() {
  tasksIcons[currentIcon].displayed = true;
  tasksIcons[currentIcon].display();
  let taskDone = tasksIcons[currentIcon].doTask();
  if (taskDone) {
    let x = appt.size.width/2- (currentIcon+1)*taskIcons[currentIcon].size;
    let y = - appt.height/2 - user.size
    tasksIcons[currentIcon].done(x,y)
    currentIcon ++;
    tasksIcons[currentIcon].displayed = true
  }

  if(currentIcon > tasksIcons.length){
    displayDoor();
  }

  if (currentIcon > 1) {
    moveSleepyRoomate();
  }
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


let angle=0;
let rectScale = 0;


function setup() {
  createCanvas(500,500);
}



function draw() {
  background(0);

  push();
  fill(255,0,0);
  rectMode(CENTER);
  translate(width/2,height/2);
  rotate(angle);
  scale(rectScale);
  rect(0,0,100,100);
  pop();

  angle +=0.01;
  rectScale+=0.01;



  }

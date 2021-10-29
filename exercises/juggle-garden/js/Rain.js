class Rain {

  // constructor() sets up starting rain properties
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.maxSpeed = random(5,15);
    this.size = 2;
    this.fill = {
      r: random(10,90),
      g: random(10,90),
      b: 255
    };
    this.active = false; // Track wether  it's active (SPACE KEY DOWN)
  }

  // gravity(force) {
  //   this.ay += force;
  // }


  move() {
    this.y += this.maxSpeed;//vy;
    if(this.y > height) {
      this.y = 0;
    }
  }

  display() {
      push();
      noStroke();
      fill(this.fill.r, this.fill.g, this.fill.b);
      ellipse(this.x,this.y,this.size);
      // Create a rain loop
      pop();
  }
}

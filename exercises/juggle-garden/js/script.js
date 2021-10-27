/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

// Our garden
let garden = {
  // An array to store the individual flowers
  flowers: [],
  // How many flowers in the garden
  numFlowers: 20,
  // An array to our the bees
  bees: [],
  // How many bees in the garden
  numBees: 10,
  // The color of the grass (background)
  grassColor: {
    r: 120,
    g: 180,
    b: 120
  }
};

// setup() creates the canvas and the flowers in the garden
function setup() {
  createCanvas(600, 600);

  // Create our flowers by counting up to the number of the flowers
  for (let i = 0; i < garden.numFlowers; i++) {
    // Create variables for our arguments for clarity
    let x = random(0, width);
    let y = random(0, height);
    let size = random(50, 80);
    let stemLength = random(50, 100);
    let petalColor = {
      r: random(100, 255),
      g: 165,
      b: 255
    }
    // Create a new flower using the arguments
    let flower = new Flower(x, y, size, stemLength, petalColor);
    // Add the flower to the array of flowers
    garden.flowers.push(flower);
  }

  // Create our bees by counting up to the number of bees
  for (let i = 0; i < garden.numBees; i++) {
    // Create variables for our arguments for clarity
    let x = random(0, width);
    let y = random(0, height);
    // Create a new bee using the arguments
    let bee = new Bee(x, y);
    // Add the bee to the array of bees
    garden.bees.push(bee);
  }
}


// draw()
// Displays our flowers
function draw() {
  // Display the grass
  background(garden.grassColor.r, garden.grassColor.g, garden.grassColor.b);

  // Loop through all the flowers in the array and display them
 for (let i = 0; i < garden.flowers.length; i++) {
   let flower = garden.flowers[i];
   if (flower.alive) {
     flower.shrink();
   flower.display();
 }
}

// Loop through all the bees in the array and display them
  for (let i = 0; i < garden.bees.length; i++) {
    let bee = garden.bees[i];
    // Check if this bee is alive
    if (bee.alive) {
      // Update the bee by shrinking, moving and displaying it
      bee.shrink();
      bee.move();
      for (let j = 0; j < garden.flowers.length; j++) {
        let flower = garden.flowers[j];
        bee.tryToPollinate(flower);
      }
      // Display the bee
      bee.display();
    }
  }
}

// mousePressed() calls the equivalent mousePressed() method on every flower
function mousePressed() {
  // Loop through every flower in the garden
  for (let i = 0; i < garden.flowers.length; i++) {
    // Get the current flower in the loop
    let flower = garden.flowers[i];
    // Call the flower's mousePressed() method
    flower.mousePressed();
}
}

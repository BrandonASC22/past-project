// I made a lot of edits like including the
// jumping/gravity mechanism & the win condition

let state = '1';
let userImage1;
let userImage2;
let userImage3;
let userImage4;
let currentImage;
let myXPos = 100;
let myYPos =275;
let v = 0;
let g = 5;
let score = 0;

// this will track the coords of mario's edges
let myLeft, myRight, myTop, myBottom;
// this will track the coords of the edges of the orange block
let blockTop, blockBottom, blockLeft, blockRight;

/** lines 18-47 are a list of block location & size variables */
let ex1 = 0;
let ey1 = 300;
let ew1 =500;
let eh1 = 200;

let ex2=126;
let ey2=141;
let ew2=30;
let eh2=30;

let ex3= 175;
let ey3= 50;
let ew3=30;
let eh3=30;

let ex4=156;
let ey4=141;
let ew4=30;
let eh4=30;


let ex5 = 186;
let ey5=141;
let ew5=30;
let eh5=30;

let ex6=301;
let ey6=141;
let ew6=30;
let eh6=30;

// pipe coords
let pipeX = 20;
let pipeY = 230;

/** this function preloads the mario image */
function preload() {
    userImage1 = loadImage('assets/mario.png');
    userImage2 = loadImage('assets/luigi.png');
    userImage3 = loadImage('assets/yoshi.png');
    userImage4 = loadImage('assets/donkey-kong.png');
}

/** this function only runs once and is to create the canvas mainly */
let canvas;

function setup() {
    createCanvas(500,500);
    canvas = createCanvas(500, 500);
    canvas.mousePressed(something);
    
    imageMode(CENTER);
    currentImage = userImage1;
}

function draw() {

// collision theory for mario
myLeft = myXPos - 25;
myRight = myXPos + 25;
myTop = myYPos - 25;
myBottom = myYPos + 25;

// collision theory for the orange block
blockLeft = ex3;
blockRight = ex3 + ew3;
blockTop = ey3;
blockBottom = ey3 + eh3;

// for state 1
if (state == '1') {
    background(0, 0, 0);
    textSize(50);
    stroke(random(256), random(256), random(256));
    text('Bario Coding!', 100, 150);

    stroke(255);
    textSize(40)
    text('Touch the orange block 10x', 6, 250);

    textSize(35)
    text('Click anywhere to begin!', 70, 450);
}

// state 2 conditions, the meat of the game
if (state == '2') {
    stroke(0);
    background(255, 215, 105);
 
  // these are the pipes
fill(44, 176, 26);
rect(pipeX, pipeY, 60, 250);
pipeX = pipeX - 2;
if(pipeX < -40) {
    pipeX = 540;
    pipeY = random(230, 280);
}

fill(209, 136, 63);
 
rect(ex1,ey1,ew1,eh1); // this is the ground

// these are the blocks
  rect(ex2,ey2,ew2,eh2);
  ex2 -= 2;
  if(ex2<0){
  ex2 = 400;
  }
  fill(255, 140, 0);
  rect(ex3,ey3,ew3,eh3);
  ex3 -= 7;
  if(ex3<0){
  ex3 = 400;
  }
  fill(209, 136, 63);
  rect(ex4,ey4,ew4,eh4);
  ex4 -= 2;
  if(ex4<0){
  ex4 = 400;
  }
  rect(ex5,ey5,ew5,eh5);
  ex5 -= 2;
  if(ex5<0){
  ex5 = 400;
  }
  rect(ex6,ey6,ew6,eh6);
  ex6 -= 2;
  if(ex6<0){
  ex6 = 400;
  }

 /**
  * lines 150-155 are what allows mario to jump
  * if the mario Y is below the ground Y, or if he's in the air, then gravity, g = 5, is added to bring him back down
  * if the spacebar is pressed then velocity, v = -20, substracts from the mario Y. This lifts him into the sky
  *  but the velocity is decreased by the 1.2 division so that his height increases at a decreasing rate
  * (I believe, judging from the mario jumping and testing different values,) after the spacebar is released.
  * I have this answer to thank for helping me:
  * https://stackoverflow.com/questions/70110785/how-can-i-make-my-stickfigure-jump-using-p5-js
  */
  if(myYPos + 25 < 300) {
    myYPos += g;
  }

  myYPos += v;
  v /= 1.2;

//renders the mario image
image(currentImage, myXPos, myYPos, 50, 50);

// moves mario left
if(keyIsDown(LEFT_ARROW)) {
    myXPos -= 3;
}

// moves mario right
if(keyIsDown(RIGHT_ARROW)) {
    myXPos += 3;
}

// makes mario jump
if(keyIsDown(32)) {
    v = -20; 
}

// the non-collision conditional
if (
    myRight < blockLeft ||
    myLeft > blockRight ||
    myTop > blockBottom ||
    myBottom < blockTop) {
    
}

/**
 * the collision conditional, what enables scoring
 * also moves the block back right to avoid furthering scoring
 * and increases the gravitional pull to make it harder to score
 */
else {
    score++;
    ex3 = 400;
    g = 15;
}

// visible score counter
textSize(32);
noStroke();
text('score: ' + score, 30, 30);

// state 3a, the normal win state, condition
if(score == 10) {
    state = '3a';
}


/**
 * state 3a, the Easter Egg win state, condition.
 * you can cause this by pressing my intials,
 * b and c, at the same time
 */
if(keyIsDown(66) & keyIsDown(67)) {
    state = '3b';
}

// the curly bracket for ending state 2, to prevent deleting it out of confusion
}

// state 3a
if(state == '3a') {
    background(0);
    textSize(75);
    text('YOU WON!', 60, 250);
}

// state 3b
if(state == '3b') {
    background(0);
    stroke(random(255), random(255), random(255));
    textSize(25);
    text('You found the SECRET! You WON!', 50, 250);
}

}

/** this function starts state 2 */
function something() {
   state = 2;
}
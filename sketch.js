//declare variables for different objects
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var girl, girlI;

var coin, coinI, coinsGroup;

var restartI;

var plus, powerGroup;

var time;
var score;
var sound;

function preload() {

  //load animation, images and sounds
  BG = loadImage("BG2.png");

  coinI = loadImage("coin.png");
  obsI = loadImage("ball.png");

  girlI = loadAnimation("Run (1).png", "Run (2).png", "Run (3).png", "Run (4).png", "Run (5).png", "Run (6).png", "Run (7).png", "Run (8).png", "Run (9).png", "Run (10).png", "Run (11).png", "Run (12).png", "Run (14).png", "Run (15).png", "Run (16).png", "Run (17).png", "Run (18).png", "Run (19).png", "Run (20).png");
  restartI = loadImage("Gameo.png");
  
  sound = loadSound("Alan Walker - Spectre [NCS Release].mp3");
}

function setup() {
  //create canvas
  createCanvas(displayWidth -250, displayHeight-50);
  
  //add Sound
  //sound.loop();

  girl = createSprite(displayWidth - 1000, 50);
  girl.addAnimation("girl", girlI);
  girl.scale = 0.35;
  girl.setCollider("circle", 0, 0, -200);
  //girl.debug=true;   
  
  ground = createSprite(camera.position.x+350, camera.position.y + 720, 1500, 20);
  ground.shapeColor = "chocolate";

  //create new groups
  obstacleGroup = new Group();
  coinsGroup = new Group();
  powerGroup = new Group();

  //let the initial time and score be 0
  time = 0;
  score = 0;
}

function draw() {
  girl.collide(ground);

  //PLAY
  if (gameState === PLAY) {
    background(BG);
    //SPACE key
    if (keyDown("space")) {
      girl.velocityY = -12;
    }
    if (keyDown("right")) {
      girl.velocityX = 3;
      ground.velocityX = girl.velocityX;
    }
    //gravity
    girl.velocityY = girl.velocityY + 1.35;
    camera.position.x = girl.x;

    //calculate survival time
    time = time + Math.round(getFrameRate() / 60);

    //score +1
    if (coinsGroup.isTouching(girl)) {
      coinsGroup.destroyEach();
      score += 1 ;
    }
    //score +5
    if (powerGroup.isTouching(girl)) {
      powerGroup.destroyEach();
      score = score + 5;
    }
    //give condition for END state1
    if (girl.y > 1000 || girl.y < 0 || girl.x > camera.position.x || girl.x < 0 || obstacleGroup.isTouching(girl)) {
      gameState = END;
    }

    //calling different user-defined functions
    OBS();
    coinS();
    extra();

    //END
  } else if (gameState === END) {
    background(restartI);
    girl.velocityX = 0;
    girl.velocityY = 0;
    girl.visible = false;
    ground.velocityX = 0;
    obstacleGroup.destroyEach();
    powerGroup.destroyEach();
    coinsGroup.destroyEach();
  }

  //SURVIVAL TIME
  drawSprites();
  fill("#663399");
  textFont("domino")
  textSize(30);
  text("🅢U🅡V🅘V🅐L 🅣Y🅜 : " + time, girl.x-520, 40);

  //coinS collected
  text("🅒O🅘N🅢 : " + score, girl.x + 325, 40);

  text("Hello my lovely Player!!", 270, 70);
  text("Greetings from the creator of this game!", 1550, 70);
  text("How You Doin'?", 2500, 70);
  text("I hope you enjoy my infinite journey game created just for you!!", 3700, 70);
  text("You can reach me for any queries or suggestions in the comment section of the community or the github repository!", 4900, 70);
}

//Moving obstacleS
function OBS() {
  if (frameCount % 100 === 0) {
    var obstacle = createSprite(camera.position.x + 500, displayHeight);
    obstacle.addImage(obsI);
    obstacle.y = Math.round(random(displayHeight - 100, displayHeight  - 300));
    obstacle.velocityX = -4;
    //obstacle.debug = true;
            
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    //obstacle.debug = true;

    obstacleGroup.add(obstacle);
  }
}


//moving coinS
function coinS() {
  if (frameCount % 150 === 0) {
    coin = createSprite(camera.position.x + 500 , displayHeight );
    coin.y = Math.round(random(displayHeight - 100, displayHeight - 310));
    coin.addImage(coinI);
    coin.scale = 0.3;
    coin.velocityX = -4;

    //assign lifetime to the variable
    coin.lifetime = 250;

    //adjust the depth
    //coin.depth = restart.depth;
    //restart.depth += 1;

    coinsGroup.add(coin);
  }
}

//Moving EXTRA points
function extra() {

  if (frameCount % 225 === 0) {
    plus = createSprite(camera.position.x + 500, Math.round(random(displayHeight - 150, displayHeight - 350)));
    plus.addImage(coinI);
    plus.scale = 0.45;
    plus.velocityX = -3;

    //assign lifetime to the variable
    plus.lifetime = 250;
    
    //adjust the depth
    //plus.depth = restart.depth;
    //restart.depth += 1;

    //add each powr to a group
    powerGroup.add(plus);
  }
}
/*function reset() {

  //change the gameState
  gameState = PLAY;

  //restet girl's position and velocity
  girl.x = camera.position.x;
  girl.y = camera.position.x;
  girl.velocityY = 0;
  girl.velocityX = 0;

  //initial score and time = 0
  score = 0;
  time = 0;
} */

// #DhRiTiD
// #DD

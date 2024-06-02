// Define variables
var img1, sprite1, g1, score = 0;
var obsImg1, obsImg2, obsImg3, obsGrp;
var rex;
var canvas, grImg1, ground;
var gameState, PLAY = 0, END = 1, START = 2;
var start, restart,startImg,restartImg;
var highScore;
var rex2;
var backgroundImage;
var clImg1, clImg2, clImg3,clImg4, clImg5, clImg6,cloudGrp;

var colour1="#17202A";
var colour2="#F0FFFF";
var bCount=0;
var velocity=0;
var textColour;

var bgmState=false;
var bgm;
var bgmButton;
var jumpsound;
var sound;
var promptedForName=false;

// Preload function to load images and animations
function preload() {
  obsImg1 = loadAnimation("./src1/obs1.png");
  obsImg2 = loadAnimation("./src1/obs2.png");
  obsImg3 = loadAnimation("./src1/obs3.png");
  grImg1 = loadImage("./src1/g1.png");
  clImg1 = loadAnimation("./src1/cloud1.png");
  clImg2 = loadAnimation("./src1/cloud2.png");
  clImg3 = loadAnimation("./src1/cloud3.png");
  clImg4 = loadAnimation("./src1/cloud4.png");
  clImg5 = loadAnimation("./src1/cloud5.png");
  clImg6 = loadAnimation("./src1/cloud6.png");
  startImg = loadImage("./src1/start.png");
  restartImg = loadImage("./src1/restart.png");
 
jumpsound = loadSound("./src1/jumpsound.mp3");
sound = loadSound("./src1/sound.mp3");
bgm=loadSound("./src1/bgm.mp3");
bgmButton=loadImage("./src1/bgmImg.png");

  rex = loadAnimation(
    "./src/t1.png",
    "./src/t2.png",
    "./src/t3.png",
    "./src/t4.png",
    "./src/t5.png",
    "./src/t6.png",
    "./src/t7.png",
    "./src/t8.png",
    "./src/t9.png",
    "./src/t10.png",
    "./src/t11.png",
    "./src/t12.png",
    "./src/t13.png",
    "./src/t14.png",
    "./src/t15.png",
    "./src/t16.png"
  );
  rex.frameDelay = 1;
  rex2 = loadAnimation("./src/t1.png");

  highScore = localStorage.getItem("highScore") || 0;
}

// Setup function to initialize variables and sprites
function setup() {
  canvas = createCanvas(1200, 400);
  g1 = createSprite(width / 2, height - 25, width, 5);
  ground = createSprite(width / 2, 400);
  ground.scale = 1.6;
  ground.addAnimation("g1", grImg1);

  // bg= createSprite(width-200,100,1200,400);
  // bg.addAnimation("sBg",starBg);
  // bg.velocityX=-6;

  sprite1 = createSprite(60, 350, 50, 50);
  sprite1.setCollider("circle", 0, -35, 125);
  sprite1.addAnimation("rex", rex);
  sprite1.addAnimation("rex2", rex2);
  sprite1.scale = 0.4;

  // startButton.addImage("start",startButton);
  // startButton = createSprite(width / 2, height / 2, 30, 30);
  start = createSprite(width / 2, height / 2, 30, 30);
  
  restart = createSprite(width / 2, height / 2, 30, 30);
  
  // restart.addImage("restart",restartImg);

  startButton = createSprite(width / 2, height / 2, 30, 30);
  restartButton = createSprite(width / 2, height / 2, 30, 30);
  bgmButton=createSprite(width-30,40,20,20);
  // bgm.addImage("bgmImg",bgmButton);

  obsGrp = new Group();
  cloudGrp= new Group();
  gameState = START;
}

// Draw function to handle game logic and rendering
function draw() {
  // prompt("please enter your name");
  canvas.position(((windowWidth - width) / 2)-10,( (windowHeight - height) / 2)-40);
  
  if(bCount%2==0){
    background(colour2);
    textColour="black";
  }else{
    // alert("bcount is "+bCount);
    background(colour1);
    textColour="white";
  }

  sprite1.collide(g1);


  sprite1.velocityY += 1;

  if (gameState == START) {
    start.addImage("start",startImg);
    start.scale=0.4;
    textSize(30);
    text("click to start",width/2 - 73,height/2+60);
    // sprite1.changeAnimation("rex2");
    start.visible = true;
    restart.visible = false;
    startButton.visible = false;
    restartButton.visible = false;
    
    createObs();
    createCloud();
    ground.velocityX =-(6+ 3*score/100);
    if (ground.x < 300) {
      ground.x = 500;
    }
    if (obsGrp.isTouching(sprite1)) {
      sprite1.velocityY = -15;
    }
    if (mousePressedOver(startButton) || keyWentDown("space")) {
      gameState = PLAY;
    }
  } else if (gameState == PLAY) {
    sprite1.changeAnimation("rex");
    start.visible = false;
    restart.visible = false;
    startButton.visible = false;
    restartButton.visible = false;
    if (frameCount % 5 == 0) {
      score++;
    }
    if(frameCount!=0 && frameCount%500==0){
        bCount++;
      }
    ground.velocityX = -(6+ 3*score/100);
    if (ground.x < 300) {
      ground.x = 500;
    }
    createObs();
    createCloud();
    // createStar();
    obsGrp.setVelocityXEach(-(6+ 3*score/100));
    if (keyDown("space") && sprite1.y > 336) {
      sprite1.velocityY = -15;
      jumpsound.play()
    }


    if (obsGrp.isTouching(sprite1)) {
     gameState = END;
     sound.play()
    // sprite1.velocityY = -15;
      if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
      }
    }
  } else if (gameState == END) {
    
    textSize(30);
    text("click to restart",width/2-95,height/2+60);
    sprite1.changeAnimation("rex2");
    sprite1.velocityY += 1;
    start.visible = false;
    restart.visible = true;
    startButton.visible = false;
    restartButton.visible = false;
    ground.velocityX = 0;
    obsGrp.destroyEach();
    cloudGrp.destroyEach();
    restart.addImage("restart",restartImg);
    restart.scale=0.2;
    bgm.stop();
    
    
    if (mousePressedOver(restartButton) || keyWentDown("space")) {
      
      bCount=0;
      gameState = PLAY;
      score = 0;
    }

    if (score > 50 && !promptedForName) {
      var playerName = prompt("Congratulations! You scored above 50. Enter your name:");
      if (playerName) {
        var highScorer = { name: playerName, score: score };
        storedHighScorers.push(highScorer);
        localStorage.setItem("highScorers", JSON.stringify(storedHighScorers));
      }
      promptedForName = true;
    }
  }

  drawSprites();
  fill(textColour);
  textStyle(BOLD); 
  textSize(30)

  text("Score: " + score,30, 50);
  text("HighScore: " + highScore, width-350, 50);
}

function createObs() {
  if (frameCount % (60) == 0) {
    var c1 = createSprite(width + 10, 345, 9, 40);
    c1.lifetime = 300;
    
   c1.velocityX = -(6+ 3*score/100);
    c1.velocityX = -10;
    c1.addAnimation("obsImg1", obsImg1);
    c1.addAnimation("obsImg2", obsImg2);
    c1.addAnimation("obsImg3", obsImg3);

    c1.scale = 0.7;
    c1.changeAnimation("obsImg1");

    var rand = Math.round(random(1, 3));
    switch (rand) {
      case 1:
        c1.changeAnimation("obsImg1");
        break;
      case 2:
        // c1.changeAnimation("obsImg2");
        break;
      case 3:
        // c1.changeAnimation("obsImg3");
        break;
      default:
        break;
    }

    obsGrp.add(c1);
  }
}

function randomCloudAnimation(cloudSprite) {
  var rand = Math.round(random(1, 3));
  switch (rand) {
    case 1:
      cloudSprite.changeAnimation("cloud1");
      break;
    case 2:
      cloudSprite.changeAnimation("cloud2");
      break;
    case 3:
      cloudSprite.changeAnimation("cloud3");
      break;
    default:
      break;
  }
}



function createCloud(){
 if(frameCount%150==0){
   var c1=createSprite(width+20,50,10,10);
   c1.velocityX = -(4+ 3*score/100);
   
  c1.addAnimation("cloud1", clImg1);
  c1.addAnimation("cloud2", clImg2);
  c1.addAnimation("cloud3", clImg3);
  
  c1.addAnimation("cloud4", clImg4);
  c1.addAnimation("cloud5", clImg5);
  c1.addAnimation("cloud6", clImg6);
  c1.scale = 0.8;
  c1.lifetime=600;
  c1.depth=1;
  var rand = Math.round(random(1, 6));
  var rand2 = Math.round(random(1, 3));
  switch(rand2){
    case 1:c1.y=50;
            break;
    case 2:c1.y=70;
            break;
    case 3:c1.y=60;
            break;
    default:break;
  }
  switch (rand) {
    case 1:
      c1.changeAnimation("cloud1");
      break;
    case 2:
      c1.changeAnimation("cloud2");
      break;
    case 3:
      c1.changeAnimation("cloud3");
      break;
    case 4: 
      c1.changeAnimation("cloud4");
      break;
    case 5:
      c1.changeAnimation("cloud5");
      break;
    case 6:
      c1.changeAnimation("cloud6");
      break;
    default:
      break;
  }
  cloudGrp.add(c1);
 }
}


function createStar(){
    // if(frameCount%10==0){
    //     var s1=createSprite(width+20,50,10,10);
    //     s1.velocityX=-10;
    //     s1.shapeColor="white";

    // }
}


//defining game states
PLAY = 1;
END = 0;
gameState=1;

//definig variables
var path,boy,cash,diamonds,jwellery,sword,gameOver;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg,endImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

var swordSound,gameOverSound;

function preload(){
pathImg = loadImage("Road.png");
boyImg = loadAnimation("runner1.png","runner2.png");
cashImg = loadImage("cash.png");
diamondsImg = loadImage("diamonds.png");
jwelleryImg = loadImage("jwell.png");
swordImg = loadImage("sword.png");
endImg =loadAnimation("gameOver.png");
swordSound = loadSound("knifeSwoosh.mp3")
gameOverSound = loadSound("gameover.mp3")

}


 

function setup(){
createCanvas(windowWidth,windowHeight);

// Moving background
path=createSprite(width/2,height);
path.addImage(pathImg);
path.velocityY = 4;

//creating boy running
boy = createSprite(width-70,530,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
//creating gameOver
gameOver= createSprite(width-350,height-300);
gameOver.addAnimation("gameOver",endImg);

//creating groups  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();
}




function draw() {
background(0);

//game state play
if(gameState === PLAY){
//sprite visibility
gameOver.visible = false;
path.velocityY = (4 + 3*Math.round(treasureCollection/1000))
cashG.velocityY = (4 + 3*Math.round(treasureCollection/600))
diamondsG.velocityY = (4 + 3*Math.round(treasureCollection/600))
jwelleryG.velocityY = (4 + 3*Math.round(treasureCollection/600))
swordGroup.velocityY = (4 + 3*Math.round(treasureCollection/400))
}
// game state end
else if (gameState === END) {
//sprite visibility
gameOver.visible = true;

// setting velocity to groups 
swordGroup.setVelocityYEach(0);
cashG.setVelocityYEach(0);
diamondsG.setVelocityYEach(0);
jwelleryG.setVelocityYEach(0);
path.velocityY=0;

//destroying groups
cashG.destroyEach();
diamondsG.destroyEach();
jwelleryG.destroyEach();
swordGroup.destroyEach();
}  
  
//movement of boy along with mouse
boy.x = World.mouseX;
  
//create edge sprites
edges= createEdgeSprites();
boy.collide(edges);
  
//code to reset the background
if(path.y > height ){
  path.y = height/2;
}
    
//naming functions
createCash();
createDiamonds();
createJwellery();
createSword();

//setting destruction and score increment conditions
if (cashG.isTouching(boy)) {
cashG.destroyEach();
treasureCollection=treasureCollection+100;
swordSound.play();
}
else if (diamondsG.isTouching(boy)) {
diamondsG.destroyEach();
treasureCollection=treasureCollection+200;
swordSound.play();
}
else if(jwelleryG.isTouching(boy)) {
jwelleryG.destroyEach();
treasureCollection=treasureCollection+150;
swordSound.play();
}
else{
if(swordGroup.isTouching(boy)) {
swordGroup.destroyEach();
boy.destroy();
gameOverSound.play();  
gameState=END;
}
}

// drawing sprites
drawSprites();

//treasure displaying
textSize(20);
fill(255);
text("Treasure: "+ treasureCollection,width-400,30);
}




//creating main sprites

function createCash() {
if (World.frameCount % 200 == 0) {
var cash = createSprite(Math.round(random(50, width-50),height-40, 10, 10));
cash.addImage(cashImg);
cash.scale=0.12;
cash.velocityY = 3;
cash.lifetime = 150;
cashG.add(cash);
}
}

function createDiamonds() {
if (World.frameCount % 320 == 0) {
var diamonds = createSprite(Math.round(random(50, width-50),height-40, 10, 10));
diamonds.addImage(diamondsImg);
diamonds.scale=0.03;
diamonds.velocityY = 3;
diamonds.lifetime = 150;
diamondsG.add(diamonds);
}
}

function createJwellery() {
if (World.frameCount % 410 == 0) {
var jwellery = createSprite(Math.round(random(50, width-50),height-40, 10, 10));
jwellery.addImage(jwelleryImg);
jwellery.scale=0.13;
jwellery.velocityY = 3;
jwellery.lifetime = 150;
jwelleryG.add(jwellery);
}
}

function createSword(){
if (World.frameCount % 530 == 0) {
var sword = createSprite(Math.round(random(50, width-50),height-40, 10, 10));
sword.addImage(swordImg);
sword.scale=0.1;
sword.velocityY = 3;
sword.lifetime = 150;
swordGroup.add(sword);
}
}
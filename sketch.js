var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  spookySound.loop()
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorGroup =new Group()
  climberGroup=new Group()
  invisibleGroup=new Group()
  ghost=createSprite(200,200,50,50)
  ghost.addImage("ghost",ghostImg)
  ghost.scale=0.3
}

function draw() {
  background(200);
  if(gameState==="play"){

  
  if(keyDown("left")){
    ghost.x=ghost.x-3
  }
  if(keyDown("right")){
    ghost.x=ghost.x+3
  }
  if(keyDown("space")){
    ghost.velocityY=-5
  }
  ghost.velocityY=ghost.velocityY+0.8
  if(tower.y > 400){
      tower.y = 300
    }
    if (climberGroup.isTouching(ghost)){
      ghost.velocityY=0
    }
    if (invisibleGroup.isTouching(ghost)||ghost.y>600){
      ghost.destroy()
      gameState="end"
    }
    spawndoors()
    drawSprites()
  }
  if(gameState==="end"){
    fill("blue")
    textSize(47)
    stroke("purple")
    strokeWeight(4.7)
    text("Game Over",230,250)
  }
}
function spawndoors(){
  if(frameCount%240===0){
    var door=createSprite(200,-50)
    door.addImage(doorImg)
    var climber=createSprite(200,10)
    climber.addImage(climberImg)
    door.x=Math.round(random(120,400))
    invisibleblock=createSprite(200,15)
    invisibleblock.width=climber.width
    invisibleblock.height=2
    invisibleblock.x=door.x
    invisibleblock.velocityY=1
    climber.x=door.x
    door.velocityY=1
    climber.velocityY=1
    door.lifetime=800
    climber.lifetime=800
    invisibleGroup.add(invisibleblock)
    ghost.depth=door.depth+1
    climberGroup.add(climber)
    doorGroup.add(door)
  }
}

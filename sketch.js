frameRate = 60
var monkey, stone, banana, ground, gameState, bananaGroup, obstacleGroup, survivalTime, numberOfBananas, monkeyAnim, bananaAnim, stoneAnim, bgImage, bg

function preload(){
  monkeyAnim = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png")
  bananaAnim = loadAnimation("banana.png")
  stoneAnim = loadAnimation("stone.png")
  bgImage = loadAnimation("jungle.jpg")

}
function setup(){
  createCanvas(400, 400)
  survivalTime = 0
  numberOfBananas = 0
  bananaGroup = createGroup()
  obstacleGroup = createGroup()
  //Sprites (monkey, stone, banana, ground)
  monkey = createSprite(45, 355)
  monkey.addAnimation('monkey', monkeyAnim)
  monkey.scale = 0.13
  monkey.depth = 10
  monkey.debug = true
  monkey.setCollider('rectangle', 15, 0, 300,500)
  stone = createSprite(460, 355)
  stone.addAnimation('stone', stoneAnim)
  stone.scale = 0.15
  stone.setCollider('circle', 0, 0, 370)

  banana = createSprite(440, random(275, 375))
  banana.addAnimation('banana', bananaAnim)
  banana.scale = 0.07
  ground = createSprite(200, 395, 400, 10)
  ground.x = ground.width/2
  ground.depth = 0
  ground.visible = true
  //Gamestate
  bg = createSprite(200, 200)
  bg.addAnimation('jungle', bgImage)
  bg.depth = -3232
  bg.velocityX = -6
}
function draw() {
  background(0)

  if (keyDown("up") && monkey.y > 345 && gameState != 0){
    monkey.velocityY = -17
    monkey.pause()
  } 
  if (monkey.isTouching(ground)){
    monkey.play()
  }
  if (bg.x < 100 && gameState != 0){
    bg.x = bg.width/2 
  }
  if (World.frameCount % 300 == 0 && gameState != 0){
    stone = createSprite(460, 355)
    stone.addAnimation("stone", stoneAnim)
    stone.velocityX = -6
    stone.scale = 0.15
    stone.lifetime = 120
    stone.debug = true
    obstacleGroup.add(stone)
  }
  if (World.frameCount % 120 == 0 && gameState != 0){
    banana = createSprite(440, random(275, 350))
    banana.addAnimation("banana", bananaAnim)
    banana.scale = 0.05
    banana.velocityX = -6
    bananaGroup.add(banana)
    banana.lifetime = 120
    banana.debug = true
  }
  monkey.velocityY += 1
  monkey.collide(ground)
  drawSprites()
  if (monkey.isTouching(bananaGroup) && gameState != 0){
    numberOfBananas += 2
    banana.destroy()
  }
  if (monkey.isTouching(obstacleGroup) && gameState != 0){
    monkey.scale -= 0.15
    stone.destroy()
  }
  if (frameCount % 60 == 0 && gameState != 0){
    survivalTime ++
  }
  if (gameState != 0){
    textSize(20)
    fill('red')
    text('Survival time: ' + survivalTime, 2, 17)
    text('Number of bananas: ' + numberOfBananas, 175, 17)
  }
  switch(numberOfBananas){
    case 10: monkey.scale = 0.15;
            break;
    case 20: monkey.scale = 0.17;
            break;
    case 30: monkey.scale = 0.19;
            break;
    case 40: monkey.scale = 0.21;
            break;
    case 50: monkey.scale = 0.23;
            break;
    case 60: monkey.scale = 0.25;
            break;
    case 70: monkey.scale = 0.27;
            break;
    case 80: monkey.scale += 0.29;
            break;
    case 90: monkey.scale += 0.31;
            break;
    case 100: monkey.scale += 0.33;
            break;
    default: break;
  }
  if (monkey.scale <= 0){
    World.allSprites.destroyEach()
    gameState = 0
  }
}




  

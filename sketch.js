var player, playerImage
var bananaImage, foodGroup
var obstacleImage, obstacleGroup
var Background, backgroundImage
var gameover, gameoverImage
var score
var ground

function preload() {
  backgroundImage = loadImage("jungle.jpg");

  playerImage = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");


  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");

  gameoverImage = loadImage("gameover.png")

}

function setup() {
  createCanvas(500, 400);

  score = 0;

  Background = createSprite(250, 190, 400, 400);
  Background.addImage("Background", backgroundImage);
  Background.x = Background.width / 2;

  foodGroup = new Group();

  obstacleGroup = new Group();

  ground = createSprite(400, 385, 800, 10);
  ground.visible = false;

  player = createSprite(150, 340);
  player.addAnimation("player", playerImage)
  player.scale = 0.15;

  gameover = createSprite(250, 200, 800, 400);
  gameover.addImage("gameover", gameoverImage)
  gameover.scale = 0.75

}


function draw() {

  gameover.visible = false;

  stroke("black")
  textSize(18);
  fill("black")
  text("Score: " + score, 500, 50);

  Food();
  Obstacle();


  if (foodGroup.isTouching(player)) {
    score = score + 2;
    foodGroup.destroyEach();
  }

  Background.velocityX = -3;


  if (Background.x < 0) {
    Background.x = Background.width / 2;
  }

  if (keyDown("space") && player.y >= 333) {
    player.velocityY = -17;
  }

  player.velocityY = player.velocityY + 0.7

  if (obstacleGroup.isTouching(player)) {
    Background.destroy();

    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    obstacleGroup.visible = false;

    foodGroup.setVelocityXEach(0);
    foodGroup.setLifetimeEach(-1);
    foodGroup.visible = false;

    gameover.visible = true;

    player.destroy();
  }


  player.collide(ground);

  drawSprites();

}

function Food() {
  if (World.frameCount % 110 === 0) {
    var food = createSprite(800, 200, 20, 20);
    food.addImage(bananaImage);
    food.scale = 0.05;
    food.velocityX = -4.5;
    food.lifetime = 200;

    foodGroup.add(food);
  }
}

function Obstacle() {
  if (World.frameCount % 80 === 0) {
    var stone = createSprite(800, 340, 20, 20);
    stone.addImage(obstacleImage);
    stone.scale = 0.13;
    stone.velocityX = -6;
    stone.lifetime = 250;

    obstacleGroup.add(stone);
  }
}
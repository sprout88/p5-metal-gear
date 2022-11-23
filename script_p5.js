let bullets = [];
let enemies = [];
let score = 0;
//snake
let moveX= 0;
let moveY= 300;
let speedSnake= 3;
function preload(){
	snake = loadImage("sprites/goblin-select.png");
	fire = loadImage("sprites/bullet.png");
	factory = loadImage("sprites/knight-select.png");
	soldier = loadImage("sprites/princess-select.png");
	open = loadImage("sprites/bullet_knight.png");
}
function setup() {
  createCanvas(800, 600);
	snake.resize(125.7, 102.2);
	fire.resize(23, 13);
	
  //spawn enemies
  for (let i = 0; i < 5; i++) {
    let enemy = {
      x: random(800, 1000),
      y: random(100, 400),
    };
    enemies.push(enemy);
  }
}
function draw() {
  background('#b3d9ff');
  console.log(bullets);
  
  //draw the player
  //circle(50, mouseY, 25);
  image(snake,moveX,moveY);
	
		if (keyIsDown(68) && moveX<550) {
    moveX = moveX + speedSnake;
  } 
		if (keyIsDown(68) && keyIsDown(16) && moveX<550) {
    moveX = moveX + (speedSnake *1.5);
  }
		if (keyIsDown(65) && moveX > 0) {
			moveX = moveX-speedSnake;
	}
		if (keyIsDown(65) && keyIsDown(16) && moveX>0) {
    moveX = moveX - (speedSnake *1.5);
  }
		if (keyIsDown(87) && moveY > 0) {
		 moveY = moveY-speedSnake;
	}
		if (keyIsDown(87) && keyIsDown(16) && moveY > 0) {
		 moveY = moveY-(speedSnake *1.5);
	}
	
	 
		if (keyIsDown(83)  && moveY < 550) {
		 moveY=moveY+ speedSnake;
	} 
		 if (keyIsDown(83) && keyIsDown(16) && moveY < 550) {
		 moveY=moveY+(speedSnake *1.5);
	}
	
  
	//draw bullets
  for (let bullet of bullets) {
    (bullet.x += 10), 
			//circle(bullet.x, bullet.y, 10);
			image(fire, bullet.x, bullet.y)
		
  }
	
  
  //draw enemies
  for (let enemy of enemies) {
    enemy.x -= 1; //enemies speed
    //rect(enemy.x, enemy.y, 20);
		image(soldier, enemy.x, enemy.y);
    if(enemy.x < 0){
      noLoop();
      text('LOSE!', width/2, height/2); //loose game
    }
    
  }
  
  //collison
  for (let enemy of enemies) {
    for (let bullet of bullets) {
      if (dist(enemy.x, enemy.y, bullet.x, bullet.y) < 40) {
        enemies.splice(enemies.indexOf(enemy), 1);
        bullets.splice(bullets.indexOf(bullet), 1);
        let newEnemy = {
          x: random(600, 800),
          y: random(0, height),
        };
        enemies.push(newEnemy);
        score += 1;
      }
    }
  }
  text(score,50,25);
  text('score', 15, 25);
  if(score >= 50){
    noLoop();
    text('WIN!', width/2, height/2);
  }
}
//bullets spawn on click
function mousePressed() {
  let bullet = {
    x: moveX+100,
    y: moveY+40
	}
	
  
  bullets.push(bullet);
}
	
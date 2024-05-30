//  ------------ Setup ------------
window.focus;
const SCREENWIDTH = innerWidth;
const SCREENHEIGHT = innerHeight;
let gameCanvas = document.getElementById("gameCanvas");
let c = gameCanvas.getContext("2d"); // Drawing object
let difficulty = 1;
gameCanvas.height = 500;
gameCanvas.width = 600;
// -------------------------------------
// spelar variabler
let playerX = 275;
let playerY = 400;
let playerWidth = 50;
let playerHeight = 50;
let dx = 0;
let hp = 10;
const maxSpeed = 8;
const acceleration = 0.5;
const friction = 0.5;

let playerImg = document.getElementById("Player1");

let directions = {
  left: false,
  right: false,
};
//-------------------kanonkulor variabler, klasser och funktioner------------------
const cannonballImg = new Image();
cannonballImg.src = 'bilder/fireball.png'; 
function increaseDifficulty(){
  difficulty+=0.1;
};


//öka svårighetsgraden varje 0.5 sekunder
setInterval(increaseDifficulty,500);

class Cannonball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 8;
    this.dy = Math.random() * 3 + difficulty/3; // variera hastighet
  }

  draw() {
    c.drawImage(cannonballImg, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
  }

  update() {
    this.y += this.dy;
  }
  collidesWith(playerX, playerY, playerWidth, playerHeight) {
    // kolla om spelaren kolliderar med kanonkulorna
    let distX = Math.abs(this.x - playerX - playerWidth / 2);
    let distY = Math.abs(this.y - playerY - playerHeight / 2);

    if (distX > (playerWidth / 2 + this.radius)) { return false; }
    if (distY > (playerHeight / 2 + this.radius)) { return false; }

    if (distX <= (playerWidth / 2)) { return true; }
    if (distY <= (playerHeight / 2)) { return true; }

    let dx = distX - playerWidth / 2;
    let dy = distY - playerHeight / 2;
    return (dx * dx + dy * dy <= (this.radius * this.radius));
  }
}
const cannonballs = [];

// skapa ny kanonkula
function spawnCannonball() {
  const cannonballX = Math.random() * gameCanvas.width;
  const cannonball = new Cannonball(cannonballX, 0);
  cannonballs.push(cannonball);
}


// spawna in 1 kanonkula varje i ett intervall som snabbar upp med difficultyn
setInterval(spawnCannonball, 300*(1/difficulty));



// -------------------------------------
// ------------ spelarens rörelse ------------
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
    case "a":
    case "A":
      directions.left = true;
      break;
    case "ArrowRight":
    case "d":
    case "D":
      directions.right = true;
      break;

    default:
      break;
  }
});

document.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowLeft":
    case "a":
    case "A":
      directions.left = false;
      break;
    case "ArrowRight":
    case "d":
    case "D":
      directions.right = false;
      break;

    default:
      break;
  }
});
// -------------------------------------
// ------------ Animation ------------
function animate() {
  document.getElementById("difficultyStat").innerHTML = "Score: " + ((difficulty-1)*10).toFixed(0); 
  document.getElementById("hpStat").innerHTML = "HP: " + hp; 
  if(hp > 0){
   requestAnimationFrame(animate); // kör om animationen repeterande tills hp är under 1
  }
  else{
    alert("GAME OVER!!")
  }
  c.clearRect(0, 0, gameCanvas.width, gameCanvas.height); // rensa skärm

  // acceleration åt höger och vänster för mer smooth rörelse
  //håller även koll så spelaren inte kan åka utanför spelets ramar
  if (directions.left && playerX > 0) {
    if (dx > -maxSpeed) {
      dx -= acceleration;
    }
  } else if (directions.right && playerX < gameCanvas.width - playerWidth) {
    if (dx < maxSpeed) {
      dx += acceleration;
    }
  } else {
    // deceleration när inga knappar trycks ner
    if (dx > 0) {
      dx -= friction;
      if (dx < 0) dx = 0;
    } else if (dx < 0) {
      dx += friction;
      if (dx > 0) dx = 0;
    }
  }
// förflyttar spelaren med dx per tick
  playerX += dx;

  if (playerX < 0) {
    playerX = 0;
  } else if (playerX > gameCanvas.width - playerWidth) {
    playerX = gameCanvas.width - playerWidth;
  }

  // rita upp spelaren
  c.drawImage(playerImg, playerX, playerY, playerWidth, playerHeight);
  cannonballs.forEach((cannonball, index) => {
    cannonball.update();
    cannonball.draw();

    // Ta bort kanonkulor som har gått utanför skärmen
    if (cannonball.y > gameCanvas.height) {
      cannonballs.splice(index, 1);
    }
    if (cannonball.collidesWith(playerX, playerY, playerWidth, playerHeight)) {
      // Minska HP med 1 vid kollision
      hp -= 1;
      cannonballs.splice(index, 1);
  }
  });
  
}

// ------------ Starta spelet ------------
animate();
//  ------------ Setup ------------
window.focus;
const SCREENWIDTH = innerWidth;
const SCREENHEIGHT = innerHeight;
let gameCanvas = document.getElementById("gameCanvas");
let c = gameCanvas.getContext("2d"); // Drawing object
gameCanvas.height = 500;
gameCanvas.width = 600;
// -------------------------------------
// Player variables
let playerX = 50;
let playerY = 50;
let playerWidth = 30;
let playerHeight = 30;
let dx = 0;
let dy = 5;
let playerImg = document.getElementById("Player1");

let directions = {
  left: false,
  right: false,
  up: false,
  down: false,
};
// -------------------------------------
// ------------ Player movement ------------
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      directions.left = false;
      break;
    case "ArrowRight":
      directions.right = false;
      break;

    default:
      break;
  }
});

document.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      directions.left = false;
      break;
    case "ArrowRight":
      directions.right = false;
      break;

    default:
      break;
  }
});
// -------------------------------------
// ------------ Animation ------------
function animate() {
  requestAnimationFrame(animate); // Run gameloop recursively
  c.clearRect(0, 0, gameCanvas.width, gameCanvas.height); // Clear screen

  c.drawImage(playerImg ,playerX, playerY, playerWidth, playerHeight); // Draw player
  if (directions.left){
    
  }

  playerX += dx;
  playerY -= dy;

}
// -------------------------------------
// ------------ Start game ------------
animate();
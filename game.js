const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

const scoreEl = document.getElementById("score");
const highEl = document.getElementById("high");

let score = 0;
let high = localStorage.getItem("high") || 0;
highEl.textContent = high;

const img = new Image();
img.src = "assets/images/robot.png";

const player = { x: 120, y: 300, vy: 0, size: 40 };
let platforms = [];
let running = false;

function platform(x, y) {
  return { x, y, w: 140, h: 20 };
}

function startGame() {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("hud").style.display = "block";
  running = true;
  score = 0;
  player.y = 300;
  platforms = [platform(100, 400)];
  audio.music.play();
  loop();
}

addEventListener("click", () => {
  if (!running) return;
  player.vy = -14;
  audio.jump.play();
});

function gameOver() {
  running = false;
  audio.music.pause();
  audio.fall.play();
  showDeathAd();
}

function winGame() {
  running = false;
  audio.music.pause();
  showWinAd();
}

function loop() {
  if (!running) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const ai = getAI(score);

  player.vy += ai.gravity;
  player.y += player.vy;

  ctx.drawImage(img, player.x, player.y, player.size, player.size);

  platforms.forEach(p => {
    ctx.fillStyle = "#4caf50";
    ctx.fillRect(p.x, p.y, p.w, p.h);

    if (
      player.y + player.size > p.y &&
      player.y + player.size < p.y + p.h &&
      player.x + player.size > p.x &&
      player.x < p.x + p.w &&
      player.vy > 0
    ) {
      player.vy = -14;
      score++;
      scoreEl.textContent = score;

      platforms.push(
        platform(p.x + ai.gap, 250 + Math.random() * 200)
      );
    }
  });

  if (score >= 20) winGame();
  if (player.y > canvas.height) gameOver();

  requestAnimationFrame(loop);
}

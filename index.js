var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var score = 1;
var lives = 3;
var level = 1;
var enemyinter=2000;
var animationId = null;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//define the alien invaders
var alienImage= new Image();
alienImage.src= "./images/alien (1).png";
alienImage.onload = function (e) {
  drawAlien();
};

function drawAlien() {
  ctx.fillStyle = "red";
  aliens.forEach((alien) => {
    let x = alien.x;
    if (x < alien.destinationX) {
      alien.x += 5;
    }
    ctx.drawImage(alienImage,alien.x, alien.y, alien.w, alien.h);
  });
}
function drawAliensBullets() {
  ctx.fillStyle = "red";
  aliensBullets.forEach((aBull,j) => {
    if (aBull.y > canvas.height) {
      aliensBullets.splice(j, 1); //get rids of bullet when past screen
    }
    ctx.fillRect(aBull.x, aBull.y+=5, aBull.w, aBull.h);
  });
}
let aliens = [];
let aliensBullets = [];
setInterval(function () {
  let x = Math.random() * canvas.width;
  let alien = {
    x: -10,
    y: 10,
    w: 65,
    h: 65,
    destinationX: x,
   // destinationY: 0,

    get startShooting() {
      return setInterval(() => {
        // creating bullet every 3 seconds

        let bullet = { x: this.x + this.w / 2, y: this.y, w: 3, h: 7 };
        aliensBullets.push(bullet);
      }, 3000);
    },
  };
  aliens.push(alien);
}, (enemyinter*level)); //creating aliens every 2 seconds
setInterval(() => {
  // creating bullet every 3 seconds
  if (aliens.length !== 0) {
    //loops through array of aliens
    for (let i = 0; i < aliens.length; i++) {
      // if there are no longer any aliens it will stop producing bullets.

      let bullet = {
        x: aliens[i].x + aliens[i].w / 2,
        y: aliens[i].y,
        w: 3,
        h: 7,
      };
      aliensBullets.push(bullet);
    }
  }
},3000); //shoots every 3 seconds.

// //draw the shooter
var shooterImage = new Image();
shooterImage.src = "./images/enterprise copy.png";
shooterImage.onload = function (e) {
  drawShooter();
};

let shooter = {
  x: canvas.width / 2,
  y: 420,
  w: 70,
  h: 70,
};
function drawShooter() {
  ctx.drawImage(shooterImage, shooter.x, shooter.y, shooter.w, shooter.h);
}

//move the shooter a long a line

document.body.onkeydown = checkKey;
function checkKey(e) {
  if (e.keyCode === 39) {
    // move right
    shooter.x += 15;
  }
  if (e.keyCode === 37) {
    //Move left
    shooter.x -= 15;
  }
  if (e.keyCode === 38) {
    //shoot
    shoot();
  }
}
//detect shots from shooter to alien
function detectCollision() {
  aliens.forEach((alien, a) => {
    bullets.forEach((bullet, i) => {
      if (
        alien.x < bullet.x + bullet.w &&
        alien.x + alien.w > bullet.x &&
        alien.y < bullet.y + bullet.h &&
        alien.y + alien.h > bullet.y
      ) {
        aliens.splice(a, 1);
        bullets.splice(i, 1);
        score++;
        addScore();
      }
    });
  });
}
// detect shots from alien to me
function detectShooterCollision() {
  aliensBullets.forEach((aBull, a) => {
    if (
      aBull.x < shooter.x + shooter.w &&
      aBull.x + aBull.w > shooter.x &&
      aBull.y < shooter.y + shooter.h &&
      aBull.y + aBull.h > shooter.y
    ) {
      aliensBullets.splice(a, 1);
      lives--;
      gameOver();
    }
  });
}
//shoot aliens

let bullets = [];
function shoot() {
  let bullet = {
    x: shooter.x + shooter.w / 2,
    y: shooter.y,
    w: 10,
    h: 20,
  };
  bullets.push(bullet);
}

function drawBullets() {
  ctx.fillStyle = "green";
  bullets.forEach((bullet) => {
    ctx.fillRect(bullet.x, (bullet.y -= 15), bullet.w, bullet.h);
  });
}
//Adding score everytime alien is hit.
function addScore() {
  document.querySelector("#result").innerText = `Score : ${score}`;
}


let backgrounds = [
  "url('images/images.jpg')",
  "url('images/download.jpg')",
  "url('images/download-1.jpg')",
  "url('images/download-2.jpg')",
  "url('images/download-3.jpg')",  
]


function gameOver() {
  if (score % 3 === 0 ) {
    //alert ("You Won!");
    score = 1; 
   // cancelAnimationFrame(animationId);
   level++;
    document.body.style.backgroundImage = backgrounds[level];

  } else {
    if (lives === 0) {
      alert("Game Over!");
      document.location.reload();
      cancelAnimationFrame(animationId);
    }
    document.querySelector("#life").innerText = `Lives : ${lives}`;
    document.querySelector("#level").innerText = `Level : ${level}`;
  }
}

function animationLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  animationId = requestAnimationFrame(animationLoop);
  drawShooter();
  drawAlien();
  drawBullets();
  detectCollision();
  drawAliensBullets();
  detectShooterCollision();
  addScore();
  gameOver();
}
animationLoop();

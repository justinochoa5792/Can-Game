var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 500;

//define the alien invaders
function drawAlien() {
  ctx.fillStyle = "red";
  aliens.forEach((alien) => {
    ctx.fillRect(alien.x, alien.y, alien.w, alien.h); //optional chaining
  });
  //ctx.fillRect(aliens[i]?.x,aliens[i]?.y,aliens[i]?.w,aliens[i]?.h);//optional chaining
}
function drawAliensBullets() {
    ctx.fillStyle = "red";
    aliensBullets.forEach((aBull,j) => {
        if(aBull.y>canvas.height){
            aliensBullets.splice(j,1) //get rids of bullet when past screen
        }
      ctx.fillRect(aBull.x, aBull.y+=3, aBull.w, aBull.h); //optional chaining
    });
    //ctx.fillRect(aliens[i]?.x,aliens[i]?.y,aliens[i]?.w,aliens[i]?.h);//optional chaining
  }
let aliens = [];
let aliensBullets=[];
setInterval(function () {
let x = Math.random() * canvas.width
  let alien = {
    x: x,
    y: 100,
    w: 20,
    h: 20,
    startShooting:() => {
        let bullet= {x: x,y:100, w:3, h:7 }
        setInterval(() => {
            aliensBullets.push(bullet)
        
        }, 1000)
    }
  };
  alien.startShooting()
  aliens.push(alien);
}, 1000);
//draw the shooter
function drawShooter() {
  ctx.fillStyle = "blue";
  ctx.fillRect(shooter.x, shooter.y, shooter.w, shooter.h);
}
let shooter = {
  x: canvas.width / 2,
  y: 480,
  w: 20,
  h: 50,
  color: "blue",
};

//move the shooter along a line

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
      }
    });
  });
}
function detectShooterCollision() {
    aliensBullets.forEach((aBull, a) => {
     
        if (
          aBull.x < shooter.x + shooter.w &&
          aBull.x + aBull.w > shooter.x &&
          aBull.y < shooter.y + shooter.h &&
          aBull.y + aBull.h > shooter.y
        ) {
          aliensBullets.splice(a, 1);
          window.cancelAnimationFrame(animationId)
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
  ctx.fillStyle = "white";
  bullets.forEach((bullet) => {
    ctx.fillRect(bullet.x, (bullet.y -= 15), bullet.w, bullet.h);
  });
}

let animationId = null;
function animationLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  animationId = requestAnimationFrame(animationLoop);
  drawShooter();
  drawAlien();
  drawBullets();
  detectCollision();
  drawAliensBullets();
  detectShooterCollision();
}
animationLoop();

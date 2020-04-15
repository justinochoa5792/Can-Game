var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var startBtn=document.getElementById('startBtn');
canvas.width = 600;
canvas.height = 500;
let score = 0;
let lives = 3;

// function gameStart(){
//   startBtn.style.display="none";
// }
//define the alien invaders

var alienImage= new Image();
alienImage.src= './images/alien (1).png';
alienImage.onload=  function (e){
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
  aliensBullets.forEach((aBull, j) => {
    if (aBull.y > canvas.height) {
      aliensBullets.splice(j, 1); //get rids of bullet when past screen
    }
    ctx.fillRect(aBull.x, (aBull.y +=4), aBull.w, aBull.h); //optional chaining
  });
  //ctx.fillRect(aliens[i]?.x,aliens[i]?.y,aliens[i]?.w,aliens[i]?.h);//optional chaining
}
let aliens = [];
let aliensBullets = [];
setInterval(function () {
  let x = Math.random() * canvas.width;
  let alien = {
    x: -10,
    y: 100,
    w: 65,
    h: 65,
    destinationX: x,
    destinationY: 100,

    get startShooting() {
      return setInterval(() => {
        console.log('Create a bullet');// creating bullet every 3 seconds

        let bullet = { x: this.x + this.w / 2, y: this.y, w: 3, h: 7 };
        aliensBullets.push(bullet);
      }, 3000);
    },
  };
  //alien.startShooting;
  aliens.push(alien);
}, 3000);
setInterval(() => {
  console.log('did it work');// creating bullet every 3 seconds
if(aliens.length !==0 ){
for(let i=0; i<aliens.length; i++){
  console.log(aliens[i]);
  let bullet = { x: aliens[i].x + aliens[i].w / 2, y: aliens[i].y, w: 3, h: 7 };
    aliensBullets.push(bullet)
}
}
},3000);

// //draw the shooter
var shooterImage= new Image();
shooterImage.src= './images/enterprise copy.png';
shooterImage.onload=  function (e){
  drawShooter();
};

let shooter = {
  x: canvas.width / 2,
  y: 420,
  w: 70,
  h: 70,
};
function drawShooter() {
  ctx.drawImage(shooterImage,shooter.x, shooter.y,shooter.w,shooter.h);
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
      //window.cancelAnimationFrame(animationId);
      lives--;
      gameOver();
    }
    // document.location.reload();
    //     clearInterval();
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
  document.querySelector( "#result").innerText = `Score : ${score}`;
}
 function gameOver(){
    if(score===3){
    alert ("You Won!");
      //document.location.reload();
      cancelAnimationFrame(animationId);
    }
 else {
      if(lives===0){
        alert("You Lose!");

        cancelAnimationFrame(animationId);
        }
        document.querySelector( "#life").innerText =`Lives : ${lives}`;}
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
  addScore();
   gameOver();
}
animationLoop();

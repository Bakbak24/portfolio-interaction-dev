let video;
let handpose;
let predictions = [];

let balloons = [];
let balloonImages = [];

let score = 0;
let timer = 30;
let interval;

let gameOverFlag = false;

function preload() {
  balloonImages[0] = loadImage('images/balon.png');
  balloonImages[1] = loadImage('images/balon_blue.png');
  balloonImages[2] = loadImage('images/balon_red.png');
  balloonImages[3] = loadImage('images/balon_green.png');
}

function setup() {
  createCanvas(640, 480);
  
  video = createCapture(VIDEO);
  video.size(width, height);

  handpose = ml5.handpose(video, modelLoaded);
  handpose.on('predict', function(results) {
    predictions = results;
  });

  video.hide();
  
  interval = setInterval(updateTimer, 1000);
}

function modelLoaded() {
  console.log('Model Loaded!');
}

function createBalloons() {
  let margin = 150; // Marge van de randen van de canvas, zodat de ballon niet te dicht bij de randen komt.
  let minDistanceToEdge = 100; // Minimale afstand tot de randen van het canvas.

  // Controleren of alle ballonnen zijn gepopt
  if (balloons.length === 0 || balloons.every(balloon => balloon.popped)) {
    balloons = [];
    
    let numBalloons = floor(random(1, 3));
    for (let i = 0; i < numBalloons; i++) {
      let x, y;

      if (random() > 0.5) {
        x = random(margin, width / 2 - minDistanceToEdge);
      } else {
        x = random(width / 2 + minDistanceToEdge, width - margin);
      }

      if (random() > 0.5) {
        y = random(margin, height / 2 - minDistanceToEdge);
      } else {
        y = random(height / 2 + minDistanceToEdge, height - margin);
      }

      let balloonIndex = floor(random(balloonImages.length));
      
      balloons.push({
        x: x,
        y: y,
        size: 100,
        popped: false,
        image: balloonImages[balloonIndex]
      });
    }
  }
}

function draw() {
  image(video, 0, 0, width, height);

  createBalloons();
  
  for (let i = 0; i < balloons.length; i++) {
    let balloon = balloons[i];
    
    for (let j = 0; j < predictions.length; j++) {
      let hand = predictions[j];
      let indexFinger = hand.annotations.indexFinger[3];

      let d = dist(indexFinger[0], indexFinger[1], balloon.x + balloon.size / 2, balloon.y + balloon.size / 2);

      if (d < balloon.size / 2 && !balloon.popped) {
        balloon.popped = true;
        score++;
        document.getElementById('shakes').innerText = 'Popped: ' + score;
      }
    }

    if (!balloon.popped) {
      image(balloon.image, balloon.x, balloon.y, balloon.size, balloon.size);
    }
  }
  
  document.getElementById('countdown').innerText = 'Sec: ' + timer;
  
  if (timer <= 0 && !gameOverFlag) {
    clearInterval(interval);
    gameOver();
  }
}

function updateTimer() {
  if (!gameOverFlag) {
    timer--;
  }
}

function gameOver() {
  document.getElementById('shakes').innerText = 'Score: ' + score;
  alert('Your score is: ' + score + '. click OK to restart the game');
  window.location.reload();
  gameOverFlag = true;
}
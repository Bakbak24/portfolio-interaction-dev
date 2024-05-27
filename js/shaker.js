window.addEventListener('deviceorientation', handleOrientation);

let shakeCount = 0;
let countdown = 30;
let shaking = false;
let lastShakeTime = 0;
let startAgainButton = document.getElementById('start-btn');

function handleOrientation(event) {
    let beta = event.beta; 
    let rotation = beta - 90;
    
    let shaker = document.getElementById('shaker');
    shaker.style.transform = "rotate("+rotation+"deg)";
    
    let currentTime = new Date().getTime();
    if (Math.abs(rotation) > 30) {
        if (!shaking || currentTime - lastShakeTime > 1000) {
            shaking = true;
            lastShakeTime = currentTime;
            shakeCount++;
            document.getElementById('shakes').innerText = "Shakes:" + shakeCount;
        }
    } else {
        shaking = false;
    }
}

function startGame() {
    shaker.setAttribute('src', 'images/shaker.png');
    let countdownElement = document.getElementById('countdown');
    let countdownInterval = setInterval(function() {
        countdown--;
        countdownElement.innerText = "Sec:" + countdown;
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            startAgainButton.style.display = "block";
            endGame();
        }
    }, 1000);
}

function endGame() {
    document.getElementById('title').innerText = "Time's up! You made " + shakeCount + " shakes.";
    shakeCount = 0;
    countdown = 30;
    document.getElementById('shakes').innerText = "Shakes:0";
    document.getElementById('countdown').innerText = "Sec:30";
    shaker.setAttribute('src', 'images/explosion.png');
}

startAgainButton.onclick = function() {
    startGame();
    startAgainButton.style.display = "none";
    document.getElementById('title').innerText = "Keep shaking your cocktail as fast as possible for 30sec";
};

window.onload = function() {
    startGame();
};
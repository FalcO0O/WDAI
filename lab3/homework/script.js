// Zmienne globalne
const zombieHeight = 312
const popup = document.getElementById('game-over-popup');
const finalScoreElement = document.getElementById('final-score');
const restartButton = document.getElementById('restart-button');

let score = 0;
let lives = 3;
let zombies = [];
let isGameOver = false;
let pageVisibility = true;

// HUD
const scoreElement = document.getElementById('score');
const heartElements = [
    document.getElementById('heart1'),
    document.getElementById('heart2'),
    document.getElementById('heart3')
];
const gameBoard = document.getElementById('game-board');
const sadMusic = document.getElementById('sad-music');


gameBoard.addEventListener('click', (event) => {
    // Sprawdź, czy kliknięty element to zombie
    if (!event.target.classList.contains('zombie')) {
        // Odejmij 5 punktów za nietrafiony strzał
        score = Math.max(0, score - 5); // Wynik nie może spaść poniżej 0
        scoreElement.textContent = score.toString().padStart(5, '0');
    }
});


function spawnZombie() {
    if (isGameOver) return;
    if (!pageVisibility) return;

    const zombie = document.createElement('div');
    zombie.classList.add('zombie');

    const moveDuration = Math.random() * 2 + 2; // Czas od 2s do 4s
    const walkDuration = mapRange(moveDuration, 2, 4, 0.3, 0.8);

    zombie.style.animation = `walk ${walkDuration}s steps(10) infinite, moveZombie ${moveDuration}s linear`;

    const randomScale = Math.random() * 0.5 + 0.75;
    zombie.style.setProperty('--zombie-scale', randomScale);

    const maxY = window.innerHeight - zombieHeight * randomScale;
    zombie.style.top = `${Math.random() * maxY}px`;

    gameBoard.appendChild(zombie);
    zombies.push(zombie);

    zombie.addEventListener('animationend', () => {
        if (!isGameOver) loseLife();
        gameBoard.removeChild(zombie);
        zombies = zombies.filter(z => z !== zombie);
    });

    zombie.addEventListener('click', (event) => {
        event.stopPropagation();

        score += 20;
        scoreElement.textContent = score.toString().padStart(5, '0');
        gameBoard.removeChild(zombie);
        zombies = zombies.filter(z => z !== zombie);
    });
}

document.addEventListener('visibilitychange', (event) => {
    document.hidden ? pageVisibility = false : pageVisibility = true;
})


function loseLife() {
    lives--;
    if (lives >= 0) {
        heartElements[lives].src = 'resources/empty_heart.png';
    }
    if (lives === 0) {
        endGame();
    }
}

function endGame() {
    isGameOver = true;
    sadMusic.play();
    finalScoreElement.textContent = score.toString().padStart(5, '0');
    popup.classList.remove('hidden');
}

restartButton.addEventListener('click', () => {
    popup.classList.add('hidden');
    resetGame();
});


function resetGame() {
    score = 0;
    lives = 3;
    isGameOver = false;
    zombies.forEach(zombie => zombie.remove());
    zombies = [];

    // reset HUDu
    scoreElement.textContent = score.toString().padStart(5, '0');
    heartElements.forEach(heart => (heart.src = 'resources/full_heart.png'));

    sadMusic.pause();
    spawnZombie();
}


function mapRange(value, in_min, in_max, out_min, out_max) {
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}


setInterval(spawnZombie, 1500);

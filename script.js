let timer = 0;
let bestScore = null;
let currentNumber = 1;

const startButton = document.getElementById("startButton");
const gameArea = document.getElementById("gameArea");
const timerDiv = document.getElementById("timer");
const schulteTable = document.getElementById("schulteTable");
const playAgainButton = document.getElementById("playAgainButton");
const bestScoreDiv = document.getElementById("bestScore");
const goBackButton = document.getElementById("goBackButton");
const startOverButton = document.getElementById("startOverButton");

startButton.addEventListener("click", startGame);
playAgainButton.addEventListener("click", resetGame);
goBackButton.addEventListener("click", goBackHome);
startOverButton.addEventListener("click", startOver);

function startGame() {
    startButton.classList.add("hidden");
    gameArea.classList.remove("hidden");
    startTimer();
    generateSchulteTable();
}

function startTimer() {
    timer = 0;
    timerDiv.textContent = `Time: 0s`;
    setInterval(() => {
        timer++;
        timerDiv.textContent = `Time: ${timer}s`;
    }, 1000);
}

function generateSchulteTable() {
    schulteTable.innerHTML = "";
    const numbers = Array.from({ length: 25 }, (_, i) => i + 1);
    shuffleArray(numbers);
    numbers.forEach(num => {
        const cell = document.createElement("div");
        cell.textContent = num;
        cell.addEventListener("click", () => handleCellClick(cell, num));
        schulteTable.appendChild(cell);
    });
}

function handleCellClick(cell, num) {
    if (num === currentNumber) {
        cell.classList.add("correct");
        currentNumber++;
        if (currentNumber > 25) {
            alert(`You finished! Time: ${timer}s`);
            playAgainButton.classList.remove("hidden");
            if (bestScore === null || timer < bestScore) {
                bestScore = timer;
                bestScoreDiv.textContent = `Best Time: ${bestScore}s`;
            }
        }
    } else {
        navigator.vibrate(500); // Vibrate for 500ms on wrong number click
        cell.classList.add("wrong");
    }
}

function resetGame() {
    currentNumber = 1;
    startGame();
    // Re-enable all cells for the new game
    const cells = document.querySelectorAll("#schulteTable div");
    cells.forEach(cell => {
        cell.classList.remove("correct", "wrong");
        cell.style.pointerEvents = 'auto';
    });
    playAgainButton.classList.add("hidden");
    goBackButton.classList.add("hidden");
    startOverButton.classList.add("hidden");
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function goBackHome() {
    window.location.href = "index.html"; // Adjust with your homepage URL
}

function startOver() {
    location.reload(); // Reloads the page to start the game over
}

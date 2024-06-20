const words = ['javascript', 'hangman', 'coding', 'game'];
let selectedWord = '';
let guessedWord = [];
let mistakes = 0;
const maxMistakes = 6;

function initializeGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedWord = Array(selectedWord.length).fill('_');
    mistakes = 0;
    document.getElementById('wordDisplay').textContent = guessedWord.join(' ');
    document.getElementById('resultMessage').textContent = '';
    generateKeyboard();
}

function generateKeyboard() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const keyboardDiv = document.getElementById('keyboard');
    keyboardDiv.innerHTML = '';

    for (const letter of alphabet) {
        const button = document.createElement('button');
        button.textContent = letter;
        button.onclick = () => handleGuess(letter);
        keyboardDiv.appendChild(button);
    }
}

function handleGuess(letter) {
    if (selectedWord.includes(letter)) {
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === letter) {
                guessedWord[i] = letter;
            }
        }
    } else {
        mistakes++;
    }

    updateGame();
}

function updateGame() {
    document.getElementById('wordDisplay').textContent = guessedWord.join(' ');

    if (guessedWord.join('') === selectedWord) {
        document.getElementById('resultMessage').textContent = 'You Win!';
        disableKeyboard();
    } else if (mistakes >= maxMistakes) {
        document.getElementById('resultMessage').textContent = `You Lose! The word was: ${selectedWord}`;
        disableKeyboard();
    }
}

function disableKeyboard() {
    const buttons = document.querySelectorAll('#keyboard button');
    buttons.forEach(button => {
        button.disabled = true;
    });
}

function resetGame() {
    initializeGame();
}

window.onload = initializeGame;

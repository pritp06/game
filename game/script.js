const cards = [
    '❤️', '❤️', '💛', '💛', '💚', '💚', '💙', '💙',
    '💜', '💜', '🧡', '🧡', '🤍', '🤍', '🖤', '🖤'
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Shuffle the cards
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Create a single card element
function createCard(cardValue) {
    const card = document.createElement('div');
    card.classList.add('card', 'hidden');
    card.dataset.value = cardValue;
    card.addEventListener('click', flipCard);
    return card;
}

// Flip card logic
function flipCard() {
    if (lockBoard || this.classList.contains('flipped')) return;

    this.classList.add('flipped');
    this.textContent = this.dataset.value;

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        lockBoard = true;

        setTimeout(checkForMatch, 1000);
    }
}

// Check for a match
function checkForMatch() {
    const isMatch = firstCard.dataset.value === secondCard.dataset.value;

    if (isMatch) {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
    } else {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.textContent = '';
    }

    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

// Start or Restart the Game
function startGame() {
    const grid = document.getElementById('grid');
    grid.innerHTML = ''; // Clear the grid
    shuffle(cards).forEach(cardValue => {
        const card = createCard(cardValue);
        grid.appendChild(card);
    });
}

// Restart Button Logic
document.getElementById('restart').addEventListener('click', startGame);

// Initialize the game
startGame();

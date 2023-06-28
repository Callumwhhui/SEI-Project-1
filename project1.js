// state vars 

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let timeLeft = 61;
let moveCount = 0;

// elements 
const cards = document.querySelectorAll('.game-card')
const gameStatus = document.querySelector('.gameStatus')
const timer = document.getElementById('timer')
const playAgainBtn = document.querySelector('button')
const moveCounter = document.getElementById('move-counter')

// event listeners

playAgainBtn.addEventListener('click',restartGame);

// functions 
init(); 

function init () {
    cards.forEach(card => card.addEventListener('click', flipCard));
    shuffle();
    startTimer();
}

function flipCard(){
    if (lockBoard) return;
    if (this === firstCard) return;
    // use of the this key word 
    this.classList.toggle('flip')

    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;
        return;
    } 
        // second click 
        secondCard = this
        checkForMatch();  

}

function checkForMatch () {
    let isMatch = firstCard.dataset.img === secondCard.dataset.img;
// !!turnery function. refactored an if,else into one line!!
    isMatch ? disableCards() : unflipCards();
    plusMoveCount();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    aMatch();
    resetBoard();
    checkGameEnd();
}

function unflipCards () {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
        noMatch();
        }, 1000);
}

function resetBoard () {
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
}

function shuffle () {
    cards.forEach(card => {
        let rndPos = Math.floor(Math.random() * 16);
        card.style.order = rndPos;
    });
}

function startTimer() {
    timerInterval = setInterval(() => {
      timeLeft--;
      timer.textContent = `Time Left: ${timeLeft}s`;
  
      if (timeLeft === 0) {
        clearInterval(timerInterval);
        lockBoard = true;
        gameStatus.textContent = 'Game Over!';
      }
    }, 1000);
  }

  function checkGameEnd() {
    if (document.querySelectorAll('.game-card.flip').length === cards.length) {
      clearInterval(timerInterval);
      gameStatus.textContent = 'Congratulations! You won!';
      gameStatus.classList.add('match-animation');
    setTimeout(()=>{
        gameStatus.classList.remove('match-animation')
    },1000);
    }
  }

  function restartGame () {
    clearInterval(timerInterval);
    timeLeft = 60;
    timer.innerText = `Time Left: ${timeLeft}s`;
    lockBoard = false;
    gameStatus.textContent = 'Begin!';
    

    cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
      });
      resetMoveCount();
      resetBoard();
      shuffle();
      startTimer(); 
  }
// extra functionality!
  function noMatch () {
    gameStatus.innerText = 'No match try again!';
    gameStatus.classList.add('no-match-animation');
    setTimeout(()=>{
        gameStatus.classList.remove('no-match-animation')
    },1000);
  }

  function aMatch () {
    gameStatus.innerText = 'A match! Good job keep going!';
    gameStatus.classList.add('match-animation');
    setTimeout(()=>{
        gameStatus.classList.remove('match-animation')
    },1000);
  }

function plusMoveCount () {
    moveCount++;
    updateMoveCount();
}

function updateMoveCount () {
    moveCounter.textContent = `Moves: ${moveCount}`;
}

function resetMoveCount () {
    moveCount = 0;
    updateMoveCount();
}


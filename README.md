# Concentration Game

Concentration Game is a memory-based card matching game where players have to flip cards and find matching pairs. The objective of the game is to match all the pairs within a certain time limit.

## What the finished project looks like
<img src="projectimgs/start-page.png" alt= "start-page">
<img src="projectimgs/main-img.png" alt= "main-game">

## Features

- Flip cards to reveal their hidden images.
- Match pairs by finding cards with the same image.
- Timer countdown to add excitement and challenge.
- Move counter to see how many moves it takes you to win.
- Game status updates to provide feedback to the player.
- Restart button to start a new game.

## Future Improvements 

- Select difficulty.
  1. decrease time to beat game.
  2. increase amount of cards.
  
- display highscores. 

## Technologies Used

- HTML
- CSS
- JavaScript
- Git Hub
- Visual Studio Code 
- Command Line
- Image source: [flaticon.com ](https://www.flaticon.com/)
- Wireframing tool: https://excalidraw.com/ 

## Setup and Usage

1. Follow this link: https://callumwhhui.github.io/SEI-Project-1/
3. Press play when you're ready to start playing.
4. The game will start automatically.
5. Click on the cards to flip them and try to match all the pairs.
6. The timer will count down, and the game status will update accordingly.
7. If you complete the game within the time limit, a winning message will be displayed.
8. To restart the game, click on the "Restart" button.

## Build/Code Process
### HTML Structure 
I  started build/code process by setting up the basic HTML structurre for my game, this includes:
- The game board 
- Headers 
- The cards
- linking my css and JavaScript files.

### CSS Styling 
I then moved onto syling the game so that I could define the layout I wanted. this also helped me visualise what the game would look like. 

### JavaScript - state variables 
The next step waas then to create all the variables that would hold my game state:
```
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let timeLeft = 61;
let moveCount = 0;
```
### JavaScript - card flipping 
Then I implemented the logic to handle card flipping when the user clicks on a card. I used event listeners to detect when a card is clicked. 
```
cards.forEach(card => card.addEventListener('click', flipCard));

function flipCard(){
    if (lockBoard) return;
    // prevents same card being flipped twice. 
    if (this === firstCard) return;
    // use of the this key word, refering to the card object that flipCard is being called on. 
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
```
### JavaScript - check for a match 
Then I had to create a function that checks if the two flipped cards are a match by comparing their `data-img` values: 
```
function checkForMatch () {
    let isMatch = firstCard.dataset.img === secondCard.dataset.img;
// !!turnery function. refactored an if,else into one line!!
    isMatch ? disableCards() : unflipCards();
    plusMoveCount();
}
```
My first function did not look this sleek to begin with, it was refactored from an if else statement. 

### JavaScript - Check game end 
Then I created a function to check if the game had ended by comparing the number of flipped cards with the total number of cards:
```
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
```
### JavaScript - Testing and refinement
I then tested my game throughly to make sure it functions correctly, I could then make any adjustments and add functionality where needed. for example:
`disableCards` `unflipCards` `moveCount` `restartGame` 
I also added a few animations to provide feeback to the user on each move.


## Timeframe & Working Team 

This project was worked on soley by me. I was given 5 days to complete this project and this project was completed within 5 days.

## Project Planning - Wireframes 

![Screenshot 2023-06-29 at 10 22 04](https://github.com/Callumwhhui/SEI-Project-1/assets/130695899/92de422e-896e-4ad0-a727-261043675cca)

![Screenshot 2023-06-29 at 10 24 28](https://github.com/Callumwhhui/SEI-Project-1/assets/130695899/ef206070-6819-43d2-885f-a9ace2158cd8)


## Customization

- To customize the images used in the game, replace the existing images in the `projectimgs` folder with your own images. Make sure the image filenames match the values assigned to the `data-img` attributes of the card elements in the HTML.
- You can modify the game's appearance by modifying the CSS styles in the `main.css` file.

## Contributions

Contributions to the project are welcome! If you find any issues or would like to suggest enhancements, feel free to submit a pull request.

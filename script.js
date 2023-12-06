const cells = document.querySelectorAll(".cell");
const turnText = document.querySelector(".turn");
const restartBtn = document.querySelector(".reset");

let currentPlayer = "X";
let nextPlayer = "O";
let playerTurn = currentPlayer;



// Function to start game
const playGame = () => {
    cells.forEach(cell =>{cell.addEventListener("click", cellClicked)});
    restartBtn.addEventListener('click', restartGame);
}


// Function to change turn
const changeTurn = () => {
    playerTurn = playerTurn === currentPlayer ? nextPlayer : currentPlayer;
}


// Function to check winner
const checkWinner = () => {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winConditions.length; i++) {
        const [cellA, cellB, cellC] = winConditions[i];

        if(cells[cellA].textContent !== '' &&
           cells[cellA].textContent === cells[cellB].textContent &&
           cells[cellB].textContent === cells[cellC].textContent){
            removeListener();
            turnText.textContent = cells[cellA].textContent + " Won";
            cells[cellA].style.backgroundColor = "#837b7b";
            cells[cellB].style.backgroundColor = "#837b7b";
            cells[cellC].style.backgroundColor = "#837b7b";
            document.querySelector('.gif-box').getElementsByTagName('img')[0].style.width = '123px';
        }
    }
}


const cellClicked = (e) => {
    if (e.target.textContent === "") {
        e.target.textContent = playerTurn;
        changeTurn();
        turnText.textContent = `${playerTurn}'s Turn`;
        if(checkWinner()){
           return true;
        }
        else if(draw()){
            removeListener();
           turnText.textContent = "Tie";
        }
   }
}


// Function to check draw
const draw = () => {
    let emptyCells = 0;
    cells.forEach(cell => {
        if(cell.textContent === ""){
            emptyCells++;
        }
    });
    return emptyCells === 0 && !checkWinner();
}


// remove Event Listener
const removeListener = () => {
    cells.forEach(cell => cell.removeEventListener('click', cellClicked));
}


// restart game
const restartGame = () => {
    return window.location.reload();
}


// Calling play game function
playGame();

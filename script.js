const cells = document.querySelectorAll(".cell");
const turnText = document.querySelector(".turn");
const restartBtn = document.querySelector(".reset");
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
let currentPlayer = "X";


playGame();

function playGame(){
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    restartBtn.addEventListener('click', restartGame);
}

// function for change turn
const changeTurn = () => {
    return currentPlayer === "X" ? "O" : "X";
}

function cellClicked(e) {
    const cell = e.target;
    if (cell.textContent === "") {
        cell.textContent = currentPlayer;
        currentPlayer = changeTurn();
        turnText.textContent = `${currentPlayer}'s Turn`;
        if(checkWinner()){
           return;
        }        
        else if(draw()){
            turnText.textContent = "Tie";
        }
    }
}


// check win conditions & winner
function checkWinner() {
    let roundWon = false;
    for (let i = 0; i < winConditions.length; i++) {
        const [cellA, cellB, cellC] = winConditions[i];

        if (cells[cellA].textContent !== '' &&
            cells[cellA].textContent === cells[cellB].textContent &&
            cells[cellB].textContent === cells[cellC].textContent) {
            roundWon = true;
            removeListener();
            turnText.textContent = cells[cellA].textContent + " Won";
            cells[cellA].style.backgroundColor = "#837b7b";
            cells[cellB].style.backgroundColor = "#837b7b";
            cells[cellC].style.backgroundColor = "#837b7b";
            document.querySelector('.gif-box').getElementsByTagName('img')[0].style.width = '123px';
            break;
        }
    }
}

//  Game Draw
function draw(){
    let emptyCells = 0;
    cells.forEach(cell => {
        if(cell.textContent === ""){
            emptyCells++;
        }
    });
    return emptyCells === 0 && !checkWinner();
}

// remove EventListener
function removeListener() {
    cells.forEach(cell => cell.removeEventListener('click', cellClicked));
}

// restart game
function restartGame() {
    return window.location.reload();
}

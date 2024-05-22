
function Player(name, marker) {
  this.name = name;
  this.marker = marker;
}

const gameBoard = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const player1 = new Player("Player1", "X");
const player2 = new Player("Player2", "O");

let currentPlayer = player1;

document.addEventListener('DOMContentLoaded', () => {
  const gridContainer = document.getElementById('gridContainer');

  // Create 9 boxes and append them to the container
  for (let i = 0; i < 9; i++) {
    const gridBox = document.createElement('div');
    gridBox.classList.add('gridBox');
    gridBox.setAttribute('data-index', i);
    gridBox.addEventListener('click', handleBoxClick);
    gridContainer.appendChild(gridBox);
  }
});

const player1Scoreboard = document.getElementById('player1Score');
let totalPlayer1Score = 0;

function handleBoxClick(event) {
  const gridBox = event.target;
  const index = gridBox.getAttribute('data-index');
  
  if (!gridBox.textContent) {
    gridBox.textContent = currentPlayer.marker;
    gameBoard[index] = currentPlayer.marker;

    const winner = checkWinner(gameBoard);

    if (winner === 'Player1') {
      console.log(winner + 'wins!');
      totalPlayer1Score++
      player1Scoreboard.textContent = `Player 1 Score: ${totalPlayer1Score}`;
      resetBoard(gameBoard);
    }
    else if (winner === 'Player2') {
      console.log(winner + 'wins!');
      totalPlayer2Score++;
      resetBoard(gameBoard);
    }

    else if (isBoardFull(gameBoard)) {
      console.log("it's a draw!");
      resetBoard(gameBoard); 
    }

    currentPlayer = currentPlayer === player1? player2:player1;
  }

}

function checkWinner(gameBoard) {
  // Horizontal Check
  if (
    (gameBoard[0] === "X" && gameBoard[1] === "X" && gameBoard[2] === "X") ||
    (gameBoard[3] === "X" && gameBoard[4] === "X" && gameBoard[5] === "X") ||
    (gameBoard[6] === "X" && gameBoard[7] === "X" && gameBoard[8] === "X")
  ) {
    return 'Player1';
  } else if (
    (gameBoard[0] === "O" && gameBoard[1] === "O" && gameBoard[2] === "O") ||
    (gameBoard[3] === "O" && gameBoard[4] === "O" && gameBoard[5] === "O") ||
    (gameBoard[6] === "O" && gameBoard[7] === "O" && gameBoard[8] === "O")
  ) {
    return 'Player2';
  }

  // Vertical Check
  if (
    (gameBoard[0] === "X" && gameBoard[3] === "X" && gameBoard[6] === "X") ||
    (gameBoard[1] === "X" && gameBoard[4] === "X" && gameBoard[7] === "X") ||
    (gameBoard[2] === "X" && gameBoard[5] === "X" && gameBoard[8] === "X")
  ) {
    return 'Player1';
  } else if (
    (gameBoard[0] === "O" && gameBoard[3] === "O" && gameBoard[6] === "O") ||
    (gameBoard[1] === "O" && gameBoard[4] === "O" && gameBoard[7] === "O") ||
    (gameBoard[2] === "O" && gameBoard[5] === "O" && gameBoard[8] === "O")
  ) {
    return 'Player2';
  }

  // Cross Check
  if (
    (gameBoard[0] === "X" && gameBoard[4] === "X" && gameBoard[8] === "X") ||
    (gameBoard[2] === "X" && gameBoard[4] === "X" && gameBoard[6] === "X")
  ) {
    return 'Player1';
  } else if (
    (gameBoard[0] === "O" && gameBoard[4] === "O" && gameBoard[8] === "O") ||
    (gameBoard[2] === "O" && gameBoard[4] === "O" && gameBoard[6] === "O")
  ) {
    return 'Player2';
  }

  return null;
}

function resetBoard(gameBoard) {
  for (let j = 0; j < gameBoard.length; j++) {
    gameBoard[j] = j + 1;
  }

  const gridBoxes = document.querySelectorAll('.gridBox');
  gridBoxes.forEach(box => {
    box.textContent=""
  });
  console.log(gridBoxes);

}

function isBoardFull(gameBoard) {
  return gameBoard.every(element => typeof element === 'string');
}
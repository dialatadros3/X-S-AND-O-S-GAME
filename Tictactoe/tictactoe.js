const readline = require('readline');

// Create interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to check if a player has won
function checkWinner(board, player) {
  // Check rows, columns, and diagonals
  for (let i = 0; i < 3; i++) {
    if (
      (board[i][0] === player && board[i][1] === player && board[i][2] === player) ||
      (board[0][i] === player && board[1][i] === player && board[2][i] === player)
    ) {
      return true;
    }
  }

  if (
    (board[0][0] === player && board[1][1] === player && board[2][2] === player) ||
    (board[0][2] === player && board[1][1] === player && board[2][0] === player)
  ) {
    return true;
  }

  return false;
}

// Function to check if the board is full (tie)
function isBoardFull(board) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === '') {
        return false;
      }
    }
  }
  return true;
}

// Function to display the current board
function displayBoard(board) {
  for (let i = 0; i < 3; i++) {
    console.log(board[i].join(' | '));
    if (i < 2) {
      console.log('---------');
    }
  }
}

// Function to play the Tic Tac Toe game
function playGame() {
  let currentPlayer = 'X';
  let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];

  function promptMove() {
    rl.question(`Player ${currentPlayer}, enter row (0-2): `, (row) => {
      rl.question(`Player ${currentPlayer}, enter column (0-2): `, (col) => {
        const rowNumber = parseInt(row);
        const colNumber = parseInt(col);
  
        if (
          !isNaN(rowNumber) &&
          !isNaN(colNumber) &&
          rowNumber >= 0 &&
          rowNumber < 3 &&
          colNumber >= 0 &&
          colNumber < 3 &&
          board[rowNumber][colNumber] === ''
        ) {
          board[rowNumber][colNumber] = currentPlayer;
  
          if (checkWinner(board, currentPlayer)) {
            displayBoard(board);
            console.log(`Player ${currentPlayer} wins!`);
            rl.close();
          } else if (isBoardFull(board)) {
            displayBoard(board);
            console.log("It's a tie!");
            rl.close();
          } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            displayBoard(board);
            promptMove();
          }
        } else {
          console.log('Invalid move. Try again.');
          promptMove();
        }
      });
    });
  }

  displayBoard(board);
  promptMove();
}

// Start the game
playGame();

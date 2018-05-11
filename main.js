"use strict";

const startModal = document.getElementById("startGameModal");
const endModal = document.getElementById("endGameModal");
const message = document.getElementById("message");
const closeBtn = document.getElementById("closeBtn");
const startGame = document.getElementById("startGameBtn");
const resetGame = document.getElementById("resetGameBtn");
const modalX = document.getElementById("modalX");
const modalO = document.getElementById("modalO");
const playArea = document.querySelectorAll(".play-area");
const playAgain = document.getElementById("play-again");
const x = "&times;";
const o = "&Omicron;";
let player = "";
let aiChoice;
let aiBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let gameWin = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Resets all variables to start game again.
const reset = () => {
  playArea.forEach((val, i) => playArea[i].innerHTML = "");
  player = "";
  board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  aiBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  gameWin = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
};

// MODAL FUNCTIONS
const startGameModal = () => {
  startModal.style.display = "block";
};

const endGameModal = str => {
  endModal.style.display = "block";
  message.innerText = str;
};

const choseX = () => {
  reset();
  player = x;
  startModal.style.display = "none";
};

const choseO = () => {
  reset();
  player = o;
  startModal.style.display = "none";
};

const clickOutside = e => {
  if (e.target == startModal) {
    startModal.style.display = "none";
  } else if (e.target == endModal) {
    endModal.style.display = "none";
  }
};

const closeModal = () => {
  endModal.style.display = "none";
};

// EVENT LISTENERS
startGame.addEventListener("click", startGameModal);
resetGame.addEventListener("click", reset);
modalX.addEventListener("click", choseX);
modalO.addEventListener("click", choseO);
window.addEventListener("click", clickOutside);
closeBtn.addEventListener("click", closeModal);


// GAME FUNCTIONS
const playGame = () => {
  playArea.forEach((val, i) => {
    playArea[i].addEventListener("click", function() {
      // PLAYER TURN
      if (this.innerHTML == "") {
        this.innerHTML = player;
        // If player is X, replace int in win condition array with X and display the choice on board.
        if (player == x) {
          alterGameWin(board[i], "X");
          console.log(gameWin);
          board[i] = "X";
        }
        if (player == o) {
          alterGameWin(board[i], "O");
          board[i] = "O";
        }
        checkTurnWin();
        // AI TURN
        // filtering out the X or O the player made on board array and making new array for AI to choose from.
        aiBoard = board.filter(val => val != "X" && val != "O");
        //Pick a random available spot for AI to make its move.
        aiChoice = aiBoard[Math.floor(Math.random() * aiBoard.length)];
        // Depending on what player chose, replace int in win condition array and display AI's choice.
        if (player === x) {
          alterGameWin(board[aiChoice], "O");
          board[aiChoice] = "O";
          playArea[aiChoice].innerHTML = o;
        }
        if (player === o) {
          alterGameWin(board[aiChoice], "X");
          board[aiChoice] = "X";
          playArea[aiChoice].innerHTML = x;
        }
        checkTurnWin();
      }
    });
  });
};


const checkTurnWin = () => {
  // Check if an array in gameWin has an X or O then check if they have all X's or all O's. Return true if so.
  const checkWinX = gameWin.some((val, i) => gameWin[i].every((val) => val === "X"));
  const checkWinO = gameWin.some((val, i) => gameWin[i].every((val) => val === "O"));

  if (
    (checkWinO === true && player == o) ||
    (checkWinX === true && player == x)
  ) {
    endGameModal("You won against mindless ai!");
    reset();
  } else if (checkWinO === true || checkWinX === true) {
    endGameModal("You Lose! Seriously?");
    reset();
  } else {
    // Array filtering to X or O and then counting how many to check for draw
    const checkDraw = board.filter((val) => val === "X" || val === "O");
    if (checkDraw.length === 9) {
      endGameModal("Draw!");
      reset();
    }
  }
};

// Loop through 2D win condition array and replace int's with X or O.
const alterGameWin = (num, str) => {
  gameWin.forEach((val, i) => {
    val.map((val, j) => {
      if (gameWin[i][j] == num) {
        gameWin[i][j] = str;
      }
    });
  });
};

playGame();

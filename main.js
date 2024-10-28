const board = document.getElementById("board");

const rows = 8;
const cols = 8;

let selectedPiece = null;

let turn = "white";

function initializeBoard() {

  for (let row = 0; row < rows; row++) {

    for (let col = 0; col < cols; col++) {

      let cell = document.createElement('div');
      cell.classList.add("cell");
      cell.classList.add((row + col) % 2 === 0 ? "white" : "black");

      cell.dataset.row = row;
      cell.dataset.col = col;

      if (row < 3 && (row + col) % 2 !== 0) {
        addPiece(cell, "black")
      }
      else if (row > 4 && (row + col) % 2 !== 0) {
        addPiece(cell, "white");
      }

      cell.addEventListener("click", onCellClick);

      board.appendChild(cell);
    }
  }
}

function onCellClick() {

}

function addPiece(cell, color){
  const piece = document.createElement("div");
  piece.classList.add('piece', color);

  piece.dataset.color = color;
  piece.dataset.king = false;

  cell.appendChild(piece);
}

initializeBoard();
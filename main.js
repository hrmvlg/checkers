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

function addPiece(cell, color) {
  const piece = document.createElement("div");
  piece.classList.add('piece', color);

  piece.dataset.color = color;
  piece.dataset.king = false;

  cell.appendChild(piece);
}

function onCellClick(e) {
  const cell = e.target.closest(".cell");
  if (!cell) return;
  const piece = cell.querySelector(".piece");

  if (selectedPiece) {
    if (canMove(selectedPiece, cell)) {
      movePiece(selectedPiece, cell);
      selectedPiece = null;
    }
    else {
      selectedPiece = null;
    }
  }
  else {
    if (piece && piece.dataset.color === turn) {
      selectedPiece = piece;
    }
  }
}

function canMove(piece, targetCell) {
  const startRow = parseInt(piece.parentElement.dataset.row);
  const startCol = parseInt(piece.parentElement.dataset.col);

  const endRow = parseInt(targetCell.dataset.row);
  const endCol = parseInt(targetCell.dataset.col);

  const direction = piece.dataset.color === "white" ? -1 : 1;

  const isKing = piece.dataset.king === "true";

  if (targetCell.querySelector(".piece")) {
    console.log("клетка занята");
    return false;
  }

  if (!isKing) {
    return canMoveRegular(piece, startRow, startCol, endRow, endCol, direction);
  }
  else {
    return canMoveKing(piece, startRow, startCol, endRow, endCol);
  }
}

function canMoveRegular(piece, startRow, startCol, endRow, endCol, direction) {
  if (Math.abs(endRow - startRow) === 1 &&
    Math.abs(endCol - startCol) === 1 &&
    endRow - startRow === direction
  ) {
    return true;
  }

  if (Math.abs(endRow - startRow) === 2 &&
    Math.abs(endCol - startCol) === 2 &&
    endRow - startRow === 2 * direction
  ) {
    const middleRow = (startRow + endRow) / 2;
    const middleCol = (startCol + endCol) / 2;

    const middleCell = document.querySelector(`.cell[data-row="${middleRow}"][data-col="${middleCol}"]`);
    const middlePiece = middleCell.querySelector(".piece");

    if (middlePiece && middleCell.dataset.color !== piece.dataset.color) {
      return true;
    }
  }
  return false;
}

function movePiece(piece, targetCell) {
  const startRow = parseInt(piece.parentElement.dataset.row);
  const startCol = parseInt(piece.parentElement.dataset.col);

  const endRow = parseInt(targetCell.dataset.row);
  const endCol = parseInt(targetCell.dataset.col);

  if (Math.abs(endRow - startRow) === 2 && Math.abs(endCol - startCol) === 2) {
    const middleRow = (startRow + endRow) / 2;
    const middleCol = (startCol + endCol) / 2;

    const middleCell = document.querySelector(`.cell[data-row="${middleRow}"][data-col="${middleCol}"]`);
    const middlePiece = middleCell.querySelector(".piece");

    if (middlePiece) {
      middleCell.removeChild(middlePiece);
    }
  }

  targetCell.appendChild(piece);

  if((piece.dataset.color === "white" && endRow === 0) || (piece.dataset.color === "black" && endRow === 7)){
    piece.dataset.king = "true";
    piece.classList.add("king");
  }

  turn = turn === "white" ? "black" : "white";
  selectedPiece = null;

  checkGameState();
}

function checkGameState(){
  return true;
}

initializeBoard();
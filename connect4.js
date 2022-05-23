/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  board = []; // reset board in case makeBoard() is called multiple times

  // fill board with HEIGHT number of arrays 
  for (let row = 0; row < HEIGHT; row++){
    board[row] = new Array(WIDTH); // internal arrays have length = WIDTH 
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  const htmlBoard = document.querySelector("#board"); // get HTML item w/ID "board"

  // create table row element where players will click
  const clickableRow = document.createElement("tr"); 
  clickableRow.setAttribute("id", "clickable-row"); // set id to "clickable-row"
  clickableRow.addEventListener("click", handleClick); // event listener for player's clicks

  // fill the clickable row with clickable cells
  for (let columnIndex = 0; columnIndex < WIDTH; columnIndex++) {
    const clickableCell = document.createElement("td"); // create td (cell) element
    clickableCell.setAttribute("id", columnIndex); // set id of cell to column index
    clickableRow.append(clickableCell); // append clickableCell to ClickableRow
  }

  // append clickable row to htmlBoard
  htmlBoard.append(clickableRow);

  // create html board

  // iterate through rows
  for (let rowIndex = 0; rowIndex < HEIGHT; rowIndex++) {
    const row = document.createElement("tr");// create tablerow element 

    //iterate throguh columns
    for (let columnIndex = 0; columnIndex < WIDTH; columnIndex++) {
      const cell = document.createElement("td"); // create cell
      cell.setAttribute("id", `${rowIndex}-${columnIndex}`); // set id to "row-column"
      row.append(cell); // append cell to row
    }

    htmlBoard.append(row); // append row to htmlBoard
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  return 0;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  // switch players
  // TODO: switch currPlayer 1 <-> 2
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();

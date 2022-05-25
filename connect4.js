/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // will be array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  board = []; // reset board in case makeBoard() is called multiple times

  // fill board with HEIGHT number of arrays 
  for (let row = 0; row < HEIGHT; row++){
    board[row] = new Array(WIDTH).fill(null); // internal arrays have length = WIDTH 
                                              // need to init to nulls so we can call 
                                              // every() on rows
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  const htmlBoard = document.querySelector("#board"); // get HTML item w/ID "board"

  const clickableRow = document.createElement("tr"); // create table row element where players will click
  clickableRow.setAttribute("id", "clickable-row"); // set id to "clickable-row"
  clickableRow.addEventListener("click", handleClick); // event listener for player's clicks

  // fill the clickable row with clickable cells
  for (let columnIndex = 0; columnIndex < WIDTH; columnIndex++) {
    const clickableCell = document.createElement("td"); // create td (cell) element
    clickableCell.setAttribute("id", columnIndex); // set id of cell to column index
    clickableRow.append(clickableCell); // append clickableCell to ClickableRow
  }

  htmlBoard.append(clickableRow); // append clickable row to htmlBoard

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
  // extract the column from board using map
  const column = board.map((value) => value[x])

  //iterate backwards through array to find "lowest" empty space
  for (let i = column.length - 1; i >= 0; i--){
    // empty spaces are spaces such that board[x][y] === null
    if (column[i] === null){ 
      return i; // return index of empty space
    }
  }
  return null; // no space was empty so return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(rowIndex, columnIndex) {
  // get correct cell
  const cell = document.getElementById(`${rowIndex}-${columnIndex}`)

  const piece = document.createElement("div"); // create piece
  piece.classList.add("piece"); // add piece class
  piece.classList.add(`p${currPlayer}`); // add class for current player

  cell.append(piece); // append piece to cell
}

/** endGame: announce game end */

function endGame(msg) {
  alert(msg); // make an alert with msg text
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const columnIndex = +evt.target.id; 

  // get next spot in column (if none, ignore click)
  const rowIndex = findSpotForCol(columnIndex);
  // findSpotForCol() returns null if there is no avaiable space
  if (rowIndex === null) {
    return; // return now so we don't change turns
  }

  // place piece in board and add to HTML table
  placeInTable(rowIndex, columnIndex);

  // update in-memory board
  board[rowIndex][columnIndex] = currPlayer; 

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`); // call endgame() to alert() players
  }

  // check for tie

  if( board.every(row => row.every(cell => cell)) ){ // check every cell is not null
                                                     // (cell returns false if null)
    endGame(`Tie!`);
  }

  // switch players
  if(currPlayer === 1){
    currPlayer = 2; // currPlayer was 1 so switch to 2
  }
  else{
    currPlayer = 1; // currPlayer was 2 so switch to 1
  }
  
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    // this checks that all spaces in the potential match are in-bounds and the same player's
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // this loop checks every possible match for every space
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

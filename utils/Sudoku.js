/**
 * Name: Sudoku.js
 * A Sudoku instance class that is used to generate, solve, and manipulate Sudoku boards.
 */
export default class Sudoku {
  // --------------------------------- //
  // ---------- CONSTRUCTOR ---------- //
  // --------------------------------- //
  constructor() {
    // The Main Sudoku Board. Used as a active state of cell values on the board, indexed by row and column.
    this.board = [
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
    ];
    // The Group Keys for the Sudoku Board. Identical index as number in the main board. Used to reference the group of a index.
    // Example;= this.board[0][5] is in group 1 because this.GroupKeys[0][5] = 1
    this.groupKeys = [
      [0, 0, 0, 1, 1, 1, 2, 2, 2],
      [0, 0, 0, 1, 1, 1, 2, 2, 2],
      [0, 0, 0, 1, 1, 1, 2, 2, 2],
      [3, 3, 3, 4, 4, 4, 5, 5, 5],
      [3, 3, 3, 4, 4, 4, 5, 5, 5],
      [3, 3, 3, 4, 4, 4, 5, 5, 5],
      [6, 6, 6, 7, 7, 7, 8, 8, 8],
      [6, 6, 6, 7, 7, 7, 8, 8, 8],
      [6, 6, 6, 7, 7, 7, 8, 8, 8],
    ];
    // The Candidate Keys for the Sudoku Board. Instead of Value, the index returns an array of possible values for the cell.
    this.candidateKeys = [
      [
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
      ],
      [
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
      ],
      [
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
      ],
      [
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
      ],
      [
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
      ],
      [
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
      ],
      [
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
      ],
      [
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
      ],
      [
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
      ],
    ];
  }
  // ----------------------------- //
  // ---------- METHODS ---------- //
  // ----------------------------- //

  // ---- Clear Board ----- //
  clearBoard() {
    this.board = Array.from({ length: 9 }, () =>
      Array.from({ length: 9 }, () => null)
    );
  }

  // ---- Check if number is valid a placement ----- //
  isValid(row, col, num) {
    // Check the row
    for (let cell = 0; cell < 9; cell++) {
      if (this.board[row][cell] === num && cell !== col) {
        console.log(
          `Number ${num} is not valid at row ${row} and col ${col} due to number in the same row at cell ${cell}`
        );
        return false;
      }
    }
    // Check the column
    for (let rows = 0; rows < 9; rows++) {
      if (this.board[rows][col] === num && rows !== row) {
        console.log(
          `Number ${num} is not valid at row ${row} and col ${col} due to number in column at row ${rows} and col ${col}`
        );
        return false;
      }
    }
    // Check the box

    // Calculate the starting point of the 3x3 box
    let startRow = Math.floor(row / 3) * 3;
    let startCol = Math.floor(col / 3) * 3;

    // Check only the 3x3 box
    for (let r = startRow; r < startRow + 3; r++) {
      for (let c = startCol; c < startCol + 3; c++) {
        // Check if the cell is not the one we're trying to fill, and if it contains the same number
        if (r !== row || c !== col) {
          if (this.board[r][c] === num) {
            console.log(
              `Number ${num} is not valid at row ${row} and col ${col} due to number in group at row ${r} and col ${c}`
            );
            return false;
          }
        }
      }
    }
    return true;
  }

  // ---- Check if the board is valid ----- //
  isValidBoard() {
    for (let rows = 0; rows < 9; rows++) {
      for (let cell = 0; cell < 9; cell++) {
        if (this.board[rows][cell] !== 0 && this.board[rows][cell] !== null) {
          if (!this.isValid(rows, cell, this.board[rows][cell])) {
            return false;
          }
        }
      }
    }
    return true;
  }
  // ---- Check if the board is solved ----- //
  isSolved() {
    for (let rows = 0; rows < 9; rows++) {
      for (let cell = 0; cell < 9; cell++) {
        if (
          this.board[rows][cell] == null &&
          this.board[rows][cell] == 0 &&
          !this.isValidBoard()
        ) {
          return false;
        }
      }
    }
    return true;
  }
  // ---- Convert Null to Zero ----- //
  convertToZero() {
    for (let rows = 0; rows < 9; rows++) {
      for (let cell = 0; cell < 9; cell++) {
        if (this.board[rows][cell] === null) {
          this.board[rows][cell] = 0;
        }
      }
    }
  }

  // -- Set Candiate Keys ----- //
  setCandidates() {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        // Reset the candidate keys for the cell if it is empty
        if (this.board[row][col] === 0 || this.board[row][col] === null) {
          this.candidateKeys[row][col] = [];

          for (let num = 1; num <= 9; num++) {
            // Check if the number is a valid candidate
            if (this.isValid(row, col, num)) {
              // Add to the candidate keys for the cell
              this.candidateKeys[row][col].push(num);
              console.log(
                `Number ${num} is a valid candidate at row ${row} and col ${col}`
              );
            }
          }
        }
      }
    }
  }

  // ---- Reset Candiate Keys ----- //
  resetCandidates() {
    for (let rows = 0; rows < this.candidateKeys.length; rows++) {
      for (let cell = 0; cell < 9; cell++) {
        this.candidateKeys[rows][cell] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      }
    }
  }

  // ---- Solving Algorithim ----- //
  solveHelper() {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (this.board[row][col] === 0) {
          const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
          // Shuffle the array of numbers
          const shuffledNumbers = numbers.sort(() => Math.random() - 0.5);

          for (let i = 0; i < shuffledNumbers.length; i++) {
            const num = shuffledNumbers[i];
            if (this.isValid(row, col, num)) {
              this.board[row][col] = num;
              if (this.solveHelper()) {
                return true; // If solveHelper() leads to a solution
              }
              this.board[row][col] = 0; // Backtrack if no solution found
            }
          }
          return false; // Return false if no number fits in the current cell
        }
      }
    }
    return true; // Return true when the entire board is filled correctly
  }
  // --------------------------------- //
  // ------- Solving Methods --------- //
  // --------------------------------- //

  // --------------------------------- //
  // -------Hint Handeling ----------- //
  // --------------------------------- //
  // ---- Remove Random Hints----- //
  removeHints(hints) {
    let removed = 0;
    while (removed < hints) {
      let row = Math.floor(Math.random() * 9);
      let col = Math.floor(Math.random() * 9);
      if (this.board[row][col] !== 0 && this.board[row][col] !== null) {
        this.board[row][col] = null;
        removed++;
        console.log(removed);
      }
    }
    return this.board;
  }

  // ---- Solving Life Cycle----- //
  solve() {
    // Convert null values to 0
    this.convertToZero();
    // main solving function
    this.solveHelper();

    return this.board;
  }
}

let game = new Sudoku();

game.solve();
console.log(game.isValidBoard());
console.log(game.isSolved());
console.log(game.board);

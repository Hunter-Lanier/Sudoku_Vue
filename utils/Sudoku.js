/**
 * Represents a Sudoku solver.
 */
export default class Sudoku {
  /**
   * Creates a new Sudoku solver.
   * @param {number[][]} board - The Sudoku board to solve.
   */

  constructor() {
    this.board = this.generateBoard();
  }
  /**
   * Clear exsisting board while maintaining the same instance
   */
  clearBoard() {
    this.board = this.generateBoard();
  }

  /**
   * Recursive helper function to solve the Sudoku board.
   * @returns {number[][]} - True if the board is solved, false otherwise.
   */
  generateBoard() {
    let board = Array.from({ length: 9 }, () =>
      Array.from({ length: 9 }, () => null)
    );
    return board;
  }

  /**
   * Checks if a number can be placed in a specific position on the Sudoku board.
   * @param {number} row - The row index.
   * @param {number} col - The column index.
   * @param {number} num - The number to check.
   * @returns {boolean} - True if the number can be placed, false otherwise.
   */
  isValid(row, col, num) {
    // Check the row
    for (let i = 0; i < 9; i++) {
      if (i !== col && this.board[row][i] === num) {
        return false;
      }
    }

    // Check the column
    for (let i = 0; i < 9; i++) {
      if (i !== row && this.board[i][col] === num) {
        return false;
      }
    }

    // Check the box
    const startRow = row - (row % 3);
    const startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const checkRow = startRow + i;
        const checkCol = startCol + j;
        if (
          (checkRow !== row || checkCol !== col) &&
          this.board[checkRow][checkCol] === num
        ) {
          return false;
        }
      }
    }
    return true;
  }
  /**
   * Checks if a entire board is in a valid state.
   * @returns {boolean} - true if the entire board is in a valid state, false otherwise.
   */
  isValidBoard() {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (this.board[row][col] !== 0) {
          if (!this.isValid(row, col, this.board[row][col])) {
            return false;
          }
        }
      }
    }
    return true;
  }
  /**
   * Checks if the board is solved.
   * @returns {number[][]} - The Sudoku Board
   */
  isSolved() {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (
          this.board[row][col] == null ||
          null ||
          !this.isValid(row, col, this.board[row][col])
        ) {
          return false;
        }
      }
    }
    return true;
  }
  /**
   * Converts all Null values to 0 for Computation
   * @returns {number[][]} - The board with null converted to zeros.
   */
  convertToZero() {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (this.board[i][j] === null) {
          this.board[i][j] = 0;
        }
      }
    }
  }

  /**
   * Recursive helper function to solve the Sudoku board.
   * @returns {boolean} - True if the board is solved, false otherwise.
   */
  solveHelper() {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (this.board[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (this.isValid(row, col, num)) {
              this.board[row][col] = num;
              if (this.solveHelper(this.board)) {
                return true;
              }
              this.board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Solves the Sudoku board. Combination of the solveHelper and lifecycle methods.
   * @param {number[][]} board - The Sudoku board to solve.
   * @returns {number[][]} - The solved Sudoku board.
   */
  solve() {
    // Convert null values to 0
    this.convertToZero();
    // main solving function
    this.solveHelper();

    return this.board;
  }
  /**
   * Removes hints from the Sudoku board.
   * @param {number} hints - The number of hints to remove.
   * @returns {number[][]} - The Sudoku board with hints.
   */
  removeHints(hints) {
    let removed = 0;
    while (removed < hints) {
      let row = Math.floor(Math.random() * 9);
      let col = Math.floor(Math.random() * 9);
      if (this.board[row][col] !== 0) {
        this.board[row][col] = null;
        removed++;
      }
    }
    return this.board;
  }

  /**
   * Swaps rows within a band of the Sudoku grid.
   */
  swapRowsWithinBand() {
    for (let band = 0; band < 9; band += 3) {
      let row1 = band + Math.floor(Math.random() * 3);
      let row2 = band + Math.floor(Math.random() * 3);
      this.swapRows(row1, row2);
    }
  }
  /**
   * Swaps columns within a stack of the Sudoku grid.
   */
  swapColumnsWithinStack() {
    for (let stack = 0; stack < 9; stack += 3) {
      let col1 = stack + Math.floor(Math.random() * 3);
      let col2 = stack + Math.floor(Math.random() * 3);
      this.swapColumns(col1, col2);
    }
  }
  /**
   * Applies a random rotation to the Sudoku grid.
   */
  applyRandomRotation() {
    const rotations = Math.floor(Math.random() * 4); // 0 to 3 rotations
    for (let i = 0; i < rotations; i++) {
      this.board = this.rotateboard();
    }
  }
  /**
   * Applies a random reflection to the Sudoku grid.
   */
  applyRandomReflection() {
    if (Math.random() < 0.5) {
      this.board = this.reflectboardVertically();
    } else {
      this.board = this.reflectboardHorizontally();
    }
  }
  /**
   * Relabels the numbers in the Sudoku grid.
   */
  relabelNumbers() {
    const newLabels = [...Array(9).keys()]
      .map((i) => i + 1)
      .sort(() => Math.random() - 0.5);
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        this.board[row][col] = newLabels[this.board[row][col] - 1];
      }
    }
  }
  /**
   * Swaps one Row with another
   * @param {*} row1
   * @param {*} row2
   */
  swapRows(row1, row2) {
    [this.board[row1], this.board[row2]] = [this.board[row2], this.board[row1]];
  }

  /**
   * Swaps one Column with another
   * @param {*} col1
   * @param {*} col2
   */
  swapColumns(col1, col2) {
    for (let row = 0; row < 9; row++) {
      [this.board[row][col1], this.board[row][col2]] = [
        this.board[row][col2],
        this.board[row][col1],
      ];
    }
  }
  /**
   * Rotates the board 90 degrees
   * @returns {number[][]} - The rotated Sudoku board.
   */
  rotateboard() {
    return this.board[0].map((val, index) =>
      this.board.map((row) => row[index]).reverse()
    );
  }
  /**
   * Reflects the board vertically
   * @returns {number[][]} - The reflected Sudoku board.
   */
  reflectboardVertically() {
    return this.board.map((row) => row.slice().reverse());
  }
  /**
   * Reflects the board horizontally
   * @returns {number[][]} - The reflected Sudoku board.
   */
  reflectboardHorizontally() {
    return this.board.slice().reverse();
  }

  /**
   * Randomizes the Sudoku board.
   * @returns {number[][]} - The randomized Sudoku board.
   */
  randomizeBoard() {
    this.swapRowsWithinBand();
    this.swapColumnsWithinStack();
    this.applyRandomRotation();
    this.applyRandomReflection();
    this.relabelNumbers();
    return this.board;
  }
}

/**
***   Usage example   ***
SudokuBoard = new Sudoku();
sudokuBoard.solve();
sudokuBoard.randomizeboard();

console.log(sudokuBoard);
*/

<template>
  <div>
    <div
      class="grid-container"
      v-for="(row, rowIndex) in sudokuBoard"
      :key="rowIndex"
    >
      <input
        v-for="(cell, cellIndex) in row"
        :key="cellIndex"
        v-model="sudokuBoard[rowIndex][cellIndex]"
        :class="[
          'grid-cell w-16 h-16 text-center text-2xl font-bold bg-gray outline outline-1 text',
          cellClass(rowIndex, cellIndex),
        ]"
        type="number"
        min="1"
        max="9"
      />
    </div>
    <div class="mt-5 flex justify-around align-middle">
      <button class="" @click="submitBoard">Submit</button>
      <button class="" @click="clearBoard">Clear</button>
      <button class="" @click="testBoard">Test</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sudokuBoard: Array.from({ length: 9 }, () => Array(9).fill("")),
      solvedBoard: Array.from({ length: 9 }, () => Array(9).fill("")),
    };
  },
  methods: {
    submitBoard() {
      const solve = (board) => {
        for (let row = 0; row < 9; row++) {
          for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
              // Find an empty cell
              for (let num = 1; num <= 9; num++) {
                if (this.isValid(board, row, col, num)) {
                  board[row][col] = num;
                  if (solve(board)) return true;
                  board[row][col] = 0; // Backtrack
                }
              }
              return false;
            }
          }
        }
        return true;
      };

      solve(this.sudokuBoard);
      this.solvedBoard = JSON.parse(JSON.stringify(this.sudokuBoard));
    },
    isValid(board, row, col, num) {
      // Check the row
      for (let i = 0; i < 9; i++) {
        if (board[row][i] === num) {
          return false;
        }
      }

      // Check the column
      for (let i = 0; i < 9; i++) {
        if (board[i][col] === num) {
          return false;
        }
      }

      // Check the box
      let startRow = row - (row % 3);
      let startCol = col - (col % 3);
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i + startRow][j + startCol] === num) {
            return false;
          }
        }
      }

      return true;
    },
    cellClass(rowIndex, cellIndex) {
      let classes = "";
      if (rowIndex % 3 === 0) classes += " border-t-2";
      if (cellIndex % 3 === 0) classes += " border-l-2";
      if ((rowIndex + 1) % 3 === 0) classes += " border-b-2";
      if ((cellIndex + 1) % 3 === 0) classes += " border-r-2";
      return classes;
    },
    testBoard() {
      this.sudokuBoard = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [7, 0, 0, 0, 0, 0, 0, 0, 0],
        [5, 0, 0, 0, 0, 0, 0, 0, 0],
        [9, 0, 0, 0, 0, 0, 0, 0, 0],
        [6, 0, 0, 0, 0, 0, 0, 0, 0],
        [8, 0, 0, 0, 0, 0, 0, 0, 0],
        [4, 0, 0, 0, 0, 0, 0, 0, 0],
        [3, 0, 0, 0, 0, 0, 0, 0, 0],
        [2, 0, 0, 0, 0, 0, 0, 0, 0],
      ];
    },
    clearBoard() {
      this.sudokuBoard = Array.from({ length: 9 }, () => Array(9).fill(""));
      this.solvedBoard = Array.from({ length: 9 }, () => Array(9).fill(""));
    },
  },
};
</script>

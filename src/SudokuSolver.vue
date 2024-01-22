<script>
import Sudoku from "../utils/Sudoku.js";
export default {
  /**
   * The data object for the SudokuSolver component.
   * @name data
   * @returns {object} The initial data object.
   */
  data() {
    return {
      /**
       * The Timer object for tracking elapsed time.
       * @name Timer
       * @type {object}
       * @property {number} elapsedMinutes - The number of elapsed minutes.
       * @property {number} elapsedSeconds - The number of elapsed seconds.
       * @property {bool} timerActive - The status of the timer.
       * @property {number} timerInterval - The interval for the timer.
       */
      Timer: {
        elapsedMinutes: 0,
        elapsedSeconds: 0,
        timerInterval: null,
      },
      /**
       * The selected number for placing in the Sudoku grid.
       * @name selectedNumber
       * @type {number|null}
       * @default null
       * @range 1-9 || null
       *
       */
      selectedNumber: null,
      /**
       * The Sudoku object for solving and managing the Sudoku grid.
       * @name Sudoku
       * @type {Sudoku}
       * @see {@link ../utils/Sudoku.js}
       * @example const sudoku = new Sudoku();
       */
      Sudoku: new Sudoku(),
      invalidBoardFound: false,
      // 9x 9 grid
      invalidCells: Array(9).fill(Array(9).fill(false)),
      startingGrid: null,
      isSolved: false,
    };
  },
  methods: {
    resetGame() {
      // Reset Timer
      this.clearTimer();
      this.startTimer();
      // Reset invalid cells
      this.invalidCells = this.invalidCells.map((row) =>
        row.map((cell) => false)
      );
      // Reset Solved status
      this.isSolved = false;

      // Map the starting grid to the current board
      if (this.startingGrid) {
        this.Sudoku.board = this.startingGrid.map((row) => row.slice());
      } else {
        this.Sudoku.clearBoard();
      }
    },
    startGame() {
      // Reset Timer
      this.clearTimer();
      // Reset invalid cells
      this.invalidCells = this.invalidCells.map((row) =>
        row.map((cell) => false)
      );
      // Reset Solved status
      this.isSolved = false;
      // clear board
      this.Sudoku.clearBoard();
      // generate new board
      this.Sudoku.solve();
      // Remove some numbers
      this.Sudoku.removeHints(40);

      this.Sudoku.setCandidates();
      // Save the starting grid
      this.startingGrid = this.Sudoku.board.map((row) => row.slice());
      // Start Timer
      this.startTimer();
    },
    solveGame() {
      // create reference to the current Sudoku instance
      let tempSudoku = new Sudoku();
      // Make a copy of the current board
      tempSudoku.board = this.Sudoku.board.map((row) => row.slice());
      // convert Null to zero
      tempSudoku.convertToZero();
      // Check if the board is valid
      if (tempSudoku.isValidBoard()) {
        this.Sudoku.solve();
        this.isSolved = true;
        // empty temporary instance
        tempSudoku = null;
      } else {
        this.invalidBoardFound = true;
        setTimeout(() => {
          this.invalidBoardFound = false;
        }, 1000);
      }
    },
    selectNumber(n) {
      this.selectedNumber = n;
    },
    updateCell(row, col) {
      this.Sudoku.board[row][col] = this.selectedNumber;
      if (
        this.Sudoku.isValid(row, col, this.selectedNumber) ||
        this.selectedNumber === null
      ) {
        this.invalidCells[row][col] = false;
      } else {
        this.invalidCells[row][col] = true;
      }
      // check if the board is solved
      if (this.Sudoku.isSolved()) {
        this.clearTimer();
        this.isSolved = true;
      } else {
        this.isSolved = false;
      }
      // update candidates
      this.Sudoku.setCandidates();
    },
    startTimer() {
      this.Timer.timerInterval = setInterval(() => {
        if (this.Timer.elapsedSeconds < 59) {
          this.Timer.elapsedSeconds++;
        } else {
          this.Timer.elapsedMinutes++;
          this.Timer.elapsedSeconds = 0;
        }
      }, 1000);
    },
    clearTimer() {
      if (this.Timer.timerInterval) {
        clearInterval(this.Timer.timerInterval);
        this.Timer.timerInterval = null;
        this.Timer.elapsedMinutes = 0;
        this.Timer.elapsedSeconds = 0;
      }
    },
  },
};
</script>
<template>
  <!-- App Container -->
  <div class="flex flex-col items-center justify-around">
    <!-- Header -->
    <h1 class="text-center border">Sudoku Solver</h1>
    <!-- Solved Alert-->
    <span
      class="text-center border"
      :class="{
        'text-bold animate-bounce': isSolved,
        invisible: !isSolved,
      }"
      >You did it!</span
    >
    <!-- Timer-->
    <span class="flex justify-center"
      >Timer:{{ Timer.elapsedMinutes < 10 ? "0" : ""
      }}{{ Timer.elapsedMinutes < 10 ? "0" : "" }}:{{
        Timer.elapsedSeconds < 10 ? "0" : ""
      }}{{ Timer.elapsedSeconds }}</span
    >
    <!-- Sudoku Board -->
    <div
      class="grid aspect-square w-11/12"
      :class="{
        'animate-[wiggle_1s_ease-in-out_infinite]': this.invalidBoardFound,
        'animate-none': !this.invalidBoardFound,
        'border-green-500': this.isSolved,
        'border-white': !this.isSolved,
      }"
    >
      <!--Rows of Board-->
      <div
        v-for="(row, j) in Sudoku.board"
        :key="j"
        class="grid grid-cols-9 grid-rows-1 border border-black"
      >
        <!--Cells of Board-->
        <div
          v-for="(cell, i) in row"
          :key="i"
          @click="updateCell(j, i)"
          class="flex justify-center items-center text-center border border-black aspect-square"
        >
          <!-- Possibility Grid-->
          <div
            class="grid grid-cols-3 grid-rows-3 justify-around items-center h-full w-full aspect-square relative"
          >
            <span
              class="font-extralight text-fit"
              v-for="item in this.Sudoku.candidateKeys[j][i]"
              :class="{
                invisible: cell !== null,
              }"
              >{{ item }}</span
            >
          </div>
          <!-- Cell Value -->
          <span
            class="absolute font-bold text-xsm"
            :class="{
              'bg-red-500': invalidCells[j][i],
              'bg-none': !invalidCells[j][i],
            }"
          >
            {{ cell }}
          </span>
        </div>
      </div>
    </div>
    <!-- Number Selection -->
    <div class="flex justify-between border gap-5">
      <!-- 1..9 Selection-->
      <button v-for="n in 9" @click="selectNumber(n)" :key="n" class="flex">
        {{ n }}
      </button>
      <!-- Clear Selection -->
      <button @click="selectNumber(null)" class="flex">X</button>
    </div>
    <!-- Game Buttons -->
    <div class="flex gap-5">
      <button @click="solveGame" class="flex">Solve</button>
      <button @click="startGame" class="flex">New Game</button>
      <button @click="resetGame" class="flex">Reset</button>
      <button @click="this.Sudoku.setCandidates()" class="flex">
        Candidates
      </button>
    </div>
  </div>
</template>

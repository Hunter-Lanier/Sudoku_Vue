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
      // Randomize the board
      this.Sudoku.randomizeBoard();
      // Remove some numbers
      this.Sudoku.removeHints(40);
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
  <div class="flex flex-col justify-center items-center max-h-screen">
    <span
      :class="{
        'text-5xl text-bold animate-bounce': isSolved,
        invisible: !isSolved,
      }"
      >You did it!</span
    >
    <div class="m-5">
      <span class="text-2xl text-white-300 font-semibold"
        >Timer:{{ Timer.elapsedMinutes < 10 ? "0" : ""
        }}{{ Timer.elapsedMinutes < 10 ? "0" : "" }}:{{
          Timer.elapsedSeconds < 10 ? "0" : ""
        }}{{ Timer.elapsedSeconds }}</span
      >
    </div>
    <div
      class="board border-2 border-white shadow-none w-11/12 h-11/12 grid grid-cols-3 grid-rows-3 grid-flow-row aspect-square box-border transition-all ease-in-out duration-300 transform"
      :class="{
        'animate-[wiggle_1s_ease-in-out_infinite]': this.invalidBoardFound,
        'animate-none': !this.invalidBoardFound,
        'border-green-500': this.isSolved,
        'border-white': !this.isSolved,
      }"
    >
      <div
        v-for="(row, j) in Sudoku.board"
        :key="j"
        class="group border-2 shadow-none border-white grid grid-cols-3 grid-rows-3 h-full w-full"
      >
        <div
          v-for="(cell, i) in row"
          :key="i"
          @click="updateCell(j, i)"
          :class="{
            'flex cell border border-white shadow-none h-full w-full items-center justify-center align-middle relative': true,
            'bg-red-500': invalidCells[j][i],
            'bg-none': !invalidCells[j][i],
          }"
        >
          <span
            class="flex h-full w-full bg-transparent p-0 m-0 leading-normal text-white focus:outline-none focus:ring-0 justify-center items-center text-3xl text-center read-only:cursor-default"
          >
            {{ cell }}
          </span>
        </div>
      </div>
    </div>
    <div class="flex w-full mt-5 justify-around">
      <button
        v-for="n in 9"
        @click="selectNumber(n)"
        :key="n"
        class="p-0 m-0 bg-transparent text-4xl text-white-300 font-bold hover:text-blue-300 focus:text-blue-400 ease-in-out focus:scale-125 rounded-full"
      >
        {{ n }}
      </button>
      <button
        @click="selectNumber(null)"
        class="p-0 m-0 bg-transparent text-4xl text-white-300 font-bold hover:text-blue-300 focus:text-blue-400 ease-in-out focus:scale-125 rounded-full"
      >
        X
      </button>
    </div>
    <div class="mt-4 w-full flex justify-around">
      <button
        @click="solveGame"
        class="p-0 m-0 bg-transparent text-2xl text-white-300 font-bold hover:text-blue-300 active:text-blue-400 ease-in-out hover:scale-125 rounded-full"
      >
        Solve
      </button>
      <button
        @click="startGame"
        class="p-0 m-0 bg-transparent text-2xl text-white-300 font-bold hover:text-blue-300 active:text-blue-400 ease-in-out hover:scale-125 rounded-full"
      >
        New Game
      </button>
      <button
        @click="resetGame"
        class="p-0 m-0 bg-transparent text-2xl text-white-300 font-bold hover:text-blue-300 active:text-blue-400 ease-in-out hover:scale-125 rounded-full"
      >
        Reset
      </button>
    </div>
  </div>
</template>

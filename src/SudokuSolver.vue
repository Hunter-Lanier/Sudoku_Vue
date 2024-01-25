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
      candidateToggle: false,
      difficulty: "Easy",
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
        // stop the timer
      }
      clearInterval(this.Timer.timerInterval);
    },
    selectNumber(n) {
      this.selectedNumber = n;
    },
    updateCell(row, col) {
      if (this.invalidCells[row][col]) {
        this.selectedNumber = null;
      }
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
        // stop the timer
        clearInterval(this.Timer.timerInterval);
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
  <div class="flex flex-col text-center gap-4">
    <!-- Solved Alert-->
    <transition v-if="isSolved">
      <span class="text-center text-3xl text-green-500 text-bold animate-bounce"
        >You did it!</span
      >
    </transition>
    <!-- Header -->
    <div class="flex flex-row text-lg items-center justify-between">
      <span>Difficulty:{{ this.difficulty }}</span>
      <!-- Logo-->
      <h1 class="text-lg">Sudok<span class="text-green-500">V</span>ue</h1>
      <!--TImer-->
      <span
        :class="{ 'text-green-500': this.isSolved }"
        class="flex justify-center text-lg h-fit"
        >Timer:{{ Timer.elapsedMinutes < 10 ? "0" : ""
        }}{{ Timer.elapsedMinutes }}:{{ Timer.elapsedSeconds < 10 ? "0" : ""
        }}{{ Timer.elapsedSeconds }}</span
      >
    </div>
    <!-- Timer-->

    <!-- Board Wrapper-->
    <div class="">
      <!-- Cosmetic Board -->
      <div class=""></div>
      <div
        class="grid aspect-square w-screen grid-cols-3 grid-rows-3 border border-black absolute box-border"
      >
        <div
          v-for="item in 9"
          class="grid grid-cols-3 grid-rows-3 border border-black"
        >
          <div
            v-for="item in 9"
            class="flex justify-center items-center text-center border border-black"
          ></div>
        </div>
      </div>
      <!-- Sudoku Board -->
      <div
        class="grid aspect-square w-screen"
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
          class="grid grid-cols-9 grid-rows-1"
        >
          <!--Cells of Board-->
          <div
            v-for="(cell, i) in row"
            :key="i"
            @click="updateCell(j, i)"
            class="flex justify-center items-center text-center aspect-square"
            :class="{
              'bg-red-500': invalidCells[j][i],
              'bg-none': !invalidCells[j][i],
            }"
          >
            <!-- Possibility Grid-->
            <div
              class="grid grid-cols-3 grid-rows-3 justify-around items-center h-full w-full aspect-square relative"
            >
              <span
                class="font-extralight text-fit"
                v-for="item in candidateToggle
                  ? this.Sudoku.candidateKeys[j][i]
                  : []"
                :class="{
                  invisible: cell !== null,
                }"
                >{{ item }}</span
              >
            </div>
            <!-- Cell Value -->
            <span class="absolute font-bold text-3xl">
              {{ cell }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- Number Selection -->
    <div class="flex justify-around mt-3 w-screen">
      <!-- 1..9 Selection-->
      <button
        v-for="n in 9"
        @click="selectNumber(n)"
        :key="n"
        class="flex text-5xl hover:text-blue-500 focus:text-blue-500 hover:text-6xl"
      >
        {{ n }}
      </button>
      <!-----------------Dashboard------------------->
    </div>

    <!-- Game Buttons -->
    <div class="grid grid-cols-3 mt-3 w-screen h-fit items-center gap-5">
      <!-- Clear Selection -->
      <button
        @click="selectNumber(null)"
        class="flex text-3xl border justify-center hover:text-blue-500 focus:text-blue-500"
      >
        <i class="flex flex-col fa-solid fa-eraser"
          ><span class="font-normal font-sans text-sm">Erase</span></i
        >
      </button>
      <button
        @click="solveGame"
        class="flex text-3xl border justify-center hover:text-blue-500 focus:text-blue-500"
      >
        <i class="flex flex-col fa-solid fa-robot"
          ><span class="font-normal font-sans text-sm">Auto Solve</span></i
        >
      </button>
      <button
        @click="startGame"
        class="flex text-3xl border justify-center hover:text-blue-500 focus:text-blue-500"
      >
        <i class="fa-solid fa-play flex flex-col"
          ><span class="font-normal font-sans text-sm">New Game</span></i
        >
      </button>
      <button
        @click="resetGame"
        class="flex text-3xl border justify-center hover:text-blue-500 focus:text-blue-500"
      >
        <i class="fa-solid fa-rotate-left flex flex-col"
          ><span class="font-normal font-sans text-sm">Reset</span></i
        >
      </button>
      <button
        @click="Sudoku.clearBoard()"
        class="flex text-3xl border justify-center hover:text-blue-500 focus:text-blue-500"
      >
        <i class="fa-solid fa-trash-can flex flex-col"
          ><span class="font-normal font-sans text-sm">Clear Board</span></i
        >
      </button>
      <button
        class="flex text-3xl border justify-center hover:text-blue-500 focus:text-blue-500"
      >
        <i class="fa-solid fa-pen-to-square flex flex-col"
          ><span class="font-normal font-sans text-sm">Notes</span></i
        >
      </button>
      <!--
      <button
        @click="this.candidateToggle = !this.candidateToggle"
        class="hover:text-blue-500 focus:text-blue-500"
      >
        Auto Candidates
      </button>
      -->
    </div>
  </div>
</template>

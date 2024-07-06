<script>
import Sudoku from "../utils/Sudoku.js";
export default {
  data() {
    return {
      Timer: {
        elapsedMinutes: 0,
        elapsedSeconds: 0,
        timerInterval: null,
      },
      selectedNumber: null,
      Sudoku: new Sudoku(),
      invalidBoardFound: false,
      invalidCells: Array(9).fill(Array(9).fill(false)),
      startingGrid: null,
      isSolved: false,
      candidateToggle: false,
      difficulty: "Easy",
    };
  },
  methods: {
    resetGame() {
      this.clearTimer();
      this.startTimer();
      this.invalidCells = this.invalidCells.map((row) => row.map(() => false));
      this.isSolved = false;

      if (this.startingGrid) {
        this.Sudoku.board = this.startingGrid.map((row) => row.slice());
      } else {
        this.Sudoku.clearBoard();
      }
    },
    startGame() {
      this.clearTimer();
      this.invalidCells = this.invalidCells.map((row) => row.map(() => false));
      this.isSolved = false;
      this.Sudoku.clearBoard();
      this.Sudoku.solve();
      this.Sudoku.removeHints(40);
      this.Sudoku.setCandidates();
      this.startingGrid = this.Sudoku.board.map((row) => row.slice());
      this.startTimer();
    },
    solveGame() {
      let tempSudoku = new Sudoku();
      tempSudoku.board = this.Sudoku.board.map((row) => row.slice());
      tempSudoku.convertToZero();

      if (tempSudoku.isValidBoard()) {
        this.Sudoku.solve();
        this.isSolved = true;
      } else {
        this.invalidBoardFound = true;
        setTimeout(() => {
          this.invalidBoardFound = false;
        }, 1000);
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
      this.invalidCells[row][col] = !this.Sudoku.isValid(row, col, this.selectedNumber) && this.selectedNumber !== null;

      if (this.Sudoku.isSolved()) {
        clearInterval(this.Timer.timerInterval);
        this.isSolved = true;
      } else {
        this.isSolved = false;
      }

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
  <div class="flex flex-col min-h-screen bg-gray-100 p-4">
    <div class="flex flex-row text-lg items-center justify-between bg-green-700 text-white p-4 rounded-md shadow-md">
      <span>Difficulty: {{ difficulty }}</span>
      <h1 class="text-lg">Sudok<span class="text-green-300">V</span>ue</h1>
      <span :class="{ 'text-green-300': isSolved }" class="flex justify-center text-lg h-fit">
        Timer: {{ Timer.elapsedMinutes < 10 ? "0" : "" }}{{ Timer.elapsedMinutes }}:{{ Timer.elapsedSeconds < 10 ? "0"
          : "" }}{{ Timer.elapsedSeconds }} </span>
    </div>

    <div class="flex flex-col lg:flex-row flex-grow mt-4 items-center justify-center gap-4">
      <div class="relative flex-grow w-full lg:w-auto max-w-screen-sm flex items-center justify-center">
        <div class="absolute inset-0 grid grid-cols-3 grid-rows-3 border border-black opacity-20">
          <div v-for="rowItem in 9" :key="rowItem" class="grid grid-cols-3 grid-rows-3 border border-black">
            <div v-for="colItem in 9" :key="colItem" class="border border-black"></div>
          </div>
        </div>
        <div class="grid w-full aspect-square border-2 border-black rounded-lg shadow-lg" :class="{
          'animate-[wiggle_1s_ease-in-out_infinite]': invalidBoardFound,
          'border-green-500': isSolved,
          'border-white': !isSolved
        }">
          <div v-for="(row, j) in Sudoku.board" :key="j" class="grid grid-cols-9 grid-rows-1">
            <div v-for="(cell, i) in row" :key="i" @click="updateCell(j, i)"
              class="flex justify-center items-center text-center aspect-square cursor-pointer transition-colors"
              :class="{
                'bg-red-300': invalidCells[j][i],
                'bg-white': !invalidCells[j][i],
                'hover:bg-gray-200': true
              }">
              <div class="grid grid-cols-3 grid-rows-3 justify-around items-center h-full w-full relative">
                <span class="font-extralight text-xs" v-for="item in candidateToggle ? Sudoku.candidateKeys[j][i] : []"
                  :key="item" :class="{ 'invisible': cell !== null }">
                  {{ item }}
                </span>
              </div>
              <span class="absolute font-bold text-2xl">{{ cell }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-4 w-full lg:w-auto lg:max-w-xs">
        <transition>
          <span v-if="isSolved" class="text-center text-3xl text-green-600 font-bold animate-bounce">You did it!</span>
        </transition>

        <div
          class=" gap-0.5 sm:gap-0.5 lg:gap-4 w-full sm:grid-cols-3 lg:grid-cols-3 lg:w-auto flex flex-wrap justify-center">
          <button v-for="n in 9" @click="selectNumber(n)" :key="n"
            class="text-3xl hover:text-blue-500 focus:text-blue-500 transition-transform transform hover:scale-110 w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20">
            {{ n }}
          </button>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <button @click="selectNumber(null)"
            class="flex items-center justify-center text-xl p-2 bg-white border rounded-md shadow-sm hover:bg-blue-100 focus:bg-blue-100">
            <i class="fa-solid fa-eraser"></i>
            <span class="ml-2">Erase</span>
          </button>
          <button @click="solveGame"
            class="flex items-center justify-center text-xl p-2 bg-white border rounded-md shadow-sm hover:bg-blue-100 focus:bg-blue-100">
            <i class="fa-solid fa-robot"></i>
            <span class="ml-2">Auto Solve</span>
          </button>
          <button @click="startGame"
            class="flex items-center justify-center text-xl p-2 bg-white border rounded-md shadow-sm hover:bg-blue-100 focus:bg-blue-100">
            <i class="fa-solid fa-play"></i>
            <span class="ml-2">New Game</span>
          </button>
          <button @click="resetGame"
            class="flex items-center justify-center text-xl p-2 bg-white border rounded-md shadow-sm hover:bg-blue-100 focus:bg-blue-100">
            <i class="fa-solid fa-rotate-left"></i>
            <span class="ml-2">Reset</span>
          </button>
          <button @click="Sudoku.clearBoard()"
            class="flex items-center justify-center text-xl p-2 bg-white border rounded-md shadow-sm hover:bg-blue-100 focus:bg-blue-100">
            <i class="fa-solid fa-trash-can"></i>
            <span class="ml-2">Clear Board</span>
          </button>
          <button
            class="flex items-center justify-center text-xl p-2 bg-white border rounded-md shadow-sm hover:bg-blue-100 focus:bg-blue-100">
            <i class="fa-solid fa-pen-to-square"></i>
            <span class="ml-2">Notes</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

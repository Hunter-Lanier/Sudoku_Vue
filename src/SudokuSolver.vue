<script>

import Sudoku from "../utils/Sudoku.js";
export default {
  components: {

  },
  data() {
    return {
      Timer: {
        elapsedMinutes: 0,
        elapsedSeconds: 0,
      },
      timerInterval: null,
      selectedNumber: null,
      Sudoku: new Sudoku(),
    };
  },
  methods: {
    resetGame() {
      // Timer Handeling

      // Reset Timer
      clearInterval(this.timerInterval);
      this.timerInterval = null;
      this.Timer.elapsedMinutes = 0;
      this.Timer.elapsedSeconds = 0;
    },
    startGame() {
      // Timer Handeling

      // Clear Interval if it exists
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
      }
      // Reset Timer
      this.Timer.elapsedMinutes = 0;
      this.Timer.elapsedSeconds = 0;
      // Start Timer
      this.timerInterval = setInterval(() => {
        this.Timer.elapsedSeconds++;
        if (this.Timer.elapsedSeconds === 60) {
          this.Timer.elapsedMinutes++;
          this.Timer.elapsedSeconds = 0;
        }
      }, 1000);

      // clear board
      this.Sudoku.clearBoard();
      // generate new board
      this.Sudoku.solve();
      // Randomize the board
      this.Sudoku.randomizeBoard();
      // Remove some numbers
      this.Sudoku.removeHints(100);
    },
    selectNumber(n) {
      this.selectedNumber = n;
    },
    updateCell(row, col) {
      this.Sudoku.board[row][col] = this.selectedNumber;
    },
  },
};
</script>
<template>
  <div class="flex flex-col justify-center items-center max-h-screen">
    <div class="m-5">
      <span class="text-2xl text-white-300 font-semibold"
        >Timer:{{ Timer.elapsedMinutes < 10 ? "0" : ""
        }}{{ Timer.elapsedMinutes < 10 ? "0" : "" }}:{{
          Timer.elapsedSeconds < 10 ? "0" : ""
        }}{{ Timer.elapsedSeconds }}</span
      >
    </div>
    <div
      class="board border-2 border-white shadow-none w-11/12 h-11/12 grid grid-cols-3 grid-rows-3 grid-flow-row aspect-square box-border"
    >
      <div
        v-for="(row, j) in Sudoku.board"
        :key="j"
        class="group border-2 shadow-none border-white grid grid-cols-3 grid-rows-3 h-full w-full"
      >
        <div
          v-for="(cell, i) in row"
          :key="i"
          @click="this.Sudoku.board[j][i] = selectedNumber"
          class="flex cell border border-white shadow-none h-full w-full items-center justify-center align-middle relative"
        >
          <span
            class="flex h-full w-full bg-transparent p-0 m-0 leading-normal text-white focus:outline-none focus:ring-0 justify-center items-center text-3xl text-center read-only:cursor-default"
          >
            {{ cell }}</span
          >
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
        @click="Sudoku.solve"
        class="p-0 m-0 bg-transparent text-2xl text-white-300 font-bold hover:text-blue-300 active:text-blue-400 ease-in-out hover:scale-125 rounded-full"
      >
        Solve
      </button>
      <button
        @click="Sudoku.clearBoard"
        class="p-0 m-0 bg-transparent text-2xl text-white-300 font-bold hover:text-blue-300 active:text-blue-400 ease-in-out hover:scale-125 rounded-full"
      >
        Reset
      </button>
      <button
        @click="startGame"
        class="p-0 m-0 bg-transparent text-2xl text-white-300 font-bold hover:text-blue-300 active:text-blue-400 ease-in-out hover:scale-125 rounded-full"
      >
        New Game
      </button>
    </div>
  </div>
</template>

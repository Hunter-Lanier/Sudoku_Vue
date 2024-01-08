<template>
  <div class="flex justify-center">
    <div
      v-for="(row, rowIndex) in sudokuBoard"
      :key="rowIndex"
      class="grid-row flex justify-between bg-slate-50 h-62 w-60"
    >
      <input
        v-for="(cell, cellIndex) in row"
        :key="cellIndex"
        v-model="sudokuBoard[rowIndex][cellIndex]"
        type="number"
        min="1"
        max="9"
      />
    </div>
    <button @click="submitBoard">Submit</button>
    <button @click="clearBoard">Clear</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sudokuBoard: Array.from({ length: 9 }, () => Array(9).fill("")),
    };
  },
  methods: {
    submitBoard() {
      // Process or validate the Sudoku board here
      console.log(this.sudokuBoard);
    },
    clearBoard() {
      this.sudokuBoard = Array.from({ length: 9 }, () => Array(9).fill(""));
    },
    // Additional Sudoku methods...
  },
};
</script>

<style>
sudokuBoard {
}
</style>

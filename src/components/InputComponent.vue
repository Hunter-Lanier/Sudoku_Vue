<template>
  <div class="flex w-full mt-5 justify-around">
    <button
      v-for="n in 9"
      :key="n"
      @click="setCurrentNumber(n)"
      class="p-0 m-0 bg-transparent text-4xl text-white-300 font-bold hover:text-blue-300 focus:text-blue-400 ease-in-out focus:scale-125 rounded-full"
    >
      {{ n }}
    </button>
    <button
      @click="setCurrentNumber(null)"
      class="p-0 m-0 bg-transparent text-4xl text-white-300 font-bold hover:text-blue-300 focus:text-blue-400 ease-in-out transition-transform rounded-full"
    >
      X
    </button>
  </div>
  <div class="mt-4 w-full flex justify-around">
    <button @click="emitStartGame" class="">Start</button>
    <button @click="emitResetGame" class="">Reset</button>
    <button class="">Solve</button>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["selectedNumber", "gridData"],
  methods: {
    setCurrentNumber(n) {
      this.$emit("update-number", n);
    },
    emitResetGame() {
      this.$emit("reset-game");
    },
    emitStartGame() {
      this.$emit("start-game");
      console.log("emit start game");
    },
  },
};
</script>

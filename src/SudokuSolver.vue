<script>
import BoardComponent from "./components/BoardComponent.vue";
import InputComponent from "./components/InputComponent.vue";
import StatComponent from "./components/StatComponent.vue";
export default {
  components: {
    BoardComponent,
    InputComponent,
    StatComponent,
  },
  data() {
    return {
      Timer: {
        elapsedMinutes: 0,
        elapsedSeconds: 0,
      },
      timerInterval: null,
      selectedNumber: null,
      gridData: Array.from({ length: 9 }, () =>
        Array.from({ length: 9 }, () => null)
      ),
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

      // Reset Grid
      this.gridData = Array.from({ length: 9 }, () =>
        Array.from({ length: 9 }, () => null)
      );
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
    },
  },
};
</script>
<template>
  <div class="flex h-full w-full flex-col items-center align-middle relative">
    <StatComponent :Timer="Timer"></StatComponent>
    <BoardComponent
      :selectedNumber="selectedNumber"
      :gridData="gridData"
    ></BoardComponent>
    <InputComponent
      :selectedNuumber="selectedNumber"
      @update-number="selectedNumber = $event"
      @reset-game="resetGame"
      @start-game="startGame"
    ></InputComponent>
  </div>
</template>

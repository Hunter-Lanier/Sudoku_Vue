<script>
import BoardComponent from "./components/BoardComponent.vue";
import InputComponent from "./components/InputComponent.vue";
export default {
  components: {
    BoardComponent,
    InputComponent,
  },
  data() {
    return {
      selectedNumber: null,
    };
  },
  methods: {},

  mounted() {},
};
</script>
<template>
  <div class="flex h-full w-full flex-col items-center align-middle relative">
    <GameComponent></GameComponent>
    <BoardComponent :selectedNumber="selectedNumber"></BoardComponent>
    <InputComponent
      :selectedNuumber="selectedNumber"
      @update-number="selectedNumber = $event"
    ></InputComponent>
  </div>
</template>

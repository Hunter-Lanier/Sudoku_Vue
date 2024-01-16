<template>
  <div
    class="board border-4 shadow-none w-screen h-auto grid grid-cols-3 grid-rows-3 grid-flow-row aspect-square box-border"
  >
    <group-component
      v-for="(group, index) in gridData"
      :key="index"
      :groupData="group"
      :groupIndex="index"
      @cell-update="handleCellUpdate"
    >
    </group-component>
  </div>
</template>

<script>
import GroupComponent from "./GroupComponent.vue";

export default {
  components: {
    GroupComponent,
  },
  data() {
    return {
      gridData: Array.from({ length: 9 }, () =>
        Array.from({ length: 9 }, () => null)
      ),
    };
  },
  methods: {
    handleCellUpdate({ groupIndex, cellIndex, newValue }) {
      this.gridData[groupIndex][cellIndex] = newValue;
    },
  },
};
</script>

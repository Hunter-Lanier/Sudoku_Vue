<template>
  <div class="group border-2 grid grid-cols-3 grid-rows-3 h-full w-full">
    <cell-component
      v-for="(cell, index) in groupData"
      :key="index"
      :cellData="cell"
      @update="emitCellUpdate(index, $event)"
    >
    </cell-component>
  </div>
</template>

<script>
import CellComponent from "./CellComponent.vue";

export default {
  components: {
    CellComponent,
  },
  props: ["groupData", "groupIndex"],
  methods: {
    emitCellUpdate(cellIndex, newValue) {
      this.$emit("cell-update", {
        groupIndex: this.groupIndex,
        cellIndex,
        newValue,
      });
    },
  },
};
</script>

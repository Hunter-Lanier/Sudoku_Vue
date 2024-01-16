<template>
  <div
    @click="setToZero"
    class="flex cell border shadow-none h-full w-full items-center justify-center align-middle relative"
  >
    <input
      readonly
      class="flex h-full w-full bg-transparent p-0 m-0 leading-normal text-white focus:outline-none focus:ring-0 justify-center items-center text-dynamic text-center read-only:cursor-default"
      v-model="localValue"
    />
  </div>
</template>

<script>
export default {
  props: ["cellData"],
  computed: {
    localValue: {
      get() {
        return this.cellData;
      },
      set(newValue) {
        this.$emit("update", newValue);
      },
    },
  },
  methods: {
    setToZero() {
      this.localValue = 0;
      this.$emit("update", 0);
    },
  },
};
</script>

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
      currentNumber: null,
    };
  },
  methods: {},

  mounted() {},
};
</script>
<template>
  <div class="">
    <InputComponent></InputComponent>
  </div>
</template>

<template>
  <div>
    <button v-for="n in 9" :key="n" @click="setCurrentNumber(n)" class="">{{ n }}</button>
  </div>
</template>
<script>
export default {
    data() {
        return {
            gridData: this.gridData
            currentNumber: null,
        };
    },
};
</script>

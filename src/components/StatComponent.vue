<template lang="">
  <div>
    <!-- Timer Display with Added "0" for single digit values -->
    <span
      >Timer:{{ Timer.elapsedMinutes < 10 ? "0" : ""
      }}{{ Timer.elapsedMinutes < 10 ? "0" : "" }}:{{
        Timer.elapsedSeconds < 10 ? "0" : ""
      }}{{ Timer.elapsedSeconds }}</span
    >
  </div>
</template>
<script>
export default {
  props: ["Timer"],
};
</script>
<style lang=""></style>

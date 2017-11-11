<template>
  <audio ref="music">
    <source src="../../assets/sprit.wav" type="audio/wav">
  </audio>
</template>

<script>
// Use event bus to send and receive custom events
import EventBus from './../../EventBus';

// Component for playing music
export default {
  name: 'Music',
  created() {
    // Listen for new rounds
    EventBus.$on('run', (isRunning) => {
      // Play music if new round was started
      if (isRunning)
        this.$refs.music.play();
    });
  },
};
</script>

<style scoped>
audio {
  display: hidden;
}
</style>
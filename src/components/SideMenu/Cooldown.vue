<template>
  <div id="Cooldown">
    <canvas width="250" height="250" ref="canvas"></canvas>
  </div>
</template>

<script>
// Use event bus to send and receive custom events
import EventBus from '../../EventBus';

export default {
  name: 'Cooldown',
  data() {
    // Default values
    return {
      canvas: null, // canvas element
      active: true, // If cooldown is active
      paused: true, // If game is paused
      startTime: null, // Stores start time of the cooldown

      // Cooldown intervals for animation
      minInterval: 0,
      maxInterval: 0,
    };
  },
  mounted() {
    // Get canvas element
    this.canvas = this.$refs.canvas;

    // Listen for changes on interval times
    EventBus.$on('changeMinInterval', (time) => { this.minInterval = time; });
    EventBus.$on('changeMaxInterval', (time) => { this.maxInterval = time; });

    // Start animation method
    this.animate();

    // Listen for new round
    EventBus.$on('run', (gameIsActive) => {
      // Activate cooldown if round has ended
      this.active = !gameIsActive;

      // Start canvas animation if round has ended
      if (!this.paused && !gameIsActive)
        this.startAnimation();
    });

    // Listen for play/pause commands
    EventBus.$on('play', (play) => {
      this.paused = !play;

      // Clear cooldown if game was paused
      if (!play)
        this.startTime = 0;
    });
  },
  methods: {
    // Since canvas is animated from page load
    // all we need to do is to set the new start time
    startAnimation() {
      this.startTime = Date.now() * 100;
    },

    // Canvas animation method
    animate() {
      window.requestAnimationFrame(this.animate);
      this.clearCanvas();

      // Draw cooldown progress if game is not paused
      if (this.active)
        this.drawProgress();
    },

    // Clear canvas for new rendering
    clearCanvas() {
      // Clear canvas
      const c = this.canvas;
      const ctx = c.getContext('2d');
      ctx.clearRect(0, 0, c.width, c.height);
    },

    // Method for drawing progress of cooldown
    drawProgress() {
      const nowMs = Date.now() * 100;

      // Get progress in percentage
      const p1 = Math.min((nowMs - this.startTime) / Math.max(1, this.minInterval), 100);
      const p2 = Math.min((nowMs - this.startTime) / Math.max(1, this.maxInterval), 100);

      const c = this.canvas;
      const ctx = c.getContext('2d');
      let size = 90;

      let offsetBottom = 125;

      if (window.innerWidth <= 1200) {
        offsetBottom = 132;
        size = 94;
      }

      // Draw fastest arc
      ctx.beginPath();
      ctx.arc(offsetBottom, 125, size, 0, ((p1 / 50) * Math.PI));
      ctx.lineTo(c.width / 2, c.height / 2);
      ctx.fillStyle = 'rgba(230,242,250,0.4)'; // Blueish white, with transparency
      ctx.fill();

      // Draw slowest arc (in front of fastest arc)
      ctx.beginPath();
      ctx.arc(offsetBottom, 125, size, 0, ((p2 / 50) * Math.PI));
      ctx.lineTo(c.width / 2, c.height / 2);
      ctx.fillStyle = '#e6f2fa'; // Blueish white
      ctx.fill();
    },
  },
};
</script>

<style scoped>
#Cooldown {
  flex: 0;
  height: 250px;
  margin-bottom: 32px;
  position: absolute;
  width: 250px;
  top: 5px;
}

canvas {
  margin: auto;
  transform: rotateZ(-90deg);
  z-index: -1;
}

@media screen and (max-width: 1200px) {

  #Cooldown {
    width: 200px;
  }

}
</style>

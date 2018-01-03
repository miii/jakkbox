<template>
</template>

<script>
import EventBus from './../EventBus';

// Component specified for game logic
export default {
  name: 'GameManager',
  data() {
    return {
      playing: false, // Is the game started and active?

      audioDuration: 20600, // Duration of the music
      audioCurrentTime: 0, // Temp variable for current playback time
      startTime: null, // Timestamp when cooldown was started

      minInterval: 60000, // Controls the minimum time for cooldown
      maxInterval: 120000, // Controls the maximum time for cooldown

      runIntervalInstance: null, // setInterval instance for every round
      cooldownIntervalInstance: null, // setInterval instance for every cooldown

      cooldown: null, // Randomized value between minInterval and maxInterval
    };
  },
  mounted() {
    // Update other components with the specified interval values
    EventBus.$emit('changeMinInterval', this.$localStorage.get('minInterval', this.minInterval));
    EventBus.$emit('changeMaxInterval', this.$localStorage.get('maxInterval', this.maxInterval));

    // Detect interval changes from other components and randomize new cooldown time
    EventBus.$on('changeMinInterval', (val) => {
      this.minInterval = val; this.setRandomCooldown();
      this.$localStorage.set('minInterval', this.minInterval);
      this.$ga.event('min-interval', 'changed', val); // Log event on GA
    });
    EventBus.$on('changeMaxInterval', (val) => {
      this.maxInterval = val; this.setRandomCooldown();
      this.$localStorage.set('maxInterval', this.maxInterval);
      this.$ga.event('max-interval', 'changed', val); // Log event on GA
    });

    // Detect play events from other components
    EventBus.$on('play', (playing) => {
      this.playing = playing;

      if (playing) {
        // Clear cooldown (if any) and start round
        clearInterval(this.cooldownIntervalInstance);
        this.run();
      }
    });
  },
  methods: {
    // Method for starting a new round
    run() {
      this.startTime = Date.now();
      EventBus.$emit('run', true);

      // Check if music is playing every 100 ms
      this.runIntervalInstance = setInterval(this.checkMusic, 100);
    },

    // Method for checking if music is still playing
    checkMusic() {
      this.audioCurrentTime = Date.now() - this.startTime;

      // If music has ended
      if (this.audioCurrentTime > this.audioDuration) {
        clearInterval(this.runIntervalInstance);
        EventBus.$emit('run', false); // Notify other components

        // Randomize new cooldown time
        this.setRandomCooldown();
        this.cooldownIntervalInstance = setInterval(this.checkCooldown, 1000);
      }
    },
    // Method for randomizing new cooldown
    setRandomCooldown() {
      this.cooldown = this.minInterval + Math.floor(Math.random() * (this.maxInterval - this.minInterval));
    },
    // Method for checking if cooldown is still active
    checkCooldown() {
      // If game is paused, ignore cooldown
      if (!this.playing)
        return;

      // Remove 1 sec from cooldown
      this.cooldown -= 1000;

      // If cooldown has ended
      if (this.cooldown <= 0) {
        // Run another round
        clearInterval(this.cooldownIntervalInstance);
        this.run();
      }
    },
  },
};
</script>
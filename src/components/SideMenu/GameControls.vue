<template>
  <div id="gameCounter">
    <md-avatar class="md-avatar-icon md-large gamecount" :class="{hidden: !playing}">
      {{ playedRounds }}
      <md-tooltip md-direction="top">Spelade rundor</md-tooltip>
    </md-avatar>

    <md-avatar class="md-avatar-icon md-large clickable play" v-if="!playing" :class="{playLocked: playLocked}">
      <div @click="play">
        <md-icon>play_arrow</md-icon>
        <md-tooltip md-direction="top">Starta spelet</md-tooltip>
      </div>
    </md-avatar>
    <md-avatar class="md-avatar-icon md-large clickable" v-else>
      <div @click="pause">
        <md-icon>pause</md-icon>
        <md-tooltip md-direction="top">Pausa spelet</md-tooltip>
      </div>
    </md-avatar>
  </div>
</template>

<script>
// Use event bus to send and receive custom events
import EventBus from '../../EventBus';

import { version } from './../../../package.json';

export default {
  name: 'GameCounter',
  data() {
    // Default values
    return {
      playing: false, // If game is active of not
      rounds: 0, // Current round
      running: false, // If new round is running atm
      playLocked: false, // Is play button locked?
    };
  },
  computed: {
    // Computed variable for played rounds
    playedRounds() {
      const rounds = this.rounds;

      // Use default formatting if less than 999 rounds
      if (rounds < 999)
        return rounds;

      // Round to nearest thousand if more than 999 rounds
      // ...which probably won't happen for any normal person
      return `${Math.floor(rounds / 1000)}k`;
    },
  },
  mounted() {
    // Listen on play events from other components
    EventBus.$on('play', (play) => {
      this.playing = play;
      // Lock play button if player paused the game during a new round
      if (!play && this.running)
        this.playLocked = true;
    });

    // Listen on new rounds
    EventBus.$on('run', (isRunning) => {
      this.running = isRunning;
      this.playLocked = false; // Unlock play button if locked
      if (isRunning) {
        this.rounds += 1; // Increase counter
        this.$ga.event('round', 'new', `v${version}`, this.rounds); // Log event on GA
      }
    });
  },
  methods: {
    // Tell other components to start the game
    play() { if (!this.playLocked) EventBus.$emit('play', true); },
    // Tell other components to pause the game
    pause() { EventBus.$emit('play', false); },
  },
};
</script>

<style scoped>
@keyframes focus {
  0%, 30% {
    transform: scale3d(1, 1, 1);
  }
  15% {
    transform: scale3d(1.2, 1.2, 1.2);
  }
}

#gameCounter {
  height: 70px;
  width: 100%;
  margin: 0 auto 35px auto;
  line-height: 64px;
  font-weight: 700;
  font-size: 25px;
  color: #FFF;
}

.md-avatar {
  background: #d55959;
  margin: 0 5px;
}

.clickable {
  cursor: pointer;
}

.hidden {
  opacity: 0.4;
}

.gamecount {
  cursor: default;
}

.play {
  animation: focus 2s infinite;
}

.playLocked {
  cursor: default;
  animation: none;
  opacity: 0.4;
}

@media screen and (max-width: 1200px) {

  #gameCounter {
    margin-bottom: 30px;
  }

  .md-large {
    min-width: 0;
    min-height: 0;
    width: 48px;
    height: 48px;
    line-height: 48px;
    font-size: 20px;
  }

  .md-avatar.md-large .md-icon {
    font-size: 30px !important;
  }
}
</style>
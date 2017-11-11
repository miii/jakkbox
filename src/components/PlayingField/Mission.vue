<template>
  <div class="Mission">
    <div class="container">
      <ul>
        <Item :name="title"
          :index="index"
          class="title"
          type="mission"></Item>
        <Item v-for="(player, i) in players"
          :key="i"
          :index="i"
          :name="player"
          class="player"
          :class="{highlight: (chosen == i), active: active}"
          type="player"></Item>
      </ul>
    </div>
  </div>
</template>

<script>
// Use event bus to send and receive custom events
import EventBus from '../../EventBus';

import Item from './Item';

// Component for showing a specific mission
export default {
  name: 'Mission',
  props: ['title', 'players', 'index'],
  components: {
    Item,
  },
  data() {
    // Default values
    return {
      active: false,
      chosen: null,
    };
  },
  created() {
    // Listen for new rounds
    EventBus.$on('run', (isRunning) => {
      if (isRunning) {
        this.active = true;
        this.next(); // Highlight new player
      } else
        this.active = false;
    });
  },
  methods: {
    next() {
      // Ignore if music is not playing
      if (!this.active)
        return;

      // Pick random player to start with (first time only)
      if (this.chosen == null)
        this.chosen = Math.floor(Math.random() * this.players.length);

      // Find next player in list
      this.chosen = (this.chosen + 1) % this.players.length;

      // Randomize delay
      const randArr = new Uint8Array(1);
      window.crypto.getRandomValues(randArr);
      const rand = randArr[0] / 256;

      const delay = Math.floor(50 + (rand * 400) + (Math.random() * 400));
      setTimeout(this.next, delay); // Wait random time before going to next player
    },
  },
};
</script>

<style type="scss">
.Mission {
  width: 100%;
  margin: 0 5px;
  font-size: 15px;
  margin: 0 10px;
}

.Mission .container {
  max-width: 450px;
  margin: auto;
  border-radius: 3px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  border: 1px solid #DDD;
}

.Mission ul {
  margin: 0;
  padding: 0;
}
</style>
<template>
  <div id="PlayingField" @click="showLoadPrevGameDialog = true">
    <Music></Music>

    <div class="flex">
      <!-- To support draggable mission boxes -->
      <draggable v-model="missions" @start="drag=true" @end="drag=false">
        <Mission
          v-for="(mission, i) in missions"
          :key="i"
          :index="i"
          :title="mission"
          :players="players"></Mission>
      </draggable>
    </div>

    <md-dialog-confirm
      ref="loadPreviousGameDialog"
      md-title="Vill du skapa nytt spel?"
      md-content-html="Vi ser att du har spelat tidigare!<br> Vill du ladda ditt senaste spel igen eller skapa ett nytt?"
      md-ok-text="Ladda senaste"
      md-cancel-text="Skapa nytt"
      @close="onPreviousGameDialogClose" />
  </div>
</template>

<script>
import draggable from 'vuedraggable';

// Use event bus to send and receive custom events
import EventBus from '../EventBus';

import Mission from '../components/PlayingField/Mission';
import Music from '../components/PlayingField/Music';

import { version } from './../../package.json';

// Component for showing the playing field
export default {
  name: 'PlayingField',
  components: {
    Mission,
    Music,
    draggable,
  },
  data() {
    return {
      // Predefined list of players
      players: [
        'Spelare 1',
        'Spelare 2',
        'Spelare 3',
        'Spelare 4',
        'Spelare 5',
      ],

      // Predefined list of missions
      missions: [
        'Ta 3 klunkar',
        'Ta 5 klunkar',
        'Ge 3 klunkar',
        'Ge 5 klunkar',
        'x2',
        'Musikkort',
        'Skitkopp',
      ],
    };
  },
  mounted() {
    // Detect events from other components and modify internal lists
    EventBus.$on('add_player', (name) => {
      this.players.push(name);
      this.$localStorage.set('players', JSON.stringify(this.players));
      this.$ga.event('player', 'add', name); // Log event on GA
    });
    EventBus.$on('remove_player', (index) => {
      this.$ga.event('player', 'remove', this.players[index]); // Log event on GA
      this.players.splice(index, 1);
      this.$localStorage.set('players', JSON.stringify(this.players));
    });
    EventBus.$on('add_mission', (name) => {
      this.missions.push(name);
      this.$localStorage.set('missions', JSON.stringify(this.missions));
      this.$ga.event('mission', 'add', name); // Log event on GA
    });
    EventBus.$on('remove_mission', (index) => {
      this.$ga.event('mission', 'remove', this.missions[index]); // Log event on GA
      this.missions.splice(index, 1);
      this.$localStorage.set('missions', JSON.stringify(this.missions));
    });

    if (this.$localStorage.get('missions'))
      setTimeout(() => {
        this.$refs.loadPreviousGameDialog.open();
      }, 1000);
  },
  methods: {
    onPreviousGameDialogClose(type) {
      if (type === 'ok') {
        const missions = JSON.parse(this.$localStorage.get('missions'));
        const players = JSON.parse(this.$localStorage.get('players'));

        if (Array.isArray(missions))
          this.missions = missions;

        if (Array.isArray(players))
          this.players = players;
      }

      missions.forEach((mission) => {
        this.$ga.event('mission', 'add', mission); // Log event on GA
      });
      players.forEach((player) => {
        this.$ga.event('player', 'add', player); // Log event on GA
      });
    },
  },
};
</script>

<style type="scss" scoped>
#PlayingField {
  height: 100vh;
  width: 100%;
}

.flex {
  padding: 15px 5px;
}

.flex > div {
  display: flex;
  cursor: move;
}

@media screen and (max-width: 1400px) {

  .flex {
    padding: 10px 5px;
  }

}
</style>
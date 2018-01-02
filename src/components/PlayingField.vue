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
    });
    EventBus.$on('remove_player', (index) => {
      this.players.splice(index, 1);
      this.$localStorage.set('players', JSON.stringify(this.players));
    });

    EventBus.$on('add_mission', (name) => {
      this.missions.push(name);
      this.$localStorage.set('missions', JSON.stringify(this.missions));
    });
    EventBus.$on('remove_mission', (index) => {
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
        this.missions = JSON.parse(this.$localStorage.get('missions'));
        this.players = JSON.parse(this.$localStorage.get('players'));
      }
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
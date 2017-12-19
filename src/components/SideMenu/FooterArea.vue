<template>
  <div id="footer">
    <div class="icons">
      <md-avatar class="md-avatar-icon md-large" @click.native="openDialog('dialog_add_player')">
        <md-icon>face</md-icon>
        <md-tooltip md-direction="top">Lägg till spelare</md-tooltip>
      </md-avatar>
      <md-avatar class="md-avatar-icon md-large" @click.native="openDialog('dialog_add_mission')">
        <md-icon>work</md-icon>
        <md-tooltip md-direction="top">Lägg till uppdrag</md-tooltip>
      </md-avatar>
      <md-avatar class="md-avatar-icon md-large" @click.native="openDialog('dialog_edit_time')">
        <md-icon>timer</md-icon>
        <md-tooltip md-direction="top">Tidsinställningar</md-tooltip>
      </md-avatar>
    </div>
    <span class="info">
      Inspirerat av <a target="_blank" href="http://dödskrök.se">Stabens Dödskrök</a><br>
      Utvecklat med ♥ av Jacob Andersson<br>
      Version {{ appVersion }}
    </span>

    <md-dialog-prompt
      md-title="Lägg till spelare"
      md-ok-text="Lägg till"
      md-cancel-text="Avbryt"
      md-input-maxlength="22"
      md-input-placeholder="Fyllekalle"
      @open="onOpen"
      @close="emit('add_player', player)"
      v-model="player"
      ref="dialog_add_player">
    </md-dialog-prompt>

    <md-dialog-prompt
      md-title="Lägg till uppdrag"
      md-ok-text="Lägg till"
      md-cancel-text="Avbryt"
      md-input-maxlength="22"
      md-input-placeholder="Drink en bärs"
      @open="onOpen"
      @close="emit('add_mission', mission)"
      v-model="mission"
      ref="dialog_add_mission">
    </md-dialog-prompt>

    <md-dialog ref="dialog_edit_time" @close="validateDialog">
      <md-dialog-title>Tidsinställningar</md-dialog-title>

      <md-dialog-content>
        <TimeInput
          title="Minimal tid till nästa runda:"
          v-model="minInterval"
          fallback="0"
          suffix="min"
          ref="minIntervalInput" />
        <TimeInput
          title="Maximal tid till nästa runda:"
          v-model="maxInterval"
          fallback="0"
          suffix="min" />
      </md-dialog-content>

      <md-dialog-actions>
        <md-button
          class="md-primary"
          @click="saveData('dialog_edit_time')">Ändra</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-snackbar md-position="bottom center" ref="snackbar" md-duration="5000">
      <span>{{ error }}</span>
    </md-snackbar>
  </div>
</template>

<script>
// Use event bus to send and receive custom events
import EventBus from '../../EventBus';

// Use version string from package.json
import { version, versionType } from './../../../package.json';

import TimeInput from './TimeInput';

// Component for showing the footer area in the sidebar
// Also controls many dialogs used in the GUI
export default {
  name: 'FooterArea',
  components: {
    TimeInput,
  },
  data() {
    // Default values
    return {
      appVersion: `${version} ${versionType}`, // Use version string from package.json

      player: '', // Used when adding new player
      mission: '', // Used when adding new mission

      // Used when modifying cooldown intervals
      minInterval: '',
      maxInterval: '',

      error: '', // Error message for validation in dialogs
    };
  },
  methods: {
    openDialog(ref) {
      this.$refs[ref].open();
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    },

    // Method for validating cooldown intervals
    validate() {
      if (this.minInterval > this.maxInterval) {
        this.showError('Maximala tiden måste vara större än minimala tiden!');
        return false;
      }

      return true;
    },

    // Method for showing toast message
    showError(message) {
      this.error = message;
      this.$refs.snackbar.open();
    },

    // When user is trying to save new cooldown intervals
    saveData(ref) {
      // Validate input
      if (!this.validate())
        return;

      // Notify other components to update intervals
      EventBus.$emit('changeMinInterval', this.minInterval * 60000);
      EventBus.$emit('changeMaxInterval', this.maxInterval * 60000);

      // Close dialog if validation was successful
      this.closeDialog(ref);
    },

    // Used for dialogs when adding player/mission
    emit(key, val) {
      // Notify other components to add player/mission
      if (val.length > 0)
        EventBus.$emit(key, val);
    },

    // Used for dialogs when adding player/mission
    onOpen() {
      // Clear previous input
      this.player = '';
      this.mission = '';
    },

    // Used for cooldown interval dialog
    validateDialog() {
      // Make sure minimum interval is not larger than maximum interval
      if (!this.validate())
        this.minInterval = this.maxInterval;
    },
  },
  mounted() {
    // Listen on cooldown interval changes
    EventBus.$on('changeMinInterval', (val) => { this.minInterval = val / 60000; });
    EventBus.$on('changeMaxInterval', (val) => { this.maxInterval = val / 60000; });
  },
};
</script>

<style scoped>
#footer {
  background: rgba(255, 255, 255, 0.03);
  height: 110px;
  overflow: visible;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.3);
}

.icons {
  transform: translateY(-33px);
  position: absolute;
  width: 300px;
}

.md-avatar {
  background: #59abd5;
  margin: 0 5px;
  cursor: pointer;
}

.md-avatar:hover {
  background: #6fb7db;
}

.md-icon {
  font-size: 30px !important;
  display: block;
}

.info {
  margin-top: 48px;
  display: block;
  font-size: 11px;
  line-height: 15px;
}

a:link,
a:visited {
  color: inherit !important;
}

a:hover {
  color: #59abd5 !important;
  text-decoration: none !important;
}
</style>
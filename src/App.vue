<template>
  <div id="app">
    <SideMenu></SideMenu>
    <PlayingField></PlayingField>
    <GameManager></GameManager>
  </div>
</template>

<script>
import SideMenu from './components/SideMenu';
import PlayingField from './components/PlayingField';
import GameManager from './components/GameManager';

export default {
  name: 'app',
  components: {
    SideMenu,
    PlayingField,
    GameManager,
  },
  mounted() {
    this.$ga.page('/');
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Open+Sans');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

* {
  box-sizing: border-box;
  font-family: 'Open Sans', sans-serif;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  background: #e6f2fa;
}

*::selection {
  background: #59abd5 !important;
}
</style>

<template>
  <div id="sideMenu">
    <Cooldown></Cooldown>
    <Logo></Logo>
    <Profiles></Profiles>
    <GameControls></GameControls>
    <FooterArea></FooterArea>
  </div>
</template>

<script>
import Logo from './SideMenu/Logo';
import Profiles from './SideMenu/Profiles';
import Cooldown from './SideMenu/Cooldown';
import FooterArea from './SideMenu/FooterArea';
import GameControls from './SideMenu/GameControls';

// Component for the side menu
export default {
  name: 'SideMenu',
  components: {
    Logo,
    Profiles,
    Cooldown,
    FooterArea,
    GameControls,
  },
};
</script>

<style type="scss" scoped>
#sideMenu {
  width: 250px;
  height: 100vh;
  background: #222;
  flex-grow: 0;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  z-index: 100;
}

@media screen and (max-width: 1200px) {

  #sideMenu {
    width: 200px;
  }

}
</style>

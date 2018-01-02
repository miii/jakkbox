<template>
  <div class="logo" :class="{active: active}">
    <img src="../../assets/logo.png">
  </div>
</template>

<script>
// Use event bus to send and receive custom events
import EventBus from './../../EventBus';

// Component for showing and animating the logo
export default {
  name: 'Logo',
  data() {
    return {
      // If round is running or not
      // true: Logo is animating
      // false: Logo is not animating
      active: false,
    };
  },
  created() {
    // Listen on new rounds
    EventBus.$on('run', (isRunning) => {
      if (isRunning)
        this.active = true;
      else
        this.active = false;
    });
  },
};
</script>

<style scoped>
@keyframes pulse {
  0% {
    transform: scale3d(1, 1, 1);
  }
  1.3% {
    transform: scale3d(1.15, 1.15, 1.15);
  }
  3% {
    transform: scale3d(1, 1, 1);
  }
}

@keyframes rotate {
  0% {
    transform: rotate3d(0, 0, 0);
  }
  100% {
    transform: rotate3d(0, 0, 1, 360deg);
  }
}

.logo {
  padding: 45px 40px;
  z-index: 1000;
}

img {
  width: 100%;
  animation: pulse 15s;
}

.logo.active img {
  animation: rotate 5.15s 4 linear;
}

@media screen and (max-width: 1200px) {

  .logo {
    padding: 30px 30px;
  }

}
</style>
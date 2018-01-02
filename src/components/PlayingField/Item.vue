<template>
  <li class="item">
    <md-icon class="selected">forward</md-icon>
    {{ name }}
    <md-icon class="remove" @click.native="remove">remove_circle</md-icon>
  </li>
</template>

<script>
// Use event bus to send and receive custom events
import EventBus from '../../EventBus';

// Component for showing mission title or player in list
export default {
  name: 'Player',
  props: ['name', 'type', 'index'],
  methods: {
    remove() {
      // Tell other components to remove this item
      EventBus.$emit(`remove_${this.type}`, this.index);
    },
  },
};
</script>

<style scoped>
@keyframes shake {
  from, to {
    transform: translate3d(0, 0, 0);
  }

  10%, 30%, 50%, 70%, 90% {
    transform: translate3d(-3px, 0, 0);
  }

  20%, 40%, 60%, 80% {
    transform: translate3d(3px, 0, 0);
  }
}

@keyframes pulse {
  0% {
    transform: scale3d(1, 1, 1);
  }
  2.5% {
    transform: scale3d(1.1, 1.1, 1.1);
  }
  5% {
    transform: scale3d(1, 1, 1);
  }
}

.title {
  background: #59abd5;
  font-weight: 600;
  color: #FFF;
  position: relative;
}

li {
  list-style: none;
  height: 55px;
  line-height: 55px;
  color: #AAA;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  margin-top: 0 !important;
  background: #222;
  transform: scale(1, 1);
  font-size: 13px;
}

.md-icon {
  position: absolute;
  display: block;
  top: 0;
  line-height: 55px;
}

.md-icon.remove {
  right: 7px;
  font-size: 15px !important;
}

.md-icon.remove:hover {
  cursor: pointer;
  opacity: 1;
}

.md-icon.selected {
  left: 16px;
  font-size: 30px;
  opacity: 0;
}

.remove {
  color: #FFF;
  opacity: 0.4;
}

.highlight {
  transform: scale(1, 1.1);
  border-radius: 3px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background: #d55959;
  color: #FFF;
  z-index: 10;
  font-weight: bold;
  width: calc(100% + 20px);
  margin-left: -10px;
}

.highlight.active {
  animation: shake 1s infinite;
}

.highlight:not(.active) {
  animation: pulse 10s infinite;
}

.highlight .md-icon {
  opacity: 1;
  color:inherit;
}

.remove {
  display: none;
}

.item:hover .remove {
  display: block;
}

@media screen and (max-width: 1400px) {

  .item {
    font-size: 11px !important;
  }

  .md-icon.remove {
    right: 3px !important;
    font-size: 13px;
  }

  .md-icon.selected {
    left: 5px;
    font-size: 13px;
  }

  .highlight {
    margin-left: -5px;
    width: calc(100% + 10px);
  }

}

@media screen and (max-width: 1200px) {

  .item {
    font-size: 11px !important;
    height: 50px;
  }

  .md-icon.remove {
    font-size: 11px !important;
    right: 2px !important;
  }

}
</style>
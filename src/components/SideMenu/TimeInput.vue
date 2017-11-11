<template>
  <md-input-container>
    <label>{{ title }}</label>
    <md-input type="text"
      pattern="^[0-9]+$"
      :value="value"
      v-model="val"
      @input.native="onInput($event.target.value)"
      @blur.native="validate"
      ref="input"></md-input>
    <i class="suffix" :style="suffixStyle">{{ suffix }}</i>
  </md-input-container>
</template>

<script>
// Component for time input
// Used in dialog for changing cooldown intervals
export default {
  name: 'TimeInput',
  props: ['title', 'value', 'fallback', 'suffix'],
  data() {
    return {
      val: '', // Stores the value from the input
      suffixStyle: {}, // Used for suffix translation
    };
  },
  methods: {
    // Method with two primary purposes:
    // 1. Tell parent the value has been updated
    // 2. Move suffix string
    onInput(val) {
      // Only allow digits and decimals
      const newValue = val.replace('.', ',').replace(/[^0-9,]/g, '');

      // Tell parent the value has been updated
      this.$emit('input', newValue.replace(',', '.'));
      // Update internal val variable
      this.val = newValue;

      // Find characters
      const numbers = newValue.match(/[0-9]/g);
      const commas = newValue.match(/,/g);

      const numLen = numbers ? numbers.length : 0;
      const commaLen = commas ? commas.length : 0;

      // Calculate translation offset
      const offset = (numLen * 9.2) + (commaLen * 4);

      // Translate suffix
      this.suffixStyle.transform = `translateX(${offset}px)`;
    },

    // Method to make sure a value is always given
    validate() {
      if (this.val.length < 1)
        this.val = this.fallback;
    },
  },
  mounted() {
    // Update val variable with value given from parent
    this.val = this.value.toString();
    // Update suffix position
    this.onInput(this.val);
  },
  watch: {
    // Watch for value changes from parent
    value(newValue) {
      // Update value and suffix position
      this.val = newValue.toString();
      this.onInput(this.val);
    },
  },
};
</script>

<style scoped>
.suffix {
  position: absolute;
  margin-top: 7px;
  margin-left: 5px;
  font-style: normal;
  opacity: 0.8;
  z-index: -10;
}
</style>
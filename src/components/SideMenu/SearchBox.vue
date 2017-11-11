<template>
  <div id="search">
    <input type="text"
      placeholder="Sök profil..."
      v-model="query">
  </div>
</template>

<script>
export default {
  name: 'SearchBox',
  data() {
    return {
      query: '',
    };
  },
};
</script>

<style type="scss" scoped>
input {
  box-sizing: border-box;
  width: 100%;
  padding: 15px;
  margin: 0;
  border: 0 solid rgba(255, 255, 255, 0.04);
  border-top-width: 1px;
  border-bottom-width: 1px;
  background: rgba(255, 255, 255, 0.03);
  color: #FFF;
  text-align: center;
  font-size: 16px;
}
</style>

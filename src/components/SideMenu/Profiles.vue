<template>
  <div id="profiles">
    <SearchBox></SearchBox>
  </div>
</template>

<script>
import SearchBox from './SearchBox';

// Component for searching and loading profiles
export default {
  name: 'Profiles',
  components: {
    SearchBox,
  },
};
</script>

<style scoped>
#profiles {
  flex: 1;
  visibility: hidden;
}
</style>
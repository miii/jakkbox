// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'vue-material/dist/vue-material.css';
import Vue from 'vue';
import VueMaterial from 'vue-material';
import App from './App';

Vue.config.productionTip = false;

Vue.use(VueMaterial);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
});
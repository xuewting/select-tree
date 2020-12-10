import Vue from 'vue';
import App from './App.vue';
// import 'vant/lib/index.css';
// import { TreeSelect, Icon } from 'vant';
import store from './store';

Vue.config.productionTip = false;

// Vue.use(TreeSelect, Icon);

new Vue({
  store,
  render: (h) => h(App)
}).$mount('#app');

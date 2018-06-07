import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

/* libs */
import Base64 from './lib/base64.vue';
import Config from './config';

/* styles */
import './common/base.sass';

const base64 = Vue.use(Base64);
const config = Vue.use(Config);

new Vue({
  router,
  store,
  base64,
  config,
  render: h => h(App),
}).$mount('#app');

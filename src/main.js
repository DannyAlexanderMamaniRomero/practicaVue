import Vue from 'vue';
import './plugins/vuetify';
import VueQrcodeReader from 'vue-qrcode-reader';

import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import './utils/firebase';

import Default from './views/layouts/Default.vue';
import NoSidebar from './views/layouts/NoSidebar.vue';

Vue.component('default-layout', Default);
Vue.component('no-sidebar-layout', NoSidebar);

Vue.use(VueQrcodeReader);

Vue.config.productionTip = false;

//Iniciamos los dispatch generales
store.dispatch('users/openDBChannel')

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

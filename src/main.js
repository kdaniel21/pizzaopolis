import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import interceptorSetup from './helpers/interceptor';
import DatetimePicker from 'vuetify-datetime-picker';

Vue.config.productionTip = false;

// Axios interceptor setup
interceptorSetup();

// Vuetify datetime picker
Vue.use(DatetimePicker);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');

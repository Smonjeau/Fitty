import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from "vue-router";
import { routes } from './routes';
import axios from 'axios'

Vue.config.productionTip = false;
Vue.use(VueRouter);

axios.defaults.baseURL = 'http://localhost:8080/api/';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.token;

const router = new VueRouter({
  routes,
  mode: 'history'
});

export const eventBus = new Vue();

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')


import Vue from 'vue'

import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from "vue-router";

import { routes } from './routes';
import axios from 'axios'
import { store } from './userStore';
import VueYouTubeEmbed from 'vue-youtube-embed'
Vue.use(VueYouTubeEmbed)
// if you don't want install the component globally
Vue.use(VueYouTubeEmbed, { global: false })
// if you want to install the component globally with a different name
Vue.use(VueYouTubeEmbed, { global: true, componentId: "youtube-media" })

Vue.config.productionTip = false;
Vue.use(VueRouter);

axios.defaults.baseURL = 'http://localhost:8080/api/';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.token;

const router = new VueRouter({
  routes,
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  store.updateDataUser();
  next();
});

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')


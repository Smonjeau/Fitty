<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
import { store } from '@/./userStore';


export default {
  name: 'App',

  components: {
    //card,
  },

  data: () => ({
  }),
  mounted() {
    store.checkIfLogged();
  }
};
</script>

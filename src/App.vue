<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
import { store } from '@/./userStore';
import axios from "axios";


export default {
  name: 'App',

  components: {
    //card,
  },

  data: () => ({
  }),
  beforeMount() {
    if(localStorage.getItem('token') != null) {
      axios.get('user/current')
          .then(result => {
            store.updateDataUser(result.data);
            store.logged = true;
          }).catch(() => {
        //No esta logeado el bro
        store.logged = false;
        localStorage.removeItem('token');
      });
    }



  }
};
</script>

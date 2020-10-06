<template>
  <v-app>
    <card type="strength" titulo="Rutina 1" time="20" rating="3.5"></card>
  </v-app>
</template>

<script>
import card from './components/CardioCard';

export default {
  name: 'App',

  components: {
    card,
  },

  data: () => ({
    //
  }),
};
</script>

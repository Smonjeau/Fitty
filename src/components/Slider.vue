<template>
  <div>
    <v-row class="mt-8 mb-4 justify-end">
      <v-col md="8">
        <h4 class="text-center text-h5 font-weight-black text-uppercase">{{ title }}</h4>
      </v-col>
      <v-col md="2">
        <router-link to="/rutinas" v-if="masInfo">Más Rutinas</router-link>
      </v-col>
    </v-row>

    <v-sheet class="mx-auto">
      <v-slide-group  show-arrows>
        <slot></slot>
      </v-slide-group>
    </v-sheet>
  </div>
</template>

<script>
export default {
  name: "Slider",
  props: [ 'title', 'masInfo' ]
}
</script>

<style scoped>

</style>
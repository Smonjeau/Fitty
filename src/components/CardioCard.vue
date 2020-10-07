<template>
  <v-card width="170" height="240" elevation="10" class="text-center pa-4 rounded-xl" outlined>
    <v-responsive class="rounded-circle align-center ma-auto" height="70" width="70"
                  :style="{backgroundColor: selected.color}">
      <v-img :src=selected.foto :width="selected.dim" :height="selected.dim" class="ma-auto" ></v-img>
    </v-responsive>
    <v-card-title class="justify-center">{{ titulo }}</v-card-title>
    <v-row class="justify-center">
      <v-rating
          color="black"
          background-color="black"
          empty-icon="mdi-star-outline"
          full-icon="mdi-star"
          half-icon="mdi-star-half-full"
          half-increments
          length="5"
          readonly
          size="25"
          :value="rating"
          medium
          dense
      ></v-rating>
    </v-row>
    <v-row class="justify-center mt-4">
      <span class="text-h6 mr-2">{{ time }}'</span>
      <img src="../assets/stopwatch.png" width="28px" height="28px" />
    </v-row>
  </v-card>
</template>

<script>
import cardioPhoto from '../assets/cardio.png'
import strengthPhoto from '../assets/strength.png'
import yogaPhoto from '../assets/religion.png'
import elongPhoto from '../assets/gym.png'
import resPhoto from '../assets/resistencia.png'

export default {
  name: "CardioCard",
  props: ['type', 'titulo', 'rating', 'time'],
  data: function () {
    return {
      cardio: {foto: cardioPhoto, color: '#fa5253', dim: 60},
      strength: {foto: strengthPhoto, color: '#F952FA', dim: 55},
      yoga: {foto: yogaPhoto, color: '#53FA52', dim: 50},
      elongacion: {foto: elongPhoto, color: '#5253FA', dim: 50},
      resistencia: {foto: resPhoto, color: '#FAA552', dim: 50},
      selected: ''
    }
  },
  mounted() {
    if (this.type == 'cardio') return this.selected = this.cardio;
    else if (this.type == 'strength') return this.selected = this.strength;
    else if (this.type == 'yoga') return this.selected = this.yoga;
    else if (this.type == 'elongacion') return this.selected = this.elongacion;
    else if (this.type == 'resistencia') return this.selected = this.resistencia;
  }
}
</script>

<style scoped>

</style>
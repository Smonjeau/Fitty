<template>
  <v-card width="200" height="290" elevation="5"
          class="text-center rounded-xl pa-4 d-flex flex-column" outlined>
    <v-layout>
      <v-responsive class="rounded-circle align-center ma-auto pa-2" max-width="80" max-height="80" min-height="80" min-width="80"
                    :style="{backgroundColor: selected.color}">
        <v-img :src=selected.foto :width="selected.dim" :height="selected.dim" class="ma-auto" ></v-img>
      </v-responsive>
    </v-layout>
    <v-layout class="justify-center fill-height">
      <v-card-title class="text-break justify-center">{{ titulo }}</v-card-title>
    </v-layout>
    <v-layout class="justify-center align-content-end mb-auto">
      <div class="cont mb-auto">
        <v-row class="justify-center">
          <v-rating
              :color="color"
              :background-color="color"
              empty-icon="mdi-star-outline"
              full-icon="mdi-star"
              half-icon="mdi-star-half-full"
              half-increments
              length="5"
              readonly
              size="28"
              :value="rating"
              medium
              dense
          ></v-rating>
        </v-row>
        <v-row class="justify-center mt-4">
          <span class="text-h6 mr-2">{{ time }}'</span>
          <img src="../assets/stopwatch.png" width="28px" height="28px" />
        </v-row>
      </div>
    </v-layout>
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
      selected: '',
      color: 'amber darken-1',
      ele: 5
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
<template>
  <v-card width="170" height="240" elevation="10" class="text-center pa-4 rounded-xl" outlined>
    <v-responsive class="rounded-circle align-center ma-auto" height="70" width="70"
                  :style="{backgroundColor: getColor()}">
      <v-img v-if="type == 'cardio'" src="../assets/cardio.png" :width="cardio.dim" :height="cardio.dim" class="ma-auto" ></v-img>
      <v-img v-else-if="type == 'yoga'" src="../assets/religion.png" :width="yoga.dim" :height="yoga.dim" class="ma-auto" ></v-img>
      <v-img v-else-if="type == 'strength'" src="../assets/strength.png" :width="strength.dim" :height="strength.dim" class="ma-auto" ></v-img>
      <v-img v-else-if="type == 'elongacion'" src="../assets/gym.png" :width="elongacion.dim" :height="elongacion.dim" class="ma-auto" ></v-img>
      <v-img v-else-if="type == 'resistencia'" src="../assets/resistencia.png" :width="resistencia.dim" :height="resistencia.dim" class="ma-auto" ></v-img>
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
export default {
  name: "CardioCard",
  props: ['type', 'titulo', 'rating', 'time'],
  data: function () {
    return {
      cardio: {foto: '../assets/cardio.png', color: '#fa5253', dim: 60},
      strength: {foto: '../assets/strength.png', color: '#F952FA', dim: 55},
      yoga: {foto: '../assets/religion.png', color: '#53FA52', dim: 50},
      elongacion: {foto: '../assets/gym.png', color: '#5253FA', dim: 50},
      resistencia: {foto: '../assets/resistencia.png', color: '#FAA552', dim: 50},
      foto: ''
    }
  },
  methods: {
    getColor: function() {
      if (this.type == 'cardio') return this.cardio.color;
      else if (this.type == 'strength') return this.strength.color;
      else if (this.type == 'yoga') return this.yoga.color;
      else if (this.type == 'elongacion') return this.elongacion.color;
      else if (this.type == 'resistencia') return this.resistencia.color;
    }
  }
}
</script>

<style scoped>

</style>
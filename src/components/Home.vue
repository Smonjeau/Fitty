<template>
  <div>
    <NavBar></NavBar>

    <h1 class="text-center text-h1 font-weight-bold blue--text text--darken-1 mt-10">FITTY</h1>
    <h2 class="text-center text-h4 font-weight-bold mt-8">COMPARTE TUS RUTINAS</h2>
    <v-row no-gutters class="mb-13">
      <v-col md="3"></v-col>

      <v-col md="6" class="text-center">
        <h3 class="text-center text-h5 mt-8">
          Con FITTY podrás compartir tus rutinas de una manera sencilla para llegar a más gente!
          También podrás ver rutinas de otros usuarios como tu que buscan darse a conocer!
        </h3>

        <v-btn
            class="text-h6 mt-10 text-none"
            color="blue darken-1 white--text"
            depressed
            large
            @click="goToSignUp"
        >Comienza Ahora</v-btn>
      </v-col>

      <v-col md="3"></v-col>
    </v-row>

    <v-divider></v-divider>

    <slider class="mb-14 mt-4" title="rutinas destacadas">
      <v-slide-item v-for="card in cards" :key="card.type">
        <card-rutina :rating="card.rating" :time="card.duration" :titulo="card.title"
                     :type="card.type" class="ma-4"></card-rutina>
      </v-slide-item>
    </slider>

    <v-divider></v-divider>

    <slider class="mb-14 mt-4" title="rutinas de brazos" mas-info="true">
      <v-slide-item v-for="card in cards" :key="card.type">
        <card-rutina :rating="card.rating" :time="card.duration" :titulo="card.title"
                     :type="card.type" class="ma-4"></card-rutina>
      </v-slide-item>
    </slider>
  </div>


</template>

<script>
import NavBar from "@/components/NavBar";
import cardRutina from "@/components/CardRutina";
import slider from "@/components/Slider";

export default {
  name: "Home",
  components: {
    NavBar,
    cardRutina,
    slider
  },
  data() {
    return {
      cards: [
        {type: 'strength', rating: 3.5, duration: 30, title: 'Abs Marcados'},
        {type: 'strength', rating: 2.5, duration: 20, title: 'Piernas Intensivo'},
        {type: 'cardio', rating: 2.5, duration: 15, title: 'Spinning'},
        {type: 'yoga', rating: 4.5, duration: 10, title: 'Saludo al Sol'},
        {type: 'elongacion', rating: 4.5, duration: 12, title: 'Estiramiento Tren Superior'},
        {type: 'resistencia', rating: 4.5, duration: 40, title: 'Intencivo Tren Inferior'},
        {type: 'strength', rating: 3.5, duration: 30, title: 'Abs Marcados'},
        {type: 'strength', rating: 2.5, duration: 20, title: 'Piernas Intensivo'},
        {type: 'cardio', rating: 2.5, duration: 15, title: 'Spinning'},
        {type: 'elongacion', rating: 4.5, duration: 12, title: 'Estiramiento Tren Superior'},
        {type: 'resistencia', rating: 4.5, duration: 40, title: 'Intencivo Tren Inferior'},
      ],
      model: null
    }
  },
  methods: {
    goToSignUp() {
      this.$router.push('/signup');
    }
  }
}
</script>

<style scoped>

</style>
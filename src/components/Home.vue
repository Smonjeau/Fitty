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

    <div>

    <slider class="mb-14 mt-4" title="rutinas destacadas">
      <v-slide-item v-for="routine in this.info.results" :key="routine">
        <card-rutina :rating="routine.averageRating" :time="calcDuration(routine)" :titulo="routine.name"
                     :type="routine.category.name" class="ma-4"></card-rutina>
      </v-slide-item>
    </slider >

    <v-divider></v-divider>

    </div>

    <slider  class="mb-14 mt-4" :title=categories.results[6].name mas-info="true">
           <v-slide-item v-for="routine in filterCategorys(this.info.results,categories.results[6].name)" :key="routine">
             <card-rutina :rating="routine.averageRating" :time="calcDuration(routine)" :titulo="routine.name"
                          :type="routine.category.name" class="ma-4"></card-rutina>
           </v-slide-item>




         </slider>
    <!--slider v-for="category in this.categories.results" :key="category" class="mb-14 mt-4" :title=category.name mas-info="true">
        <v-slide-item v-for="routine in filterCategorys(this.info.results,'strength')" :key="routine">
          <card-rutina :rating="routine.averageRating" :time="calcDuration(routine)" :titulo="routine.name"
                       :type="routine.category.name" class="ma-4"></card-rutina>
        </v-slide-item>




      </slider!-->








    </div>


</template>

<script>
import cardRutina from "@/components/CardRutina";
import slider from "@/components/Slider";
import NavBar from "@/components/NavBar";
import axios from 'axios';

export default {
  name: "Home",
  components: {
    NavBar,
    cardRutina,
    slider
  },
  data() {
    return {
      model:null,

      info:null,
      categories:null,

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
    }
  },
  computed : {
    getCategoryName (name){
      return 'Rutinas de ' + name;
    }
  },
  methods: {
    goToSignUp() {
      this.$router.push('/signup');
    },
    filterCategorys (routines,categoryName){
      return routines.filter(routine => routine.category.name === categoryName);
    },
    calcDuration (routine) {
      let aux = routine;
      aux = 0
      return 45 + aux;
    }
  },


  mounted () {
   axios
        .get('/routines',{
          params:{
            orderBy: 'averageRating',
            direction: 'desc'

          }
        })
        .then((response) => {
              this.info = response.data;
              console.log(this.info);


            }

        );
    axios
        .get('/categories').then(
        (response) => {
          this.categories = response.data;
          console.log(this.categories);
        }

    );
    /*
    axios.all([axios.get('/routines'),axios.get('/categories')]).then(axios.spread((response1, response2) => {
      this.info = response1.data.results;
      this.categories = response2.data.results;
    })) */
  }
}
</script>

<style scoped>

</style>
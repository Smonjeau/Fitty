<template>
  <div>
    <NavBar></NavBar>
   <div v-if="!logged" >
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
   </div>

    <div v-else>
      <div>

        <slider class="mb-14 mt-4" title="Mis Rutinas" mas-info="true">
          <v-slide-item v-for="routine in userRoutines" :key="routine.id">
            <card-rutina :rating="routine.averageRating" :time="calcDuration(routine)" :titulo="routine.name"
                         :type="routine.category.name" class="ma-4"></card-rutina>
          </v-slide-item>
        </slider >

      </div>
    <div>

    <slider class="mb-14 mt-4" title="Rutinas destacadas">
      <v-slide-item v-for="routine in topRoutines" :key="routine.id">
        <card-rutina :rating="routine.averageRating" :time="calcDuration(routine)" :titulo="routine.name"
                     :type="routine.category.name" class="ma-4"></card-rutina>
      </v-slide-item>
    </slider >

    <v-divider></v-divider>

    </div>


    <div v-for="categoria in categories" :key="categoria.id">
      <slider   class="mb-14 mt-4" :title=getCategoryName(categoria.name) mas-info="true">
            <v-slide-item v-for="routine in filterCategorys(info,categoria.name)" :key="routine">
              <card-rutina :rating="routine.averageRating" :time="calcDuration(routine)" :titulo="routine.name"
                           :type="routine.category.name" class="ma-4"></card-rutina>
            </v-slide-item>




          </slider>
      <v-divider></v-divider>

    </div>
    </div>
     <!--slider   class="mb-14 mt-4" :title=categoria.name mas-info="true">
            <v-slide-item v-for="routine in filterCategorys(this.info,categoria.name)" :key="routine">
              <card-rutina :rating="routine.averageRating" :time="calcDuration(routine)" :titulo="routine.name"
                           :type="routine.category.name" class="ma-4"></card-rutina>
            </v-slide-item>




          </slider>
   </div!-->

    <!--slider   class="mb-14 mt-4" :title=categories.results[2].name mas-info="true">
           <v-slide-item v-for="routine in filterCategorys(this.info.results,categories.results[2].name)" :key="routine">
             <card-rutina :rating="routine.averageRating" :time="calcDuration(routine)" :titulo="routine.name"
                          :type="routine.category.name" class="ma-4"></card-rutina>
           </v-slide-item>




         </slider!-->

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
import { store } from '../userStore.js';


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
      logged: store.logged,
      user: store.userInfo,

      info:[],
      categories:[],

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
  computed: {
    topRoutines(){
      if (this.info.size < 20)
        return this.info;
      else
        return this.info.slice(0,19);


    },
    userRoutines(){
      return this.info.filter(routine => routine.creator.id === this.user.id);
    }
  },

  methods: {
    getCategoryName (name){
      return 'Rutinas de ' + name;
    },
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

    axios.all([axios.get('/routines',{
      params:{
        orderBy: 'averageRating',
        direction: 'desc',
        size: 100

      }
    }),axios.get('/categories')]).then(axios.spread((response1, response2) => {
      this.info = response1.data.results;
      this.categories = response2.data.results;
      console.log(this.info);

      console.log(this.categories);
    }));
  }
}
</script>

<style scoped>

</style>
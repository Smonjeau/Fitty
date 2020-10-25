<template>
  <div>
    <NavBar></NavBar>
    <div v-if="!myStore.logged" class="mb-16" >
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
      <div v-if="!noRoutines">

        <slider class="mb-14 mt-4" title="Mis Rutinas" mas-info="true" go-to="/mis_rutinas">
          <v-slide-item v-for="routine in userRoutines" :key="routine.id">
            <card-rutina :rating="routine.averageRating"
                         :time="getDuration(routine)"
                         :titulo="routine.name"
                         :type="routine.category.name.toLowerCase()"
                         :id_routine="routine.id"
                         class="ma-4"></card-rutina>
          </v-slide-item>
        </slider >
        <div class="text-center"
             v-if="loading">
          <v-progress-circular
              :size="120"
              color="blue darken-1"
              class="mt-6"
              indeterminate
          ></v-progress-circular>
        </div>

      </div>
      <div>

        <slider class="mb-14 mt-4" title="Rutinas destacadas">
          <v-slide-item v-for="routine in topRoutines" :key="routine.id">
            <card-rutina :rating="routine.averageRating"
                         :time="getDuration(routine)"
                         :titulo="routine.name"
                         :type="routine.category.name.toLowerCase()"
                         :id_routine="routine.id"
                         class="ma-4"></card-rutina>
          </v-slide-item>
        </slider >
        <div class="text-center"
             v-if="loading">
          <v-progress-circular
              :size="120"
              color="blue darken-1"
              class="mt-6 mb-10"
              indeterminate
          ></v-progress-circular>
        </div>
        <v-divider></v-divider>
      </div>

    <div v-for="categoria in categories" :key="categoria.id">
      <slider   class="mb-14 mt-4" :title=getCategoryName(categoria.name) mas-info="true" :go-to="getLinkToCategory(categoria)">
            <v-slide-item v-for="routine in filterCategorys(info,categoria.name)" :key="routine.id">
              <card-rutina :rating="routine.averageRating"
                           :time="getDuration(routine)"
                           :titulo="routine.name"
                           :type="routine.category.name.toLowerCase()"
                           :id_routine="routine.id"
                           class="ma-4"></card-rutina>
            </v-slide-item>
        </slider>
        <v-divider></v-divider>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import cardRutina from "@/components/CardRutina";
import slider from "@/components/Slider";
import NavBar from "@/components/NavBar";
import axios from 'axios';
import { store } from '../userStore.js';
import Footer from "@/components/Footer";


export default {
  name: "Home",
  components: {
    NavBar,
    cardRutina,
    slider,
    Footer
  },
  data() {
    return {
      model: null,
      myStore: store,
      info:[],
      categories:[],
      loading: true
    }
  },
  computed: {
    topRoutines(){
      if (this.info.size < 20)
        return this.info;
      else
        return this.info.slice(0,19);


    },
    userRoutines() {
      return this.info.filter(routine => routine.creator.id === store.userInfo.id && routine.name !== '$@&#%*');
    },
    noRoutines() {
      return this.userRoutines.length === 0;
    },
  },
  methods: {
    getCategoryName (name){
      return 'Rutinas de ' + name;
    },
    getLinkToCategory(category){
      return '/category/'+category.id;
    },
    goToSignUp() {
      this.$router.push('/signup');
    },
    filterCategorys (routines,categoryName){
      return routines.filter(routine => routine.category.name === categoryName && routine.id !== 1 && routine.name !== '$@&#%*');
    },
    getDuration(routine) {
      return routine.detail.split('|')[0];
    }
  },
  mounted() {
    axios.all([axios.get('/routines',{
      params:{
        orderBy: 'averageRating',
        direction: 'desc',
        size: 100


      }
    }),
      axios.get('/categories')]).then(axios.spread((response1, response2) => {
        this.loading = false;
      this.info = response1.data.results;
      this.categories = response2.data.results;
      console.log(this.info);
      console.log(this.categories);
    })).catch(error => {
          console.log(error);
    }

    );
  }
}
</script>

<style scoped>

</style>
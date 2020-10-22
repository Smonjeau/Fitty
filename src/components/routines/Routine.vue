<template>
  <div>
    <NavBar></NavBar>
    <div class="px-14 mt-3">
      <v-row no-gutters class="justify-start">
        <v-col cols="12">
          <v-breadcrumbs
              :items="links"
              large
          ></v-breadcrumbs>
        </v-col>
      </v-row>
      <v-row class="justify-center ml-2">
        <v-col cols="7">
          <div class="text-h4 font-weight-bold text-left">{{ routine.name }}</div>
          <RoutineCycleView
              v-for="cycle in cycles"
              v-bind:key="cycle.id"
              :title="cycle.name"
              :qty="cycle.repetitions"
              :id_routine="id_routine"
              :id_cycle="cycle.id"
              ></RoutineCycleView>
        </v-col>

        <v-col class="pt-16" cols="5">
          <v-row >
            <v-col>
              <div class="text-h6 font-weight-bold">Categoría: {{ capitalizeFirstLetter(routine.category.name) }}</div>
            </v-col>
            <v-col>
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
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2" class="justify-start">
              <v-avatar size="70">
                <v-img v-bind:key="routine.creator.id" :src="routine.creator.avatarUrl" :alt="'Avatar de ' + routine.creator.username"  contain></v-img>
              </v-avatar>
            </v-col>
            <v-col cols="10" class="align-self-center justify-start">
              <div class="text-h6 font-weight-black">{{ routine.creator.username }}</div>
            </v-col>
          </v-row>
          <!--<v-row>
            <v-col>
              <span class="text-h6 mr-2">{{ time }}'</span>
              <img src="../assets/stopwatch.png" width="28px" height="28px" />
            </v-col>
            <v-col>

            </v-col>
          </v-row>-->
          <v-row>
            <v-col>
              <div class="text-subtitle-1 mt-5">{{ routine.detail }}</div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </div>
  <!--<div>

    <div v-for="section in store.get()" :key="section">
      <button @click="removeSection(section)">X</button>
      <span>{{ section }}</span>
    </div>-->
    <!--id: {{ $route.params.id_routine }}

/div>-->
</template>

<script>
import NavBar from "@/components/NavBar";
import RoutineCycleView from "@/components/routines/RoutineCycleView";
import axios from 'axios';

export default {
name: "Routine",
  data() {
    return {
      links: [
        {
          text: 'Inicio',
          disabled: false,
          href: '/',
        },
        {
          text: '',
          disabled: false,
          href: '/category/',
        },
        {
          text: 'Rutina',
          disabled: true,
          href: 'routine',
        },
      ],
      id_routine: this.$route.params.id_routine,
      routine: {},
      color: 'amber darken-1',
      title: 'Este es el título de la rutina',
      categoria: 'Piernas',
      detail: 'Con esta rutina vas a quedar nivel Hulk, no te digo que vas a sacar algo de musculito, sino que vas a quedar con TREMENDAS PIERNAS BRO. Si, así como lees. ¿Estoy escribiendo para rellenar? Quizás. Es importante? No. Los invito a suscribirse a mi canal y dejar su comentario.',
      rating: 4.5,
      creator: {
        id: 3,
        username: "johndoe7",
        gender: "male",
        avatarUrl: "https://www.pngarts.com/files/3/Avatar-PNG-Download-Image.png",
        "dateCreated": 1602139940660,
        "dateLastActive": 1602646870971
      },
      cycles: {}
    }

  },
  components: {
    NavBar,
    RoutineCycleView
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
    }
  },
  mounted() {
    axios.get('routines/' + this.id_routine)
    .then(response => {
      this.routine = response.data;
      this.links[2].text = this.routine.name;
      this.links[1].text = this.capitalizeFirstLetter(this.routine.category.name);
      this.links[1].href += this.routine.category.id;
      console.log(this.routine.creator.avatarUrl);
    })
    axios.get('routines/' + this.id_routine + '/cycles')
    .then(response => {
      this.cycles = response.data.results;
      console.log(this.cycles);
    })
  }
}
</script>


<style scoped>

</style>
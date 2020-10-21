<template>
  <div>
    <NavBar></NavBar>
    <v-container>
      <v-row>
        <v-col>
          <div class="text-h4 font-weight-bold text-left">Este es el titulo de la rutina {{ id_routine }}</div>
          <RoutineCycleView
              v-for="cycle in cycles"
              v-bind:key="cycle"
              :title="cycle.title"
              :qty="cycle.qty"
              :exercises="cycle.exercises"
              ></RoutineCycleView>
        </v-col>

        <v-col class="pt-16">
          <v-row >
            <v-col>
              <div class="text-h6 font-weight-bold">Categoría: {{ categoria }}</div>
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
            <v-col cols="2">
              <v-avatar>
                <v-img v-bind:key="creator" :src="creator.avatarUrl" :alt="'Avatar de ' + creator.username"  contain></v-img>
              </v-avatar>
            </v-col>
            <v-col cols="10">
              <div class="text-h6 font-weight-black">{{ creator.username }}</div>
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
              <div class="text-subtitle-1 mt-5">{{ detail }}</div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>


    </v-container>
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
//import cardRutina from "@/components/CardRutina";
//import slider from "@/components/Slider";
//import SectionStore from "@/store/SectionStore";

export default {
name: "Routine",
  data() {
    return {
      /*store: SectionStore*/
      id_routine: this.$route.params.id_routine,
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
      cycles: [
        { title: 'Calentamiento', qty: 1,
          exercises: [
            { title: 'Flexiones', qty: 1 },
            { title: 'Flexiones', qty: 4 },
            { title: 'Flexiones', qty: 2 }
          ]
        },
        { title: 'EMOM', qty: 2,
          exercises: [
            { title: 'Flexiones', qty: 1 },
            { title: 'Flexiones', qty: 4 },
            { title: 'Flexiones', qty: 2 }
          ]
        },
        { title: 'Elongacion', qty: 1,
          exercises: [
            { title: 'Flexiones', qty: 1 },
            { title: 'Flexiones', qty: 4 },
            { title: 'Flexiones', qty: 2 }
          ]
        }
      ]
    }

  },
  components: {
    NavBar,
    RoutineCycleView
  },
  methods: {
    /*addSection() {
      this.store.add('Seccion');

    }*/
  },
}
</script>


<style scoped>

</style>
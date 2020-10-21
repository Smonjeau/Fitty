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
      /*store: SectionStore,
      name: '',
      category:'',
      duration: 0*/
      id_routine: this.$route.params.id_routine,
      title: 'Este es el título de la rutina',
      categoria: 'Piernas',
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
<template>
  <div>
    <NavBar></NavBar>
    <v-container>
      <p class="font-weight-bold display-2 mt-4 mb-10 text-center">Mis Ejercicios</p>
      <ExerciseItem
          v-for="exercise in exercises" v-bind:key="exercise" :exercise="exercise"></ExerciseItem>
    </v-container>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import ExerciseItem from "@/components/ExerciseItem";
import ExerciseStore from "@/store/ExcerciseStore";
export default {
name: "MisEjercicios",
  components: {ExerciseItem, NavBar},
  data() {
    return {
      store: ExerciseStore,
      exercises: [
        { name: 'Flexion de brazo diamante', qty: 3, videoUrl: 'https://www.youtube.com/watch?v=UsH8K0homso'},
        { name: 'Repiqueteo en el lugar', qty: 4, videoUrl: 'https://www.youtube.com/watch?v=UsH8K0homso'}
      ]
    }
  },
  beforeMount() {
    /*if(this.store) {
      this.exercises.forEach(function (item) {
        this.store.add(item);
      });
    }*/


  }
}
</script>

<style scoped>

</style>
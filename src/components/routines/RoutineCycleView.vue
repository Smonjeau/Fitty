<template>
  <div>

    <v-card
        class="mt-8"
        color="#26c6da"
        max-width="500"

    >
      <v-card-title class="blue darken-1 white--text">
        <v-row class="my-0 py-0">
          <v-col class="my-0 py-0">{{ title }}</v-col>
          <v-col class="my-0 py-0">x {{ qty }}</v-col>
        </v-row>
      </v-card-title>

      <v-card-text class="text-h6 font-weight-bold blue-grey lighten-5 black--text pt-4">
        <RoutineExerciseView
            v-for="exercise in exercises"
            v-bind:key="exercise"
            :title="exercise.name"
            :qty="getReps(exercise)"
            :id_routine="id_routine"
            :id_cycle="id_cycle"
            :id_exercise="exercise.id"
        ></RoutineExerciseView>
      </v-card-text>


    </v-card>
  </div>
</template>

<script>
import RoutineExerciseView from "@/components/routines/RoutineExerciseView";
import axios from 'axios';

export default {
name: "RoutineCycleView",
  props: ['title', 'qty', 'id_routine', 'id_cycle'],
  components: {
    RoutineExerciseView
  },
  data() {
    return {
      exercises: {}
    }
  },
  mounted() {
    axios.get('/routines/' + this.id_routine + '/cycles/' + this.id_cycle + '/exercises')
    .then(response => {
      this.exercises = response.data.results;
    })
  },
  methods: {
    getReps(exercise) {
      if (exercise.repetitions != 0) return 'x ' + exercise.repetitions.toString();
      else if (exercise.duration != 0) return exercise.duration.toString() + 's';
    }
  }
}
</script>

<style scoped>

</style>
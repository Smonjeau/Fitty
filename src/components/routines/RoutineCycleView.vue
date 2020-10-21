<template>
  <div>

    <v-card
        class="mt-8"
        color="#26c6da"
        max-width="400"

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
            :title="exercise.title"
            :qty="exercise.qty"></RoutineExerciseView>
      </v-card-text>


    </v-card>
  </div>
</template>

<script>
import RoutineExerciseView from "@/components/routines/RoutineExerciseView";

export default {
name: "RoutineCycleView",
  props: ['title', 'qty', 'exercises'],
  components: {
    RoutineExerciseView
  }
}
</script>

<style scoped>

</style>
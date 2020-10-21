<template>
  <div class="text-h6">
    <v-row>
      <v-col>{{ title }}</v-col>
      <v-col>x {{ qty }}</v-col>
    </v-row>
  </div>
</template>

<script>
export default {
name: "RoutineExerciseView",
  props: ['title', 'qty']
}
</script>

<style scoped>

</style>
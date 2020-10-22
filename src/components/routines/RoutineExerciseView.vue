<template>
  <div class="text-h6">
    <v-row>
      <v-col cols="6">{{ title }}</v-col>
      <v-col cols="4">{{ qty }}</v-col>
      <v-col class="text-right">

        <v-dialog
            v-model="dialog"
            max-width="700"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-icon
                medium
                v-bind="attrs"
                v-on="on">mdi-play-circle-outline</v-icon>
          </template>
          <v-card>
            <v-card-title class="headline">
              <v-col>
                Video demostrativo
              </v-col>
              <v-col class="text-right">
                <v-btn
                    color="green darken-1"
                    text
                    @click="dialog = false"
                >
                  Listo
                </v-btn>
              </v-col>
            </v-card-title>
            <v-img
                src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            ></v-img>
          </v-card>
        </v-dialog>



      </v-col>
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
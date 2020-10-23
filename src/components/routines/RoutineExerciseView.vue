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
                <v-row>
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
                </v-row>
              </v-card-title>
              <iframe :src="url" allow="autoplay; encrypted-media" allowfullscreen></iframe>
          </v-card>
        </v-dialog>



      </v-col>
    </v-row>

  </div>
</template>

<script>
import axios from 'axios';

export default {
name: "RoutineExerciseView",
  props: ['title', 'qty', 'id_routine', 'id_cycle', 'id_exercise'],
  data() {
    return {
      url: '',
      dialog: false
    }
  },
  mounted() {
    axios.get('/routines/' + this.id_routine + '/cycles/' + this.id_cycle + '/exercises/' + this.id_exercise + '/videos')
    .then(response => {
      this.url = response.data.results[0].url;
    })
  }
}
</script>

<style scoped>
  iframe {
    width: 100%;
    height: 400px;
  }
</style>
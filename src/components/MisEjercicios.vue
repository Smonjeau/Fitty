<script
    src="../../../Users/Bruno/OneDrive - ITBA/Escritorio/ITBA/HCI/Laboratorio 05 - Taller de Vue.js (Ejemplo CLI)/src/store/CustomerStore.js"></script>
<template>
  <div>
    <NavBar></NavBar>
    <v-container>
      <p class="font-weight-bold display-2 mt-4 mb-10 text-center">Mis Ejercicios</p>
      <ExerciseItem
          v-for="exercise in store.get()"
          v-bind:key="exercise"
          :exercise="exercise"></ExerciseItem>

    </v-container>

    <template>
      <v-row justify="center">
        <v-dialog
            v-model="dialog"
            max-width="450"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                fixed
                right
                bottom
                fab
                dark
                color="indigo"
                class="mr-10 mb-10"
                v-bind="attrs"
                v-on="on"
            >
              <v-icon dark>
                mdi-plus
              </v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="headline">
              Nuevo ejercicio
            </v-card-title>
            <v-card-text>
              <v-text-field
                  v-model="nuevoEjercicio.name"
                  :rules="[rules.required]"
                  label="Nombre del ejercicio"
              ></v-text-field>
              <v-row>
                <v-col cols="7">
                  <v-text-field
                      v-model="nuevoEjercicio.videoUrl"
                      :rules="[rules.link]"
                      label="URL del video"
                  ></v-text-field>
                </v-col>
                <v-col cols="5">
                  <v-text-field
                      v-model="nuevoEjercicio.qty"
                      :rules="[rules.required, rules.number, rules.positive]"
                      prepend-icon="mdi-minus"
                      append-outer-icon="mdi-plus"
                      @click:prepend="decQty()"
                      @click:append-outer="incQty()"
                      outlined
                      label="Repeticiones"
                  ></v-text-field>
                </v-col>
              </v-row>

            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="green darken-1"
                  text
                  @click="dialog = false"
              >
                Cancelar
              </v-btn>
              <v-btn
                  color="green darken-1"
                  text
                  @click="submit();"
              >
                Crear
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>





  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import ExerciseItem from "@/components/ExerciseItem";
import ExerciseStore from "@/store/ExcerciseStore";
import axios from "axios";
export default {
name: "MisEjercicios",
  components: {ExerciseItem, NavBar},
  data() {
    return {
      store: ExerciseStore,
      exercises: [
        { name: 'Flexion de brazo diamante', qty: 3, videoUrl: 'https://www.youtube.com/watch?v=UsH8K0homso'},
        { name: 'Repiqueteo en el lugar', qty: 4, videoUrl: 'https://www.youtube.com/watch?v=UsH8K0homso'}
      ],
      dialog: false,
      nuevoEjercicio: {
        name: '',
        qty: 1,
        videoUrl: ''
      },
      rules: {
        required: value => !!value || 'Obligatorio.',
        name: v => /^[A-Za-z ]+$/.test(v) || 'Solo caractéres del abecedario',
        number: v => !isNaN(v) || 'Tiene que ser un número positivo!',
        positive: v => v>=1 || 'Tiene que ser un número positivo!',
        link: v => /^[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/.test(v) || v === '' || 'No es un link válido!'
      }
    }
  },
  methods: {
    initStore() {
      //En vez de este foreach hay que llamar a la api
      this.exercises.forEach( item => {
        this.store.add(item);
      });
    },
    submit() {
      /*axios.post('/routines/1/cycles/1/exercises', {
        params: {

        }
      })
          .then(() => {
            this.$router.push('/');
          })
          .catch((error) => {
            console.log(error);
          });*/
    }
  },
  beforeMount() {
    if(this.store.empty()) {
      this.initStore();
    }

  }
}
</script>

<style scoped>

</style>
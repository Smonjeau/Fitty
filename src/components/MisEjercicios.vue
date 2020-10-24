<script>
import Footer from "@/components/Footer";
export default {
  components: {Footer}
}
</script>
<template>
  <div>
    <NavBar></NavBar>
    <v-container>
      <p class="font-weight-bold display-2 mt-4 mb-10 text-center">Mis Ejercicios</p>
      <v-row>
        <v-col cols="10" class="pr-8">
          <v-text-field
              v-model="query"
              label="Filtrar por nombre"
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <template>
            <v-row justify="center">
              <v-dialog
                  v-model="dialog"
                  max-width="450"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                      fab
                      dark
                      color="indigo"
                      v-bind="attrs"
                      v-on="on"
                      :disabled="store.idRutina == -1"
                  >
                    <v-icon dark>
                      mdi-plus
                    </v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-form ref="formNuevoEjercicio">
                    <v-card-title class="headline">
                      Nuevo ejercicio
                    </v-card-title>
                    <v-card-text>
                      <v-text-field
                          v-model="nuevoEjercicio.name"
                          :rules="[rules.required]"
                          label="Nombre del ejercicio"
                      ></v-text-field>
                      <v-text-field
                          v-model="nuevoEjercicio.videoUrl"
                          :rules="[rules.link]"
                          label="URL del video"
                      ></v-text-field>
                      <v-row>
                        <v-col>
                          <v-select
                              :items="qtyTypes"
                              label="Tipo"
                              v-model="nuevoEjercicio.type"
                          ></v-select>
                        </v-col>
                        <v-col>
                          <v-text-field
                              v-model="nuevoEjercicio.qty"
                              :rules="[rules.required, rules.number, rules.positive]"
                              prepend-icon="mdi-minus"
                              append-outer-icon="mdi-plus"
                              @click:prepend="decQty()"
                              @click:append-outer="incQty()"
                              outlined
                              :label="nuevoEjercicio.type"
                              :disabled="nuevoEjercicio.type == ''"
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
                          :disabled="!validNewForm()"
                      >
                        Crear
                      </v-btn>
                    </v-card-actions>
                  </v-form>
                </v-card>
              </v-dialog>
            </v-row>
          </template>
        </v-col>
      </v-row>
      <div class="text-center"
        v-if="store.idRutina == -1">
        <v-progress-circular
            :size="120"
            color="blue darken-1"
            class="mt-6"
            indeterminate
        ></v-progress-circular>
      </div>


      <ExerciseItem
          v-for="exercise in store.get(query)"
          v-bind:key="exercise"
          :exercise="exercise"
          :idRutina="store.idRutina"
          :storeRef="store"></ExerciseItem>

    </v-container>
    <Footer></Footer>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import ExerciseItem from "@/components/ExerciseItem";
import ExerciseStore from "@/store/ExcerciseStore";
import Footer from "@/components/Footer";
import axios from "axios";
import * as Swal from "sweetalert2";
import {store} from "@/components/createRoutine/store";
export default {
name: "MisEjercicios",
  components: {ExerciseItem, NavBar, Footer},
  data() {
    return {
      store: ExerciseStore,
      dialog: false,
      nuevoEjercicio: {
        name: '',
        qty: 1,
        type: '',
        videoUrl: ''
      },
      rules: {
        required: value => !!value || 'Obligatorio.',
        name: v => /^[A-Za-z ]+$/.test(v) || 'Solo caractéres del abecedario',
        number: v => !isNaN(v) || 'Tiene que ser un número positivo!',
        positive: v => v>=1 || 'Tiene que ser un número positivo!',
        link: v => /^[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/.test(v) || v === '' || 'No es un link válido!'
      },
      qtyTypes: ['Repeticiones', 'Segundos'],
      query: ''
    }
  },
  methods: {
    error(msg) {
      Swal.fire({
        title: 'Oops, al parecer hubo un error.',
        text: 'No te preocupes, nosotros nos ocupamos.',
        icon: 'error',
        confirmButtonText: 'Ok',
        timer: 3000
      });
      console.log(msg);
    },
    validNewForm() {
      return this.rules.name(this.nuevoEjercicio.name) === true && this.rules.required(this.nuevoEjercicio.name) === true
      && this.rules.number(this.nuevoEjercicio.qty) === true && this.rules.positive(this.nuevoEjercicio.qty) === true && this.rules.required(this.nuevoEjercicio.qty) === true
      && this.rules.required(this.nuevoEjercicio.type) === true
      && this.rules.link(this.nuevoEjercicio.videoUrl) === true;
    },
    initStore() {
      //Buscamos la rutina de name $@&#%*
      //Deberia estar al principio pues deberia ser la primer rutina que se crea
      axios.get('user/current/routines/', {params: {page: 0, size: 1, orderBy: 'dateCreated', direction: 'asc'}})
          .then(response => {
            console.log(response);
            if(response.data.results[0].name == '$@&#%*') {
              this.store.idRutina = response.data.results[0].id;

              //Ahora debo recuperar el ciclo

              axios.get('routines/'+this.store.idRutina+'/cycles', {params: {page: 0, size: 1, orderBy: 'id', direction: 'asc'}})
                  .then(response2 => {
                    if(response2.data.totalCount > 0) {

                      //Ahora debo recuperar los ejercicios
                      axios.get('/routines/'+this.store.idRutina+'/cycles/1/exercises', {params: {page: 0, size: 100, orderBy: 'id', direction: 'asc'}})
                          .then(response3 => {
                            response3.data.results.forEach(item => {
                              //Dado que el response no trae la url del video, hay que hacer un get extra por cada ejercicio
                              axios.get('/routines/'+this.store.idRutina+'/cycles/1/exercises/'+item.id+'/videos', {params: {page: 0, size: 1, orderBy: 'id', direction: 'asc'}})
                              .then(response4 => {
                                let videoUrl = '';
                                let idVideo = -1;
                                if(response4.data.totalCount > 0) {
                                  videoUrl = response4.data.results[0].url;
                                  idVideo = response4.data.results[0].id;
                                }
                                let qty = 0;
                                let type = '';
                                if(item.duration == 0) {
                                  qty = item.repetitions;
                                  type = 'Repeticiones';
                                } else {
                                  qty = item.duration;
                                  type = 'Segundos';
                                }
                                this.store.add({
                                  name: item.name, qty: qty, type: type, videoUrl: videoUrl, idVideo: idVideo, idEjercicio: item.id
                                });
                              })
                              .catch(error4 => {
                                this.error(error4);
                              });
                            });

                          })
                          .catch(error3 => {
                            this.error(error3);
                          });


                    } else {
                      //Falta crear el ciclo
                      Swal.fire({
                        title: 'Oops, al parecer hubo un error, no te preocupes!',
                        text: 'Si los programadores te preguntan diles lo siguiente: falta el ciclo auxiliar que contiene los ejercicios',
                        icon: 'error',
                        confirmButtonText: 'Ok',
                        timer: 3000
                      });
                    }
                  })
                  .catch(error2 => {
                    this.error(error2);
                  });

            } else {
              //Falta crear la rutina
              Swal.fire({
                title: 'Oops, al parecer hubo un error, no te preocupes!',
                text: 'Si los programadores te preguntan diles lo siguiente: falta la rutina auxiliar que contiene los ejercicios',
                icon: 'error',
                confirmButtonText: 'Ok',
                timer: 3000
              });

            }
        })
        .catch(error => {
          this.error(error);
        });
    },
    incQty(){
      this.nuevoEjercicio.qty++;
    },
    decQty(){
      if(this.nuevoEjercicio.qty>=2)
        this.nuevoEjercicio.qty--;
    },
    submit() {
      let duration = 0;
      let repetitions = 0;
      if(this.nuevoEjercicio.type == 'Segundos') {
        duration = this.nuevoEjercicio.qty;
      } else {
        repetitions = this.nuevoEjercicio.qty;
      }
      axios.post('/routines/'+this.store.idRutina+'/cycles/1/exercises', {

          name: this.nuevoEjercicio.name,
          detail: "",
          type: "exercise",
          duration: Number(duration),
          repetitions: Number(repetitions)
      })
      .then(response => {
        let idEjercicio = response.data.id;
        //Falta agregar el video si hay
        if(this.nuevoEjercicio.videoUrl != '') {
          axios.post('/routines/'+this.store.idRutina+'/cycles/1/exercises/'+idEjercicio+'/videos', {
            number: 1,
            url: this.nuevoEjercicio.videoUrl
          })
          .then(response2 => {
            this.dialog = false;
            this.store.add({
              name: this.nuevoEjercicio.name, qty: this.nuevoEjercicio.qty, type: this.nuevoEjercicio.type, videoUrl: this.nuevoEjercicio.videoUrl, idVideo: response2.data.id, idEjercicio: idEjercicio
            });
          })
          .catch(error2 => {
            this.error(error2);
          });

        } else {
          this.dialog = false;
          this.store.add({
            name: this.nuevoEjercicio.name, qty: this.nuevoEjercicio.qty, type: this.nuevoEjercicio.type, videoUrl: this.nuevoEjercicio.videoUrl, idVideo: -1, idEjercicio: idEjercicio
          });
        }
      })
      .catch((error) => {
        this.error(error);
      });
    }
  },
  beforeMount() {
    if(!store.logged)
        this.$router.push('/');
    else if(this.store.empty())
      this.initStore();


  }
}
</script>
<style scoped>

</style>
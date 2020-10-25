<template>
  <div>
      <nav-bar></nav-bar>

    <v-form v-model="valid" v-on:submit.prevent="submitForm">
      <div class="px-14 mt-8">
        <div class="text-center ">
          <p class="font-weight-bold display-2">EDITAR RUTINA</p>
        </div>
        <template>
            <v-container class="my-5">
              <v-row class="justify-md-start">
                <v-col
                    cols="3"
                >
                  <v-text-field
                      v-model="routine.name"
                      :rules="[rules.required]"
                      label="Nombre de la rutina"
                      outlined
                      required
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-select
                      :items="categoriesItems"
                      item-text="name"
                      item-value="id"
                      label="Categoría"
                      v-model="routine.category.id"
                      :rules="[rules.required]"
                      outlined
                      required
                  >
                  </v-select>
                </v-col>
                <v-col cols="3">
                  <v-select
                      :items="availableDificulty"
                      item-text="title"
                      item-value="value"
                      outlined
                      v-model="routine.difficulty"
                      :menu-props="{ top: false, offsetY: true }"
                      label="Dificultad"
                      :rules="[rules.required]"
                      required
                  ></v-select>
                </v-col>
                <v-col cols="2">
                  <v-text-field
                      v-model="duration"
                      outlined
                      scop
                      :rules="[rules.number, rules.required, rules.positive]"
                      label="Duración (mins)"
                      required
                  ></v-text-field>
                </v-col>

              </v-row>
              <v-row>
                <v-col cols="11">
                  <v-textarea
                      outlined
                      name="input-7-4"
                      label="Descripción"
                      v-model="routine.detail"
                      :rules="[rules.required]"
                      required
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>

      </template>


        <routine_panel :id_routine="id" :order="1" :done="done" :old-cycle="cycles[0]" :isNew="false"></routine_panel>

        <div v-for="index in cant_cycles - 2" :key="index">
          <routine_panel :isDeletable="true" :isModifiable="true" :done="done" :id_routine="id" :order="index + 2" :old-cycle="cycles[index]" :isNew="false"></routine_panel>
        </div>

        <div v-for="index in added_cycles" :key="index">
          <routine_panel :isDeletable="true" :isModifiable="true" :id_routine="id" :order="index + cant_cycles" :title="sectionName(index + cant_cycles - 2)" :isNew="true" :done="done"></routine_panel>
        </div>

        <routine_panel :id_routine="id" :done="done" :order="99" :old-cycle="cycles[cant_cycles - 1]" :isNew="false"></routine_panel>

      <v-row justify="center">
        <v-col class="text-center">
          <v-btn large @click="inc()" class="mb-5 white--text" rounded color="blue darken-1">
            <v-icon left >
              mdi-plus-circle-outline
            </v-icon>
            <span>Agregar sección</span>
          </v-btn>
        </v-col>
      </v-row>

        <v-row class="justify-center">

          <v-col md="2 text-center">
            <v-btn color="blue white--text" class="my-5" outlined @click="cancel()">
              Cancelar
            </v-btn>
          </v-col>

          <v-col md="2 text-center">
            <v-btn color="blue white--text" class="my-5" type="submit"><!--:disabled="errors"-->
              Finalizar
            </v-btn>
          </v-col>

          <v-col md="2 text-center">
            <v-btn color="red red--text" class="my-5" outlined @click="eliminate()">
              Eliminar
            </v-btn>
          </v-col>

        </v-row>
    </div>

    </v-form>
    <Footer></Footer>
  </div>
</template>

<script>
import routine_panel from "@/components/editRoutine/routine_panel";
import NavBar from "@/components/NavBar";
import { store } from './store';
import Swal from "sweetalert2";
import axios from "axios";
import Footer from "@/components/Footer";

export default {
  name: "edit_routine",
  components: {
    NavBar,
    routine_panel,
    Footer
  },
  data() {
    return {
      routine: {
        name: '',
        detail: '',
        isPublic: true,
        category: { id: 0 },
        difficulty: ''
      },
      valid: false,
      duration: '',
      categoriesItems: [],
      availableDificulty: [
          { title: 'Aficionado', value: 'rookie'},
          { title: 'Principiante', value: 'beginner'},
          { title: 'Intermedio', value: 'intermediate'},
          { title: 'Avanzado', value: 'advanced'},
          { title: 'Experto', value: 'expert'}
        ],
      extraSections: 0,
      rules: {
        required: value => !!value || 'Obligatorio.',
        name: v => /^[A-Za-z ]+$/.test(v) || 'Solo caractéres del abecedario',
        number: v => !isNaN(v) || 'Tiene que ser un número positivo!',
        positive: v => v>=1 || 'Tiene que ser un número positivo!',
        link: v => /^[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/.test(v) || 'No es un link válido!',
      },
      id: parseInt(this.$route.params.id_routine),
      done: false,
      cycles: [],
      cant_cycles: 0,
      added_cycles: 0,
      detail: '',
      store: store
    }
  },
  methods: {
    inc(){
      this.added_cycles++;
    },
    sectionName(offset){
      return "Ciclo " + offset.toString();
    },
    sendInt(index) {
      return (parseInt(index) + 2).toString();
    },
    cancel() {
      Swal.fire({
        title: 'Seguro que quieres borrarlo?',
        text: "Esta acción es irreversible",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1E88E5',
        confirmButtonText: 'Si, borrar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.$router.back();
        }
      })
    },
    capitalizeFirstLetter(string) {
      return string.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
    },
    submitForm() {
      console.log('Hello');
      this.routine.detail = this.duration + '|' + this.routine.detail;
      axios.put('routines/' + this.id, this.routine)
      .then( response => {
        console.log("Updated Succesfully");
        console.log(response.data);
        Swal.fire({
          title: "Se ha actualizado correctamente",
          text: "Aguarde y será redirigido automaticamente",
          icon: "success",
          timer: "9000",
          showConfirmButton:false
        })
        setTimeout(() => this.$router.back(), 9000);
        //this.$router.back();
      }).catch(error => {
        console.log(error);
      })
    },
    eliminate() {
      Swal.fire({
        title: 'Seguro que quieres borrarlo?',
        text: "Esta acción es irreversible",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1E88E5',
        confirmButtonText: 'Si, borrar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.cycles.forEach(cycle => {
            axios.get('routines/' + this.id + '/cycles/' + cycle.id + '/exercises')
                .then(response => {
                  response.data.results.forEach(exercise => {
                    axios.delete('routines/' + this.id + '/cycles/' + cycle.id + '/exercises/' + exercise.id);
                  })
                  axios.delete('routines/' + this.id + '/cycles/' + cycle.id);
                })
          })
          axios.delete('routines/' + this.id);
          Swal.fire({
            title: 'Se ha borrado con Exito',
            icon: 'success',
            timer: 2000
          });
          this.$router.push('/mis_rutinas');
        }
      })
    },
  },
  mounted() {
    axios.get('routines/' + this.id + '/cycles', { params: {size: 100, orderBy: 'order'}})
    .then(response =>{
      this.cycles = response.data.results;
      this.cant_cycles = response.data.totalCount;
      console.log(response.data.results);
    })
    axios.get('routines/' + this.id)
    .then(response => {
      this.routine = response.data;
      this.duration = this.routine.detail.split('|')[0];
      this.routine.detail = this.routine.detail.split('|')[1];
    })
    store.getMyExercises();
    axios.get('categories', {params: {orderBy: 'name', direction: 'desc'}})
        .then(response => {
          this.categoriesItems.push(...response.data.results);
          this.categoriesItems.forEach((val, index) => this.categoriesItems[index].name = this.capitalizeFirstLetter(val.name));
        });
  },
  computed: {
    errors: function() {
      return store.errors > 0;
    }
  }
}
</script>

<style scoped>
  .theme--light.v-input input {
    color: #ffffff!important;
  }
</style>
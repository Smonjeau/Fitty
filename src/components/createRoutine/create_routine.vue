<template>
  <div>
      <nav-bar></nav-bar>
      <v-container>
        <v-breadcrumbs
            :items="links"
            large
        ></v-breadcrumbs>
      </v-container>
      <div class="px-14 mt-8">
        <div class="text-center ">
          <p class="font-weight-bold display-2">CREAR RUTINA</p>
        </div>
        <v-form v-model="valid" ref="form">
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
                  ></v-select>
                </v-col>
                <v-col cols="2">
                  <v-text-field
                      v-model="duration"
                      outlined
                      scop
                      :rules="[rules.number, rules.required, rules.positive]"
                      label="Duración (mins)"
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
                      :rules="[rules.required, rules.details]"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>

      </template>

          <routine_panel title="Calentamiento" :id_routine="id" :order="1"></routine_panel>

          <routine_panel title="Ciclo 1" :isModifiable="true" :id_routine="id" :order="2"></routine_panel>

          <div v-for="index in extraSections" :key="index">
            <routine_panel :title="sectionName(index+1)" :isDeletable="true" :isModifiable="true" :id_routine="id" :order="index + 2"></routine_panel>
          </div>

          <routine_panel title="Enfriamiento" :id_routine="id" :order="99"></routine_panel>

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

          <v-col md="2" class="text-center">
            <v-btn color="blue white--text" class="my-5" outlined @click="cancel()">
              Cancelar
            </v-btn>
          </v-col>

          <v-col md="2" class="text-center">
            <v-btn color="blue white--text" class="my-5" @click="submit()"><!-- :disabled="errors"-->
              Finalizar
            </v-btn>
          </v-col>

          </v-row>
        </v-form>
      </div>
    <Footer></Footer>
  </div>
</template>

<script>
import routine_panel from "@/components/createRoutine/routine_panel";
import NavBar from "@/components/NavBar";
import { store } from './store';
import Swal from "sweetalert2";
import axios from "axios";
import Footer from "@/components/Footer";

export default {
  name: "create_routine",
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
        dateCreated: Date.now(),
        averageRating: 0,
        isPublic: true,
        category: { id: 0 },
        difficulty: '',
      },
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
        details: v => v.length <= 200 || 'Máximo 200 caracteres'
      },
      id: -1,
      disabled: false,
      countChildren: 0,
      valid: true,
      myStore: store,
      links: [
        {
          text: 'Inicio',
          disabled: false,
          href: '/',
        },
        {
          text: 'Crear rutina',
          disabled: true,
          href: 'create_routine',
        },
      ]
    }
  },
  methods: {
    inc(){
      this.extraSections++;
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
    submit() {
      this.routine.detail = this.duration + '|' + this.routine.detail;
      axios.post('routines', this.routine)
      .then( response => {
        this.id = response.data.id;
        Swal.fire({
          title: "¡La rutina fue creado con éxito!",
          text: "Aguarde y será redirigido automaticamente",
          icon: "success",
          timer: 9000,
          showConfirmButton:false
        });
        setTimeout(() => this.$router.push('/mis_rutinas'), 9000);
        //this.$router.push('/');
      }).catch(error => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        });
        Toast.fire({
          icon: 'error',
          title: error
        });
        console.log(error);
      })
    }
  },
  beforeMount() {
    if(localStorage.getItem('token') == null)
      this.$router.push('/');
  },
  mounted() {
    store.getMyExercises();
    axios.get('categories', {params: {orderBy: 'name', direction: 'desc'}})
        .then(response => {
          this.categoriesItems.push(...response.data.results);
          this.categoriesItems.forEach((val, index) => this.categoriesItems[index].name = this.capitalizeFirstLetter(val.name));
        });
  },
  watch: {
    extraSections: function() {
      console.log(this.extraSections);
    },
    valid() {
      if (this.valid) {
        this.myStore.errors--;
      } else {
        this.myStore.errors++;
      }
    }
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
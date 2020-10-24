<template>
    <v-container class="my-5" v-if="alive">

      <v-expansion-panels accordion multiple>
        <v-row no-gutters >
          <v-col cols="11">
        <v-expansion-panel class="mb-7" py-0>

          <v-expansion-panel-header  @keyup.space.prevent inside   color="blue" class="white--text pb-0" append-icon="mdi-delete">
            <v-container pb-0>
            <v-row class="nombreCiclo">
              <v-col cols="3">
                <v-text-field  :readonly="!isModifiable"
                              :rules="[rules.required]"
                              v-model="cycle.name"
                              @click.native.stop="true"
                               required
                >
                  <v-icon v-if="isModifiable" slot="append">mdi-pencil</v-icon>
                </v-text-field>
              </v-col>

              <v-col cols="3">
              <v-text-field
                  @click.native.stop="true"
                  prepend-icon="mdi-minus"
                  label="Repeticiones"
                  :rules="[rules.required, rules.number, rules.positive]"
                  append-outer-icon="mdi-plus"
                  @click:prepend="decQty()"
                  @click:append-outer="incQty()"
                  v-model="cycle.repetitions"
                  outlined
                  required
              >
              </v-text-field>
              </v-col>
            </v-row>
            </v-container>
            <template v-slot:actions>
              <v-icon color="white" large>mdi-chevron-down</v-icon>
            </template>
          </v-expansion-panel-header>

          <v-expansion-panel-content>

            <div v-for="(exercise, index) in listExcercises" :key="exercise.id">
              <excercise_form :id="index" :id_routine="id_routine" :id_cycle="cycle.id" :oldExercise="exercise" :done="imDone"></excercise_form>
            </div>

            <div v-for="index in added_exercise" :key="index">
              <excercise_form :id="index + cant_exercises" :id_routine="id_routine" :id_cycle="cycle.id" :isNew="true" :done="imDone"></excercise_form>
            </div>

            <v-btn small class="my-5 mx-3" @click="add() ">
              <v-icon left>
                mdi-plus-circle-outline
              </v-icon>
              <span>Agregar ejercicio</span>
            </v-btn>

          </v-expansion-panel-content>
        </v-expansion-panel>
          </v-col>
          <v-col class="justify-center align-self-center mb-8 ml-4">
          <v-icon v-if="this.isDeletable" @click="killMe()" size="40" color="red">mdi-trash-can-outline</v-icon>
          </v-col>
        </v-row>

      </v-expansion-panels>
    </v-container>
  <!--/squeleton!-->
</template>

<script>
import excercise_form from "@/components/editRoutine/excercise_form";
import ExerciseStore from "@/store/ExcerciseStore";
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'
import axios from 'axios';

export default {
  name: "routine_panel",
  components: {excercise_form},
  props: {
    title: String,
    isModifiable: Boolean,
    isDeletable: Boolean,
    id_routine: Number,
    order: Number,
    done: Boolean,
    oldCycle: Object,
    isNew: Boolean
  },
  data() {
    return {
      cycle: {
        id: 0,
        name: '',
        detail: '',
        order: this.order,
        type: 'exercise',
        repetitions: 1
      },
      exercisesQty: 1,
      ex_id: 0,
      store: ExerciseStore,
      excercises: [0],
      rules: {
        required: value => !!value || 'Obligatorio.',
        number: v => !isNaN(v) || 'Tiene que ser un número positivo!',
        positive: v => v >= 1 || 'Tiene que ser un número positivo!'
      },
      alive: true,
      id_cycle: 0,
      imDone: false,
      listExcercises: [],
      cant_exercises: 0,
      added_exercise: 0
    }
  },
  methods: {
    add() {
      this.added_exercise++;
      this.ex_id++;
      this.excercises.push(this.ex_id);
    },
    incQty() {
      if (isNaN(this.cycle.repetitions))
        return this.cycle.repetitions = 1;
      this.cycle.repetitions++;
    },
    decQty() {
      if (isNaN(this.cycle.repetitions))
        return this.cycle.repetitions = 1;
      if (this.cycle.repetitions >= 2)
        this.cycle.repetitions--;
    },
    killMe() {
      Swal.fire({
        title: 'Seguro que quieres borrarlo?',
        text: "Esta acción es irreversible",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.alive = false;
        }
      })
    },
  },
  watch: {
    done: function() {
      if (!this.alive && !this.isNew) {
        console.log("Entered");
        this.listExcercises.forEach(exercise => {
          console.log("Entered");
          console.log(this.id_routine);
          console.log(this.cycle.id);
          console.log(exercise.id);
          axios.delete('routines/' + this.id_routine + '/cycles/' + this.cycle.id + '/exercises/' + exercise.id)
          .then(response => {
            console.log(response.data);
          })
        });
        axios.delete('routines/' + this.id_routine + '/cycles/' + this.cycle.id)
            .then(response => {
              console.log(response.data);
            })
        return;
      }
      if (!this.alive) return;

      this.cycle.detail = this.cycle.name;
      this.cycle.order = this.order;
      if (this.title === 'Enfriamiento') {
        this.cycle.order = this.order + 5;
      }
      if (!this.isNew) {
        axios.put('routines/' + this.id_routine + '/cycles/' + this.cycle.id, {name: this.cycle.name, detail: this.cycle.detail, type: this.cycle.type, order: this.cycle.order, repetitions: this.cycle.repetitions})
            .then(response => {
              console.log(response.data);
              this.imDone = true;
            }).catch(error => {
          console.log('cycle' + error);
        })
      } else {
        axios.post('routines/' + this.id_routine + '/cycles', {name: this.cycle.name, detail: this.cycle.detail, type: this.cycle.type, order: this.cycle.order, repetitions: this.cycle.repetitions})
            .then(response => {
              this.id_cycle = response.data.id;
              this.imDone = true;
            }).catch(error => {
          console.log(this.cycle.order);
          console.log('cycle' + error);
        })
      }
    }
  },
  mounted() {
    if (this.isNew === true) {
      this.cycle.name = this.title;
    } else {
      this.cycle = this.oldCycle;
      axios.get('routines/' + this.id_routine + '/cycles/' + this.cycle.id + '/exercises', {params: {size: 100}})
          .then(response => {
            this.cant_exercises = response.data.totalCount;
            this.listExcercises = response.data.results;
          })
    }
  }
}
</script>


<style>
  .nombreCiclo .theme--light.v-text-field > .v-input__control > .v-input__slot:before {
    border-color: rgb(255 255 255 / 42%)!important;
  
  }

  .nombreCiclo input,
  .nombreCiclo .theme--light.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state) > .v-input__control > .v-input__slot fieldset,
  .nombreCiclo .theme--light:not(.v-input--is-focused) .v-label,
  .nombreCiclo .theme--light.v-icon
  {
    color: #ffffff!important;
  }


</style>
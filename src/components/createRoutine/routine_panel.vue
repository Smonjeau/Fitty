<template>
  <v-form ref="form" v-if="alive"
          v-model="valid">
    <v-container class="my-5" v-if="alive" >
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
            <div v-for="index in exercisesQty" :key="index">
              <excercise_form :id="index" :id_routine="id_routine" :id_cycle="id_cycle"></excercise_form>
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
  </v-form>
</template>

<script>
import excercise_form from "@/components/createRoutine/excercise_form";
import ExerciseStore from "@/store/ExcerciseStore";
import Swal from 'sweetalert2';
import axios from 'axios';
import {eventBus} from "@/main";
import {store} from "./store";

export default {
  name: "routine_panel",
  components: {excercise_form},
  props: {
    title: String,
    isModifiable: Boolean,
    isDeletable: Boolean,
    id_routine: Number,
    order: Number
  },
  data() {
    return {
      cycle: {
        name: this.title,
        detail: this.name,
        type: 'exercise',
        order: this.order,
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
      valid: true,
      myStore: store
    }
  },
  methods: {
    add() {
      this.exercisesQty++;
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
          this.myStore.errors--;
          this.alive = false;
        }
      })
    },
  },
  watch: {
    id_routine: function() {
      this.cycle.detail = this.cycle.name;
      this.cycle.order = this.order;
      axios.post('routines/' + this.id_routine + '/cycles', {name: this.cycle.name, detail: this.cycle.detail, type: this.cycle.type, order: this.cycle.order, repetitions: this.cycle.repetitions})
      .then(response => {
        this.id_cycle = response.data.id;
      }).catch(error => {
        console.log(this.cycle.order);
        console.log('cycle' + error);
      })
    },
    cycle: function() {
      console.log(this.checkValidation());
      if (this.checkValidation()) {
        eventBus.$emit('getError');
      } else {
        eventBus.$emit('getFixed');
      }
    },
    valid() {
      if (this.valid) {
        this.myStore.errors--;
      } else {
        this.myStore.errors++;
      }
    }
  },
  mounted() {
    this.myStore.errors++;
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
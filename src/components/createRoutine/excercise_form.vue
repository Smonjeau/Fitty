<template>
  <v-form v-model="valid" v-if="alive">
    <v-container>
      <v-row class="justify-space-around">
        <v-col
            cols="3"
        >
          <v-select
              :items="myStore.myExercises"
              item-text="name"
              label="Ejercicio"
              v-model="exercise"
              return-object
          ></v-select>
        </v-col>
        <v-col cols="2">

          <v-text-field
              v-model="excerciseData.qty"
              outlined
              :rules="[rules.required, rules.number, rules.positive]"
              prepend-icon="mdi-minus"
              append-outer-icon="mdi-plus"
              @click:prepend="dec()"
              @click:append-outer="inc()"
          >

          </v-text-field>

        </v-col>

        <v-col cols="3">
          <v-select
              :items="items"
              v-model="excerciseData.type"
              label="Repeticiones/Segundos"
              :menu-props="{ top: false, offsetY: true }"

              outlined

          ></v-select>
        </v-col>

        <v-col
            cols="3"
        >
          <v-text-field

            v-model="excerciseData.link"
            label="Video link"
            :rules="[rules.required, rules.link]"
            outlined

          ></v-text-field>
        </v-col>
        <v-col class="align-self-center mb-8">
          <v-icon @click="killMe()" color="blue darken-1">mdi-minus-circle-outline</v-icon>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import ExerciseStore from "@/store/ExcerciseStore";
import routine_panel from "@/components/createRoutine/routine_panel";
import { store } from './store';
import axios from 'axios';

export default {
  name: "excercise_form",
  props: {
    id: Number,
    id_routine: Number,
    id_cycle: Number
  },
  methods:{
    dec(){
      if(isNaN(this.excerciseData.qty))
        return this.excerciseData.qty=1;
      if(this.excerciseData.qty>1)
        this.excerciseData.qty--;
    },
    inc(){
      if(isNaN(this.excerciseData.qty))
        return this.excerciseData.qty=1
      this.excerciseData.qty++;

    },
    remove(){
      this.panel.dec();
      //this.panel.methods.remove(this.props.id);

    },
    killMe() {
      if (this.id !== 1) this.alive = !this.alive;
    }
  },
  data() {
    return {
      valid: false,
      items: ["Repeticiones","Segundos"],
      excerciseData: {
        name: '',
        detail: '',
        qty: 1,
        type: "Repeticiones",
        link: ''
      },
      panel: routine_panel,
      store: ExerciseStore,
      show: false,
      rules: {
        required: value => !!value || 'Obligatorio.',
        name: v => /^[A-Za-z ]+$/.test(v) || 'Solo caractéres del abecedario',
        number: v => !isNaN(v) || 'Tiene que ser un número positivo!',
        positive: v => v>=1 || 'Tiene que ser un número positivo!',
        link: v => /^[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/.test(v) || 'No es un link válido!',

      },
      myStore: store,
      exercise: {},
      alive: true,
      duration: 0,
      repetitions: 0,
      type: 'exercise',
      number: 1
    }

  },
  watch: {
    exercise: function() {
      if (this.exercise.duration !== 0) {
        this.excerciseData.qty = this.exercise.duration;
        this.excerciseData.type = this.items[1];
      } else {
        this.excerciseData.qty = this.exercise.repetitions;
        this.excerciseData.type = this.items[0];
      }
      this.excerciseData.name = this.exercise.name;
      this.excerciseData.detail = this.exercise.detail;
      store.getVideo(this.exercise.id);
      this.excerciseData.link = store.video;
    },
    id_cycle: function () {
      if (this.excerciseData.type === 'Repeticiones') {
        this.repetitions = this.excerciseData.qty;
        this.duration = 0;
      } else {
        this.repetitions = 0;
        this.duration = this.excerciseData.qty;
      }

      axios.post('routines/' + this.id_routine + '/cycles/' + this.id_cycle + '/exercises',
          {name: this.excerciseData.name, detail: this.excerciseData.detail, type: this.type, duration: this.duration, repetitions: this.repetitions, order: this.id })
      .then(response => {
        if (this.excerciseData.link !== '') {
          axios.post('routines/' + this.id_routine + '/cycles/' + this.id_cycle + '/exercises/' + response.data.id + '/videos',
              {number: this.number, url: this.excerciseData.link})
          .then(response1 => {
            console.log(response1.data);
          })
        }
      }).catch(error => {
        console.log(this.excerciseData.name);
        console.log('exercise' + error);
      })
    }
  }
}


</script>

<style scoped>

</style>
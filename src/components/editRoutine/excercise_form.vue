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
              @change="getExerciseInfo()"
              :rules="[rules.required]"
              required
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
              required
          >
          </v-text-field>

        </v-col>

        <v-col cols="3">
          <v-select
              :items="items"
              v-model="excerciseData.type"
              label="Repeticiones/Segundos"
              :menu-props="{ top: false, offsetY: true }"
              :rules="[rules.required]"
              outlined
              required
          ></v-select>
        </v-col>

        <v-col
            cols="3"
        >
          <v-text-field

            v-model="excerciseData.link"
            label="Video link"
            :rules="[rules.link]"
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
    id_cycle: Number,
    oldExercise: Object,
    isNew: Boolean,
    done: Boolean
  },data() {
    return {
      valid: true,
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
        link: v => /^[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/.test(v) || v === ''  || 'No es un link válido!',
      },
      myStore: store,
      exercise: null,
      alive: true,
      duration: 0,
      repetitions: 0,
      type: 'exercise',
      number: 1,
      myId: 0,
    }
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
    },
    killMe() {
      if (this.isNew) {
        this.myStore.errors--;
      }
      this.alive = !this.alive;
    },
    getExerciseInfo() {
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
    }
  },
  mounted() {
    if (!this.isNew) {
      this.myId = this.oldExercise.id;
      this.excerciseData.name = this.oldExercise.name;
      this.excerciseData.detail = this.oldExercise.detail;
      this.exercise = this.oldExercise.name;
      if (this.oldExercise.duration !== 0) {
        this.excerciseData.qty = this.oldExercise.duration;
        this.excerciseData.type = "Segundos";
      } else {
        this.excerciseData.qty = this.oldExercise.repetitions;
        this.excerciseData.type = "Repeticiones";
      }
      axios.get('routines/' + this.id_routine + '/cycles/' + this.id_cycle + '/exercises/' + this.myId + '/videos')
          .then(response => {
            if (response.data.totalCount !== 0) this.excerciseData.link = response.data.results[0].url;
          })
    }
  },
  watch: {
    valid() {
      if (this.id === 1 && this.isNew) {
        if (this.valid) {
          this.myStore.errors--;
        }
      }
    },
    done: function () {
      if (!this.alive && !this.isNew) {
        axios.delete('routines/' + this.id_routine + '/cycles/' + this.id_cycle + '/exercises/' + this.oldExercise.id)
        .then(response => {
          console.log(response.data);
        })
      }
      if (!this.alive) return;

      if (this.excerciseData.type === 'Repeticiones') {
        this.repetitions = this.excerciseData.qty;
        this.duration = 0;
      } else {
        this.repetitions = 0;
        this.duration = this.excerciseData.qty;
      }

      if (!this.isNew) {
        axios.put('routines/' + this.id_routine + '/cycles/' + this.id_cycle + '/exercises/' + this.oldExercise.id, {
          name: this.excerciseData.name,
          detail: this.excerciseData.detail,
          type: this.type,
          duration: this.duration,
          repetitions: this.repetitions,
          order: this.id
        }). then(response => {
          console.log(response.data);
          if (this.excerciseData.link !== '') {
            axios.post('routines/' + this.id_routine + '/cycles/' + this.id_cycle + '/exercises/' + this.exercise.id + '/videos/' + store.video.id,
                {number: this.number, url: this.excerciseData.link})
                .then(response1 => {
                  console.log(response1.data);
                })
          }
        })
      } else {
        axios.post('routines/' + this.id_routine + '/cycles/' + this.id_cycle + '/exercises',
            {
              name: this.excerciseData.name,
              detail: this.excerciseData.detail,
              type: this.type,
              duration: this.duration,
              repetitions: this.repetitions,
              order: this.id
            })
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
}


</script>

<style scoped>

</style>
<template>
  <div
  class="mt-5">

    <v-card
        elevation="2"
        outlined
        shaped
        class="pa-4"
    >
      <v-row>
        <v-col cols="3">
          <v-text-field
              v-model="exercise.name"
              label="Nombre del ejercicio"
              :rules="[rules.required]"
              :disabled="!isEditing"
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-select
              :items="qtyTypes"
              label="Tipo"
              v-model="exercise.type"
              :disabled="!isEditing"
          ></v-select>
        </v-col>
        <v-col cols="2">
          <v-text-field
              v-model="exercise.qty"
              :rules="[rules.required, rules.number, rules.positive]"
              prepend-icon="mdi-minus"
              append-outer-icon="mdi-plus"
              @click:prepend="decQty()"
              @click:append-outer="incQty()"
              :disabled="!isEditing || exercise.type == ''"
              outlined
              :label="exercise.type"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
            v-model="exercise.videoUrl"
            label="URL del video"
            :rules="[rules.link]"
            :disabled="!isEditing"
          ></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="2" class="pt-6 text-right">
          <v-icon
              medium
              color="cyan darken-1"
              title="Editar ejercicio"
              @click="editPressed()"
              v-if="!isEditing"
          >mdi-square-edit-outline</v-icon>
          <v-icon
              medium
              color="cyan darken-1"
              title="Guardar ejercicio"
              @click="savePressed()"
              v-if="isEditing"
          >mdi-content-save</v-icon>
          <v-icon
              medium
              color="teal"
              class="ml-5"
              title="Eliminar ejercicio"
          >mdi-delete</v-icon>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>

    </v-card>


  </div>
</template>

<script>
/*import axios from "axios";
import Swal from "sweetalert2";*/

export default {
  name: "ExerciseItem",
  props: ['exercise'],
  data() {
    return {
      isEditing: false,
      rules: {
        required: value => !!value || 'Obligatorio.',
        name: v => /^[A-Za-z ]+$/.test(v) || 'Solo caractéres del abecedario',
        number: v => !isNaN(v) || 'Tiene que ser un número positivo!',
        positive: v => v>=1 || 'Tiene que ser un número positivo!',
        link: v => /^[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/.test(v) || v === '' || 'No es un link válido!'
      },
      qtyTypes: ['Repeticiones', 'Segundos']
    }
  },
  methods:{
    incQty(){
      this.exercise.qty++;
    },
    decQty(){
      if(this.exercise.qty>=2)
        this.exercise.qty--;
    },
    editPressed() {
      this.isEditing = !this.isEditing;
    },
    savePressed() {
      /*let duration = 0;
      let repetitions = 0;
      if(this.exercise.type == 'Segundos') {
        duration = this.exercise.qty;
      } else {
        repetitions = this.exercise.qty;
      }
      axios.post('/routines/'+this.idRutina+'/cycles/1/exercises', {

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
              axios.post('/routines/'+this.idRutina+'/cycles/1/exercises/'+idEjercicio+'/videos', {
                number: 1,
                url: this.nuevoEjercicio.videoUrl
              })
                  .then(() => {
                    this.dialog = false;
                    this.store.add({
                      name: this.nuevoEjercicio.name, qty: this.nuevoEjercicio.qty, type: this.nuevoEjercicio.type, videoUrl: this.nuevoEjercicio.videoUrl
                    });
                  })
                  .catch(error2 => {
                    Swal.fire({
                      title: 'Oops, al parecer hubo un error.',
                      text: 'No te preocupes, nosotros nos ocupamos.',
                      icon: 'error',
                      confirmButtonText: 'Ok',
                      timer: 3000
                    });
                    console.log(error2);
                  });

            } else {
              this.dialog = false;
              this.store.add({
                name: this.nuevoEjercicio.name, qty: this.nuevoEjercicio.qty, type: this.nuevoEjercicio.type, videoUrl: this.nuevoEjercicio.videoUrl
              });
            }
          })
          .catch((error) => {
            Swal.fire({
              title: 'Oops, al parecer hubo un error.',
              text: 'No te preocupes, nosotros nos ocupamos.',
              icon: 'error',
              confirmButtonText: 'Ok',
              timer: 3000
            });
            console.log(error);
          });*/

      this.isEditing = !this.isEditing;
    }

    /*remove(exercise){
      //this.store.remove(exercise);
      let index = this.excercises.findIndex(item => (item === exercise));
      if (index === -1)
        return false;
      this.excercises.splice(index,1);
      return true;
    },
    add(){
      this.exercisesQty++;
      this.ex_id++;
      this.excercises.push(this.ex_id);

    },
    ,
    inc(){

      this.exercisesQty++;
      this.remove(this.ex_id++);
    },
    dec(){
      if(this.exercisesQty >=2)
        this.exercisesQty--;
    }*/
  }
}
</script>

<style scoped>

</style>
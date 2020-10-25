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
              :loading="isLoadingEdit"
              :disabled="!validUpdateForm()"
              v-if="isEditing"
          >mdi-content-save</v-icon>
          <v-icon
              medium
              color="teal"
              class="ml-5"
              @click="deletePressed()"
              :loading="isLoadingDelete"
              title="Eliminar ejercicio"
          >mdi-delete</v-icon>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>

    </v-card>


  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "ExerciseItem",
  props: ['exercise', 'idRutina', 'idCiclo', 'storeRef'],
  data() {
    return {
      isEditing: false,
      isLoadingEdit: false,
      isLoadingDelete: false,
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
    validUpdateForm() {
      return this.rules.name(this.exercise.name) === true && this.rules.required(this.exercise.name) === true
          && this.rules.number(this.exercise.qty) === true && this.rules.positive(this.exercise.qty) === true && this.rules.required(this.exercise.qty) === true
          && this.rules.required(this.exercise.type) === true
          && this.rules.link(this.exercise.videoUrl) === true;
    },
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
    deletePressed() {
      Swal.fire({
        title: 'Seguro desea borrar el ejercicio?',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: 'No',
        denyButtonColor: '#c49b27'
      }).then((result) => {
        if (result.isConfirmed) {
          this.isLoadingDelete = true;
          axios.delete('/routines/'+this.idRutina+'/cycles/'+this.idCiclo+'/exercises/'+this.exercise.idEjercicio, {})
          .then(() => {
            this.storeRef.remove(this.exercise.idEjercicio);
            this.isLoadingDelete = false;
            Swal.fire('Eliminado!', '', 'success');
          })
          .catch(error => {
            this.error(error);
          });

        }
      });


    },
    savePressed() {
      this.isLoadingEdit = true;
      let duration = 0;
      let repetitions = 0;
      if(this.exercise.type == 'Segundos') {
        duration = this.exercise.qty;
        repetitions = 0;
      } else {
        repetitions = this.exercise.qty;
        duration = 0;
      }
      axios.put('/routines/'+this.idRutina+'/cycles/'+this.idCiclo+'/exercises/'+this.exercise.idEjercicio, {

        name: this.exercise.name,
        detail: "",
        type: "exercise",
        duration: Number(duration),
        repetitions: Number(repetitions)
      })
      .then(() => {
        if(this.exercise.videoUrl != '') {
          //Hay texto que corresponde a un video. Veamos si es nuevo o es update
          if(this.exercise.idVideo == -1) {
            //Es un video nuevo
            axios.post('/routines/'+this.idRutina+'/cycles/'+this.idCiclo+'/exercises/'+this.exercise.idEjercicio+'/videos', {
              number: 1,
              url: this.exercise.videoUrl
            })
            .then(response2 => {
              this.exercise.idVideo = response2.data.id;
              this.isLoadingEdit = false;
              this.isEditing = false;
            })
            .catch(error2 => {
              this.error(error2);
              this.isLoadingEdit = false;
              this.isEditing = true;
            });
          } else {
            //Es un update
            axios.put('/routines/'+this.idRutina+'/cycles/'+this.idCiclo+'/exercises/'+this.exercise.idEjercicio+'/videos/'+this.exercise.idVideo, {
              number: 1,
              url: this.exercise.videoUrl
            })
            .then(() => {
              this.isLoadingEdit = false;
              this.isEditing = false;
            })
            .catch(error2 => {
              this.error(error2);
              this.isLoadingEdit = false;
              this.isEditing = true;
            });

          }
        } else if(this.exercise.idVideo == -1) {
          //No cambió nada
          this.isLoadingEdit = false;
          this.isEditing = false;
        } else {
          //Hizo un delete
          axios.delete('/routines/'+this.idRutina+'/cycles/'+this.idCiclo+'/exercises/'+this.exercise.idEjercicio+'/videos/'+this.exercise.idVideo, {})
          .then(() => {
            this.exercise.idVideo = -1;
            this.isLoadingEdit = false;
            this.isEditing = false;
          })
          .catch(error2 => {
            this.error(error2);
            this.isLoadingEdit = false;
            this.isEditing = true;
          });
        }



      })
      .catch((error) => {
        this.error(error);
        this.isLoadingEdit = false;
        this.isEditing = true;
      });


    }


  }
}
</script>

<style scoped>

</style>
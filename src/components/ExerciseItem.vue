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
        <v-col cols="4">
          <v-text-field
              v-model="exercise.name"
              label="Nombre del ejercicio"
              :rules="[rules.required]"
              :disabled="!isEditing"
          ></v-text-field>
        </v-col>
        <!--<v-spacer></v-spacer>-->
        <v-col cols="2">
          <!---->
          <v-text-field
              v-model="exercise.qty"
              :rules="[rules.required, rules.number, rules.positive]"
              prepend-icon="mdi-minus"
              append-outer-icon="mdi-plus"
              @click:prepend="decQty()"
              @click:append-outer="incQty()"
              :disabled="!isEditing"
              outlined
              label="Repeticiones"
          ></v-text-field>
        </v-col>
        <!--<v-spacer></v-spacer>-->
        <v-col cols="4">
          <v-text-field
            v-model="exercise.videoUrl"
            label="URL del video"
            :rules="[rules.link]"
            :disabled="!isEditing"
          ></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="1" class="pt-6">
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
      }
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
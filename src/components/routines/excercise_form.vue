<template>
  <v-form v-model="valid">
    <v-container>
      <v-row class="justify-space-around">
        <v-col
            cols="3"
        >
          <v-text-field
              v-model="excerciseData.name"
              label="Nombre del ejercicio"
              :rules="[rules.required, rules.name]"


          ></v-text-field>
        </v-col>
        <v-col cols="1" >
          <v-btn icon color="black"  @click="inc()">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="1">
          <v-text-field
              v-model="excerciseData.qty"
              :label="excerciseData.type"
              :rules="[rules.required, rules.number, rules.positive]"

          ></v-text-field>
        </v-col>
        <v-col cols="1" class="justify-md-end">
          <v-btn  icon color="black" @click="dec()" >
            <v-icon>mdi-minus</v-icon>
          </v-btn>
        </v-col>

        <v-col cols="4">
          <v-select
              :items="items"
              v-model="excerciseData.type"
              label="Repeticiones/Segundos"


          ></v-select>
        </v-col>

        <v-col
            cols="2"
        >
          <v-text-field

            v-model="excerciseData.link"
            label="Video link"
            :rules="[rules.required, rules.link]"

          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "excercise_form",

  methods:{
    dec(){
      if(this.excerciseData.qty>1)
        this.excerciseData.qty--;
    },
    inc(){
      this.excerciseData.qty++;
    }
  },
  data() {
    return {
      valid: false,
      items: ["Repeticiones","Segundos"],
      excerciseData: {
        name: '',
        qty: 1,
        type: "Repeticiones",
        link: ''
      },
      show: false,
      rules: {
        required: value => !!value || 'Obligatorio.',
        name: v => /^[A-Za-z ]+$/.test(v) || 'Solo caractéres del abecedario',
        number: v => !isNaN(v) || 'Tiene que ser un número positivo!',
        positive: v => v>=1 || 'Tiene que ser un número positivo!',
        link: v => /^[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/.test(v) || 'opa',

      }

    }

  }
}


</script>

<style scoped>

</style>
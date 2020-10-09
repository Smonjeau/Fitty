<template>
  <div>
    <NavBar></NavBar>
      <v-container class="my-5">
        <div class="text-center ">
          <p class="font-weight-bold display-2">CREAR RUTINA</p>
        </div>
        <template>
          <v-form v-model="valid">
            <v-container class="my-5">
              <v-row class="justify-md-start">
                <v-col
                    cols="4"
                >
                  <v-text-field
                      v-model="name"
                      :rules="[rules.required]"
                      label="Nombre de la rutina"
                      outlined


                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-select
                      :items="availableCategorys"
                      outlined
                      v-model="categorys"
                      label="Categoría/s"
                      multiple
                  ></v-select>
                </v-col>
                <v-col cols="2">
                  <v-text-field
                      v-model="duration"
                      outlined
                      :rules="[rules.number, rules.required, rules.positive]"
                      label="Duración (mins)"

                  ></v-text-field>
                </v-col>

              </v-row>
            </v-container>
          </v-form>

      </template>

      <routine_panel title="Calentamiento"></routine_panel>
        <routine_panel title="Ciclo 1"></routine_panel>
        <div v-for="index in extraSections" :key="index">
          <routine_panel :title=sectionName(index+1) isDeletable="true" ></routine_panel>
        </div>

        <routine_panel title="Enfriamiento"></routine_panel>
        <v-btn small @click="inc()" class="my-5">
          <v-icon left >
            mdi-plus-circle-outline
          </v-icon>
          <span>Agregar sección</span>

        </v-btn>


    </v-container>
  </div>
</template>

<script>
import routine_panel from "@/components/routines/routine_panel";
import NavBar from "@/components/NavBar";
//import SectionStore from "@/store/SectionStore";

export default {
  methods: {
    inc(){
      this.extraSections++;
    },
    sectionName(offset){
      return "Ciclo " + offset.toString();
    }
  },
name: "create_routine",
  components: {
    routine_panel,
    NavBar

        },
  data() {
    return {
      name: '',
      duration: 0,
      availableCategorys: [
      'Cardio','Brazos','Piernas','Yoga','Relajación','Tren superior','Resistencia'
    ],
      categorys: [],
      extraSections:0,
      rules: {
        required: value => !!value || 'Obligatorio.',
        name: v => /^[A-Za-z ]+$/.test(v) || 'Solo caractéres del abecedario',
        number: v => !isNaN(v) || 'Tiene que ser un número positivo!',
        positive: v => v>=1 || 'Tiene que ser un número positivo!',
        link: v => /^[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/.test(v) || 'No es un link válido!',

      }
    }
  },
}
</script>

<style scoped>

</style>
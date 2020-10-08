<template>
  <!--squeleton title="CREAR RUTINA"!-->
    <v-container class="my-5">
      <v-expansion-panels accordion multiple >
        <v-expansion-panel class="mb-7">
          <v-expansion-panel-header disable-icon-rotate color="blue" class="white--text">
            Calentamiento


            <template v-slot:actions>
              <v-icon color="white">mdi-arrow-down-drop-circle-outline</v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <excercise_form></excercise_form>

            <v-btn small class="my-5 mx-3">
              <v-icon left>
                mdi-plus-circle-outline
              </v-icon>
              <span>Agregar ejercicio</span>

            </v-btn>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-btn small class="my-5">
        <v-icon left>
          mdi-plus-circle-outline
        </v-icon>
        <span>Agregar sección</span>

      </v-btn>
    </v-container>

  <!--/squeleton!-->
</template>

<script>
import excercise_form from "@/components/routines/excercise_form";
//import squeleton from "@/components/routines/squeleton";
export default {
name: "routine_panel",
  components: {/*squeleton,*/ excercise_form}
}
</script>


<style scoped>

</style>
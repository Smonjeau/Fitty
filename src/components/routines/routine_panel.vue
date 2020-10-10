<template>
  <!--squeleton title="CREAR RUTINA"!-->
    <v-container class="my-5">

      <v-expansion-panels accordion multiple >
        <v-row class="align-content-start" >
          <v-col cols="11">
        <v-expansion-panel class="mb-7" v-model="open" >

          <v-expansion-panel-header  @keyup.space.prevent inside   color="blue" class="white--text" append-icon="mdi-delete">
            <v-container>
            <v-row>
              <v-col cols="3">
                <v-text-field  outlined :readonly="!isModifiable"
                              :rules="[rules.required]"
                              v-model="name"
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
                  v-model="qty"
                outlined

              >

              </v-text-field>
              </v-col>





            </v-row>
            </v-container>


            <template v-slot:actions>

              <v-icon color="white">mdi-arrow-down-drop-circle-outline</v-icon>
            </template>

          </v-expansion-panel-header>

          <v-expansion-panel-content>
            <div v-for="index in exercisesQty" :key="index">
              <excercise_form :id="ex_id" ></excercise_form>
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
          <v-icon v-if="isDeletable" @click="dec()" >mdi-delete</v-icon>
        </v-row>
      </v-expansion-panels>

    </v-container>


  <!--/squeleton!-->
</template>

<script>
import excercise_form from "@/components/routines/excercise_form";
import ExerciseStore from "@/store/ExcerciseStore";
//import squeleton from "@/components/routines/squeleton";
export default {
methods:{

  remove(exercise){
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
  incQty(){
    if(isNaN(this.qty))
      return this.qty=1;
    this.qty++;
  },
  decQty(){
    if(isNaN(this.qty))
      return this.qty=1;
    if(this.qty>=2)
      this.qty--;
  },
  inc(){

    this.exercisesQty++;
    this.remove(this.ex_id++);
  },
  dec(){
    if(this.exercisesQty >=2)
      this.exercisesQty--;
  }
},
  data() {
    return {
      name : this.title,
      exercisesQty: 1,
      qty:0,
      ex_id: 0,
      store: ExerciseStore,
      excercises: [0],
      rules: {
        required: value => !!value || 'Obligatorio.',
        number: v => !isNaN(v) || 'Tiene que ser un número positivo!',
        positive: v => v>=1 || 'Tiene que ser un número positivo!'
      }
    }
  },
props: {
  title: String,
  isModifiable: Boolean,
  open: Number
},
name: "routine_panel",
  components: {/*squeleton,*/ excercise_form}
}
</script>


<style scoped>

</style>
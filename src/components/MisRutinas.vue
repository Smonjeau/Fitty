<template>
  <div>
    <nav-bar></nav-bar>
    <div class="px-14 mt-3">
      <v-row no-gutters>
        <v-col cols="12">
          <v-breadcrumbs
              :items="links"
              large
          ></v-breadcrumbs>
        </v-col>
      </v-row>
      <v-row class="mx-5 mt-8 d-flex" no-gutters>
        <v-col cols="6" class="mr-auto" >
          <h1>{{ user.username }}, mira tus rutinas</h1>
        </v-col>
        <v-col cols="3" md="2" class="ml-auto" >
          <v-select
              :items="categoriesItems"
              item-text="name"
              item-value="id"
              label="Categoría"
              v-model="category"
              outlined
              dense
          >
          </v-select>
        </v-col>
        <v-col cols="3" md="2" class="ml-auto">
          <v-select
              :items="orderItems"
              item-text="title"
              item-value="type"
              v-model="order"
              label="Ordenar"
              outlined
              dense
          ></v-select>
        </v-col>
      </v-row>
      <v-row class="d-flex flex-row" no-gutters v-on:change="updateRoutines">
          <v-card width="200" height="290" elevation="0"
                  class="d-flex align-center mb-10 ml-sm-4 ml-md-5">
            <v-row>
              <v-col cols="12" class="d-flex justify-center">
                <v-btn icon color="grey darken-2" @click="goToCreate()">
                  <v-icon size="90">mdi-plus-circle-outline</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="12" class="d-flex justify-center mt-2">
                <h3>Crear Rutina</h3>
              </v-col>
            </v-row>
          </v-card>
          <card-rutina
              v-for="routine in myRoutines"
              :key="routine.id"
              :titulo="routine.name"
              :rating="routine.averageRating"
              :type="routine.category.name.toLowerCase()"
              time="45" class="mb-10 ml-sm-4 ml-md-5"
          >
          </card-rutina>
      </v-row>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import { store } from "@/userStore";
import axios from 'axios';
import CardRutina from "@/components/CardRutina";

export default {
  name: "MisRutinas",
  components: {NavBar, CardRutina},
  data() {
    return {
      links: [
        {
          text: 'Inicio',
          disabled: false,
          href: '/',
        },
        {
          text: 'Mis Rutinas',
          disabled: true,
          href: 'mis-rutinas',
        },
      ],
      orderItems: [
        {title: 'Mejor Rating', type: 'averageRating'},
        {title: 'Dificultad', type: 'difficulty'},
        {title: 'Creadas Recientemente', type: 'dateCreated'}
        ],
      order: 'averageRating',
      user: store.userInfo,
      categoriesItems: [],
      category: -1,
      allRoutines: [],
      myRoutines: []
    }
  },
  methods: {
    goToCreate() {
      this.$router.push('/create_routine');
    },
    updateRoutines() {
      axios.get('user/current/routines/', {params: {page: 0, size: 20, orderBy: this.order, direction: 'desc'}})
          .then(response => {
            this.allRoutines = response.data.results;
            if (this.category != -1) {
              this.myRoutines = this.filterCategorys(this.allRoutines, this.category);
            } else {
              this.myRoutines = this.allRoutines;
            }
            console.log(this.myRoutines);
          })
    },
    filterCategorys (routines, categoryName){
      return routines.filter(routine => routine.category.id === categoryName);
    },
  },
  mounted() {
    this.categoriesItems.push({name: 'Todas', id: -1})
    axios.get('categories', {params: {orderBy: 'name', direction: 'desc'}})
    .then(response => {
        this.categoriesItems.push(...response.data.results);
    });
    this.updateRoutines();
  },
  watch: {
    order: function() {
      this.updateRoutines();
    },
    category: function() {
      if (this.category == -1) {
        this.myRoutines = this.allRoutines;
      } else {
        this.myRoutines = this.filterCategorys(this.allRoutines, this.category);
        console.log(this.myRoutines);
      }
    }
  }
}
</script>

<style scoped>

</style>
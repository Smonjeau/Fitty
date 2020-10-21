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
      <v-row class="mx-5 mt-4 mb-3 d-flex justify-center" no-gutters>
        <h1>Rutinas de {{ categoryName }}</h1>
      </v-row>
      <v-row class="justify-end">
        <v-col cols="3" md="2">
          <v-select
              :items="categoriesItems"
              item-text="name"
              item-value="id"
              label="Categoría"
              v-model="categoryId"
              outlined
              dense
          >
          </v-select>
        </v-col>
        <v-col cols="3" md="2">
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
import CardRutina from "@/components/CardRutina";
import {store} from "@/userStore";
import axios from "axios";

export default {
  name: "Category",
  components: {NavBar, CardRutina},
  data() {
    return {
      links: [
        {
          text: 'Inicio',
          disabled: false,
          href: 'Inicio',
        },
        {
          text: 'Categorias',
          disabled: true,
          href: 'category/:id_category',
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
      categoryId: parseInt(this.$route.params.id_category),
      categoryName: '',
      allRoutines: [],
      myRoutines: [],
    }
  },
  methods: {
    updateRoutines() {
      axios.get('routines/', {params: {page: 0, size: 20, orderBy: this.order, direction: 'desc'}})
          .then(response => {
            this.allRoutines = response.data.results;
            this.myRoutines = this.filterCategorys(this.allRoutines, this.categoryId);
          })
    },
    filterCategorys (routines, categoryId){
      return routines.filter(routine => routine.category.id === categoryId);
    },
    updateName() {
      axios.get('/categories/' + this.categoryId)
          .then(response => {
            this.categoryName = response.data.name;
          })
    }
  },
  mounted() {
    this.updateName();
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
    categoryId: function() {
      this.myRoutines = this.filterCategorys(this.allRoutines, this.categoryId);
      this.updateName();
    }
  }
}
</script>

<style scoped>

</style>
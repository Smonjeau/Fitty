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
      <v-row class="mx-5 d-flex justify-center" no-gutters>
        <h1>Rutinas de {{ capitalizeFirstLetter(categoryName) }}</h1>
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
      <v-row class="d-flex flex-row mx-4" no-gutters v-on:change="updateRoutines">
        <card-rutina
            v-for="routine in myRoutines"
            :key="routine.id"
            :titulo="routine.name"
            :rating="routine.averageRating"
            :type="routine.category.name.toLowerCase()"
            :id_routine="routine.id"
            time="45" class="mb-10 ml-sm-4 ml-md-5"
        >
        </card-rutina>
      </v-row>
      <v-row class="justify-center mb-8">
        <v-btn
            class="pa-4 py-5 text-h6"
            outlined
            color="blue darken-1"
            @click="getMore()"
            v-if="show"
        >
          Cargar Más
        </v-btn>
      </v-row>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import CardRutina from "@/components/CardRutina";
import {store} from "@/userStore";
import axios from "axios";
import Footer from "@/components/Footer";

export default {
  name: "Category",
  components: {NavBar, CardRutina, Footer},
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
      size: 20,
      totalCount: 0,
      show: true
    }
  },
  methods: {
    updateRoutines() {
      axios.get('routines/', {params: {page: 0, size: this.size, orderBy: this.order, direction: 'desc'}})
          .then(response => {
            this.totalCount = response.data.totalCount;
            this.allRoutines = response.data.results;
            this.myRoutines = this.filterCategorys(this.allRoutines, this.categoryId);
          })
    },
    filterCategorys (routines, categoryId){
      return routines.filter(routine => routine.category.id === categoryId && routine.id != 1);
    },
    updateName() {
      axios.get('/categories/' + this.categoryId)
          .then(response => {
            this.categoryName = response.data.name;
          })
    },
    capitalizeFirstLetter(string) {
      return string.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
    },
    getMore() {
      this.size += 10;
      this.updateRoutines();
      if (this.size > this.totalCount) {
        this.show = false;
      }
    }
  },
  mounted() {
    this.updateName();
    axios.get('categories', {params: {orderBy: 'name', direction: 'desc'}})
        .then(response => {
          this.categoriesItems.push(...response.data.results);
          this.categoriesItems.forEach((val, index) => this.categoriesItems[index].name = this.capitalizeFirstLetter(val.name));
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
    },
    $route: function() {
      this.categoryId = parseInt(this.$route.params.id_category);
    }
  },
}
</script>

<style scoped>

</style>
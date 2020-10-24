<template>
  <v-footer
      color="blue darken-1"
      class="pa-5 mt-14"
      padless
      :absolute="!userStore.logged"
  >

    <v-row class="justify-space-around">
      <v-col cols="3" md="4" sm="4" lg="3" class="mr-md-8">
        <p class="text-left text-uppercase text-h6 white--text font-weight-regular">Categorias</p>
        <v-row class="justify-space-between" no-gutters>
          <v-col v-for="category in categories"
                 :key="category.id" cols="6" class="justify-center text-left mb-3">
            <router-link
                class="my-2 subtitle-1 white--text text-capitalize text-decoration-none font-weight-light"
                :to="'/category/' + category.id"
            >
              {{ category.name }}
            </router-link>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="2" md="3" sm="3" lg="2" class="mr-md-8">
        <p class="text-left text-uppercase text-h6 white--text font-weight-regular" style="color: white">Usuario</p>
        <v-row class="justify-space-between" no-gutters>
          <v-col v-for="link in links"
                 :key="link.name" cols="12" class="justify-center text-left mb-3">
            <router-link
                class="my-2 subtitle-1 white--text text-capitalize text-decoration-none font-weight-light"
                :to="link.to"
            >
              {{ link.name }}
            </router-link>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="2" md="3" sm="3" lg="2" class="justify-center text-center">
        <v-row>
          <v-col>
            <v-avatar tile class="justify-center">
              <v-img src="../assets/logo.png" alt="Logo de Fitty" contain style="opacity: 0.8"></v-img>
            </v-avatar>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p class="subtitle-1 white--text font-weight-light">Made with <v-icon color="red lighten-1" class="mb-2">mdi-heart</v-icon> by ITBA students</p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>

import axios from "axios";
import {store} from "@/userStore";


export default {
  name: "Footer",
  data() {
    return {
      links: [
        { name: 'Crear Rutina', to: '/create_routine' },
        { name: 'Mis Rutinas', to: '/mis_rutinas' },
        { name: 'Mis Ejercicios', to: '/mis_ejercicios' },
        { name: 'Mi Perfil', to: '/perfil' },
      ],
      categories: [],
      userStore: store
    }
  },
  methods: {
    goToPage(link) {
      this.$router.push(link);
    },
  },
  mounted() {
    axios.get('categories', {params: {orderBy: 'name', direction: 'desc'}})
        .then(response => {
          this.categories.push(...response.data.results);
        });
  }
}
</script>

<style scoped>
</style>
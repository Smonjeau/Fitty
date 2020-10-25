<template>
  <v-container fluid pa-0>
    <v-app-bar color="blue darken-1" dark flat>
      <router-link to="/">
        <v-app-bar-nav-icon class="ml-4">
          <v-avatar tile>
            <v-img src="../assets/logo.png" alt="Logo de Fitty" contain></v-img>
          </v-avatar>
        </v-app-bar-nav-icon>
      </router-link>
      <v-spacer></v-spacer>
        <v-autocomplete
            outlined
            prepend-inner-icon="mdi-magnify"
            dense
            v-if="myStore.logged"
            placeholder="Buscar"
            class="pt-5"
            v-model="query"
            search-input.sync="query"
            :items="labels"
            clearable
            @keyup="handleQuery"
            :loading="updatingItems"
            @change="updateItemsAndGo()"
        >
          <template v-slot:no-data>
            <v-list-item>
              <v-list-item-title>
                Búsqueda por nombre de la rutina. Mínimo 3 caracteres.
              </v-list-item-title>
            </v-list-item>
          </template>

        </v-autocomplete>




      <v-spacer></v-spacer>

      <!-- En caso de que SI este logeado utiliza esta version -->
      <template v-if="myStore.logged">
        <v-btn outlined class="ml-4" @click="goToCreate()">
          Crear Rutina
        </v-btn>
        <v-menu left bottom offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                class="ml-4"
                v-bind="attrs"
                v-on="on"
                text
            >
              Hola, {{ myStore.getUsername() }}
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
                v-for="item in myDropdown"
                :key="item.title"
                @click="item.func"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>

      <template v-else>
        <v-btn outlined @click="goToSignUp">
          Registrarme
        </v-btn>
        <v-btn outlined class="ml-4" @click="goToLogIn">
          Ingresar
        </v-btn>
      </template>

    </v-app-bar>
  </v-container>
</template>

<script>
import { store } from '../userStore.js';
import Swal from "sweetalert2";
import axios from "axios";

export default {
  name: "NavBar",
  data() {
    return {
      myStore: store,
      myDropdown: [
        {title: 'Mis Rutinas', func: ()=>{this.$router.push('/mis_rutinas')}},
        {title: 'Mis Ejercicios', func: ()=>{this.$router.push('/mis_ejercicios')}},
        {title: 'Mi Perfil', func: ()=>{this.$router.push('/perfil')}},
        {title: 'Cerrar Sesión', func: ()=>{this.closeSesion()}}
      ],
      query: '',
      items: [],
      labels: [],
      updatingItems: false
    }
  },
  methods: {
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
    openRoutine(id) {
      alert(id);
    },
    goToSignUp() {
      this.$router.push('/signup');
    },
    goToLogIn() {
      this.$router.push('/login');
    },
    closeSesion() {
      store.closeSesion();
      this.$router.go();
      //this.$router.push('/');
    },
    goToCreate() {
      this.$router.push('/create_routine');
    },
    getUsername() {
      return store.userInfo.username;
    },
    handleQuery(event) {
      if (event) {
        this.updateItems(event.target.value);
      }
    },
    updateItems(value) {
      let paramsObj;
      if(/*this.query*/value.length >= 3) {
        paramsObj = {
          search: value,//this.query,
          page: 0,
          orderBy: 'dateCreated',
          direction: 'desc',
          size: 10
        }
      } else {
        paramsObj = {
          page: 0,
          orderBy: 'dateCreated',
          direction: 'desc',
          size: 10
        }
      }
      axios.get('/routines', {
        params: paramsObj
      })
      .then(result => {
        console.log(result);
        this.items = result.data.results;
        this.labels = this.items.map(item => item.name);
        this.updatingItems = false;
      })
      .catch(error => {
        this.error(error);
        this.updatingItems = true;
      });
    },
    updateItemsAndGo() {
      this.items.forEach(item => {
        if(item.name == this.query) {
          var BreakException = {};
          this.$router.push('/routine/' + item.id).catch(()=>{});
          throw BreakException;
        }
      });
    }
  },
  beforeMount() {
    if(localStorage.getItem('token') != null) {
      this.updatingItems = true;
      this.updateItems('');
    }

  }
}
</script>


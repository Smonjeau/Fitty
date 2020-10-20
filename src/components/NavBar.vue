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
      <v-text-field
          outlined
          prepend-inner-icon="mdi-magnify"
          dense
          placeholder="Buscar"
          class="pt-5"
      ></v-text-field>

      <v-spacer></v-spacer>

      <!-- En caso de que SI este logeado utiliza esta version -->
      <template v-if="logged">
        <v-btn outlined class="ml-4">
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
              Hola, Pepe
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
                v-for="n in 5"
                :key="n"
                @click="() => {}"
            >
              <v-list-item-title>Option {{ n }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>

      <template v-else>
        <v-btn outlined @click="goToSignUp">
          Ingresar
        </v-btn>
        <v-btn outlined class="ml-4" @click="goToLogIn">
          Registrarme
        </v-btn>
      </template>

    </v-app-bar>
  </v-container>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      logged: false,
    }
  },
  methods: {
    goToSignUp() {
      this.$router.push('/signup');
    },
    goToLogIn() {
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>

</style>
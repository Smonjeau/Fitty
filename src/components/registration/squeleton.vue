<template>
  <div  class="main">
    <v-container fluid>
      <router-link to="/">
        <v-app-bar-nav-icon class="ml-7">
          <v-avatar tile size="50">
            <v-img src="../../assets/logo.png" alt="Logo de Fitty" contain></v-img>
          </v-avatar>
        </v-app-bar-nav-icon>
      </router-link>
    </v-container>

    <v-card color="white" width="550" class="mx-auto rounded-xl text-center pa-8">
      <v-card-title class="blue--text justify-center text-h3">{{ title }}</v-card-title>

      <slot name="fields"></slot>
      <slot name="other"></slot>

    </v-card>
  </div>
</template>

<script>
export default {
  name: "squeleton",
  props: ['title']
}
</script>

<style scoped>
  .main {
    background-color: #2196F3;
    width: 100vw;
    height: 100vh;
  }
</style>
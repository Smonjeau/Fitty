<template>
  <div  class="main">
    <v-container fluid>
      <v-row>
        <router-link to="/">
          <img src="../../assets/logo.png" width="50px" height="50px" class="ml-14" />
        </router-link>
      </v-row>
    </v-container>

    <v-card color="white" width="450" class="mx-auto rounded-xl text-center pa-10">
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
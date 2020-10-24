<template>
  <squeleton title="Email validado">
    <v-row  justify="center" class="my-4" slot="other">
      <v-card-text class="align-self-center blue--text text--darken-2 text-subtitle-1">
        <v-btn class="blue white--text px-4 py-3 " @click="$router.push('/login')">USAR FITTY</v-btn>
      </v-card-text>
    </v-row>
  </squeleton>

</template>

<script>
import Squeleton from "@/components/registration/squeleton";
import axios from "axios";


export default {
name: "EmailConfirmation",
  components: {Squeleton},
  data () {
    return {
      code : this.$route.params.code,
      email: this.$route.params.email,
      value : 60,
      interval: {},
    }
  },

  mounted() {

    axios.post('user/verify_email',{
      "email" : this.email,
      "code" : this.code
    }).then( () => {
      console.log("Email verificado");
    }).catch((error)=>
    console.log(error));
  }
}
</script>

<style scoped>

</style>
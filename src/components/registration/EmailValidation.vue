
<template>
  <squeleton   title="Inserta el código que te enviamos">
    <v-container  slot="fields">
      <v-form v-model="valid">
        <v-row>
            <v-text-field  v-model="code" outlined class="display-1 text-center"  :rules="[rules.codeRule]"></v-text-field>
        </v-row>
        <v-row class="justify-center">
          <v-btn class="blue white--text px-4 py-3 " @click="submit()">ENVIAR CÓDIGO</v-btn>
        </v-row>
      </v-form>
    </v-container>
    <v-row justify="center" class="my-4" slot="other">
      <v-card-text class="align-self-center blue--text text--darken-2 text-subtitle-1">
        ¿Ya te has verificado?
        <v-btn class="blue white--text px-4 py-3 ml-6" @click="$router.push('/login')">USAR FITTY</v-btn>
      </v-card-text>
    </v-row>

  </squeleton>

</template>

<script>
import Squeleton from "@/components/registration/squeleton";
import axios from 'axios';
export default {
  name: "EmailValidation",
  components: {Squeleton}
  ,
  data() {
    return {
      valid:false,
      email: this.$route.params.email,
      rules : {
        codeRule: v=> /^[0-9a-zA-Z]{6}$/.test(v) || "6 números o letras en mayúscula"
      },
      code : null
    }
  },
  methods: {
    submit(){
      axios.post('user/verify_email',{
        "email" : this.email,
        "code" : this.code

      })
      this.$router.push('/login');

    }
  }
}
</script>

<style scoped>

</style>

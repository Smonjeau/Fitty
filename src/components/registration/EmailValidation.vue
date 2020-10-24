
<template>
  <squeleton   title="Inserta el código que te enviamos">
    <v-container  slot="fields">
      <v-form v-model="valid">
        <v-row>
            <v-text-field  v-model="code" outlined class="display-1 text-center"  :rules="[rules.codeRule]"></v-text-field>
        </v-row>
        <v-row class="justify-center">
          <v-btn class="blue white--text px-4 py-3 " :disabled=!valid @click="submit()">ENVIAR CÓDIGO</v-btn>
        </v-row>
      </v-form>
    </v-container>
    <v-row justify="center" class="my-4" slot="other">
      <v-card-text class="align-self-center blue--text text--darken-2 text-subtitle-1">
        ¿Ya te has verificado?
        <v-btn class="blue white--text px-4 py-3 ml-6" @click="$router.push('/login')">USAR FITTY</v-btn>
      </v-card-text>
      <v-card-text class="align-self-center blue--text text--darken-2 text-subtitle-1">
        ¿No te ha llegado ningún email?
        <v-btn class="blue white--text px-4 py-3 ml-6" @click="resend()">REENVIAR EMAIL</v-btn>
      </v-card-text>
    </v-row>
  </squeleton>

</template>

<script>
import Squeleton from "@/components/registration/squeleton";
import axios from 'axios';
import Swal from "sweetalert2";
export default {
  name: "EmailValidation",
  components: {Squeleton}
  ,
  data() {
    return {
      valid:false,
      email: this.$route.params.email,
      rules : {
        codeRule: v=> /^[0-9A-Z]{6}$/.test(v) || "6 números o letras en mayúscula"
      },
      code : null
    }
  },
  methods: {
    resend(){
      axios.post('user/resend_verification',{
        "email" : this.email
      }).then(()=>
        Swal.fire({
          title: 'Verificación reenviada',
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        })
      ).catch((error) => {
            console.log(error);
            Swal.fire({
              title: 'Algo malo está sucedidendo',
              text: 'Por favor, contacta a los desarrolladores',
              icon: 'error',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK',
            })
          }
      )
    },
    submit(){
      axios.post('user/verify_email',{
        "email" : this.email,
        "code" : this.code

      }).then(() => {
        Swal.fire({
          title: 'Validación correcta',
          text: "Comienza a usar FITTY",
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#1E88E5',
          confirmButtonText: 'COMENZAR'
        }
      ).then((result) => {
        if(result.isConfirmed)
          this.$router.push('/login');
      }

        )})
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: 'Validación incorrecta!',
          text: "Comprueba el código",
          icon: 'error',
          showCancelButton: false,
          confirmButtonColor: '#1E88E5',
          confirmButtonText: 'REINTENTAR'
        })
      })

    }
  }
}
</script>

<style scoped>

</style>

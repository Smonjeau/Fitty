<template>
  <squeleton title="¡Hola, Ingresa!">
    <v-container slot="fields">
      <v-form v-model="valid">
        <v-row>
          <v-text-field
              v-model="userData.username"
              label="Usuario"
              required
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
              v-model="userData.password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show ? 'text' : 'password'"
              name="input-10-1"
              label="Contraseña"
              hint="Mínimo 8 caracteres"
              counter
              @click:append="show = !show"
          ></v-text-field>
        </v-row>
        <v-row justify="center">
          <v-btn :disabled="!valid" class="mt-6 blue white--text text-h5 px-5 py-7" @click="submit">Ingresar</v-btn>
        </v-row>
      </v-form>
    </v-container>

    <v-container slot="other">
      <v-row justify="center" class="my-4">
        <router-link to="/olvidado" class="text-decoration-underline">¿Has olvidado tu contraseña?</router-link>
      </v-row>
      <v-row justify="center" class="my-4">
        <v-card-text class="align-self-center blue--text text--darken-2 text-subtitle-1">
          ¿Primera vez aquí?
          <v-btn class="blue white--text px-4 py-3 ml-6" @click="navigateToSignUp">Registrarme</v-btn>
        </v-card-text>
      </v-row>
    </v-container>
  </squeleton>
</template>

<script>
import squeleton from './squeleton';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: "logIn",
  components: {
    squeleton
  },
  data() {
    return {
      userData: {
        username: '',
        password: ''
      },
      show: false,
      rules: {
        required: value => !!value || 'Obligatorio.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailContains: v => /.+@.+/.test(v) || 'El email debe ser valido'
      },
      valid: false
    }
  },
  methods: {
    navigateToSignUp() {
      this.$router.push('/signup');
    },
    submit() {
      axios.post('/user/login', this.userData)
          .then((result) => {
            localStorage.token = result.data.token;
            console.log(localStorage.token);
            this.$router.push('/');
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              title: 'No ha sido posible ingresar',
              text: 'Datos invalidos',
              icon: 'error',
              confirmButtonText: 'Ok',
              timer: 3000
            })
          });
    }
  }
}
</script>

<style scoped>

</style>
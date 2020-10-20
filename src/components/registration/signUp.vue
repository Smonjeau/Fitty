<template>
  <squeleton title="¡Únete a FITTY!">
    <v-container slot="fields">
      <v-form v-model="valid">
        <v-row >
          <v-text-field
              v-model="userData.name"
              :rules="[rules.required, rules.nameRule]"
              label="Nombre"
              required
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
              v-model="userData.email"
              label="Email"
              :rules="[rules.required, rules.emailContains]"
              required
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
              v-model="userData.password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              :rules="[rules.required, rules.min]"
              name="input-10-1"
              label="Contraseña"
              hint="Mínimo 8 caracteres"
              counter
              @click:append="show = !show"
          ></v-text-field>
        </v-row>
        <v-row justify="center">
          <v-btn class="mt-6 blue white--text text-h5 px-5 py-7" @click="submit">Registrarme</v-btn>
        </v-row>
      </v-form>
    </v-container>

    <v-row justify="center" class="my-4" slot="other">
      <v-card-text class="align-self-center blue--text text--darken-2 text-subtitle-1">
        ¿Ya tienes cuenta?
        <v-btn class="blue white--text px-4 py-3 ml-6" @click="navigateToLogIn">Ingresar</v-btn>
      </v-card-text>
    </v-row>
  </squeleton>
</template>

<script>
import squeleton from './squeleton';

export default {
  name: "signUp",
  components: {
    squeleton
  },
  data() {
    return {
      userData: {
        name: '',
        email: '',
        password: ''
      },
      show: false,
      rules: {
        required: value => !!value || 'Obligatorio.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailContains: v => /.+@.+/.test(v) || 'El email debe ser valido',
        nameRule: v => /^[A-Za-z]+$/.test(v)
      },
      valid: false
    }
  },
  methods: {
    navigateToLogIn() {
      this.$router.push('/login');
    },
    submit() {
      this.valid = true;
    }
  }
}
</script>

<style scoped>

</style>
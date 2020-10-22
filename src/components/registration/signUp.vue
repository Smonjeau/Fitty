<template>
  <squeleton title="¡Únete a FITTY!">
    <v-container slot="fields">
      <v-form v-model="valid">
        <v-row>
          <v-col cols="6" sm="12" md="6">
            <v-text-field
                v-model="userData.username"
                :rules="[rules.required, rules.nameRule]"
                label="Usuario"
                required
            ></v-text-field>
          </v-col>
          <v-col cols="6" sm="12" md="6">
            <v-text-field
                v-model="userData.email"
                label="Email"
                :rules="[rules.required, rules.emailContains]"
                required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row >
          <v-col cols="6" sm="12" md="6">
            <v-text-field
                v-model="user.firstname"
                :rules="[rules.required, rules.nameRule]"
                label="Nombre"
                required
            ></v-text-field>
          </v-col>
          <v-col cols="6" sm="12" md="6">
            <v-text-field
                v-model="user.lastname"
                :rules="[rules.required, rules.nameRule]"
                label="Apellido"
                required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
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
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="6">
            <v-select
                :items="gender"
                v-model="user.gender"
                :menu-props="{ top: false, offsetY: true }"
                label="Genero"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <v-menu
                ref="menu"
                v-model="menu"
                :rules="[rules.required]"
                :close-on-content-click="false"
                :return-value.sync="user.birthdate"
                transition = "scale-transition"
                offset-y
                min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="user.birthdate"
                    label="Fecha de nacimiento"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                  v-model="user.birthdate"
                  no-title
                  scrollable
              >
                <v-spacer></v-spacer>
                <v-btn
                    text
                    color="primary"
                    @click="menu = false"
                >
                  Cancelar
                </v-btn>
                <v-btn
                    text
                    color="primary"
                    @click="$refs.menu.save(user.birthdate)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
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
import axios from "axios";
import moment from 'moment';

export default {
  name: "signUp",
  components: {
    squeleton
  },
  data() {
    return {
      menu:false,
      user: {
        firstname: '',
        lastname: '',
        birthdate: '',
        gender: ''
      },
      userData: {
        username: '',
        password: '',
        fullName: '',
        gender: '',
        birthdate: '',
        email: '',
        avatarUrl: ''
      },
      show: false,
      rules: {
        required: value => !!value || 'Obligatorio.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailContains: v => /.+@.+/.test(v) || 'El email debe ser valido',
        nameRule: v => /^[A-Za-z]+$/.test(v)
      },
      gender: ['Femenino', 'Masculino', 'Otro']
    }
  },
  methods: {
    navigateToLogIn() {
      this.$router.push('/login');
    },
    processData() {
      this.userData.fullName = this.user.firstname + ' ' + this.user.lastname;
      this.userData.birthdate = parseInt(moment(this.user.birthdate).format("X"));
      if (this.user.gender === 'Femenino') {
        this.userData.gender = 'female';
        this.userData.avatarUrl = 'https://www.flaticon.com/svg/static/icons/svg/2922/2922561.svg';
      }
      if (this.user.gender === 'Masculino') {
        this.userData.gender = 'male';
        this.userData.avatarUrl = 'https://www.flaticon.com/svg/static/icons/svg/2922/2922510.svg';
      }
      if (this.user.gender === 'Otro') {
        this.userData.gender = 'other';
        this.userData.avatarUrl = 'https://www.flaticon.com/svg/static/icons/svg/1077/1077012.svg';
      }
    },
    submit() {
      this.processData();
      console.log(this.userData);
      axios.post('/user', this.userData)
          .then(() => {
            this.$router.push('/');
          })
          .catch((error) => {
            console.log(error);
          });
      this.valid = true;
    }
  }
}
</script>

<style scoped>

</style>
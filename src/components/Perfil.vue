<template>
  <div>
    <NavBar></NavBar>
    <v-row class="justify-md-start">
      <v-col>
        <v-responsive class="rounded-circle align-center ma-auto pa-2" max-width="80" max-height="80" min-height="80" min-width="80"
                      :style="{backgroundColor: '#2196F3'}">
          <v-img :src=user.userInfo.avatarUrl :width="50" :height="50" class="ma-auto" ></v-img>
        </v-responsive>
      </v-col>
    </v-row>
      <v-form>
        <v-container class="my-5">
          <v-row class="justify-space-around">
            <v-col cols="4">
            <v-text-field outlined :rules="[rules.required,rules.nameRule]" label="Nombre de usuario"
                          :value="user.userInfo.username"
                          append-icon="mdi-pencil"



              >

            </v-text-field>

            </v-col>
            <v-col cols="4">
              <v-text-field
                  outlined
                  :rules="[rules.required,rules.emailContains]"
                  label="Email"
                  :value="user.userInfo.email"
                  append-icon="mdi-pencil"
              ></v-text-field>

            </v-col>
          </v-row>
          <v-row class="justify-space-around">

            <v-col cols="10">
              <v-text-field :rules="[rules.required,rules.nameRule]"   append-icon="mdi-pencil"
                            outlined label="Nombre completo" :value="user.userInfo.fullName"></v-text-field>
            </v-col>


          </v-row>
          <v-row class="justify-space-around">
          <v-col cols="4">
            <v-select
                :items="gender"
                :menu-props="{ top: false, offsetY: true }"
                label="Genero"
                :value="getGender"


                outlined
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-menu
                ref="menu"
                v-model="menu"
                :rules="[rules.required]"
                :close-on-content-click="false"
                :return-value.sync="bdate"
                transition = "scale-transition"
                offset-y
                min-width="290px"

            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="bdate"
                    outlined
                    hint="Formato AAAA/MM/DD"
                    persistent-hint
                    label="Fecha de nacimiento"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker


                  v-model="bdate"
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
                  @click="$refs.menu.save(bdate)"
              >
                OK
              </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          </v-row>
        </v-container>
      </v-form>
    <Footer></Footer>
  </div>
</template>

<script>
import {store} from '@/userStore';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
export default {
  name: "Perfil",
  components: {NavBar, Footer},

  data() {
    return {
      userEdited: {
        username: '',
        password: '',
        fullName: '',
        gender: '',
        birthdate: '',
        email: '',
        avatarUrl: ''
      },
      user: store,
      menu:false,
      rules: {
        required: value => !!value || 'Obligatorio.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailContains: v => /.+@.+/.test(v) || 'El email debe ser valido',
        nameRule: v => /^[A-Za-z ]+$/.test(v)
      },
      bdate: null,
      gender: ['Femenino', 'Masculino', 'Otro']

    }
  },
  mounted(){
      this.bdate = new Date(this.userInfo.birthdate).toISOString().substr(0,10);

  },
  computed:{
    getGender(){
      if(this.user.userInfo.gender === 'male')
        return 'Masculino';
      else if (this.userInfo.gender === 'female')
        return 'Femenino';
      else
        return 'Otro';
    }
  },
  methods:{
    processData (){

    }
  }
}
</script>

<style scoped>

</style>
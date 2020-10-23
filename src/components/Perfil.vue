<template>
  <div>
    <NavBar></NavBar>
    <v-container class="my-5">
    <v-row justify="center">
        <v-hover v-slot="{ hover }">
        <v-btn class="mx-2 blue"
               fab
               dark
               @click="showAvatarSelector">
        <v-responsive class="rounded-circle align-center ma-auto pa-2" max-width="100" max-height="100" min-height="100" min-width="100"
                      :style="{backgroundColor: '#2196F3'}">
          <v-img :src=userEdited.avatarUrl :width="70" :height="70" class="ma-auto" >
            <v-expand-transition>
              <div



                       v-if="hover"
                       class="d-flex justify-center pt-5 transition-fast-in-fast-out transparent  v-card--reveal display-3 white--text"
                       style="height: 100%;"


                       >
                <v-icon
                    x-large

                    color="blue-grey lighten-1"
                >mdi-pencil</v-icon>
              </div>



            </v-expand-transition>

          </v-img>
        </v-responsive>
        </v-btn>

        </v-hover>

         <AvatarSelectorView v-model="avatarSelector" :current-avatar="userEdited.avatarUrl" @select="selectAvatar"></AvatarSelectorView>


    </v-row>
      <v-form v-model="valid">
          <v-row class="justify-space-around">
            <v-col cols="4">
            <v-text-field outlined :rules="[rules.required,rules.nameRule]" label="Nombre de usuario"
                          :value="user.userInfo.username"
                          append-icon="mdi-pencil"
            <v-text-field outlined :rules="[rules.required,rules.userNameRule]" label="Nombre de usuario"
                          v-model="userEdited.username"
                          readonly



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
                  v-model="userEdited.email"
                  readonly
              ></v-text-field>

            </v-col>
          </v-row>
          <v-row class="justify-space-around">

            <v-col cols="10">
              <v-text-field :rules="[rules.required,rules.nameRule]"   append-icon="mdi-pencil"
                            outlined label="Nombre completo" :value="user.userInfo.fullName"></v-text-field>
              <v-text-field :rules="[rules.required,rules.fullNameRule]"
                            readonly
                            v-model="userEdited.fullName"
                            outlined label="Nombre completo"></v-text-field>
            </v-col>


          </v-row>
          <v-row class="justify-space-around">
          <v-col cols="4">
            <v-text-field
                readonly
                label="Género"
                :value="getGender"


                outlined
            ></v-text-field>
          </v-col>
          <v-col cols="4">


                <v-text-field
                    v-model="bdate"
                    outlined
                    hint="Formato AAAA-MM-DD"
                    persistent-hint
                    label="Fecha de nacimiento"
                    prepend-icon="mdi-calendar"
                    readonly
                ></v-text-field>


          </v-col>
          </v-row>
          <v-row class="justify-center">

            <v-col md="2">
              <v-btn color="blue white--text" class="my-5" outlined @click="navigateToLogin()">
                Cancelar

              </v-btn>

            </v-col>
            <v-col md="2" >
              <v-btn color="blue white--text" class="my-5" @click="submit()">
                Finalizar
              </v-btn>

            </v-col>

          </v-row>
      </v-form>
    <Footer></Footer>
    </v-container>
  </div>
</template>

<script>
import {store} from '@/userStore';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import axios from "axios";
import AvatarSelectorView from "@/components/AvatarSelectorView";
export default {
  name: "Perfil",
  components: {NavBar, Footer},
  components: {AvatarSelectorView, NavBar},

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
      valid:false,
      menu:false,
      avatarSelector : false,
      rules: {
        required: value => !!value || 'Obligatorio.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailContains: v => /.+@.+/.test(v) || 'El email debe ser valido',
        fullNameRule: v => /^[A-Za-z ]+$/.test(v) || 'Solo letras y espacios',
        userNameRule: v => /^[A-Za-z0-9]+$/.test(v) || 'Solo caracteres alfanuméricos, sin espacios'
      },
      bdate: null,
      userEdited : {
        "username" : store.userInfo.username,
        "fullName" : store.userInfo.fullName,
        "gender" : store.userInfo.gender,
        "birthdate" : store.userInfo.birthdate,
        "email" : store.userInfo.email,
        "phone": store.userInfo.phone,
        "avatarUrl" : store.userInfo.avatarUrl

      }


    }
  },
  mounted(){
      this.bdate = new Date(this.userInfo.birthdate).toISOString().substr(0,10);
  mounted: function () {

    this.bdate = new Date(this.userEdited.birthdate).toISOString().substr(0, 10);

  },
  computed:{
    getGender(){
      if(this.user.userInfo.gender === 'male')
      if(this.userEdited.gender === 'male')
        return 'Masculino';
      else if (this.userEdited.gender === 'female')
        return 'Femenino';
      else
        return 'Otro';
    }
  },

  methods:{
    navigateToLogin(){
      this.$router.push('/');
    },
    selectAvatar(avatar){
      this.userEdited.avatarUrl = avatar;
    },
    submit () {
      //Solo puede editar su nombre, mail y avatar
      axios.put('/user/current', this.userEdited)
          .then(() => {
            console.log(this.userEdited);

            this.valid = true;
            this.$router.push('/');

          })
          .catch((error) => {
            console.log(error);
          });
    },
    showAvatarSelector (){
      this.avatarSelector = true;
    },

  }
}
</script>

<style scoped>

</style>
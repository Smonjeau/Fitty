<template>
<v-dialog class="dialog-bottom-transition" v-model="show" width="350" >
  <v-card   style="overflow-x: hidden"
  >
    <v-card-title>
      <v-row>
        <v-col>
          Elige un Avatar
        </v-col>
        <v-col class="text-right">
          <v-btn
              color="blue"
              text
              @click="show = false"
          >
            Cancelar
          </v-btn>
        </v-col>
      </v-row>

    </v-card-title>
    <v-row v-for="row in 4" :key="row">
    <v-col v-for="index in 5" :key="index" cols="2">
      <v-btn class="mx-7 my-3" icon @click="selectAvatar(avatars[getIndex(index-1,row-1)])">
        <v-avatar size="50">
        <v-img width="50" height="50" :src=avatars[getIndex(index-1,row-1)]  ></v-img>
        </v-avatar>
      </v-btn>
    </v-col>
    </v-row>
  </v-card>
</v-dialog>
</template>

<script>

export default {
  computed: {
    show: {
      get (){
        return this.value;
      },
      set (value) {
        this.$emit('input',value);
      }
    }
  },
  props : {
    currentAvatar : String,
    value: Boolean
  },
name: "AvatarSelectorView",

data (){
  return{
    avatarSelector : false,
    avatars : [
      'https://www.flaticon.com/svg/static/icons/svg/236/236832.svg',
        'https://www.flaticon.com/svg/static/icons/svg/2922/2922510.svg',
        'https://www.flaticon.com/premium-icon/icons/svg/2202/2202112.svg',
        'https://www.flaticon.com/svg/static/icons/svg/145/145867.svg',
        'https://www.flaticon.com/svg/static/icons/svg/145/145859.svg',
        'https://www.flaticon.com/svg/static/icons/svg/145/145862.svg',
        'https://www.flaticon.com/svg/static/icons/svg/2718/2718302.svg',
        'https://www.flaticon.com/svg/static/icons/svg/3048/3048223.svg',
        'https://www.flaticon.com/svg/static/icons/svg/1912/1912333.svg',
        'https://www.flaticon.com/svg/static/icons/svg/2126/2126459.svg',
        'https://www.flaticon.com/svg/static/icons/svg/889/889455.svg',
        'https://www.flaticon.com/svg/static/icons/svg/2964/2964514.svg',
        'https://www.flaticon.com/svg/static/icons/svg/2936/2936886.svg',
        'https://www.flaticon.com/svg/static/icons/svg/753/753066.svg',
        'https://www.flaticon.com/svg/static/icons/svg/889/889518.svg',
        'https://www.flaticon.com/svg/static/icons/svg/1507/1507155.svg',
        'https://www.flaticon.com/svg/static/icons/svg/616/616412.svg',
        'https://www.flaticon.com/premium-icon/icons/svg/2112/2112184.svg',
        'https://www.flaticon.com/svg/static/icons/svg/3604/3604152.svg',
        'https://www.flaticon.com/svg/static/icons/svg/2519/2519215.svg'




    ]
  }
},
  methods: {
    getIndex(index,row) {
      return index + 5*row;
    },
    selectAvatar(avatar){
      this.$emit('select',avatar);
      this.show=false;
    }
  },
}
</script>

<style scoped>

</style>
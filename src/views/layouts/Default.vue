<template>
  <v-app
    id="inspire"
  >
    <v-navigation-drawer
      v-model="drawer"
      fixed
      clipped
      app
    >
      <v-list dense>
        <v-list-tile v-for="item in items" v-if="!item.hidden" :key="item.path" @click="toPath(item.path)">
          <!--<v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>-->
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.meta.title }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      color="primary"
      dense
      fixed
      clipped-left
      dark
      app
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="mr-5 align-center">
        <span class="title">Admin IFEEP V3</span>
      </v-toolbar-title>
      
      <v-spacer></v-spacer>
      <v-btn v-if="isLogin()" icon @click="logout">
        <v-icon>power_settings_new</v-icon>
      </v-btn>
      <v-btn v-if="!isLogin()"  @click="toLogin">
        Iniciar Sesión
      </v-btn>
    </v-toolbar>
    <v-content>
      <slot/>
    </v-content>
  </v-app>
</template>

<script>
import firebase from 'firebase/app';
export default {
  name: 'default-layout',

  data() {
    return {
      drawer: false,
    };
  },
  methods:{
    logout(){
      var that = this
      firebase.auth().signOut().then(() => {
        that.$store.dispatch('user/closeDBChannel', {clearModule: true}).then(()=>{
          this.$store.dispatch('setUserIsLogin', { flag: false })
          this.$store.dispatch('ResetStatePermision') //Reseteamos los permisos
          that.$router.push('/login')
          }).catch(console.error)
        
      }).catch(function(error) {
        // An error happened.
      });
    },
    toLogin(){
      this.$router.push('/login')
    },
    toPath(path){
      this.$router.push(path)
    },
    isLogin(){
      return this.$store.state.app.userIsLogin
    }
  },
  computed:{
    items(){
      return this.$store.state.permission.routers
    },

    
  }
};
</script>

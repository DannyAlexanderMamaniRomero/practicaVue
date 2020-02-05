<template>
    <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Ingresar a Admin IFEEP v3</v-toolbar-title>
                
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field 
                    prepend-icon="person" 
                    name="login" 
                    label="Correo Coorporativo" 
                    type="text"
                    v-model="email"></v-text-field>
                  <v-text-field 
                    prepend-icon="lock" 
                    :append-icon="showpassword ? 'visibility_off' : 'visibility'"
                    name="password" 
                    label="DNI" 
                    id="password" 
                    :type="showpassword ? 'text' : 'password'"
                    @click:append="showpassword = !showpassword"
                    v-model="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
</template>

<script>
import firebase from 'firebase/app';

export default {
  data() {
    return {
        email: "",
        password: "",
        showpassword: false,
    };
  },
  mounted() {
  },
  beforeDestroy() {
  },
  methods: {
      login: function(){
          firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(()=> {
                return firebase.auth().signInWithEmailAndPassword(this.email,this.password).then((user)=>{
                            alert("Bienvenido denuevo ")
                            this.$store.dispatch('user/openDBChannel').then(()=>{
                              this.$store.dispatch('setUserIsLogin', { flag: true })
                              this.$router.push('/home')
                            }).catch(console.error)
                            
                        },(err)=>{
                            alert("Ha ocurrido un error: "+ err.message)
                        })
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(error)
            });
          
      }
  },
  computed:{
  },
  watch:{
  }
};
</script>

<style>
</style>

<template>
    <v-container grid-list-md text-xs-center>
        <Tabla />
        
    </v-container>
    
</template>

<script>
import Tabla from '@/components/UserAsistencia/Tabla.vue';

export default {
  components: {
    Tabla
  },
  mounted () {
        
        //console.log(this.datas);
    },
  computed:{
      /*datas(){
          var datitos = this.$store.state.users.data;
          console.log(this.$store.state.users.data);
          return datitos;
      }*/
  }
};
</script>
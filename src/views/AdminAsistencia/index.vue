<template>
    <v-container grid-list-md text-xs-center>
        <UserSelector/>
        <Tabla />
        
    </v-container>
    
</template>

<script>
import Tabla from '@/components/AdminAsistencia/Tabla.vue';
import UserSelector from '@/components/Utils/UserSelector.vue';

export default {
  components: {
    Tabla,UserSelector
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

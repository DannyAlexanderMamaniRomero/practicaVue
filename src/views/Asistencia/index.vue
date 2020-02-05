<template>
    <v-container grid-list-md text-xs-center>
        <Reloj />
        <QrScan />
        
    </v-container>
    
</template>

<script>
import Reloj from '@/components/Asistencia/Reloj.vue';
import QrScan from '@/components/Asistencia/QrScan.vue';

export default {
  components: {
    Reloj,QrScan,
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

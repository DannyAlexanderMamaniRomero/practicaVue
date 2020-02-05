<template>
    <v-container fluid>
        <Tabs />
        
    </v-container>
    
</template>

<script>
import Tabs from '@/components/Codigos/Tabs.vue';

export default {
  components: {
    Tabs
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
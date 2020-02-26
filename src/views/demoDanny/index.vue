
<template>
    <v-container grid-list-md text-xs-center> 
       <Card />      
    </v-container>  
</template> 

<script>
import Card from '@/components/demoDanny/Card.vue';

export default {
  components: {
    Card,
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

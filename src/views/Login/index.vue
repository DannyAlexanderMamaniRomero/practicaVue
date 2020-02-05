<template>
    <v-container fluid fill-height>
        
        <Form />
        
    </v-container>
    
</template>

<script>
import Form from '@/components/Login/Form.vue';

export default {
  components: {
    Form,
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

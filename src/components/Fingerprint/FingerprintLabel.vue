<template>
    <v-layout justify-center row wrap>
        <v-flex xs12>
            Fingerprint: {{fingerhash}}
        </v-flex>
    </v-layout>
</template>

<script>
import Fingerprint2 from 'fingerprintjs2';
export default {
  data() {
    return {
        fingerhash: "", 
    };
  },
  mounted() {
      var that = this
      Fingerprint2.getV18(function(hash){
          that.fingerhash = hash; 
          console.log(hash) // an array of components: {key: ..., value: ...}
        })
  },
  beforeDestroy() {
  },
  methods: {
  },
  computed:{
      
  },
  watch:{
      
  }
};
</script>

<style>
</style>

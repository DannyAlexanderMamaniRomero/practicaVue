<template>
    <v-layout justify-center row wrap>
        <v-flex xs12>
            <v-select
          :items="items"
          v-model="select"
          item-text="text"
          item-value="value"
          label="Seleccione el usuario"
          outline
        ></v-select>
        </v-flex>
    </v-layout>
</template>

<script>

export default {
  data() {
    return {
      select: null,
      
    };
  },
  mounted() {
  },
  beforeDestroy() {
  },
  methods: {
  },
  computed:{
      items(){
        var that = this
        const obj = this.$store.state.users.data
        var arr = []
        Object.keys(obj).forEach(function(key){
            var objdata = {}
            objdata.text = obj[key].nombres + " " + obj[key].apellidos
            objdata.value = obj[key].id
            
            arr.push(objdata)
        });

        return arr
      },
      userselector(){
          return this.$store.state.app.userSelector
      }
  },
  watch:{
      select(val,oldval){
          this.$store.dispatch('setUserSelector', { user: val })
          console.log(val + " - " + oldval)
      }
  }
};
</script>

<style>
</style>

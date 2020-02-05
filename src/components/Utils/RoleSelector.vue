<template>
    <v-layout justify-center row wrap>
        <v-flex xs12>
            <v-select
          :items="items"
          v-model="select"
          label="Restriccion de rol"
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
      items: [],
    };
  },
  beforeMount(){
      let that = this
      this.$store.dispatch('config/openDBChannel').then(()=>{
          that.items = this.$store.getters["config/getConfigbyName"]("roles").list
      }).catch(console.error)
  },
  beforeDestroy() {
  },
  methods: {
  },
  computed:{
        roleSelector(){
            return this.$store.state.app.roleSelector
        }
  },
  watch:{
      select(val,oldval){
          this.$store.dispatch('setRoleSelector', { flag: val })
          console.log(val + " - " + oldval)
      }
  }
};
</script>

<style>
</style>

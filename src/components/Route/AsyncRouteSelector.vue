<template>
    <v-layout justify-center row wrap>
        <v-flex xs12>
            <v-select
          :items="itemsRouter"
          v-model="select"
          item-text="meta.title"  
          item-value="name"
          label="Seleccione la ruta"
          outline
        ></v-select>
        {{routeSelector}} 
        </v-flex>
    </v-layout>
</template>

<script>
import { asyncRouterMap } from '@/router'
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
      itemsRouter(){
          return asyncRouterMap;
      },
      routeSelector(){
          return this.$store.state.app.routeSelector
      }
  },
  watch:{
      select(val,oldval){
          this.$store.dispatch('setRouteSelector', { flag: val })
          console.log(val + " - " + oldval)
      }
  }
};
</script>

<style>
</style>

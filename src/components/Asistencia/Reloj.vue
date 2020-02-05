<template>
    <div>
    <v-layout justify-center row wrap>
        <v-flex xs12>
            <h2 class="font-weight-bold">
                Hora Actual (GMT-5):
            </h2>
        </v-flex>
    </v-layout>
    <v-layout justify-center row wrap mb-3>
        <v-flex xs1>
            <v-card dark color="primary">
                <v-card-text class="px-0 display-1 font-weight-black">{{hora}}</v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs1>
            <v-card dark color="primary">
                <v-card-text class="px-0 display-1 font-weight-black">{{minuto}}</v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs1>
            <v-card dark color="primary">
                <v-card-text class="px-0 display-1 font-weight-black">{{segundo}}</v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
    </div>
</template>

<script>

export default {
  data() {
    return {
      hora: 0,
      minuto: 0,
      segundo: 0,
    };
  },
  mounted() {
    this.$options.interval = setInterval(this.updateDateTime, 1000);
  },
  beforeDestroy() {
    clearInterval(this.$options.interval);
  },
  methods: {
    updateDateTime() {
      const now = new Date();
      this.hora = now.getHours();
      this.minuto = now.getMinutes();
      this.segundo = now.getSeconds();
    },
  },
};
</script>

<style>
</style>

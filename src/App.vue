<template>
  <div id="app">

      <Home v-if="authenticated"/>

      <Login v-else/>

  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import Login from './views/auth/Login.vue'
import Home from './views/Home.vue'

export default {

  name: 'App',

  components: {Login,Home},

  data: () => ({
    drawer: null,
  }),

  computed: {
    ...mapGetters(['authenticated']),
  },

};

</script>

<style>

</style>

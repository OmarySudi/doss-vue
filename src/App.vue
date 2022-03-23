<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'

export default {

  name: 'App',

  data: () => ({
    drawer: null,
  }),

  computed: {
    ...mapGetters(['authenticated','user']),
    
    checkIfLoggedIn(){

      if(localStorage.getItem('email') == null)
        return false
      else
        return true;
    }
  },

  methods: {
    ...mapActions(['logout'])
  },

  created(){
     console.log("authenticated is "+this.authenticated)
     console.log(this.checkIfLoggedIn)
  }

};

</script>

<style>

</style>

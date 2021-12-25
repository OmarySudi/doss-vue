<template>
  <v-app>
    <div v-if="authenticated">
      <v-navigation-drawer
        v-model="drawer"
        app
      >
        
      </v-navigation-drawer>

      <v-app-bar app>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Petty Cash</v-toolbar-title>

        <button @click="logout()">logout</button>
      </v-app-bar>
    </div>
    
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
    
    drawer: null
  }),

  computed: {
    ...mapGetters(['authenticated'])
  },

  methods: {
    ...mapActions(['logout'])
  }

};

</script>

<style>

.signing-card{
    border: 1px solid #ffffff !important;  
}

.inputtext {
    color: #136772 !important;
    border-color: #136772 !important;
}

.inputtext .v-text-field__slot input{
    color: #136772 !important;
    border-color: #136772 !important;
}

.inputtext .v-icon{
  color: #136772 !important;
  margin-top: 3px;
}

.inputtext .v-label{
  color: #136772 !important;
  margin-left:0px ;
  margin-top: 3px;
}

.inputtext :hover {
   border-color: #136772 !important;
}
</style>

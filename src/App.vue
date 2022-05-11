<template>
  <div id="app">
    
      <Home v-if="authenticated"/>

      <Login v-else/>

  </div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
import Login from './views/auth/Login.vue'
import Home from './views/Home.vue'
import ApiService from './services/api'

export default {

  name: 'App',

  components: {Login,Home},

  data: () => ({
    drawer: null,
  }),

  computed: {
    ...mapGetters(['authenticated']),
  },

  methods:{

    ...mapActions(['FETCH_SCHOOLS','FETCH_CLASS_LEVELS','FETCH_STUDENT_CLASSES']),
  },

  created(){

    //this.FETCH_SCHOOLS();

    this.FETCH_CLASS_LEVELS();

    this.FETCH_STUDENT_CLASSES();
    
  }

};

</script>

<style>
.v-toolbar__title {
  color: white;
}
</style>

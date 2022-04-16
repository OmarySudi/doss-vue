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

    ...mapActions(['FETCH_SCHOOLS','FETCH_CLASS_LEVELS']),

    async fetchSchools(){
      await ApiService.get("schools/").then((response)=>{
          if(response.status == 200){
              this.$store.commit('SET_SCHOOLS',response.data.objects)
          } else {
              this.$store.commit('SET_MESSAGE',response.data.message)
          }
      });
    },

    async fetchClassLevels(){
      await ApiService.get("class-levels/").then((response)=>{
          if(response.status == 200){
              this.$store.commit('SET_CLASS_LEVELS',response.data.objects)
          } else {
              this.$store.commit('SET_MESSAGE',response.data.message)
          }
      });
    }
  },

  created(){

    this.FETCH_SCHOOLS();

    this.FETCH_CLASS_LEVELS();
    
  }

};

</script>

<style>
.v-toolbar__title {
  color: white;
}
</style>

<template>
  <h3>Home page welcome {{user.user_type}}</h3>
</template>

<script>
import {mapGetters} from 'vuex'

  export default {
    name: 'Home',

    computed: {
      ...mapGetters(['user']),
    },

    components: {
      
    },
  }
</script>

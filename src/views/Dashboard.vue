<template>
  <v-container>
     {{user.user_type}} Dashboard
  </v-container>
</template>

<script>
import {mapGetters} from 'vuex'
export default {

    name: 'Dashboard',

    computed: {
      ...mapGetters(['user']),
    },
}
</script>

<style>

</style>
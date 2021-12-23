<template>
  <v-app>
    <div v-if="isUserLoggedIn">
      <v-navigation-drawer
        v-model="drawer"
        app
      >
        <!--  -->
      </v-navigation-drawer>

      <v-app-bar app>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Petty Cash</v-toolbar-title>
      </v-app-bar>
    </div>
    
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
    isUserLoggedIn: false,
    user: null,
    drawer: true
  }),

};

</script>

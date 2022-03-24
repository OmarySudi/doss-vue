<template>
    <v-app >
      <v-main>
        <v-app-bar
            color="primary"
            dark
            height="100px"
        >
            <v-spacer></v-spacer>
            <v-toolbar-title>DIGITIZE OUR SCHOOLS</v-toolbar-title>
            <v-spacer></v-spacer>

        </v-app-bar>
        
         <v-container fluid fill-height class="container">
            <v-layout justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title>Login form</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <form ref="form" @submit.prevent="login()">
                            <v-text-field
                              v-model="username"
                              name="username"
                              label="Username"
                              type="text"
                              placeholder="username"
                              required
                           ></v-text-field>
                           
                            <v-text-field
                              v-model="password"
                              name="password"
                              label="Password"
                              type="password"
                              placeholder="password"
                              required
                           ></v-text-field>
                           <v-btn type="submit" class="mt-4" color="primary" value="log in">Login</v-btn>
                        </form>
                     </v-card-text>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-container>
      </v-main>
   </v-app> 
</template>

<script>
export default {

 data() {
    return {
      username: "",
      password: "",
    };
  },

  methods: {
    login() {
      const { username } = this;
      console.log(username + "logged in")
    },
  },
}
</script>

<style scoped>

.container{
    position:absolute;
    top: 120px
}


</style>
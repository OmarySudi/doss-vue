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
            <Snackbar 
               :type="snackbarType" 
               :snackbar="snackbar" 
               :text="snackbarText" 
               :timeout="snackbarTimeout"
            />
            
            <v-layout justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title>Login form</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <form ref="form" @submit.prevent="signIn()">
                            <v-text-field
                              v-model="email"
                              name="email"
                              label="E-mail"
                              type="text"
                              placeholder="youremail@login.com"
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
          <CircularLoader :loading="circularLoader"/>
         </v-container>
      </v-main>
   </v-app> 
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
import Snackbar from '../../components/Snackbar.vue'
import CircularLoader from '../../components/CircularLoader.vue'
import {projectMixin} from '../../mixins/mixins'

export default {
   components: {Snackbar,CircularLoader},
   mixins: [projectMixin],

   data() {
      return {
         email: "",
         password: "",
         loading: false,
      };
   },

   computed: {

        ...mapGetters(['load_message']),
   },

  methods: {

     ...mapActions(['Login','setMessage']),
    async signIn() {

      const { email, password } = this;
      
      if(email != '' && password != ''){

         this.clearAlerts();

         let loginData = {
            email: email,
            password: password
         }

         this.circularLoader = true;

         await this.Login(loginData);

          if(this.load_message != null){

            this.circularLoader = false;

            const message = this.load_message.split(" ");

            if(message[0] == "Client:" || message[0] == "Server:"){
               this.setAlert("error",true,this.load_message,-1);
            } else {
                  this.setAlert("warning",true,this.load_message,-1);
            }

            setTimeout(()=>{
               this.snackbar = false;
               this.setMessage(null);
            },4000);

         } else {
            this.circularLoader = false;
         }
        
      }
      
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
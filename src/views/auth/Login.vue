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
                              prepend-inner-icon="mdi-account"
                              :error-messages="emailErrors"
                              @input="$v.email.$touch()"
                              @blur="$v.email.$touch()"
                              v-on:keyup.enter="signIn()"
                           ></v-text-field>
                           
                            <v-text-field
                              v-model="password"
                              name="password"
                              label="Password"
                              placeholder="password"
                              required
                              prepend-inner-icon="mdi-lock"
                              :type="showPassword ? 'text' : 'password'"
                              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                              @click:append ="toggleShowPassword()"
                              :error-messages="passwordErrors"
                              @input="$v.password.$touch()"
                              @blur="$v.password.$touch()"
                              v-on:keyup.enter="signIn()"
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
import { required, email, minLength} from 'vuelidate/lib/validators'

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
         showPassword:false,
         passwordMinimumLength:6 
      };
   },

   computed: {

        ...mapGetters(['load_message']),

      emailErrors() {
         const errors = []
         if (!this.$v.email.$dirty) {
            return errors
         }
         !this.$v.email.required && errors.push('E-mail is required')
         !this.$v.email.email && errors.push('Must be valid e-mail')
         return errors
      },

      passwordErrors() {
         const errors = []
         if (!this.$v.password.$dirty) {
            return errors
         }
         !this.$v.password.required && errors.push('password is required')
         !this.$v.password.minLength && errors.push(' password must be a minimum of 6 characters')
         return errors
      },
   },

   validations: {
      email: { required, email },
      password: { required,minLength: minLength(6) },
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

   toggleShowPassword(){
      this.showPassword = !this.showPassword     
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
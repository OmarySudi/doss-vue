<template>
    <v-app id="inspire">
      <v-app-bar
         app 
         color="primary"
         height="90px"
      >
         <v-spacer></v-spacer>
         <v-toolbar-title>DIGITIZE OUR SCHOOLS</v-toolbar-title>
         <v-spacer></v-spacer>
      </v-app-bar>
      <v-main>
         <router-view/>
      </v-main>
   </v-app> 
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
import { required, email, minLength} from 'vuelidate/lib/validators'

import Snackbar from '../../components/Snackbar.vue'
import CircularLoader from '../../components/CircularLoader.vue'
import {projectMixin} from '../../mixins/mixins'
import ApiService from '../../services/api'


export default {
   components: {Snackbar,CircularLoader},
   mixins: [projectMixin],

   data() {
      return {
         email: "",
         password: "",
         loading: false,
         showPassword:false,
         passwordMinimumLength:6 ,
         resetPasswordDialog: false,
         showLogin: true,
         resetEmail: "",
         disableSendButton: false,
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

       resetEmailErrors(){

         const errors = []
         if (!this.$v.resetEmail.$dirty) {
            return errors
         }
         !this.$v.resetEmail.required && errors.push('E-mail is required')
         !this.$v.resetEmail.email && errors.push('Must be valid e-mail')
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
      resetEmail: {required,email},
      password: {required,minLength: minLength(6) },
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

   displayResetPasswordForm(){
      this.showLogin = false;
   },

   displayLoginForm(){

      this.showLogin = true;
      this.disableSendButton = false;
      this.resetEmail = '';
   },

   SendResetPasswordEmail(){

      if(this.resetEmailErrors.length == 0){

         this.clearAlerts();
         this.circularLoader = true;

         let data = {
            email: this.resetEmail
         }

         ApiService.post('auth/forgetPassword/',data).then((response)=>{

            if(response.status == 200){
               this.circularLoader = false;
               this.disableSendButton = true;
               this.setAlert("success",true,response.data.message,-1);
               setTimeout(()=>{
                location.reload();
               },3000);
            } else {

               if(response.data.objects){

               this.circularLoader = false;
               this.setAlert("error",true,response.data.message,10000);

               } else {

               this.circularLoader = false;
               this.setAlert("error",true,"There is internal server error",5000);
               }
            }
         }).catch((error)=>{

            this.circularLoader = false;
            if(error.response.data.generalErrorCode){

               this.setAlert("error",true,error.response.data.message,5000);

            } else {
               this.setAlert("error",true,"There is internal error",5000);
            }
         })

      } else {

         this.clearAlerts();

         this.setAlert("warning",true,"There are validation errors",5000);
      }
   }

  },

  beforeRouteEnter(to,from,next){
      next(vm=>{ 
         console.log("before route enter");
        // console.log(to.params)
       });
  }
}
</script>

<style scoped>

</style>
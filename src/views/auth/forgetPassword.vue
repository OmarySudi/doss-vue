<template>
  <v-container fluid fill-height class="container">
            
      <Snackbar 
         :type="snackbarType" 
         :snackbar="snackbar" 
         :text="snackbarText" 
         :timeout="snackbarTimeout"
      />
      
      <v-layout justify-center>
         <v-flex xs12 sm8 md4>
            <v-card width="500">
              <v-toolbar dark color="primary">
                <v-spacer></v-spacer>
                <v-toolbar-title>RESET PASSWORD</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>

              <form ref="AddUserForm" @submit.prevent="resetPassword()">
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                      >
                        <v-text-field
                          v-model="newPassword"
                          label="New Password"
                          required
                          prepend-inner-icon="mdi-lock"
                          :type="showNewPassword ? 'text' : 'password'"
                          :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
                          :error-messages="NewPasswordErrors"
                          @input="$v.newPassword.$touch()"
                          @blur="$v.newPassword.$touch()"
                          @click:append ="toggleNewPassword()"
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                      >
                        <v-text-field
                          v-model="confirmPassword"
                          label="Confirm Password"
                          required
                          prepend-inner-icon="mdi-lock"
                          :type="showConfirmPassword ? 'text' : 'password'"
                          :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                          :error-messages="ConfirmPasswordErrors"
                          @input="$v.confirmPassword.$touch()"
                          @blur="$v.confirmPassword.$touch()"
                          @click:append ="toggleConfirmPassword()"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    class="ml-2 mr-5"
                    text
                    :disabled="disableResetButton"
                    type="submit"
                  >
                    RESET
                  </v-btn>
                
                </v-card-actions>
              </form>
            </v-card>

         </v-flex>
      </v-layout>
      <CircularLoader :loading="circularLoader"/>
   </v-container>
</template>

<script>
import {mapActions} from 'vuex'
import { required, email, numeric,minLength,maxLength, sameAs} from 'vuelidate/lib/validators'
import {projectMixin} from '../../mixins/mixins'
import Snackbar from '../../components/Snackbar.vue'
import CircularLoader from '../../components/CircularLoader.vue'
import ApiService from '../../services/api'

export default {

  components: {Snackbar,CircularLoader},

  validations: {
    newPassword: {required,minLength: minLength(6),  sameAsPassword: sameAs('confirmPassword')},
    confirmPassword: {required,minLength: minLength(6), sameAsPassword: sameAs('newPassword') },
  },

  mixins: [projectMixin],

  data: ()=>({
    showNewPassword: false,
    showConfirmPassword: false,
    newPassword:'',
    confirmPassword:'',
    code:'',
    disableResetButton: false,
  }),

    computed:{

      NewPasswordErrors() {
        const errors = []
        if (!this.$v.newPassword.$dirty) {
          return errors
        }
        !this.$v.newPassword.required && errors.push('password is required')
        !this.$v.newPassword.minLength && errors.push(' password must be a minimum of 6 characters')
        return errors
      },

      ConfirmPasswordErrors() {
        const errors = []
        if (!this.$v.confirmPassword.$dirty) {
          return errors
        }
        !this.$v.confirmPassword.required && errors.push('password is required')
        !this.$v.confirmPassword.minLength && errors.push(' password must be a minimum of 6 characters')
        !this.$v.confirmPassword.sameAsPassword && errors.push('should match new password')

        return errors
      },

  },

  methods:{

    ...mapActions(['logout']),

    resetPassword(){
      if( this.NewPasswordErrors.length == 0 && this.ConfirmPasswordErrors.length == 0 )
      {
        //sending for editing;
        this.clearAlerts();

        this.circularLoader = true;

        let data = {
          password: this.confirmPassword
        };

        ApiService.post('auth/resetPassword/'+this.code,data).then((response)=>{
          
          if(response.status == 200 && response.data.generalErrorCode == 8000){

            this.circularLoader = false;
            this.disableResetButton = true;
            this.setAlert("success",true,response.data.message,-1);
        
            setTimeout(()=>{
                this.logout();
            },3000);

          } else {

            this.circularLoader = false;

            this.setAlert("warning",true,response.data.message,5000);
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
    },

    toggleNewPassword(){
      this.showNewPassword = !this.showNewPassword;
    },

    toggleConfirmPassword(){
      this.showConfirmPassword = !this.showConfirmPassword;
    },
  },

  beforeRouteEnter (to, from, next) {
    // ...
    next(vm=>{
      vm.code = to.params.code;
    });
  }

}
</script>

<style>

</style>
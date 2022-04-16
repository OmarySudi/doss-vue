<template>
  <v-container>
     <Snackbar 
        :type="snackbarType" 
        :snackbar="snackbar" 
        :text="snackbarText" 
        :timeout="snackbarTimeout"
    />
      <v-row justify="center">
        <v-card elevation="5" width="1000" class="mt-3">
          <v-card-text>
            <v-container>

              <v-row>
                <v-col cols="12">
                  <v-row justify="end" class="">

                    <v-dialog
                      v-model="dialog"
                      width="700"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="primary"
                          dark
                          class="mr-3"
                          v-bind="attrs"
                          v-on="on"
                        >
                         EDIT
                        </v-btn>
                      </template>

                      <v-card width="700">
                        <v-toolbar>
                          <v-spacer></v-spacer>
                          <span class="font-weight-bold">YOUR INFORMATION</span>
                          <v-spacer></v-spacer>
                        </v-toolbar>

                        <form ref="AddUserForm" @submit.prevent="saveUser()">
                          <v-card-text>
                            <v-container>
                              <v-row>
                                <v-col
                                  cols="12"
                                  sm="6"
                                >
                                  <v-text-field
                                    v-model="name"
                                    label="Full Name"
                                    required
                                  ></v-text-field>
                                </v-col>

                                <v-col
                                  cols="12"
                                  sm="6"
                                >
                                  <v-text-field
                                    v-model="email"
                                    label="Email"
                                    required
                                    :error-messages="emailErrors"
                                    @input="$v.email.$touch()"
                                    @blur="$v.email.$touch()"
                                  ></v-text-field>
                                </v-col>
                              </v-row>
                              <v-row>
                                <v-col
                                  cols="12"
                                  sm="6"
                                >
                                  <v-text-field
                                    v-model="phone_number"
                                    label="Phone Number"
                                    required
                                    :error-messages="phoneNumberErrors"
                                    @input="$v.phone_number.$touch()"
                                    @blur="$v.phone_number.$touch()"
                                  ></v-text-field>
                                </v-col>
                              </v-row>
                            </v-container>
                          </v-card-text>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="blue darken-1"
                              text
                              @click="closeDialog"
                            >
                              Cancel
                            </v-btn>
                            <v-btn
                              color="blue darken-1"
                              class="ml-2 mr-5"
                              text
                              type="submit"
                            >
                              Save
                            </v-btn>
                          
                          </v-card-actions>
                        </form>
                      </v-card>
                    </v-dialog>
                 
                    <v-dialog
                      v-model="passwordDialog"
                      width="500"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="primary"
                          dark
                          v-bind="attrs"
                          v-on="on"
                        >
                         CHANGE PASSWORD
                        </v-btn>
                      </template>

                      <v-card width="500">
                        <v-toolbar>
                          <v-spacer></v-spacer>
                          <span class="font-weight-bold">PASSWORD CHANGE</span>
                          <v-spacer></v-spacer>
                        </v-toolbar>

                        <form ref="AddUserForm" @submit.prevent="ChangePassword()">
                          <v-card-text>
                            <v-container>
                              <v-row>
                                <v-col
                                  cols="12"
                                >
                                  <v-text-field
                                    v-model="oldPassword"
                                    label="Old Password"
                                    required
                                    prepend-inner-icon="mdi-lock"
                                    :type="showOldPassword ? 'text' : 'password'"
                                    :append-icon="showOldPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                    :error-messages="OldPasswordErrors"
                                    @input="$v.oldPassword.$touch()"
                                    @blur="$v.oldPassword.$touch()"
                                    @click:append ="toggleOldPassword()"
                                  ></v-text-field>
                                </v-col>

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
                              text
                              @click="closePasswordDialog"
                            >
                              Cancel
                            </v-btn>
                            <v-btn
                              color="blue darken-1"
                              class="ml-2 mr-5"
                              text
                              type="submit"
                            >
                              Save
                            </v-btn>
                          
                          </v-card-actions>
                        </form>
                      </v-card>
                    </v-dialog>
                  </v-row>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-card class="ml-2 mt-2 mr-2 py-1 px-2" :elevation="2">
                    <p class="body-1 mb-1 ml-1 primary--text">FULL NAME</p>
                    <p class="subtitle-1 ml-1 font-weight-regular grey--text">{{ user.name}}</p>
                  </v-card>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <v-card class="ml-2 mt-2 mr-2 py-1 px-2" :elevation="2">
                    <p class="body-1 mb-1 ml-1 primary--text">EMAIL</p>
                    <p class="subtitle-1 ml-1 font-weight-regular grey--text">{{ user.email}}</p>
                  </v-card>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <v-card class="ml-2 mt-2 mr-2 py-1 px-2" :elevation="2">
                    <p class="body-1 mb-1 ml-1 primary--text">MOBILE NUMBER</p>
                    <p class="subtitle-1 ml-1 font-weight-regular grey--text">{{ user.phone_number}}</p>
                  </v-card>
                </v-col>
              </v-row>

              <v-row v-if="user.user_type == 'TEACHER'">
                <v-col cols="12" sm="6" md="4">
                  <v-card class="ml-2 mt-2 mr-2 py-1 px-2" :elevation="2">
                    <p class="body-1 mb-1 ml-1 primary--text">SCHOOL</p>
                    <p class="subtitle-1 ml-1 font-weight-regular grey--text">{{ user.school}}</p>
                  </v-card>
                </v-col>
              </v-row>

            </v-container>
          </v-card-text>
        </v-card>
      </v-row>
       <CircularLoader :loading="circularLoader"/>
  </v-container>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import { required, email, numeric,minLength,maxLength, sameAs} from 'vuelidate/lib/validators'
import {projectMixin} from '../../mixins/mixins'
import Snackbar from '../../components/Snackbar.vue'
import CircularLoader from '../../components/CircularLoader.vue'
import ApiService from '../../services/api'

export default {

  components: {Snackbar,CircularLoader},

  validations: {
    email: {required, email},
    phone_number: {required,numeric, minLength:minLength(12), maxLength:maxLength(12)},
    oldPassword: {required,minLength: minLength(6) },
    newPassword: {required,minLength: minLength(6),  sameAsPassword: sameAs('confirmPassword')},
    confirmPassword: {required,minLength: minLength(6), sameAsPassword: sameAs('newPassword') },
  },

  mixins: [projectMixin],

  data: ()=>({

    dialog: false,
    passwordDialog: false,

    showOldPassword: false,
    showNewPassword: false,
    showConfirmPassword: false,

    oldPassword: '',
    newPassword:'',
    confirmPassword:'',

    name: '',
    phone_number:'',
    email:'',
    user_type: '',
    user_gid:'',

  }),

  computed:{
    ...mapGetters(['user','get_teacher_school']),

    //validation
    emailErrors(){
      const errors = []
      if (!this.$v.email.$dirty) {
        return errors
      }
      !this.$v.email.required && errors.push('Email is required')
      !this.$v.email.email && errors.push('Must be a valid e-mail')
      return errors
    },

    phoneNumberErrors(){
      const errors = []
      if (!this.$v.phone_number.$dirty) {
        return errors
      }
      !this.$v.phone_number.required && errors.push('Phone number  is required')
      !this.$v.phone_number.numeric && errors.push('Should contain only numbers')
      !this.$v.phone_number.minLength && errors.push('Should contain 12 numbers starts with 255')
      !this.$v.phone_number.maxLength && errors.push('Should contain 12 numbers starts with 255')
      return errors
    },

    OldPasswordErrors() {
      const errors = []
      if (!this.$v.oldPassword.$dirty) {
        return errors
      }
      !this.$v.oldPassword.required && errors.push('password is required')
      !this.$v.oldPassword.minLength && errors.push(' password must be a minimum of 6 characters')
      return errors
    },

    NewPasswordErrors() {
      const errors = []
      if (!this.$v.newPassword.$dirty) {
        return errors
      }
      !this.$v.newPassword.required && errors.push('password is required')
      !this.$v.newPassword.minLength && errors.push(' password must be a minimum of 6 characters')
      !this.$v.newPassword.sameAsPassword && errors.push('Should match confirm password')
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

    saveUser(){

      if(this.phoneNumberErrors.length == 0 && this.emailErrors.length == 0){

        //sending for editing;
        this.clearAlerts();

        this.circularLoader = true;

        let user = {
          name: this.name,
          email: this.email,
          phone_number: this.phone_number,
          user_type: this.user_type,
        }

        ApiService.put('users/update/'+this.user_gid,user).then((response)=>{

          if(response.status == 200){

            this.circularLoader = false;

            this.dialog = false;

            let userResponse = response.data.objects;

            localStorage.setItem('name',userResponse.name);
            localStorage.setItem('email',userResponse.email);

            switch (userResponse.user_type) {

              case 'TEACHER':
                localStorage.setItem('phone_number',userResponse.teacher.phone_number);
                break;
              
              case 'RESEARCHER':
                localStorage.setItem('phone_number',userResponse.researcher.phone_number);
                break;

              case 'OFFICER':
                localStorage.setItem('phone_number',userResponse.officer.phone_number);
                break;
            
              default:
                break;
            }

            let user = {

              name: localStorage.getItem('name'),
              user_gid: localStorage.getItem('user_gid'),
              email: localStorage.getItem('email'),
              user_type: localStorage.getItem('user_type'),
              code: localStorage.getItem('code'),
              phone_number: localStorage.getItem('phone_number'),
              school: localStorage.getItem('school'),
            }

            this.$store.commit('SET_USER',user)
            this.setAlert("success",true,response.data.message,5000);

          } else {

            if(response.data.objects){

              this.circularLoader = false;
              this.setAlert("error",true,response.data.message,10000);

            } else {

              this.circularLoader = false;
              this.setAlert("error",true,"There is internal server error",10000);
            }
          }

        }).catch((error)=>{

           this.circularLoader = false;
          if(error.response.data.generalErrorCode){
            this.setAlert("error",true,error.response.data.message,10000);
          } else {
            this.setAlert("error",true,"There is internal error",10000);
          }
        })

      } else {

        this.clearAlerts();

        this.setAlert("warning",true,"There are validation errors",5000);
        
      }
    },

    closeDialog(){
      
      this.dialog = false;

    },

    closePasswordDialog(){

      this.passwordDialog = false;
    },

    ChangePassword(){

      if(
        this.OldPasswordErrors.length == 0 && 
        this.NewPasswordErrors.length == 0 && 
        this.ConfirmPasswordErrors.length == 0
        )
      {
        
        //sending for editing;
        this.clearAlerts();

        this.circularLoader = true;

        let data = {
          old_password: this.oldPassword,
          new_password: this.newPassword,
        };

        ApiService.put('users/changePassword/'+this.user.user_gid,data).then((response)=>{
          
          if(response.status == 200 && response.data.generalErrorCode == 8000){

            this.circularLoader = false;
            this.passwordDialog = false;
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

    toggleOldPassword(){
      this.showOldPassword = !this.showOldPassword;
    },

    toggleNewPassword(){
      this.showNewPassword = !this.showNewPassword;
    },

    toggleConfirmPassword(){
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  },

  beforeRouteEnter (to, from, next) {

      next(vm=>{  
        if(vm.user != null){
          vm.name = vm.user.name;
          vm.phone_number = vm.user.phone_number;
          vm.email = vm.user.email;
          vm.user_type = vm.user.user_type;
          vm.user_gid = vm.user.user_gid;
        }
      });

  }
}
 
</script>

<style>

</style>
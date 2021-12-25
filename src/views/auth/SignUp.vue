<template>
    <v-container
        fluid
        class="fill-height"
    >
        <Snackbar 
            :type="snackbarType" 
            :snackbar="snackbar" 
            :text="snackbarText" 
            :timeout="snackbarTimeout"
        />

        <v-row 
            justify="center" 
            dense
            no-gutters
        >
            <v-col  
                cols="10"
                sm="8"
                md="4"
                lg="4"
                xl="3" 
                class="text-center" 
                align-self="end"
            >
                <v-card class="elevation-12 signing-card mt-5">
                    <p class=" text-center  inputtext title font-weight-regular mb-4 mt-6 "> Create Account</p>
                    <v-card-text>
                        <v-row>
                            <v-col cols=12>
                                <v-form>
                                    <v-hover class="mb-5">
                                        <template v-slot="{ hover }">
                                            <v-card  color="transparent"
                                                        height="45" 
                                                        class="mx-4 mb-5"
                                                        :elevation="hover ? 3: 0"
                                            >
                                                <v-text-field 
                                                    v-model="email"
                                                    height="45"
                                                    outlined
                                                    class="mt-1 inputtext" 
                                                    color="primary" 
                                                    label="Email"
                                                    type="text"
                                                    background-color="transparent"
                                                    dense
                                                    required
                                                    clearable
                                                    prepend-inner-icon="mdi-email"
                                                    :error-messages="emailErrors"
                                                    @input="$v.email.$touch()"
                                                    @blur="$v.email.$touch()"
                                                    v-on:keyup.enter="signup()"
                                                    > 
                                                    <!-- <template #label>
                                                        <span class="red--text"><strong>* </strong></span>Email
                                                    </template> -->
                                                </v-text-field>
                                            </v-card>
                                        </template>
                                    </v-hover>

                                    <v-hover class="mb-5">
                                        <template v-slot="{ hover }">
                                            <v-card  color="transparent"
                                                        height="45" 
                                                        class="mx-4 mb-5"
                                                        :elevation="hover ? 3: 0"
                                            >
                                                <v-text-field 
                                                    v-model="userName"
                                                    height="45"
                                                    outlined
                                                    class="mt-1 inputtext" 
                                                    color="primary" 
                                                    label="User Name"
                                                    type="text"
                                                    background-color="transparent"
                                                    dense
                                                    required
                                                    clearable
                                                    prepend-inner-icon="mdi-account"
                                                    :error-messages="nameErrors"
                                                    @input="$v.userName.$touch()"
                                                    @blur="$v.userName.$touch()"
                                                    v-on:keyup.enter="signup()"
                                                    > 

                                                    <!-- <template #label>
                                                        <span class="red--text"><strong>* </strong></span>User Name
                                                    </template> -->
                                                </v-text-field>
                                            </v-card>
                                        </template>
                                    </v-hover>
                                    
                                    <v-hover class="mb-5">
                                        <template v-slot="{hover}">
                                            <v-card color="transparent" 
                                                    height="45" 
                                                    :elevation="hover?3:0"
                                                    class="mx-4 mb-5">
                                                <v-text-field 
                                                    v-model="password"
                                                    height="45"
                                                    label="Password"
                                                    outlined
                                                    required
                                                    class="mt-1 inputtext" 
                                                    color="primary" 
                                                    background-color="transparent"
                                                    dense
                                                    prepend-inner-icon="mdi-lock"
                                                    :type="showPassword ? 'text' : 'password'"
                                                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                                    @click:append ="toggleShowPassword()"
                                                    :error-messages="passwordErrors"
                                                    @input="$v.password.$touch()"
                                                    @blur="$v.password.$touch()"
                                                    v-on:keyup.enter="signup()"
                                                    > 
                                                     <!-- <template #label>
                                                        <span class="red--text"><strong>* </strong></span>Password
                                                    </template> -->
                                                </v-text-field>
                                            </v-card>
                                        </template>
                                    </v-hover>

                                    <v-hover class="mb-5">
                                        <template v-slot="{hover}">
                                            <v-card color="transparent" 
                                                    height="45" 
                                                    :elevation="hover?3:0"
                                                    class="mx-4 mb-5">
                                                <v-text-field 
                                                    v-model="repeatPassword"
                                                    height="45"
                                                    label="Repeat Password"
                                                    outlined
                                                    required
                                                    class="mt-1 inputtext" 
                                                    color="primary" 
                                                    background-color="transparent"
                                                    dense
                                                    prepend-inner-icon="mdi-lock"
                                                    :error-messages="rpasswordErrors"
                                                    :type="showPassword ? 'text' : 'password'"
                                                    @input="$v.repeatPassword.$touch()"
                                                    @blur="$v.repeatPassword.$touch()"
                                                    v-on:keyup.enter="signup()"
                                                    > 
                                                    <!-- <template #label>
                                                        <span class="red--text"><strong>* </strong></span>Repeat Password
                                                    </template> -->
                                                </v-text-field>
                                            </v-card>
                                        </template>
                                    </v-hover>
                                    
                                    <v-btn 
                                        style="background:#136772"
                                        class="mt-4"
                                        width="300"
                                        :disabled="disableSignUp"
                                        dark 
                                        @click="signup()" >
                                        <p style="color:white" class="mb-0 text-capitalize font-weight-bold body-1">sign up</p>
                                    </v-btn>
                                </v-form>
                            </v-col>
                        </v-row>
                        <v-row justify="space-between">
                            <v-col cols="6">
                                <!-- <p class="text-body-1"><a>forget password ?</a></p> -->
                            </v-col>
                            <v-col cols="6">
                                <p class="text-body-1">
                                    <router-link to="/" exact>
                                        Login
                                    </router-link>
                                </p>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col> 
        </v-row>
        <LinearLoader :loading="LinearLoading"/>
    </v-container>
</template>

<script>
import { required, email, minLength, numeric, sameAs } from 'vuelidate/lib/validators'
import Snackbar from '../../components/Snackbar.vue'
import {projectMixin} from '../../mixins/mixins'
import LinearLoader from '../../components/LinearLoader.vue'
import ApiService from '../../services/api'

export default {
    components: {Snackbar,LinearLoader},

    mixins: [projectMixin],

    data: ()=>({

        //form fields
        email:"",
        userName: "",
        showPassword:false,
        password:"",
        repeatPassword:"",

        //disable signup false
        disableSignUp: false

    }),

    methods: {

        signup(){
            
            if
            (
                this.email != '' &&
                this.password != '' &&
                this.userName != '' &&
                this.repeatPassword != ''
            )
            
            {
                if(this.password !== this.repeatPassword){

                    this.clearAlerts();
                    this.setAlert("warning",true,"Password and Reset Password fields must match",-1);
                             
                    setTimeout(()=>{
                        this.snackbar = false;
                    },4000);

                } else {

                    //sending data to the server
                    const data = {
                        userName: this.userName,
                        email: this.email,
                        password: this.password
                    }

                    this.LinearLoading = true;

                    ApiService.post("auth/register",data).then((response)=>{

                        if(response.data.error){

                            this.clearAlerts();
                            this.disableSignUp = false;
                            this.LinearLoading = false;
                            this.setAlert("error",true,response.data.message,-1);

                        } else {

                            this.clearAlerts();
                            this.disableSignUp = true;
                            this.LinearLoading = false;
                            this.setAlert("success",true,response.data.message,-1);

                            setTimeout(()=>{
                                this.$router.push("/");
                            },20000);
                        
                        }
                        console.log(response.data)

                        }).catch(()=>{

                            this.LinearLoading = false;
                            this.clearAlerts();
                            this.setAlert("error",true,"There is an internal problem",-1);
                    })
                }
                
            } else {

                this.clearAlerts();
                this.setAlert("warning",true,"You need to fill all fields",-1); 

                setTimeout(()=>{
                    this.snackbar = false;
                },4000);
            }
        },

        toggleShowPassword(){
            this.showPassword = !this.showPassword
        },

        clearForm(){

            this.email = "";
            this.password = "";
            this.userName = "";
            this.repeatPassword = "";
        }
    },

    validations: {
        email: { required, email },
        userName:{ required, minLength: minLength(5) },
        password: { required,minLength: minLength(8) },
        repeatPassword:{required, sameAsPassword: sameAs('password')},
    },

    computed: {

          emailErrors() {
            const errors = []
            if (!this.$v.email.$dirty) return errors
            !this.$v.email.required && errors.push('E-mail is required')
            !this.$v.email.email && errors.push('Must be valid e-mail')
            return errors
        },

          nameErrors() {
            const errors = []
            if (!this.$v.userName.$dirty) return errors
            !this.$v.userName.required && errors.push('user name is required')
            !this.$v.userName.minLength && errors.push('must be a minimun of 5 characters')
            return errors
        },

        passwordErrors() {
            const errors = []
            if (!this.$v.password.$dirty) return errors
            !this.$v.password.required && errors.push('password is required')
            !this.$v.password.minLength && errors.push(' password must be a minimun of 8 characters')
            return errors
        },

        rpasswordErrors() {
            const errors = []
            if (!this.$v.repeatPassword.$dirty) return errors
            !this.$v.repeatPassword.required && errors.push('password is required')
            !this.$v.repeatPassword.sameAsPassword && errors.push('password does not match')
            return errors
        },
    }
}
</script>

<style>

</style>
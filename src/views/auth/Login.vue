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
                <v-card class="elevation-12 signing-card">
                    <p class=" text-center  inputtext title font-weight-regular mb-4 mt-6 ">Login</p>
                    <v-card-text>
                        <v-row>
                            <v-col cols=12>
                                <v-form>
                                    <v-hover class="mb-3">
                                        <template v-slot="{ hover }">
                                            <v-card  color="transparent"
                                                        height="45" 
                                                        class="mx-4 mb-5"
                                                        :elevation="hover ? 3: 0"
                                            >
                                                <v-text-field 
                                                    v-model="email"
                                                    height="45"
                                                    label="E-mail" 
                                                    outlined
                                                    class="mt-1 inputtext" 
                                                    color="primary" 
                                                    type="text"
                                                    background-color="transparent"
                                                    dense
                                                    required
                                                    clearable
                                                    prepend-inner-icon="mdi-account"
                                                    :error-messages="emailErrors"
                                                    @input="$v.email.$touch()"
                                                    @blur="$v.email.$touch()"
                                                    v-on:keyup.enter="signing()"
                                                    > 
                                                </v-text-field>
                                            </v-card>
                                        </template>
                                    </v-hover>
                                    
                                    <v-hover class="mb-3">
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
                                                </v-text-field>
                                            </v-card>
                                        </template>
                                    </v-hover>
                                    
                                    <v-btn 
                                        style="background:#136772"
                                        class="mt-4"
                                        width="300"
                                        dark 
                                        @click="signing" >
                                        <p style="color:white" class="mb-0 text-capitalize font-weight-bold body-1">sign in</p>
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
                                    <router-link to="/signup" exact>
                                        Sign Up
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
import { required, email, minLength} from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'

import Snackbar from '../../components/Snackbar.vue'
import {projectMixin} from '../../mixins/mixins'
import LinearLoader from '../../components/LinearLoader.vue'

export default {

    name: "Login",
    components: {Snackbar,LinearLoader},
    mixins: [projectMixin],

    data: ()=>({
        email:"",
        showPassword:false,
        password:""

    }),
    methods: {

        ...mapActions(['Login','setMessage']),

        async signing(){
                
            if ( this.email != '' && this.password != '' ) {
               
                //sending data to the server
                this.clearAlerts();

                const data = {
                    email: this.email,
                    password: this.password
                }

                this.LinearLoading = true;

                await this.Login(data);

                if(this.load_message != null){

                    this.LinearLoading = false;

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

                    this.LinearLoading = false;

                    this.$router.replace({
                        name: 'Staff'
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
            console.log(this.showPassword);
        },

        RedirectToSignUp(){
            this.$router.push('/signup')
        }
    },

    computed: {

        ...mapGetters(['load_message','user']),
        emailErrors() {
            const errors = []
            if (!this.$v.email.$dirty) return errors
            !this.$v.email.required && errors.push('E-mail is required')
            !this.$v.email.email && errors.push('Must be valid e-mail')
            return errors
        },

        passwordErrors() {
            const errors = []
            if (!this.$v.password.$dirty) return errors
            !this.$v.password.required && errors.push('password is required')
            !this.$v.password.minLength && errors.push(' password must be a minimun of 8 characters')
            return errors
        },
    },

    validations: {
        email: { required, email },
        password: { required,minLength: minLength(8) },
    },
}
</script>

<style>

</style>
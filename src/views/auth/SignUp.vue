<template>
    <v-container
        fluid
        class="fill-height"
    >
        <Snackbar type="success" :snackbar="true" text="Test" timeout="2000"/>
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
                                                    label="E-mail" 
                                                    outlined
                                                    class="mt-1 inputtext" 
                                                    color="primary" 
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
                                                    label="User Name" 
                                                    outlined
                                                    class="mt-1 inputtext" 
                                                    color="primary" 
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
                                                </v-text-field>
                                            </v-card>
                                        </template>
                                    </v-hover>
                                    
                                    <v-btn 
                                        style="background:#136772"
                                        class="mt-4"
                                        width="300"
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


    </v-container>
</template>

<script>
import { required, email, minLength, numeric, sameAs } from 'vuelidate/lib/validators'
import Snackbar from '../../components/Snackbar.vue'
export default {
    components: {Snackbar},

    data: ()=>({
        email:"",
        userName: "",
        showPassword:false,
        password:"",
        repeatPassword:"",
    }),

    methods: {

        signup(){
            console.log("login up")
        },
        toggleShowPassword(){
            this.showPassword = !this.showPassword
        },
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
.signing-card{
    border: 1px solid #ffffff !important;
    
}
.inputtext {
    color: #136772 !important;
    border-color: #136772 !important;
}

.inputtext .v-text-field__slot input{
    color: #136772 !important;
    border-color: #136772 !important;
}

.inputtext .v-icon{
  color: #136772 !important;
  margin-top: 3px;
}

.inputtext .v-label{
  color: #136772 !important;
  margin-left:0px ;
  margin-top: 3px;
}

.inputtext :hover {
   border-color: #136772 !important;
}
</style>
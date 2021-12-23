<template>
    <v-container
        fluid
        class="fill-height"
    >
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
                                    <v-hover class="mb-1">
                                        <template v-slot="{ hover }">
                                            <v-card  color="transparent"
                                                        height="45" 
                                                        class="mx-4 mb-2"
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
                                                    > 
                                                </v-text-field>
                                            </v-card>
                                        </template>
                                    </v-hover>
                                    
                                    <v-hover class="mb-1">
                                        <template v-slot="{hover}">
                                            <v-card color="transparent" 
                                                    height="45" 
                                                    :elevation="hover?3:0"
                                                    class="mx-4 mb-2">
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


    </v-container>
</template>

<script>
export default {

    data: ()=>({
        email:"",
        showPassword:false,
        password:""
    }),
    methods: {

        signing(){
            console.log("signing user")
        },

        toggleShowPassword(){
            this.showPassword = !this.showPassword
            console.log(this.showPassword);
        },

        RedirectToSignUp(){
            this.$router.push('/signup')
        }
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
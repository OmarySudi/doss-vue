<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12">
                <v-card elevation="3" class="mt-2">
                    <!-- <p class="body-1 py-2 primary font-weight-regular mb-2 white--text text-center">ADD STAFF</p> -->
                    <v-row class="mb-3">

                        <v-col cols="12" sm="4">
                            <p class="body-1 mb-1 ml-2 mr-2 primary--text">Full Name</p>
                            <v-hover>
                                <template v-slot="{hover}">
                                    <v-card 
                                    color="transparent" 
                                    height="39" 
                                    class="ml-2 mr-2"
                                    :elevation="hover? 6 : 0"
                                    >
                                        <v-text-field 
                                            height="40"
                                            v-model="fullName"
                                            outlined
                                            class="mt-1 inputtext" 
                                            color="primary" 
                                            type="text"
                                            background-color="transparent"
                                            dense
                                        > 
                                        </v-text-field>                                         
                                    </v-card>
                                </template>
                            </v-hover>
                        </v-col>

                        <v-col cols="12" sm="4">
                            <p class="body-1 mb-1 ml-2 mr-2 primary--text">Email</p>
                            <v-hover>
                                <template v-slot="{hover}">
                                    <v-card 
                                    color="transparent" 
                                    height="39" 
                                    class="ml-2 mr-2"
                                    :elevation="hover? 6 : 0"
                                    >
                                        <v-text-field 
                                            height="40"
                                            v-model="email"
                                            outlined
                                            class="mt-1 inputtext" 
                                            color="primary" 
                                            type="text"
                                            background-color="transparent"
                                            dense
                                        > 
                                        </v-text-field>                                         
                                    </v-card>
                                </template>
                            </v-hover>
                        </v-col>

                        <v-col cols="12" sm="4">
                            <p class="body-1 mb-1 ml-2 mr-2 primary--text">Mobile Number(s)</p>
                            <v-hover>
                                <template v-slot="{hover}">
                                    <v-card 
                                    color="transparent" 
                                    height="39" 
                                    class="ml-2 mr-2"
                                    :elevation="hover? 6 : 0"
                                    >
                                        <v-text-field 
                                            height="40"
                                            v-model="mobileNumber"
                                            outlined
                                            class="mt-1 inputtext" 
                                            color="primary" 
                                            type="text"
                                            background-color="transparent"
                                            dense
                                        > 
                                        </v-text-field>                                         
                                    </v-card>
                                </template>
                            </v-hover>
                        </v-col>
                    </v-row>

                    <v-row class="mb-3">
                        <v-col cols="12" sm="4">
                            <p class="body-1 mb-1 ml-2 mr-2 primary--text">Country</p>
                            <v-hover>
                                <template v-slot="{hover}">
                                    <v-card 
                                    color="transparent" 
                                    height="39" 
                                    class="ml-2 mr-2"
                                    :elevation="hover? 6 : 0"
                                    >
                                        <v-select
                                            v-model="country"
                                            :items="country_items"
                                            chips
                                            class="primary--text"
                                            color="primary"
                                            menu-props="auto"
                                            dense
                                            outlined
                                            >
                                        </v-select>                                        
                                    </v-card>
                                </template>
                            </v-hover>
                        </v-col>

                        <v-col cols="12" sm="4">
                            <p class="body-1 mb-1 ml-2 mr-2 primary--text">Address</p>
                            <v-hover>
                                <template v-slot="{hover}">
                                    <v-card 
                                    color="transparent" 
                                    height="39" 
                                    class="ml-2 mr-2"
                                    :elevation="hover? 6 : 0"
                                    >
                                        <v-text-field 
                                            height="40"
                                            v-model="address"
                                            outlined
                                            class="mt-1 inputtext" 
                                            color="primary" 
                                            type="text"
                                            background-color="transparent"
                                            dense
                                        > 
                                        </v-text-field>                                         
                                    </v-card>
                                </template>
                            </v-hover>
                        </v-col>

                        <v-col cols="12" sm="4">
                            <p class="body-1 mb-1 ml-2 mr-2 primary--text">Job Title</p>
                            <v-hover>
                                <template v-slot="{hover}">
                                    <v-card 
                                    color="transparent" 
                                    height="39" 
                                    class="ml-2 mr-2"
                                    :elevation="hover? 6 : 0"
                                    >
                                        <v-text-field 
                                            height="40"
                                            v-model="jobTitle"
                                            outlined
                                            class="mt-1 inputtext" 
                                            color="primary" 
                                            type="text"
                                            background-color="transparent"
                                            dense
                                        > 
                                        </v-text-field>                                         
                                    </v-card>
                                </template>
                            </v-hover>
                        </v-col>
                    </v-row>

                    <v-row class="mb-3">
                        <v-col cols="12" sm="4">
                            <p class="body-1 mb-1 ml-2 mr-2 primary--text">Identification No</p>
                            <v-hover>
                                <template v-slot="{hover}">
                                    <v-card 
                                    color="transparent" 
                                    height="39" 
                                    class="ml-2 mr-2"
                                    :elevation="hover? 6 : 0"
                                    >
                                       <v-text-field 
                                            height="40"
                                            v-model="idNo"
                                            outlined
                                            class="mt-1 inputtext" 
                                            color="primary" 
                                            type="text"
                                            background-color="transparent"
                                            dense
                                        > 
                                        </v-text-field>                                         
                                    </v-card>
                                </template>
                            </v-hover>
                        </v-col>

                        <v-col cols="12" sm="4">
                            <p class="body-1 mb-1 ml-2 mr-2 primary--text">Address</p>
                            <v-hover>
                                <template v-slot="{hover}">
                                    <v-card 
                                    color="transparent" 
                                    height="39" 
                                    class="ml-2 mr-2"
                                    :elevation="hover? 6 : 0"
                                    >
                                        <v-text-field 
                                            height="40"
                                            v-model="address"
                                            outlined
                                            class="mt-1 inputtext" 
                                            color="primary" 
                                            type="text"
                                            background-color="transparent"
                                            dense
                                        > 
                                        </v-text-field>                                         
                                    </v-card>
                                </template>
                            </v-hover>
                        </v-col>

                        <v-col cols="12" sm="4">
                            <p class="body-1 mb-1 ml-2 mr-2 primary--text">Job Title</p>
                            <v-hover>
                                <template v-slot="{hover}">
                                    <v-card 
                                    color="transparent" 
                                    height="39" 
                                    class="ml-2 mr-2"
                                    :elevation="hover? 6 : 0"
                                    >
                                        <v-text-field 
                                            height="40"
                                            v-model="jobTitle"
                                            outlined
                                            class="mt-1 inputtext" 
                                            color="primary" 
                                            type="text"
                                            background-color="transparent"
                                            dense
                                        > 
                                        </v-text-field>                                         
                                    </v-card>
                                </template>
                            </v-hover>
                        </v-col>
                    </v-row>

                    <v-row class="mb-3">
                        <v-col cols="12" sm="4">
                            <p class="body-1 mb-1 ml-2 mr-2 primary--text">Bank Name</p>
                            <v-hover>
                                <template v-slot="{hover}">
                                    <v-card 
                                    color="transparent" 
                                    height="39" 
                                    class="ml-2 mr-2"
                                    :elevation="hover? 6 : 0"
                                    >
                                       <v-text-field 
                                            height="40"
                                            v-model="bankName"
                                            outlined
                                            class="mt-1 inputtext" 
                                            color="primary" 
                                            type="text"
                                            background-color="transparent"
                                            dense
                                        > 
                                        </v-text-field>                                         
                                    </v-card>
                                </template>
                            </v-hover>
                        </v-col>

                        <v-col cols="12" sm="4">
                            <p class="body-1 mb-1 ml-2 mr-2 primary--text">Account Number</p>
                            <v-hover>
                                <template v-slot="{hover}">
                                    <v-card 
                                    color="transparent" 
                                    height="39" 
                                    class="ml-2 mr-2"
                                    :elevation="hover? 6 : 0"
                                    >
                                        <v-text-field 
                                            height="40"
                                            v-model="accountNumber"
                                            outlined
                                            class="mt-1 inputtext" 
                                            color="primary" 
                                            type="text"
                                            background-color="transparent"
                                            dense
                                        > 
                                        </v-text-field>                                         
                                    </v-card>
                                </template>
                            </v-hover>
                        </v-col>

                        <v-col cols="12" sm="4">
                            <p class="body-1 mb-1 ml-2 mr-2 primary--text">Swift Code</p>
                            <v-hover>
                                <template v-slot="{hover}">
                                    <v-card 
                                    color="transparent" 
                                    height="39" 
                                    class="ml-2 mr-2"
                                    :elevation="hover? 6 : 0"
                                    >
                                        <v-text-field 
                                            height="40"
                                            v-model="swiftCode"
                                            outlined
                                            class="mt-1 inputtext" 
                                            color="primary" 
                                            type="text"
                                            background-color="transparent"
                                            dense
                                        > 
                                        </v-text-field>                                         
                                    </v-card>
                                </template>
                            </v-hover>
                        </v-col>
                    </v-row>


                </v-card>
            </v-col>    
        </v-row>
    </v-container>
</template>

<script>
export default {
    data: ()=>({

        // form details

        fullName: '',
        email:'',
        mobileNumber,
        country,
        address,
        jobTitle,
        idNo,
        bankName,
        accountNumber,
        swiftCode,


        country_items:[
            "TANZANIA",
            "GHANA"
        ]
    })
}
</script>

<style>

</style>
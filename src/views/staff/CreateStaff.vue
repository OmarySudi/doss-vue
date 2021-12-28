<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12">
                <v-stepper v-model="step">
                    <v-stepper-header>
                        <v-stepper-step
                            :complete = "step > 1"
                            step = "1"
                        >
                            Basic & Bank Info
                        </v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step
                            :complete = "step > 2"
                            step = "2"
                        >
                            Attachments
                        </v-stepper-step>
                    </v-stepper-header>

                    <v-stepper-items>
                        <v-stepper-content step="1">
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
                                                <p class="body-1 mb-1 ml-2 mr-2 primary--text">Passport No</p>
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
                                        </v-row>

                                        <v-row class="mb-3">
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

                                            <v-col cols="12" sm="4">
                                                <p class="body-1 mb-1 ml-2 mr-2 primary--text">IBAN</p>
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
                                                                v-model="IBAN"
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

                                <v-col cols="12">
                                    <v-row>
                                        <v-spacer></v-spacer>
                                        <v-btn
                                            outlined
                                            color="primary"
                                            @click="step = 2"
                                        >
                                            NEXT
                                        </v-btn>
                                    </v-row> 
                                </v-col>
                            </v-row>
                        </v-stepper-content>

                        <v-stepper-content step="2">
                            <v-row>
                                <v-col cols="12">
                                    <v-card elevation="3" class="mt-2">
                                        <!-- <p class="body-1 py-2 primary font-weight-regular mb-2 white--text text-center">ADD STAFF</p> -->
                                        <v-row class="mb-3">

                                            <v-col cols="12" sm="3">
                                                <p class="body-1 mb-1 ml-2 mr-2 primary--text">Profile Photo</p>
                                                <v-hover class="filepond">
                                                    <template v-slot="{hover}">
                                                        <v-card 
                                                        class="ml-2 mr-2"
                                                        :elevation="hover? 6 : 0"
                                                        >
                                                            <file-pond
                                                                name="profile"
                                                                ref="photo"
                                                                color="primary"
                                                                label-idle="Drop/Choose a file"
                                                                accepted-file-types="image/jpeg, image/png"
                                                                v-bind:allowMultiple="false"
                                                                v-bind:allowReplace="true"
                                                                v-bind:allowProcess="true"
                                                                v-bind:allowReorder="true"
                                                                v-bind:allowBrowse="true"
                                                                v-bind:maxFiles= "1"
                                                                v-bind:maxFileSize="filesize"
                                                                v-bind:allowFileSizeValidation="true"
                                                                v-bind:required="true"
                                                            />                                         
                                                        </v-card>
                                                    </template>
                                                </v-hover>
                                            </v-col>

                                                    <v-col cols="12" sm="3">
                                                <p class="body-1 mb-1 ml-2 mr-2 primary--text">Identification Card</p>
                                                <v-hover class="filepond">
                                                    <template v-slot="{hover}">
                                                        <v-card 
                                                        class="ml-2 mr-2"
                                                        :elevation="hover? 6 : 0"
                                                        >
                                                            <file-pond
                                                                name="identification"
                                                                ref="identification"
                                                                color="primary"
                                                                label-idle="Drop/Choose a file"
                                                                accepted-file-types="application/pdf"
                                                                v-bind:allowMultiple="false"
                                                                v-bind:allowReplace="true"
                                                                v-bind:allowProcess="true"
                                                                v-bind:allowReorder="true"
                                                                v-bind:allowBrowse="true"
                                                                v-bind:maxFiles= "1"
                                                                v-bind:maxFileSize="filesize"
                                                                v-bind:allowFileSizeValidation="true"
                                                                v-bind:required="true"
                                                            />                                         
                                                        </v-card>
                                                    </template>
                                                </v-hover>
                                            </v-col>

                                                    <v-col cols="12" sm="3">
                                                <p class="body-1 mb-1 ml-2 mr-2 primary--text">Passport</p>
                                                <v-hover class="filepond">
                                                    <template v-slot="{hover}">
                                                        <v-card 
                                                        class="ml-2 mr-2"
                                                        :elevation="hover? 6 : 0"
                                                        >
                                                            <file-pond
                                                                name="passport"
                                                                ref="passport"
                                                                color="primary"
                                                                label-idle="Drop/Choose a file"
                                                                accepted-file-types="image/jpeg, image/png"
                                                                v-bind:allowMultiple="false"
                                                                v-bind:allowReplace="true"
                                                                v-bind:allowProcess="true"
                                                                v-bind:allowReorder="true"
                                                                v-bind:allowBrowse="true"
                                                                v-bind:maxFiles= "1"
                                                                v-bind:maxFileSize="filesize"
                                                                v-bind:allowFileSizeValidation="true"
                                                                v-bind:required="true"
                                                            />                                         
                                                        </v-card>
                                                    </template>
                                                </v-hover>
                                            </v-col>

                                                            <v-col cols="12" sm="3">
                                                <p class="body-1 mb-1 ml-2 mr-2 primary--text">CV</p>
                                                <v-hover class="filepond">
                                                    <template v-slot="{hover}">
                                                        <v-card 
                                                        height=""
                                                        class="ml-2 mr-2"
                                                        :elevation="hover? 6 : 0"
                                                        >
                                                            <file-pond
                                                                name="profile"
                                                                ref="cv"
                                                                color="primary"
                                                                label-idle="Drop/Choose a file"
                                                                accepted-file-types="image/jpeg, image/png"
                                                                v-bind:allowMultiple="false"
                                                                v-bind:allowReplace="true"
                                                                v-bind:allowProcess="true"
                                                                v-bind:allowReorder="true"
                                                                v-bind:allowBrowse="true"
                                                                v-bind:maxFiles= "1"
                                                                v-bind:maxFileSize="filesize"
                                                                v-bind:allowFileSizeValidation="true"
                                                                v-bind:required="true"
                                                            />                                         
                                                        </v-card>
                                                    </template>
                                                </v-hover>
                                            </v-col>
                                        </v-row>
                                    </v-card>

                                </v-col> 

                                <v-col cols="12">
                                    <v-row>
                                        <v-btn
                                            outlined
                                            color="primary"
                                            @click="step = 1"
                                        >
                                            BACK
                                        </v-btn>

                                         <v-spacer></v-spacer>

                                        <v-btn
                                            outlined
                                            color="primary"
                                            @click="testFileUpload()"
                                        >
                                            FINISH
                                        </v-btn>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
// Import Vue FilePond
import vueFilePond from 'vue-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// import filepond file validation type
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileRename from 'filepond-plugin-file-rename';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

const FilePond = vueFilePond(
          FilePondPluginFileValidateType,
          FilePondPluginFileValidateSize,
          FilePondPluginFileRename,
          FilePondPluginImagePreview
)


export default {
    components: {FilePond},
    data: ()=>({

        // form details

        fullName: '',
        email:'',
        mobileNumber:'',
        country:'',
        address:'',
        jobTitle:'',
        idNo:'',
        bankName:'',
        accountNumber:'',
        swiftCode:'',
        IBAN:'',

        //others 
        step: 1,
        filesize: '5MB',
        myfiles:[],

        //files
        testFile: [],

        country_items:[
            "TANZANIA",
            "GHANA"
        ]
    }),

    methods: {
        testFileUpload(){
            console.log("during file upload")
            console.log(this.$refs.photo.getFiles()[0].filename);
        },       
    }
}
</script>

<style>
.filepond{
    color:  #f4fcf5 !important;
    border-radius: 10px !important;
    height: 75px;
}
</style>
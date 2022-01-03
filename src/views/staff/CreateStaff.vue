<template>
    <v-container fluid>
    
        <Snackbar 
            :type="snackbarType" 
            :snackbar="snackbar" 
            :text="snackbarText" 
            :timeout="snackbarTimeout"
        />

        <v-row>
            <v-col cols="12">
                <v-stepper v-model="step">
                    <v-stepper-header>
                        <v-stepper-step
                            :complete = "step > 1"
                            step = "1"
                        >
                            Basic Info
                        </v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step
                            :complete = "step > 2"
                            step = "2"
                        >
                            Bank Information
                        </v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step
                            :complete = "step > 3"
                            step = "3"
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
                                                <p class="body-1 mb-1 ml-2 mr-2 primary--text">Full Name <span class="red--text"><strong>* </strong></span></p>
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
                                                                :error-messages="fullNameErrors"
                                                                @input="$v.fullName.$touch()"
                                                                @blur="$v.fullName.$touch()"
                                                            > 
                                                            </v-text-field>                                         
                                                        </v-card>
                                                    </template>
                                                </v-hover>
                                            </v-col>

                                            <v-col cols="12" sm="4">
                                                <template>
                                                     <p class="body-1 mb-1 ml-2 mr-2 primary--text">Email <span class="red--text"><strong>* </strong></span></p>
                                                </template>
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
                                                                :error-messages="emailErrors"
                                                                @input="$v.email.$touch()"
                                                                @blur="$v.email.$touch()"

                                                            > 
                                                            </v-text-field>                                         
                                                        </v-card>
                                                    </template>
                                                </v-hover>
                                            </v-col>

                                            <v-col cols="12" sm="4">
                                                <p class="body-1 mb-1 ml-2 mr-2 primary--text">Mobile Number(s) <span class="red--text"><strong>* </strong></span></p>
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
                                                                :error-messages="mobileNumberErrors"
                                                                @input="$v.mobileNumber.$touch()"
                                                                @blur="$v.mobileNumber.$touch()"
                                                            > 
                                                            </v-text-field>                                         
                                                        </v-card>
                                                    </template>
                                                </v-hover>
                                            </v-col>
                                        </v-row>

                                        <v-row class="mb-3">
                                            <v-col cols="12" sm="4">
                                                <p class="body-1 mb-1 ml-2 mr-2 primary--text">Country <span class="red--text"><strong>* </strong></span></p>
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
                                                                :error-messages="countryErrors"
                                                                @input="$v.country.$touch()"
                                                                @blur="$v.country.$touch()"
                                                                >
                                                            </v-select>                                        
                                                        </v-card>
                                                    </template>
                                                </v-hover>
                                            </v-col>

                                            <v-col cols="12" sm="4">
                                                <p class="body-1 mb-1 ml-2 mr-2 primary--text">Address <span class="red--text"><strong>* </strong></span></p>
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
                                                                :error-messages="addressErrors"
                                                                @input="$v.address.$touch()"
                                                                @blur="$v.address.$touch()"
                                                            > 
                                                            </v-text-field>                                         
                                                        </v-card>
                                                    </template>
                                                </v-hover>
                                            </v-col>

                                            <v-col cols="12" sm="4">
                                                <p class="body-1 mb-1 ml-2 mr-2 primary--text">Job Title <span class="red--text"><strong>*</strong></span></p>
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
                                                                :error-messages="jobTitleErrors"
                                                                @input="$v.jobTitle.$touch()"
                                                                @blur="$v.jobTitle.$touch()"
                                                            > 
                                                            </v-text-field>                                         
                                                        </v-card>
                                                    </template>
                                                </v-hover>
                                            </v-col>
                                        </v-row>

                                        <v-row class="mb-3">
                                            <v-col cols="12" sm="4">
                                                <p class="body-1 mb-1 ml-2 mr-2 primary--text">Identification No <span class="red--text"><strong>*</strong></span></p>
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
                                                                :error-messages="idNoErrors"
                                                                @input="$v.idNo.$touch()"
                                                                @blur="$v.idNo.$touch()"
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
                                                                v-model="passportNo"
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
                                        <v-row class="mb-3">
                                            <v-col cols="12" sm="4">
                                                <p class="body-1 mb-1 ml-2 mr-2 primary--text">Bank Name <span class="red--text"><strong>*</strong></span></p>
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
                                                                :error-messages="bankNameErrors"
                                                                @input="$v.bankName.$touch()"
                                                                @blur="$v.bankName.$touch()"
                                                            > 
                                                            </v-text-field>                                         
                                                        </v-card>
                                                    </template>
                                                </v-hover>
                                            </v-col>

                                            <v-col cols="12" sm="4">
                                                <p class="body-1 mb-1 ml-2 mr-2 primary--text">Bank Account Name<span class="red--text"><strong>*</strong></span></p>
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
                                                                v-model="accountName"
                                                                outlined
                                                                class="mt-1 inputtext" 
                                                                color="primary" 
                                                                type="text"
                                                                background-color="transparent"
                                                                dense
                                                                :error-messages="accountNameErrors"
                                                                @input="$v.accountName.$touch()"
                                                                @blur="$v.accountName.$touch()"
                                                            > 
                                                            </v-text-field>                                         
                                                        </v-card>
                                                    </template>
                                                </v-hover>
                                            </v-col>

                                            <v-col cols="12" sm="4">
                                                <p class="body-1 mb-1 ml-2 mr-2 primary--text">Account Number <span class="red--text"><strong>*</strong></span></p>
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
                                                                :error-messages="accountNumberErrors"
                                                                @input="$v.accountNumber.$touch()"
                                                                @blur="$v.accountNumber.$touch()"
                                                            > 
                                                            </v-text-field>                                         
                                                        </v-card>
                                                    </template>
                                                </v-hover>
                                            </v-col>

                                            <v-col cols="12" sm="4">
                                                <p class="body-1 mb-1 ml-2 mr-2 primary--text">Swift Code <span class="red--text"><strong>*</strong></span></p>
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
                                                                :error-messages="swiftCodeErrors"
                                                                @input="$v.swiftCode.$touch()"
                                                                @blur="$v.swiftCode.$touch()"
                                                            > 
                                                            </v-text-field>                                         
                                                        </v-card>
                                                    </template>
                                                </v-hover>
                                            </v-col>

                                            <v-col cols="12" sm="4">
                                                <p class="body-1 mb-1 ml-2 mr-2 primary--text">IBAN <span class="red--text"><strong>*</strong></span></p>
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
                                                                :error-messages="IBANErrors"
                                                                @input="$v.IBAN.$touch()"
                                                                @blur="$v.IBAN.$touch()"
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
                                            @click="step = 3"
                                        >
                                            NEXT
                                        </v-btn>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-stepper-content>

                        <v-stepper-content step="3">
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
                                                <p class="body-1 mb-1 ml-2 mr-2 primary--text">ID <span class="red--text"><strong>*</strong></span></p>
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
                                        </v-row>
                                    </v-card>

                                </v-col> 

                                <v-col cols="12">
                                    <v-row>
                                        <v-btn
                                            outlined
                                            color="primary"
                                            @click="step = 2"
                                        >
                                            BACK
                                        </v-btn>

                                         <v-spacer></v-spacer>

                                        <v-btn
                                            outlined
                                            color="primary"
                                            @click="createStaff()"
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
         <LinearLoader :loading="LinearLoading"/>
    </v-container>
</template>

<script>
import vueFilePond from 'vue-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileRename from 'filepond-plugin-file-rename';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import { required,email,minLength,numeric} from 'vuelidate/lib/validators'


import Snackbar from '../../components/Snackbar.vue'
import {projectMixin} from '../../mixins/mixins'
import LinearLoader from '../../components/LinearLoader.vue'

import ApiService from '../../services/api'

const FilePond = vueFilePond(
          FilePondPluginFileValidateType,
          FilePondPluginFileValidateSize,
          FilePondPluginFileRename,
          FilePondPluginImagePreview
)

export default {

    components: {FilePond,Snackbar,LinearLoader},
    mixins: [projectMixin],

    data: ()=>({

        // form details

        fullName:"",
        email:"",
        mobileNumber:"",
        country:"",
        address:"",
        jobTitle:"",
        idNo:"",
        passportNo:"",
        bankName:"",
        accountNumber:"",
        accountName: "",
        swiftCode:"",
        IBAN:"",

        photo_url:"",
        passport_url:"",
        cv_url:"",
        identification_url:"",

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

        async createStaff(){

            if(this.fullName !="" &&
                this.mobileNumber !="" &&
                this.country !="" &&
                this.address !="" &&
                this.jobTitle !="" &&
                this.idNo !="" &&
                this.bankName !="" &&
                this.accountNumber !="" &&
                this.swiftCode !="" &&
                this.IBAN != "" &&
                this.accountName != "" &&
                this.$refs.identification.getFiles().length > 0
            )
            {
                if(
                    this.fullNameErrors.length > 0 || 
                    this.mobileNumberErrors.length > 0 ||
                    this.countryErrors.length > 0 ||
                    this.addressErrors.length > 0 ||
                    this.jobTitleErrors.length > 0 ||
                    this.idNoErrors.length > 0 ||
                    this.bankNameErrors.length > 0 ||
                    this.accountNumberErrors.length > 0 ||
                    this.swiftCodeErrors.length > 0 ||
                    this.accountNameErrors.length > 0 ||
                    this.IBANErrors.length > 0 
                )
                {
                     this.displayAlert("warning","There are validation errors, fix before you proceed",4000);

                } else {

                    this.LinearLoading = true;

                    const identification = this.$refs.identification.getFiles()[0];
                    this.identification_url = await this.getUrl(identification);
                    
                    if(this.$refs.photo.getFiles().length > 0){

                        const photo = this.$refs.photo.getFiles()[0];
                        this.photo_url = await this.getUrl(photo);
                    }

                    if(this.$refs.passport.getFiles().length > 0){

                        const passport = this.$refs.passport.getFiles()[0];
                        this.passport_url = await this.getUrl(passport);
                    }

                    if(this.$refs.cv.getFiles().length > 0){

                        const cv = this.$refs.cv.getFiles()[0];
                        this.cv_url = await this.getUrl(cv);
                    }
                
                    console.log("id:" +this.identification_url);
                    console.log("photo: "+this.photo_url);
                    console.log("passport: "+this.passport_url);
                    console.log("cv: "+this.cv_url);

                    if(this.identification_url == ""){

                        this.LinearLoading = false;
                        this.displayAlert("warning","There is a problem in uploading files, try again",4000);

                    } else {

                        console.log("sending other data");

                        const staff = {
                                fullName: this.fullName,
                                email: this.email,
                                phoneNumber: this.mobileNumber,
                                address: this.address,
                                profilePhoto: this.photo_url,
                                jobTitle: this.jobTitle,
                                country: this.country,
                                identityCardNo: this.idNo,
                                identityCardCopy: this.identification_url,
                                cv: this.cv_url,
                                passport: this.passport_url,
                                passportNo: this.passportNo,
                                bankAccountNumber: this.accountNumber,
                                bankName: this.bankName,
                                swiftCode: this.swiftCode,
                                IBAN: this.IBAN,
                                accountName: this.accountName
                        }

                        ApiService.post("staffs/",staff).then((response)=>{
                            
                            this.LinearLoading = false
                            this.displayAlertAndRedirect("success",response.data.message,4000,'/staffs');

                        }).catch((err)=>{
                            
                            this.LinearLoading = false
                            this.displayAlert("error","Server error: "+err,4000)
                        })
                    }
                }
            } else {
                this.displayAlert("warning","You need to fill all required fields",4000);
            }
            
        },  
    },

     validations: {

        email: { required, email },
        fullName: { required},
        mobileNumber: { required},
        country: {required},
        address: { required},
        jobTitle: { required},
        idNo: { required},
        bankName: { required},
        accountNumber: { required,numeric},
        accountName: {required},
        swiftCode: { required},
        IBAN: { required},
    },

    computed: {

        fullNameErrors(){

            const errors = []
            if (!this.$v.fullName.$dirty) return errors
            !this.$v.fullName.required && errors.push('Full Name is required')
            return errors
        },

        emailErrors(){

            const errors = []
            if (!this.$v.email.$dirty) return errors
            !this.$v.email.required && errors.push('Email is required')
            !this.$v.email.email && errors.push('Must be valid e-mail')
            return errors
        },

        mobileNumberErrors(){

            const errors = []
            if (!this.$v.mobileNumber.$dirty) return errors
            !this.$v.mobileNumber.required && errors.push('Mobile Number is required')
            return errors
        },

        countryErrors(){

            const errors = []
            if (!this.$v.country.$dirty) return errors
            !this.$v.country.required && errors.push('Country is required')
            return errors
        },

        addressErrors(){

            const errors = []
            if (!this.$v.address.$dirty) return errors
            !this.$v.address.required && errors.push('Address is required')
            return errors
        },

        jobTitleErrors(){

            const errors = []
            if (!this.$v.jobTitle.$dirty) return errors
            !this.$v.jobTitle.required && errors.push('Job Title is required')
            return errors
        },

        idNoErrors(){

            const errors = []
            if (!this.$v.idNo.$dirty) return errors
            !this.$v.idNo.required && errors.push('Identification No is required')
            return errors
        },

        bankNameErrors(){

            const errors = []
            if (!this.$v.bankName.$dirty) return errors
            !this.$v.bankName.required && errors.push('Bank Name is required')
            return errors
        },

        accountNameErrors(){
            const errors = []
            if (!this.$v.accountName.$dirty) return errors
            !this.$v.accountName.required && errors.push('Account Name is required')
            return errors
        },

        accountNumberErrors(){

            const errors = []
            if (!this.$v.accountNumber.$dirty) return errors
            !this.$v.accountNumber.required && errors.push('Account Number is required')
            !this.$v.accountNumber.numeric && errors.push('Accepts numbers only')
            return errors
        },

        swiftCodeErrors(){

            const errors = []
            if (!this.$v.swiftCode.$dirty) return errors
            !this.$v.swiftCode.required && errors.push('Swift Code is required')
            return errors
        },

        IBANErrors(){

            const errors = []
            if (!this.$v.IBAN.$dirty) return errors
            !this.$v.IBAN.required && errors.push('IBAN Code is required')
            return errors
        }
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
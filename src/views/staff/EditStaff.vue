<template>
  <v-container fluid>
       
    <Snackbar 
        :type="snackbarType" 
        :snackbar="snackbar" 
        :text="snackbarText" 
        :timeout="snackbarTimeout"
    />
    
    <v-row>

        <v-dialog v-model="pdf_dialog"  >                 
            <v-col cols="12" xs="12" sm="12" md="12" lg="12" class="mb-0 " >
                <v-card class=" ml-6 "  elevation="0" transition="scroll-y-transition">
                
                <v-progress-linear
                v-if="download_loading == true"
                    indeterminate
                    class="mb-2"
                    color="primary">
                </v-progress-linear>

                <v-row class="">
                    <v-col class="text-center ">
                    <v-btn class=" " small color="error" outlined @click.prevent="pdf_dialog = false">
                        cancel
                    </v-btn>
                    </v-col>
                    <v-col class="text-center">
                        <v-btn class="primary white--text " small color="" outlined @click.prevent="downloadfile(download_url)">
                            download
                        </v-btn>    
                    </v-col>
                </v-row> 
                <center  width="100%">
                    <pdf
                        v-for="i in numPages"
                        :key="i"
                        :src="src"
                        :page="i"
                        style="display: inline-block; width: 70%">
                    </pdf>
                </center>

                    <v-row class=" pb-3 ">
                    <v-col class="text-center ">
                        <v-btn class=" " small color="error" outlined @click.prevent="pdf_dialog = false">
                        cancel
                        </v-btn>
                    </v-col>
                    <v-col class="text-center">
                    <v-btn class="primary white--text " small color="" outlined @click.prevent="downloadfile(download_url)">
                            download
                    </v-btn>    
                    </v-col>
                </v-row> 

                <v-progress-linear
                v-if="download_loading == true"
                    indeterminate
                    class="mb-2"
                    color="primary">
                </v-progress-linear>
                </v-card>
            </v-col>
        </v-dialog>

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
                                            <v-card>
                                                <v-card>
                                                    <v-img v-if="photo_url"
                                                        class="white--text align-end"
                                                        height="200px"
                                                        :src="photo_url"
                                                        fill
                                                        position="top left"
                                                    />
                                                    <v-img v-else
                                                        class="white--text align-end"
                                                        height="200px"
                                                        src="../../assets/no-profile.png"
                                                        fill
                                                        position="top left"
                                                    />
                                                </v-card>

                                                <v-card class="mt-3 mb-2">
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
                                                                    label-idle="Change a file"
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
                                                </v-card>

                                            </v-card>
                                        </v-col>

                                        <v-col cols="12" sm="3">
                                            <p class="body-1 mb-1 ml-2 mr-2 primary--text">ID <span class="red--text"><strong>*</strong></span></p>
                                            <v-card>
                                                <v-card height="200px" class="py-xs-15 px-xs-2 py-sm-15 px-sm-2 py-md-15 px-md-15">
                                                    <v-btn small @click="previewPdf(identification_url)">
                                                        Preview 
                                                    </v-btn>
                                                </v-card>

                                                <v-card class="mt-3 mb-2">
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
                                                                    label-idle="Change a file"
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
                                                </v-card>
                                            </v-card>
                                        </v-col>

                                        <v-col cols="12" sm="3">
                                            <p class="body-1 mb-1 ml-2 mr-2 primary--text">Passport</p>
                                            <v-card>

                                                <v-card height="200px" class="py-xs-15 px-xs-2 py-sm-15 px-sm-2 py-md-15 px-md-15">
                                                    <v-btn @click="previewPdf(passport_url)" small v-if="passport_url">
                                                        Preview 
                                                    </v-btn>
                                                    <v-btn small v-else>
                                                        NO FILE
                                                    </v-btn>
                                                </v-card>

                                                <v-card class="mt-3 mb-2">
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
                                                                    label-idle="Change a file"
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
                                                </v-card>
                                            </v-card>
                                        </v-col>

                                        <v-col cols="12" sm="3">
                                            <p class="body-1 mb-1 ml-2 mr-2 primary--text">CV</p>
                                            <v-card>
                                                <v-card height="200px" class="py-xs-15 px-xs-2 py-sm-15 px-sm-2 py-md-15 px-md-15">

                                                    <v-btn small @click="previewPdf(cv_url)" v-if="cv_url">
                                                        Preview 
                                                    </v-btn>
                                                    <v-btn small v-else>
                                                        NO FILE
                                                    </v-btn>
                                                </v-card>

                                                <v-card class="mt-3 mb-2">
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
                                                                    label-idle="Change a file"
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
                                                </v-card>
                                            </v-card>
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
                                        @click="editStaff()"
                                    >
                                        SAVE
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
import {mapGetters} from 'vuex'
import { required,email,minLength,numeric} from 'vuelidate/lib/validators'
import pdf from 'vue-pdf'

import vueFilePond from 'vue-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileRename from 'filepond-plugin-file-rename';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import ApiService from '../../services/api'
import Snackbar from '../../components/Snackbar.vue'
import {projectMixin} from '../../mixins/mixins'
import LinearLoader from '../../components/LinearLoader.vue'

const FilePond = vueFilePond(
          FilePondPluginFileValidateType,
          FilePondPluginFileValidateSize,
          FilePondPluginFileRename,
          FilePondPluginImagePreview
)

export default {

    components: {FilePond,Snackbar,LinearLoader,pdf},
    mixins: [projectMixin],

    data: ()=>({

        staffs: [],

        staff: null,

        staff_id: '',

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


        //pdfDownload
        src: '',
        numPages: undefined,
        pdf_dialog:false,
        download_url:'',
        download_loading:false,

    }),

    methods: {

        previewPdf(url){

            this.LinearLoading = true
            var loadingTask = pdf.createLoadingTask(url);
            this.src = loadingTask
            this.src.promise.then(pdf => {
            this.numPages = ''
            this.numPages = pdf.numPages;
            this.LinearLoading = false
            this.download_url = url
            console.log(this.numPages);
            this.pdf_dialog = true  
            });
        },

        downloadfile(url){
            const a = document.createElement('a')
            a.href = url
            a.download = url.split('/').pop()
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
        },

        async fetchUser(id){
            await ApiService.get(`staffs/${id}`).then((response)=>{

                // this.staff = response.data.body
                this.staff_id = response.data.body._id;
                this.fullName = response.data.body.fullName;
                this.email = response.data.body.email;
                this.mobileNumber = response.data.body.phoneNumber;
                this.country = response.data.body.country;
                this.address = response.data.body.address;
                this.jobTitle = response.data.body.jobTitle;
                this.idNo = response.data.body.identityCardNo;
                this.passportNo = response.data.body.passportNo;
                this.bankName = response.data.body.bankName;
                this.accountNumber = response.data.body.bankAccountNumber;
                this.accountName = response.data.body.accountName;
                this.swiftCode = response.data.body.swiftCode;
                this.IBAN = response.data.body.IBAN;


                this.photo_url = response.data.body.profilePhoto;
                this.passport_url = response.data.body.passport;
                this.cv_url = response.data.body.cv;
                this.identification_url = response.data.body.identityCardCopy;

            }).catch((error)=>{
                console.log(error)
            })
        },

        async editStaff(){
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
                this.accountName != "" 
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

                }  else {
                    

                    this.LinearLoading = true;

                    if(this.$refs.identification.getFiles().length > 0){

                        const identification = this.$refs.identification.getFiles()[0];
                        this.identification_url = await this.getUrl(identification);
                    }

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

                    ApiService.put("staffs/"+this.staff_id,staff).then((response)=>{
                            
                        this.LinearLoading = false
                        this.displayAlertAndRedirect("success",response.data.message,2000,'/staffs/'+this.staff_id);

                    }).catch((err)=>{
                            
                        this.LinearLoading = false
                        this.displayAlert("error","Server error: "+err,4000)
                    })
                }   

            } else {

                 this.displayAlert("warning","You need to fill all required fields",4000);
            }
        }
    },

    computed: {

        ...mapGetters(['LOAD_STAFFS']),

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

    beforeRouteEnter(to,from,next){

        next(vm=>{  

        if(vm.LOAD_STAFFS == null){

            // fetching a user from the server when page is reloaded
            vm.fetchUser(to.params.id)

        } else {

            // getting user from the store
            vm.staff = vm.LOAD_STAFFS.find((staff)=>staff._id === to.params.id)
            
            vm.fullName = vm.staff.fullName;
            vm.staff_id = vm.staff._id;
            vm.email = vm.staff.email;
            vm.mobileNumber = vm.staff.phoneNumber;
            vm.country = vm.staff.country;
            vm.address = vm.staff.address;
            vm.jobTitle = vm.staff.jobTitle;
            vm.idNo = vm.staff.identityCardNo;
            vm.passportNo = vm.staff.fullName;
            vm.bankName = vm.staff.bankName;
            vm.accountNumber = vm.staff.bankAccountNumber;
            vm.accountName = vm.staff.accountName;
            vm.swiftCode = vm.staff.swiftCode;
            vm.IBAN = vm.staff.IBAN;


            vm.photo_url = vm.staff.profilePhoto;
            vm.passport_url = vm.staff.passport;
            vm.cv_url = vm.staff.cv;
            vm.identification_url = vm.staff.identityCardCopy;

        }

        });
    }
}

</script>

<style>

</style>
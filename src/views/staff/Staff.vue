<template>
  <v-container>
      <v-row>
        <v-col cols="12">
            <v-btn 
              color="secondary" 
              @click.prevent="goBack()"
              icon>
              <v-icon>mdi-arrow-left-thick</v-icon>
            </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="3">
          <v-card
              width="250px"
            >
              <v-img v-if="staff.profilePhoto"
                class="white--text align-end"
                height="200px"
                :src="staff.profilePhoto"
                fill
                position="top left"
              />
              <v-img v-else
                class="white--text align-end"
                height="160px"
                src="../../assets/no-profile.png"
                fill
                position="top left"
              />

              
              <v-card class="mb-2 pl-1 mt-5" height="25px" elevation="3">
                <p class="body-2 font-weight-medium"><v-icon size="medium">mdi-account</v-icon> {{staff.fullName}}</p>
              </v-card>

              <v-card class="mb-2 pl-1" height="25px" elevation="3">
                  <p class="body-2 font-weight-medium"><v-icon size="medium">mdi-email</v-icon> {{staff.email}}</p>
              </v-card>

              <v-card class="mb-2 pl-1" height="25px" elevation="3">
                  <p class="body-2 font-weight-medium"><v-icon size="medium">mdi-account-details</v-icon> {{staff.jobTitle}}</p>
              </v-card>

              <v-card class="mb-2 pl-1" height="25px" elevation="3">
                  <p class="body-2 font-weight-medium"><v-icon size="medium">mdi-cellphone</v-icon> {{staff.phoneNumber}}</p>
              </v-card>

               <v-card class="mb-2 pl-1" height="25px" elevation="3">
                  <p class="body-2 font-weight-medium"><v-icon size="medium">mdi-longitude</v-icon> {{staff.address}}</p>
              </v-card>

               <v-card class="mb-2 pl-1" height="25px" elevation="3">
                  <p class="body-2 font-weight-medium"><v-icon size="medium">mdi-longitude</v-icon> {{staff.country}}</p>
              </v-card>
            </v-card>
        </v-col>

        <v-col cols="12" sm="6" md="9">
          <v-card>
             <p class="body-1 text-center font-weight-regular mb-2 secondary white--text">BANKING INFORMATION</p>
             <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-card class="ml-2 mt-2 mr-2 py-1">
                    <p class="body-1 mb-1 ml-1 primary--text">BANK NAME</p>
                    <p class="subtitle-1 ml-1 font-weight-regular grey--text">{{ staff.bankName}}</p>
                  </v-card>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <v-card class="ml-2 mt-2 mr-2 py-1">
                    <p class="body-1 mb-1 ml-1 primary--text">ACCOUNT NAME</p>
                    <p class="subtitle-1 ml-1 font-weight-regular grey--text">{{ staff.accountName}}</p>
                  </v-card>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <v-card class="ml-2 mt-2 mr-2 py-1">
                    <p class="body-1 mb-1 ml-1 primary--text">ACCOUNT NUMBER</p>
                    <p class="subtitle-1 ml-1 font-weight-regular grey--text">{{ staff.bankAccountNumber}}</p>
                  </v-card>
                </v-col>
                  
                <v-col cols="12" sm="6" md="4">
                  <v-card class="ml-2 mt-2 mr-2 py-1">
                    <p class="body-1 mb-1 ml-1 primary--text">SWIFT CODE</p>
                    <p class="subtitle-1 ml-1 font-weight-regular grey--text">{{ staff.swiftCode}}</p>
                  </v-card>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <v-card class="ml-2 mt-2 mr-2 py-1">
                    <p class="body-1 mb-1 ml-1 primary--text">IBAN</p>
                    <p class="subtitle-1 ml-1 font-weight-regular grey--text">{{ staff.IBAN}}</p>
                  </v-card>
                </v-col>
             </v-row>
          </v-card>
        </v-col>

      </v-row>
  </v-container>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import ApiService from '../../services/api'

import router from '../../router';

export default {

  data: ()=>({
    staffs: [],
    staff: null,
    defaultUrl:'../../assets/no-profile.png',
  }),

  methods: {

    goBack(){
      this.$router.go(-1);
    },

    async fetchUser(id){
      await ApiService.get(`staffs/${id}`).then((response)=>{
        this.staff = response.data.body
        console.log(this.staff)
      }).catch((error)=>{
          console.log(error)
      })
    }
  },

  computed: {
    ...mapGetters(['LOAD_STAFFS'])
  },

  beforeRouteEnter(to,from,next){

    next(vm=>{  

      if(vm.LOAD_STAFFS == null){

        // fetching a user from the server when page is reloaded
        vm.fetchUser(to.params.id)

      } else {

        // getting user from the store
        vm.staff = vm.LOAD_STAFFS.find((staff)=>staff._id === to.params.id)

      }

    });
  }

}
</script>

<style>

</style>
<template>
  <v-container>

    <Snackbar 
        :type="snackbarType" 
        :snackbar="snackbar" 
        :text="snackbarText" 
        :timeout="snackbarTimeout"
    />

    <div class="text-center">
      <v-dialog
        v-model="delete_dialog"
        persistent
        width="400"
      >
        <v-card>
          <v-card-title class="text-h6 primary white--text">
            Are you sure you want to delete?
          </v-card-title>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="delete_dialog = false"
            >
              NO
            </v-btn>
            <v-btn
              color="primary"
              text
              @click="deleteStaff(staff._id)"
            >
              YES
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

      <v-row>
        <v-col cols="6">
            <v-btn 
              color="secondary" 
              @click.prevent="goBack()"
              icon>
              <v-icon>mdi-arrow-left-thick</v-icon>
            </v-btn>
        </v-col>

        <v-col cols="6" align-self="center">
          <v-row justify="end" class="mr-2">
            <v-btn class="mr-1" color="primary" @click="directTOEditPage(staff._id)">
              EDIT
            </v-btn>
            <v-btn color="primary" @click="delete_dialog = true">
              DELETE
            </v-btn>
          </v-row>
        </v-col>

      </v-row>

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

              <v-card class="mb-2 pl-1 mt-5" height="25px" :elevation="cardElevation">
                <p class="body-2 font-weight-medium"><v-icon size="medium">mdi-account</v-icon> {{staff.fullName}}</p>
              </v-card>

              <v-card class="mb-2 pl-1" height="25px" :elevation="cardElevation">
                  <p class="body-2 font-weight-medium"><v-icon size="medium">mdi-email</v-icon> {{staff.email}}</p>
              </v-card>

              <v-card class="mb-2 pl-1" height="25px" :elevation="cardElevation">
                  <p class="body-2 font-weight-medium"><v-icon size="medium">mdi-account-details</v-icon> {{staff.jobTitle}}</p>
              </v-card>

              <v-card class="mb-2 pl-1" height="25px" :elevation="cardElevation">
                  <p class="body-2 font-weight-medium"><v-icon size="medium">mdi-cellphone</v-icon> {{staff.phoneNumber}}</p>
              </v-card>

               <v-card class="mb-2 pl-1" height="25px" :elevation="cardElevation">
                  <p class="body-2 font-weight-medium"><v-icon size="medium">mdi-longitude</v-icon> {{staff.address}}</p>
              </v-card>

               <v-card class="mb-2 pl-1" height="25px" :elevation="cardElevation">
                  <p class="body-2 font-weight-medium"><v-icon size="medium">mdi-longitude</v-icon> {{staff.country}}</p>
              </v-card>
            </v-card>
        </v-col>

        <v-col cols="12" sm="6" md="9">
          <v-card class="mb-5">
             <p class="body-1 text-center font-weight-regular mb-2 secondary white--text">BANKING INFORMATION</p>
             <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-card class="ml-2 mt-2 mr-2 py-1" :elevation="cardElevation">
                    <p class="body-1 mb-1 ml-1 primary--text">BANK NAME</p>
                    <p class="subtitle-1 ml-1 font-weight-regular grey--text">{{ staff.bankName}}</p>
                  </v-card>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <v-card class="ml-2 mt-2 mr-2 py-1" :elevation="cardElevation">
                    <p class="body-1 mb-1 ml-1 primary--text">ACCOUNT NAME</p>
                    <p class="subtitle-1 ml-1 font-weight-regular grey--text">{{ staff.accountName}}</p>
                  </v-card>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <v-card class="ml-2 mt-2 mr-2 py-1" :elevation="cardElevation">
                    <p class="body-1 mb-1 ml-1 primary--text">ACCOUNT NUMBER</p>
                    <p class="subtitle-1 ml-1 font-weight-regular grey--text">{{ staff.bankAccountNumber}}</p>
                  </v-card>
                </v-col>
                  
                <v-col cols="12" sm="6" md="4">
                  <v-card class="ml-2 mt-2 mr-2 py-1" :elevation="cardElevation">
                    <p class="body-1 mb-1 ml-1 primary--text">SWIFT CODE</p>
                    <p class="subtitle-1 ml-1 font-weight-regular grey--text">{{ staff.swiftCode}}</p>
                  </v-card>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <v-card class="ml-2 mt-2 mr-2 py-1" :elevation="cardElevation">
                    <p class="body-1 mb-1 ml-1 primary--text">IBAN</p>
                    <p class="subtitle-1 ml-1 font-weight-regular grey--text">{{ staff.IBAN}}</p>
                  </v-card>
                </v-col>
             </v-row>
          </v-card>


           <v-card class="mb-5">
             <p class="body-1 text-center font-weight-regular mb-2 secondary white--text">IDENTIFICATION</p>
             <v-row>
                <v-col cols="12" sm="6">
                  <v-card class="ml-2 mt-2 mr-2 py-1" :elevation="cardElevation">
                    <p class="body-1 mb-1 ml-1 primary--text">IDENTIFICATION NUMBER</p>
                    <p class="subtitle-1 ml-1 font-weight-regular grey--text">{{ staff.identityCardNo}}</p>
                  </v-card>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-card class="ml-2 mt-2 mr-2 py-1" :elevation="cardElevation">
                    <p class="body-1 mb-1 ml-1 primary--text">PASSPORT NUMBER</p>
                    <p class="subtitle-1 ml-1 font-weight-regular grey--text">{{ staff.passportNo}}</p>
                  </v-card>
                </v-col>
             </v-row>
          </v-card>

          <v-card class="mb-5">
             <p class="body-1 text-center font-weight-regular mb-2 secondary white--text">ATTACHMENTS</p>
             <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-card class="ml-2 mt-2 mr-2 py-1 text-center" :elevation="cardElevation">
                    <p class="body-1 mb-1 ml-1 primary--text">IDENTIFICATION COPY</p>

                    <v-card flat outlined height="55" class="py-xs-15 px-xy-2 py-sm-5 px-sm-2 py-md-5 px-md-15">
                        <v-btn small @click="previewPdf(staff.identityCardCopy)">
                            Preview 
                        </v-btn>
                    </v-card>
                  </v-card>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <v-card class="ml-2 mt-2 mr-2 py-1 text-center" :elevation="cardElevation">
                    <p class="body-1 mb-1 ml-1 primary--text">PASSPORT</p>
                    <v-card flat outlined height="55" class="py-xs-15 py-xs-2 py-sm-5 px-sm-2 py-md-5 px-md-15">

                        <v-btn small @click="previewPdf(staff.passport)" v-if="staff.passport">
                            Preview 
                        </v-btn>

                        <v-btn small v-else>
                            NO FILE 
                        </v-btn>

                    </v-card>
                  </v-card>
                </v-col>

                 <v-col cols="12" sm="6" md="4">
                  <v-card class="ml-2 mt-2 mr-2 py-1 text-center" :elevation="cardElevation">
                    <p class="body-1 mb-1 ml-1 primary--text">CV</p>
                    <v-card flat outlined height="55" class="py-xs-15 py-xs-2 py-sm-5 px-sm-2 py-md-5 px-md-15">
                        <v-btn small @click="previewPdf(staff.cv)" v-if="staff.cv">
                            Preview 
                        </v-btn>

                        <v-btn small v-else>
                            NO FILE 
                        </v-btn>
                    </v-card>
                  </v-card>
                </v-col>
             </v-row>
          </v-card>

        </v-col>

      </v-row>
        <LinearLoader :loading="LinearLoading"/>
  </v-container>
</template>

<script>
import {mapGetters} from 'vuex'
import ApiService from '../../services/api'
import pdf from 'vue-pdf'
import LinearLoader from '../../components/LinearLoader.vue'
import Snackbar from '../../components/Snackbar.vue'
import {projectMixin} from '../../mixins/mixins'

export default {

  components: {pdf,LinearLoader,Snackbar},
  mixins: [projectMixin],

  data: ()=>({
    staffs: [],
    staff: null,
    defaultUrl:'../../assets/no-profile.png',
    cardElevation: 4,

    delete_dialog: false,
    //pdfDownload
    src: '',
    numPages: undefined,
    pdf_dialog:false,
    download_url:'',
    download_loading:false,
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
    },

    directTOEditPage(id){
      this.$router.push({ name: 'EditStaff', params: id})
    },

    async deleteStaff(id){

      this.delete_dialog = false;
      this.LinearLoading = true;

      await ApiService.delete("staffs/"+id).then((response)=>{
        this.LinearLoading = false;
        this.displayAlertAndRedirect("success",response.data.message,2000,'/staffs');

      }).catch((err)=>{
        this.LinearLoading = false;
        this.displayAlert("warning",err,2000);
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
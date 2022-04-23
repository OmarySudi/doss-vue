<template>
  <v-container>

    <Snackbar 
      :type="snackbarType" 
      :snackbar="snackbar" 
      :text="snackbarText" 
      :timeout="snackbarTimeout"
    />

    <v-data-table
      :headers="headers"
      :items="schools"
      :loading="loadData"
      :search="search"
      sort-by="name"
      class="elevation-1 mt-3"
    >

      <template v-slot:top>
        <v-toolbar
          flat
        >
          <span class="font-weight-bold">SCHOOLS</span>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-dialog
            v-if="user.user_type == 'ADMIN' || user.user_type == 'TEACHER'"
            v-model="dialog"
            max-width="550px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-plus-box</v-icon>
              </v-btn>
            </template>

            <v-card>
              <v-toolbar>
                <v-spacer></v-spacer>
                <span class="font-weight-bold">ADD SCHOOL</span>
                <v-spacer></v-spacer>
              </v-toolbar>

              <form ref="AddSchoolForm" @submit.prevent="save()">
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                        sm="6"
                      >
                        <v-text-field
                          v-model="name"
                          label="School Name"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                      >
                        <v-text-field
                          v-model="code"
                          label="Code"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col
                        cols="12"
                        sm="6"
                      >
                        <v-select
                          :items="region_names"
                          label="Region"
                          v-model="region"
                          @change="setDistricts()"
                          solo
                        ></v-select>
                      </v-col>

                      <v-col
                        cols="12"
                        sm="6"
                      >
                        <v-select
                          :items="districts"
                          label="District"
                          v-model="district"
                          required
                          solo
                        ></v-select>
                      </v-col>
                    </v-row>
              
                    <v-row>
                      <v-col
                        cols="12"
                        sm="6"
                      >
                        <v-text-field
                          v-model="ward"
                          label="Ward"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="close"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    type="submit"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </form>
            </v-card>
          </v-dialog>


          <v-dialog
            v-if="user.user_type == 'ADMIN' || user.user_type == 'TEACHER'"
            v-model="editDialog"
            max-width="550px"
          >
            <v-card>
              <v-toolbar>
                <v-spacer></v-spacer>
                <span class="font-weight-bold">EDIT SCHOOL</span>
                <v-spacer></v-spacer>
              </v-toolbar>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-text-field
                        v-model="name"
                        label="School Name"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-text-field
                        v-model="code"
                        label="Code"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                    >
                       <v-select
                        :items="region_names"
                        label="Region"
                        v-model="region"
                        @change="setDistricts()"
                        solo
                      ></v-select>
                    </v-col>

                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-select
                        :items="districts"
                        label="District"
                        v-model="district"
                        solo
                      ></v-select>
                    </v-col>
                  </v-row>
             
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <!-- <v-select
                        :items="wards"
                        label="Ward"
                        v-model="school.phone_number"
                        solo
                    ></v-select> -->
                      <v-text-field
                        v-model="ward"
                        label="Ward"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="cancelEditing()"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="editSchool()"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>


          <v-dialog
              v-model="dialogDelete"
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
                    @click="dialogDelete = false"
                  >
                    NO
                  </v-btn>
                  <v-btn
                    color="primary"
                    text
                    @click="deleteItemConfirm()"
                  >
                    YES
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

        </v-toolbar>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          v-if="user.user_type == 'ADMIN' || user.user_type == 'TEACHER'"
          small
          size="large"
          class="mr-5"
          color="primary"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          v-if="user.user_type == 'ADMIN' || user.user_type == 'TEACHER'"
          small
          class="ml-2 mr-5"
          size="large"
          color="red"
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
        <v-btn color="green" small class="ml-3" @click="redirectToSchool(item.code)">
          <span style="color:white">VIEW</span>
        </v-btn>
      </template>
    </v-data-table>
    <CircularLoader :loading="circularLoader"/>
  </v-container>
</template>

<script>

import ApiService from '../../services/api'
import {mapGetters} from 'vuex'
import { region,district,wards } from 'mikoa'
import {projectMixin} from '../../mixins/mixins'
import Snackbar from '../../components/Snackbar.vue'
import CircularLoader from '../../components/CircularLoader.vue'

export default {
    name: 'Users',

    mixins: [projectMixin],

    components: {Snackbar,CircularLoader},

    data: () => ({
  
      schools: [],
      loadData: true,
      search: '',
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Code', value: 'code' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],

      dialog: false,
      editDialog: false,
      dialogDelete: false,

      school: {
        name: '',
        email: '',
        user_type: '',
        phone_number: '',
      },

      name:'',
      district:'',
      ward:'',
      code:'',
      selectedSchoolId:'',

      regions: [],
      region_names:[],
      region:'',
      districts:[],
      selectedRegionId:'',


      districts: [],
      district:'',
      ward:'',

      wards: []

    }),

    methods: {
      
      resetForm(){
        this.name = '';
        this.region = '';
        this.district = '';
        this.ward = '';
        this.code = '';
      },

      cancelEditing(){
        this.resetForm();
        this.editDialog = false;
      },

      editSchool(){

        if(this.region != '' && this.district != ''){

          this.clearAlerts();
          this.editDialog = false;
          this.circularLoader = true;

          const region = this.regions.find((region)=>region.name == this.region);


          
          let data = {
            name: this.name,
            code: this.code,
            region_id: region.id,
            district: this.district,
            ward:this.ward.toUpperCase()
          }

          ApiService.put('/schools/'+this.selectedSchoolId,data).then((response)=>{

            if(response.status == 200){
              this.circularLoader = false;
              this.setAlert("success",true,response.data.message,5000);
              this.fetchSchools();
            } else {

              if(response.data.objects){

                this.circularLoader = false;
                this.setAlert("error",true,response.data.message,5000);

              } else {

                this.circularLoader = false;
                this.setAlert("error",true,"There is internal server error",5000);
              }
            }
          }).catch((error)=>{

              this.circularLoader = false;
              if(error.response.data.generalErrorCode){
                this.setAlert("error",true,error.response.data.message,10000);
              } else {
                this.setAlert("error",true,"Client: There is internal error",5000);
              }
          });
        } else {
          this.clearAlerts();
          this.setAlert("warning",true,"Validation: Region and District are required",5000);
        }
      },
      
      setDistricts(){
       
        this.district = '';

        let selectedRegion = this.regions.find((region) => region.name == this.region);

        this.selectedRegionId = selectedRegion.id;

        this.districts = district.region(this.selectedRegionId).map(({name})=>name)

      },

      async fetchSchools(){
        ApiService.get("/schools").then((response)=>{

          if(response.status == 200){
            this.loadData = false;
            this.$store.commit('SET_SCHOOLS',response.data.objects)
            this.schools = this.SCHOOLS;

          } else {

          }
        }).catch(()=>{

        })
      },

      deleteItem(item){
        this.selectedSchoolId = item.id
        this.dialogDelete = true;
      },

      editItem(item){

        console.log(item)

        this.selectedSchoolId = item.id;
        this.name = item.name;
        this.code = item.code;
        this.district = item.district;
        this.ward = item.ward ? item.ward: '';
        this.region = item.region.name;
      
        if(item.region.name){

          let selectedRegion = this.regions.find((region) => region.name == this.region);
          this.selectedRegionId = selectedRegion.id;
          this.districts = district.region(this.selectedRegionId).map(({name})=>name)

        }
        
        this.editDialog = true;
      },

      deleteItemConfirm(){

        this.clearAlerts();
        this.dialogDelete = false;
        this.circularLoader = true;

        ApiService.delete('/schools/'+this.selectedSchoolId).then((response)=>{
          if(response.status == 200){
            this.circularLoader = false;
            this.setAlert("success",true,response.data.message,5000);
            this.fetchSchools();
          } else {

            if(response.data.objects){

              this.circularLoader = false;
              this.setAlert("error",true,response.data.message,10000);

            } else {

              this.circularLoader = false;
              this.setAlert("error",true,"There is internal server error",10000);
            }
          }
        }).catch((error)=>{

            this.circularLoader = false;
            if(error.response.data.generalErrorCode){
              this.setAlert("error",true,error.response.data.message,10000);
            } else {
              this.setAlert("error",true,"Client: There is internal error",10000);
            }
        });
      },

      closeDelete(){
        console.log("close delete")
      },

      close(){
        this.dialog = false;
        this.resetForm();
      },

      save(){
        if(this.region != '' && this.district != ''){
          this.clearAlerts();
          this.dialog = false;
          this.circularLoader = true;

          const region = this.regions.find((region)=>region.name == this.region);
          
          let data = {
            name: this.name,
            code: this.code,
            region_id: region.id,
            district: this.district,
            ward:this.ward
          }

          ApiService.post('/schools',data).then((response)=>{

            if(response.status == 200){

              this.circularLoader = false;
              this.setAlert("success",true,response.data.message,5000);
              this.fetchSchools();
              // this.$store.commit('ADD_SCHOOL',response.data.objects);
              // this.schools = this.SCHOOL;

            } else {

              if(response.data.objects){

                this.circularLoader = false;
                this.setAlert("error",true,response.data.message,5000);

              } else {

                this.circularLoader = false;
                this.setAlert("error",true,"There is internal server error",5000);
              }
            }
          }).catch((error)=>{

              this.circularLoader = false;
              if(error.response.data.generalErrorCode){
                this.setAlert("error",true,error.response.data.message,10000);
              } else {
                this.setAlert("error",true,"Client: There is internal error",5000);
              }
          });
        } else {
          this.clearAlerts();
          this.setAlert("warning",true,"Validation: Region and District are required",5000);
        }
      },

      redirectToSchool(code){

        this.$router.push({name: 'School', params: {code: code}})
      },

      fetchRegions(){
        this.regions = region.all();
        this.region_names = this.regions.map(({name})=>name);
      }

    },

    computed: {
      ...mapGetters(['user','SCHOOLS']),
    },

    created(){
      this.fetchRegions();
    },

    beforeRouteEnter (to, from, next) {

      // ...
      next(vm=>{  
        
        if(vm.SCHOOLS == null){
           vm.fetchSchools();
        } else {
          vm.loadData = false;
          vm.schools = vm.SCHOOLS;
        }
         
        
      });

    }

}

</script>

<style scoped>

</style>
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
      :items="USERS"
      :loading="loadData"
      :search="search"
      sort-by="created_at"
      class="elevation-1 mt-3"
    >

      <template v-slot:top>
        <v-toolbar
          flat
        >
          <span class="font-weight-bold">USERS</span>
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
            v-model="dialog"
            width="700"
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

            <v-card width="700">
              <v-toolbar>
                <v-spacer></v-spacer>
                <span class="font-weight-bold">ADD USER</span>
                <v-spacer></v-spacer>
              </v-toolbar>

              <form ref="AddUserForm" @submit.prevent="saveUser()">
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                        sm="6"
                      >
                        <v-text-field
                          v-model="name"
                          label="Full Name"
                          required
                          :error-messages="nameErrors"
                          @input="$v.name.$touch()"
                          @blur="$v.name.$touch()"
                          v-on:keyup.enter="saveUser()"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                      >
                        <v-text-field
                          v-model="email"
                          label="Email"
                          required
                          :error-messages="emailErrors"
                          @input="$v.email.$touch()"
                          @blur="$v.email.$touch()"
                          v-on:keyup.enter="saveUser()"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col
                        cols="12"
                        sm="6"
                      >
                        <v-text-field
                          v-model="phone_number"
                          label="Phone Number"
                          required
                          :error-messages="phoneNumberErrors"
                          @input="$v.phone_number.$touch()"
                          @blur="$v.phone_number.$touch()"
                          v-on:keyup.enter="saveUser()"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                      >
                        <v-select
                          :items="userTypes"
                          label="Role"
                          v-model="user_type"
                          solo
                          :error-messages="userTypeErrors"
                          @input="$v.user_type.$touch()"
                          @blur="$v.user_type.$touch()"
                          v-on:keyup.enter="saveUser()"
                        ></v-select>
                      </v-col>
                    </v-row>

                    <v-row v-if="user_type == 'TEACHER' || user_type == 'OFFICER'">

                      <v-col cols="12" sm="6" v-if="user_type == 'TEACHER'">
                        <v-select
                          :items="teacherCategories"
                          label="Teacher Category"
                          v-model="teacher_category"
                          solo
                        ></v-select>
                      </v-col>

                      <v-col cols="12" sm="6">
                        <v-select
                          :items="SCHOOL_NAMES"
                          multiple
                          label="School"
                          v-model="schools"
                          @change="changeSchool()"
                          solo
                        ></v-select>
                      </v-col>
                    </v-row>

                    <v-row v-if="user_type == 'TEACHER' && teacher_category == 'CLASS_TEACHER'">

                      <v-col cols="12" sm="6">
                        <v-select
                          :items="CLASS_LEVELS_NAMES"
                          label="Level"
                          v-model="class_level"
                          @change="changeClassLevel()"
                          solo
                        ></v-select>
                      </v-col>

                      <v-col cols="12" sm="6">

                      </v-col>
                    </v-row>

                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="closeAddUserDialog"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    class="ml-2 mr-5"
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
                    @click="deleteUser(selectedUser.user_gid)"
                  >
                    YES
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <!-- <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>-->
        <v-icon
          small
          size="medium"
          class="ml-2 mr-5"
          color="red"
          @click="showDeleteDialog(item)"
        >
          mdi-delete
        </v-icon>
        <v-btn color="green" small class="ml-3" @click="showUser(item)">
          <span style="color:white">VIEW</span>
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="viewDialog" width="800">
      <v-toolbar>
        <v-spacer></v-spacer>
        <span class="font-weight-bold">{{selectedUser.name}}</span>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-card width="800">
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-card class="ml-2 mt-2 mr-2 py-1 px-1" :elevation="2">
                <p class="body-1 mb-1 ml-1 primary--text">Email</p>
                <p class="subtitle-1 ml-1 font-weight-regular grey--text">{{ selectedUser.email}}</p>
              </v-card>
            </v-col>

             <v-col  cols="12" sm="6" md="4">
              <v-card class="ml-2 mt-2 mr-2 py-1 px-1" :elevation="2">
                <p class="body-1 mb-1 ml-1 primary--text">Role</p>
                <p class="subtitle-1 ml-1 font-weight-regular grey--text">{{ selectedUser.user_type}}</p>
              </v-card>
            </v-col>

             <v-col  cols="12" sm="6" md="4">
              <v-card class="ml-2 mt-2 mr-2 py-1 px-1" :elevation="2">
                <p class="body-1 mb-1 ml-1 primary--text">Mobile Number</p>
                <p class="subtitle-1 ml-1 font-weight-regular grey--text">{{ selectedUser.user.phone_number}}</p>
              </v-card>
            </v-col>
          </v-row>

          <v-row v-if="selectedUser.user_type == 'TEACHER' || selectedUser.user_type == 'OFFICER'">
            <v-col cols="12" sm="6" md="4" v-if="selectedUser.user_type == 'TEACHER'">
              <v-card class="ml-2 mt-2 mr-2 py-1 px-1" :elevation="2">
                <p class="body-1 mb-1 ml-1 primary--text">SCHOOL</p>
                <p class="subtitle-1 ml-1 font-weight-regular grey--text">Name: {{ selectedUser.user.school.name }}</p>
                <p class="subtitle-1 ml-1 font-weight-regular grey--text">Code: {{ selectedUser.user.school.code }}</p>
              </v-card>
            </v-col>

            <v-col cols="12" v-if="selectedUser.user_type == 'OFFICER'">
              <v-card>

                <v-card-title class="text-subtitle-2 text-center blue--text">
                  <v-spacer>SCHOOLS</v-spacer>
                </v-card-title>

                <v-card-text>
                  <v-row>
                    <v-col cols="12" sm="6" md="4" v-for="(item,index) in selectedUser.user.schools" :key="index">
                      <v-card class="ml-2 mt-1 mr-2 py-1 px-1"   :elevation="2">
                        <p class="subtitle-1 ml-1 font-weight-regular grey--text">Name: {{ item.name}}</p>
                        <p class="subtitle-1 ml-1 font-weight-regular grey--text">Code: {{ item.code}}</p>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>

          </v-row>

        </v-card-text>
      </v-card>
    </v-dialog>

    <CircularLoader :loading="circularLoader"/>
  </v-container>
</template>

<script>

import ApiService from '../../services/api'
import {mapGetters,mapActions} from 'vuex'
import { required, email, numeric,minLength,maxLength} from 'vuelidate/lib/validators'
import {projectMixin} from '../../mixins/mixins'
import Snackbar from '../../components/Snackbar.vue'
import CircularLoader from '../../components/CircularLoader.vue'

export default {
  name: 'Users',
  components: {Snackbar,CircularLoader},
  
  mixins: [projectMixin],

  validations: {
    email: {required, email },
    phone_number: {required,numeric, minLength:minLength(12), maxLength:maxLength(12)},
    name: {required},
    user_type: {required},
  },

  data: () => ({

    //users: [],
    loadData: true,
    search: '',
    headers: [
      {
        text: 'Name',
        align: 'start',
        sortable: false,
        value: 'user.name',
      },
      { text: 'Email',  value: 'email'},
      { text: 'Role (g)', value: 'user_type' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],

    dialog: false,
    dialogDelete: false,
    selectedUser:{
      user:{

      }
    },
    viewDialog: false,

    user: {
      name: '',
      email: '',
      user_type: '',
      phone_number: '',
    },

    //use Fields
    name:'',
    email: '',
    user_type: '',
    phone_number: '',
    school_id:'',
    class_level_id:'',
    teacher_category:'',
    schools:[],
    school_ids:[],
    class_level:'',
    //

    userTypes: [
      'ADMIN',
      'TEACHER',
      'OFFICER'
    ],

    teacherCategories: [
      'CLASS_TEACHER',
      'HEAD_TEACHER',
    ],

    changeSchool(){
      this.school_ids = [];

      this.schools.forEach(element => {
          let school = this.SCHOOLS.find((school)=>school.name == element);
          this.school_ids.push(school.id)
      });
    },

    changeClassLevel(){
      let selectedClassLevel = this.CLASS_LEVELS.find((classLevel)=>classLevel.name == this.class_level);
      this.class_level_id = selectedClassLevel.id;
    },

  }),

  computed:{
    ...mapGetters(['SCHOOLS','CLASS_LEVELS','SCHOOL_NAMES','CLASS_LEVELS_NAMES','get_circular_loader','USERS']),

    //validation
    emailErrors(){
      const errors = []
      if (!this.$v.email.$dirty) {
        return errors
      }
      !this.$v.email.required && errors.push('Email is required')
      !this.$v.email.email && errors.push('Must be a valid e-mail')
      return errors
    },

    phoneNumberErrors(){
      const errors = []
      if (!this.$v.phone_number.$dirty) {
        return errors
      }
      !this.$v.phone_number.required && errors.push('Phone number  is required')
      !this.$v.phone_number.numeric && errors.push('Should contain only numbers')
      !this.$v.phone_number.minLength && errors.push('Should contain 12 numbers starts with 255')
      !this.$v.phone_number.maxLength && errors.push('Should contain 12 numbers starts with 255')
      return errors
    },

    nameErrors(){
      const errors = []
      if (!this.$v.name.$dirty) {
        return errors
      }
      !this.$v.name.required && errors.push('Name is required')
      return errors
    },

    userTypeErrors(){
      const errors = []
      if (!this.$v.user_type.$dirty) {
        return errors
      }
      !this.$v.user_type.required && errors.push('Role is required')
      return errors
    },
    //
  },

  methods: {

    ...mapActions(['FETCH_SCHOOLS','FETCH_CLASS_LEVELS','setCircularLoader','ADD_USER']),

    showUser(user){
      this.selectedUser = user;
      this.viewDialog = true;
    },

    deleteUser(user_id){
      this.clearAlerts();
      this.dialogDelete = false;
      this.circularLoader = true;

      ApiService.delete('/users/'+user_id).then((response)=>{
        if(response.status == 200){
          this.circularLoader = false;
          this.setAlert("success",true,response.data.message,5000);
          this.$store.commit('REMOVE_USER',response.data.objects)
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

    showDeleteDialog(user){
      this.selectedUser = user;
      this.dialogDelete = true;
    },

    async fetchUsers(){
      ApiService.get("/users").then((response)=>{

        if(response.status == 200){
          this.loadData = false;
          //this.users = response.data.objects;
          this.$store.commit('SET_USERS',response.data.objects)
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

    deleteItem(){
      console.log("deleting a user")
    },

    deleteItemConfirm(){
      console.log("confirm delete")
    },

    closeDelete(){
      console.log("close delete")
    },

    closeAddUserDialog(){

      this.dialog = false;
      this.name = '';
      this.email = '';
      this.user_type = '';
      this.phone_number = '';
      this.school_id = '';
      this.class_level_id = '';
      this.teacher_category = '';
      this.school = '';
      this.class_level = '';
    },

    async registerUser(user){

      this.dialog = false;
      this.circularLoader = true;
      this.clearAlerts();

      await ApiService.post('auth/create',user).then((response)=>{

        if(response.status == 200){

          this.circularLoader = false;
          this.setAlert("success",true,response.data.message,5000);
          this.$store.commit('ADD_USER',response.data.objects)
          
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

    saveUser(){

      if(this.user_type != ''){

        if(this.user_type == 'TEACHER'){

            if(this.teacher_category != ''){

              if(this.teacher_category == 'CLASS_TEACHER'){

                if(this.school_ids.length != 0 && this.class_level != ''){

                    //sends class teacher details
                  this.clearAlerts();
                  let user = {
                    name: this.name,
                    email: this.email,
                    user_type: this.user_type,
                    phone_number: this.phone_number,
                    school_ids: this.school_ids,
                    teacher_category: this.teacher_category,
                    class_levels_id: this.class_level_id
                  }

                  this.registerUser(user);
                   
                } else {

                  this.clearAlerts();

                  this.setAlert("warning",true,"School and level should be filled before submit",10000);
                }

                this.clearAlerts();

              } else {

                if(this.school_ids.length != 0){

                  this.clearAlerts();
                  //sends head teacher details
                  let user = {
                    name: this.name,
                    email: this.email,
                    user_type: this.user_type,
                    phone_number: this.phone_number,
                    school_ids: this.school_ids,
                    teacher_category: this.teacher_category
                  }

                  this.registerUser(user);

                } else {

                  this.clearAlerts();

                  this.setAlert("warning",true,"School should be filled before submit",10000);
                }

              }

            } else {

              this.clearAlerts();

              this.setAlert("warning",true,"Teacher category should be filled before submit",10000);
            }

        } else {

           //sends officer,admin details
          if(this.user_type == 'OFFICER'){

            if(this.school_ids.length != 0){

              //sends officer 
              this.clearAlerts();

              let user = {
                name: this.name,
                email: this.email,
                user_type: this.user_type,
                phone_number: this.phone_number,
                school_ids: this.school_ids
              }

              this.registerUser(user);

            } else {

              this.clearAlerts();

              this.setAlert("warning",true,"School should be filled before submit",10000);
            }

          } else {

            //sends admin, researcher
            this.clearAlerts();

            let user = {
              name: this.name,
              email: this.email,
              user_type: this.user_type,
              phone_number: this.phone_number
            }

            this.registerUser(user);
          }

        }

      } else {

        this.clearAlerts();

        this.setAlert("warning",true,"Role should be filled before submit",10000);
      }

    }
  },

  beforeRouteEnter (to, from, next) {

    // ...
    next(vm=>{  
      vm.fetchUsers();
      
      if(vm.SCHOOLS == null){
        vm.FETCH_SCHOOLS;
      }

      if(vm.CLASS_LEVELS == null)
        vm.FETCH_CLASS_LEVELS
    });

  }

}

</script>

<style scoped>

</style>
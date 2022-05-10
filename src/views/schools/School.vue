<template>
  <v-container>
    <Snackbar 
      :type="snackbarType" 
      :snackbar="snackbar" 
      :text="snackbarText" 
      :timeout="snackbarTimeout"
    />
      <v-card class="mt-5">
            <v-row>
                <v-col cols="12">
                    <v-row>
                        <v-btn 
                            color="primary" 
                            class="ml-3"
                            small
                            @click.prevent="goBack()"
                        >
                            <v-icon>mdi-arrow-left-thick</v-icon>
                        </v-btn>

                        <v-card class="ml-5 mb-5" style="width:90%" elevation="4">
                            <v-toolbar height="40" color="success" class="white--text">
                                <v-spacer></v-spacer>
                                <span class="font-weight-bold">{{school.name}}</span>
                                <v-spacer></v-spacer>
                            </v-toolbar>

                            <v-row>
                                <v-col cols="12" sm="6" md="4">
                                    <div class="py-2 px-1">
                                        <span>REGION : </span> <span>{{ school.region.name }}</span>
                                    </div>
                                </v-col>
                                  <v-col cols="12" sm="6" md="4">
                                     <div class="py-2 px-1">
                                        <span>DISTRICT : </span> <span v-if="school.district">{{ school.district }}</span>
                                    </div>
                                </v-col>
                                  <v-col cols="12" sm="6" md="4">
                                    <div class="py-2 px-1">
                                        <span>WARD : </span> <span v-if="school.ward">{{ school.ward }}</span>
                                    </div>
                                </v-col>
                            </v-row>

                            <!-- <v-row>
                                 <v-col cols="12" sm="6">
                                    <div class="py-1 px-1">
                                        <span>HEAD TEACHER : </span> <span v-if="school.headTeacher != null">{{ school.headTeacher.name }}</span>
                                    </div>
                                </v-col>

                                <v-col cols="12" sm="6">
                                    <div class="py-1 px-1">
                                        <span>EDUCATIONAL OFFICER : </span> <span v-if="school.educationalOfficer != null">{{ school.educationalOfficer.name }}</span>
                                    </div>
                                </v-col>
                            </v-row> -->

                        </v-card>
                    </v-row>
                </v-col>
            </v-row>

            <!-- <v-row>
                <v-col cols="12" sm="" md="3">
                    <v-card class="ml-3 pl-3">
                        <div>SCHOOL : {{school.name}}</div>
                        <div>REGION : {{ school.region.name}}</div>
                        <div v-if="school.district">DISTRICT : {{school.district}}</div>
                        <div v-if="school.ward">WARD : {{ school.ward}}</div>
                    </v-card>
                </v-col>
            </v-row> -->

          <!-- <v-row>
                <v-col cols="12" sm="6" md="3">
                   <v-btn 
                    color="primary" 
                    @click.prevent="goBack()"
                    icon>
                    <v-icon>mdi-arrow-left-thick</v-icon>
                    </v-btn>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                  <v-card>
                      TOTAL STUDENTS
                  </v-card>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                  <v-card>
                      MALE STUDENTS
                  </v-card>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                  <v-card>
                    FEMALE STUDENTS
                  </v-card>
              </v-col>
          </v-row>-->
            
      
            
          <v-row>
              <v-col cols="12">
                  <v-data-table
                    :headers="headers"
                    :items="students"
                    :loading="loadData"
                    :search="search"
                    sort-by="created_at"
                    class="elevation-1 mt-3"
                    >

                    <template v-slot:top>
                        <v-toolbar
                        flat
                        >
                        <span class="font-weight-bold">STUDENTS</span>
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
                            max-width="600px"
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
                                    <span class="font-weight-bold">ADD STUDENT</span>
                                    <v-spacer></v-spacer>
                                </v-toolbar>

                                <form ref="AddStudentForm" @submit.prevent="save()">
                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <v-col
                                                cols="12"
                                                sm="6"
                                                md="4"
                                                >
                                                <v-text-field
                                                    v-model="full_name"
                                                    label="Full Name"
                                                ></v-text-field>
                                                </v-col>

                                                <v-col
                                                cols="12"
                                                sm="6"
                                                md="4"
                                                >
                                                <v-select
                                                    :items="genders"
                                                    label="Gender"
                                                    v-model="gender"
                                                    solo
                                                ></v-select>
                                                </v-col>
                                                    <v-col
                                                cols="12"
                                                sm="6"
                                                md="4"
                                                >
                                                <v-select
                                                    :items="classes"
                                                    label="Entry Year"
                                                    v-model="entry_year"
                                                    solo
                                                ></v-select>
                                                </v-col>

                                                <v-col
                                                    cols="12"
                                                    sm="6"
                                                    md="4"
                                                >
                                                    <!-- <v-text-field
                                                        v-model="editedItem.fat"
                                                        label="Fat (g)"
                                                    ></v-text-field> -->
                                                    <v-text-field
                                                        v-model="parent_name"
                                                        label="Parent Name"
                                                    ></v-text-field>
                                                </v-col>

                                                <v-col
                                                    cols="12"
                                                    sm="6"
                                                    md="4"
                                                >
                                                    <!-- <v-text-field
                                                        v-model="editedItem.fat"
                                                        label="Fat (g)"
                                                    ></v-text-field> -->
                                                    <v-text-field
                                                        v-model="parent_phone"
                                                        label="Parent mobile"
                                                    ></v-text-field>
                                                </v-col>

                                                <v-col
                                                    cols="12"
                                                    sm="6"
                                                    md="4"
                                                >
                                                    <v-text-field
                                                        v-model="next_of_kin_full_name"
                                                        label="Nex of Kin Name"
                                                    ></v-text-field>
                                                </v-col>

                                                <v-col
                                                    cols="12"
                                                    sm="6"
                                                    md="4"
                                                >
                                                    <v-text-field
                                                        v-model="next_of_kin_phone_number"
                                                        label="Next of kin Phone"
                                                    ></v-text-field>
                                                </v-col>

                                                <v-col
                                                    cols="12"
                                                    sm="6"
                                                    md="4"
                                                >
                                                    <!-- <v-text-field
                                                        v-model="editedItem.fat"
                                                        label="Fat (g)"
                                                    ></v-text-field> -->
                                                    <v-text-field
                                                        v-model="chair_name"
                                                        label="Chair Name"
                                                    ></v-text-field>
                                                </v-col>

                                                <v-col
                                                    cols="12"
                                                    sm="6"
                                                    md="4"
                                                >
                                                    <!-- <v-text-field
                                                        v-model="editedItem.fat"
                                                        label="Fat (g)"
                                                    ></v-text-field> -->
                                                    <v-text-field
                                                        v-model="chair_phone"
                                                        label="Chair Mobile"
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
                            v-model="uploadDialog"
                            max-width="500px"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                color="primary"
                                dark
                                class="mb-2 ml-2"
                                v-bind="attrs"
                                v-on="on"
                            >
                                <!-- <v-icon>mdi-plus-box</v-icon> -->
                                UPLOAD FILE
                            </v-btn>
                            </template>

                            <v-card>
                            
                                <v-toolbar>
                                    <v-spacer></v-spacer>
                                    <span class="font-weight-bold">UPLOAD STUDENTS FILE</span>
                                    <v-spacer></v-spacer>
                                </v-toolbar>

                                <form ref="AddStudentsFile" @submit.prevent="uploadFile()">
                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <v-col
                                                cols="12"
                                                >
                                                    <v-file-input
                                                        show-size
                                                        label="File input"
                                                        @change="selectFile"
                                                    ></v-file-input>
                                                </v-col> 
                                            </v-row>
                                        </v-container>
                                    </v-card-text>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>

                                        <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="uploadDialog = false"
                                        >
                                            Cancel
                                        </v-btn>

                                        <v-btn
                                            color="blue darken-1"
                                            text
                                            type="submit"
                                        >
                                            Upload
                                        </v-btn>

                                    </v-card-actions>
                                </form>
                            </v-card>
                        </v-dialog>

                        <v-dialog v-model="dialogDelete" max-width="500px">
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
                                    @click="deleteItemConfirm(selectedStudent.id)"
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
                        <v-btn color="green" small class="ml-3" @click="showStudent(item)">
                        <span style="color:white">VIEW</span>
                        </v-btn>
                    </template>
                </v-data-table>
              </v-col>
          </v-row>
      </v-card>

    <v-dialog
        v-model="editDialog"
        max-width="600px"
    >
        <v-card>
            <v-toolbar>
                <v-spacer></v-spacer>
                <span class="font-weight-bold">EDIT STUDENT</span>
                <v-spacer></v-spacer>
            </v-toolbar>

            <form ref="AddStudentForm" @submit.prevent="editStudent()">
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col
                            cols="12"
                            sm="6"
                            md="4"
                            >
                            <v-text-field
                                v-model="full_name"
                                label="Full Name"
                            ></v-text-field>
                            </v-col>

                            <v-col
                            cols="12"
                            sm="6"
                            md="4"
                            >
                            <v-select
                                :items="genders"
                                label="Gender"
                                v-model="gender"
                                solo
                            ></v-select>
                            </v-col>
                                <v-col
                            cols="12"
                            sm="6"
                            md="4"
                            >
                            <v-select
                                :items="classes"
                                label="Entry Year"
                                v-model="entry_year"
                                solo
                            ></v-select>
                            </v-col>

                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                                <v-text-field
                                    v-model="parent_name"
                                    label="Parent Name"
                                ></v-text-field>
                            </v-col>

                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                                <v-text-field
                                    v-model="parent_phone"
                                    label="Parent mobile"
                                ></v-text-field>
                            </v-col>

                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                                <v-text-field
                                    v-model="next_of_kin_full_name"
                                    label="Nex of Kin Name"
                                ></v-text-field>
                            </v-col>

                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                                <v-text-field
                                    v-model="next_of_kin_phone_number"
                                    label="Next of kin Phone"
                                ></v-text-field>
                            </v-col>

                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                                <v-text-field
                                    v-model="chair_name"
                                    label="Chair Name"
                                ></v-text-field>
                            </v-col>

                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                                <v-text-field
                                    v-model="chair_phone"
                                    label="Chair Mobile"
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
                        @click="closeEditDialog()"
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
    <v-dialog v-model="viewDialog" width="800">
      <v-toolbar>
        <v-spacer></v-spacer>
        <span class="font-weight-bold">{{full_name}}</span>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-card width="800">
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-card class="ml-2 mt-2 mr-2 py-1 px-1" :elevation="2">
                <p class="body-1 mb-1 ml-1 primary--text">Gender</p>
                <p class="subtitle-1 ml-1 font-weight-regular grey--text">{{ gender}}</p>
              </v-card>
            </v-col>

             <v-col  cols="12" sm="6" md="4">
              <v-card class="ml-2 mt-2 mr-2 py-1 px-1" :elevation="2">
                <p class="body-1 mb-1 ml-1 primary--text">Class</p>
                <p class="subtitle-1 ml-1 font-weight-regular grey--text"> FORM {{ class_level }}</p>
              </v-card>
            </v-col> 

            <v-col  cols="12" sm="6" md="4">
              <v-card class="ml-2 mt-2 mr-2 py-1 px-1" :elevation="2">
                <p class="body-1 mb-1 ml-1 primary--text">School</p>
                <p class="subtitle-1 ml-1 font-weight-regular grey--text"> {{ school_name}}</p>
              </v-card>
            </v-col> 
          </v-row>

          <v-row>
            <v-col cols="12" sm="6">
                <v-card class="ml-2 mt-2 mr-2 py-1 px-1" :elevation="2">
                    <p class="body-1 mb-1 ml-1 primary--text">Parent Name</p>
                    <p class="subtitle-1 ml-1 font-weight-regular grey--text">{{ parent_name}}</p>
                </v-card>
            </v-col>

            <v-col cols="12" sm="6">
                <v-card class="ml-2 mt-2 mr-2 py-1 px-1" :elevation="2">
                    <p class="body-1 mb-1 ml-1 primary--text">Parent Phone</p>
                    <p class="subtitle-1 ml-1 font-weight-regular grey--text">{{ parent_phone}}</p>
                </v-card>
            </v-col>
          </v-row>

          <v-row v-if="chair_name != ''">
            <v-col cols="12" sm="6">
                <v-card class="ml-2 mt-2 mr-2 py-1 px-1" :elevation="2">
                    <p class="body-1 mb-1 ml-1 primary--text">Chair Name</p>
                    <p class="subtitle-1 ml-1 font-weight-regular grey--text">{{ chair_name}}</p>
                </v-card>
            </v-col>

            <v-col cols="12" sm="6">
                <v-card class="ml-2 mt-2 mr-2 py-1 px-1" :elevation="2">
                    <p class="body-1 mb-1 ml-1 primary--text">Chair Phone</p>
                    <p class="subtitle-1 ml-1 font-weight-regular grey--text">{{ chair_phone}}</p>
                </v-card>
            </v-col>
          </v-row>

          <v-row v-if="selectedStudent.next_of_kin_full_name != ''">
            <v-col cols="12" sm="6">
                <v-card class="ml-2 mt-2 mr-2 py-1 px-1" :elevation="2">
                    <p class="body-1 mb-1 ml-1 primary--text">Next of Kin Name</p>
                    <p class="subtitle-1 ml-1 font-weight-regular grey--text">{{ next_of_kin_full_name}}</p>
                </v-card>
            </v-col>

            <v-col cols="12" sm="6">
                <v-card class="ml-2 mt-2 mr-2 py-1 px-1" :elevation="2">
                    <p class="body-1 mb-1 ml-1 primary--text">Next of Kin Phone</p>
                    <p class="subtitle-1 ml-1 font-weight-regular grey--text">{{ next_of_kin_phone_number}}</p>
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
import {mapGetters} from 'vuex'
import Snackbar from '../../components/Snackbar.vue'
import CircularLoader from '../../components/CircularLoader.vue'
import {projectMixin} from '../../mixins/mixins'

export default {
    
    mixins: [projectMixin],

    components: {Snackbar,CircularLoader},
    
    data: () => ({
        school:{},
        students: [],
        loadData: true,
        search: '',
        file: undefined,
        fileInfos:[],


        classes:[],

        dialog: false,
        dialogDelete: false,
        uploadDialog: false,
        viewDialog: false,
        editDialog: false,

        currentYear: '',
        class_level: '',


        years: [
            "2019","2020","2021","2022"
        ],

        genders: ["MALE","FEMALE"],

        school_code:'',

        selectedStudent:{},

        //student details
        school_name:'',
        parent_name:'',
        parent_phone:'',
        chair_name:'',
        chair_phone:'',
        full_name:'',
        gender:'',
        next_of_kin_full_name:'',
        next_of_kin_phone_number:'',
        entry_year:'',
        student_gid:'',
        parent_id:'',
        chair_id:'',
        class_id:'',
        //
     
        headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'full_name',
        },
        { text: 'Gender', value: 'gender' },
        { text: 'Entry Year', value: 'entry_year' },
        { text: 'Leave Year', value: 'leave_year' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      
    }),

    methods: {

        goBack(){
            this.$router.go(-1);
        },

        closeEditDialog(){
            this.resetStudentDetails();
            this.editDialog = false;
        },

        editStudent(){

            this.editDialog = false;
            this.circularLoader = true;
            this.clearAlerts();

            let data = {

                full_name: this.full_name,
                gender: this.gender,
                next_of_kin_full_name: this.next_of_kin_full_name,
                next_of_kin_phone_number: this.next_of_kin_phone_number,
                entry_year: this.entry_year,
                parent_full_name: this.parent_name,
                parent_phone_number: this.parent_phone,
                chair_full_name: this.chair_name,
                chair_phone_number: this.chair_phone,
                chair_id: this.chair_id,
                parent_id: this.parent_id,
                class_id: this.class_id,
            }

            ApiService.put("/students/"+this.student_gid,data).then((response)=>{

            if(response.status == 200){

                this.circularLoader = false;
                this.fetchStudents(this.school_code);
                this.setAlert("success",true,response.data.message,5000);
                //this.$store.commit('ADD_USER',response.data.objects)

            } else {

                if(response.data.objects){

                    this.circularLoader = false;
                    this.setAlert("error",true,response.data.message,5000);

                } else {

                    this.circularLoader = false;
                    this.setAlert("error",true,"There is internal server error",5000);
                }
            }
            }).catch(()=>{

                this.circularLoader = false;
                if(error.response.data.generalErrorCode){
                    this.setAlert("error",true,error.response.data.message,10000);
                } else {
                    this.setAlert("error",true,"Client: There is internal error",5000);
                }
            })
        },

        uploadFile(){

            if(!this.file){
                this.circularLoader = false;
                this.file = undefined;
                this.setAlert("warning",true,"No file selected",5000);
            } else {

            this.clearAlerts();
            this.uploadDialog = false;
            this.circularLoader = true;

            let formData = new FormData();

            formData.append("file", this.file);

            ApiService.post("/students/upload-student-file", formData,{
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then((response)=>{

                if(response.status == 200){

                    this.uploadDialog = false;
                    this.circularLoader = false;
                    this.setAlert("success",true,response.data.message,5000);
                    this.fetchStudents(this.school.code);
                    this.file = undefined;

                } else {

                    if(response.data.generalErrorCode){

                        this.uploadDialog = false;
                        this.circularLoader = false;
                        this.file = undefined;
                        this.setAlert("error",true,response.data.message,5000);

                    } else {

                        this.circularLoader = false;
                        this.file = undefined;
                        this.setAlert("error",true,"There is internal server error",5000);
                    }
                }
                }).catch((error)=>{

                    this.circularLoader = false;
                    if(error.response.data.generalErrorCode){
                        this.setAlert("error",true,error.response.data.message,5000);
                    } else {
                        this.setAlert("error",true,"Client: There is internal error",5000);
                    }
                })
            }
            
        },

        selectFile(file) {
            this.file = file;
        },

        fetchSchool(code){
            this.clearAlerts();

            ApiService.get("/schools/"+code).then((response)=>{

            if(response.status == 200){

                this.school = response.data.objects;

            } else {

                if(response.data.objects){

                    this.circularLoader = false;
                    this.setAlert("error",true,response.data.message,5000);

                } else {

                    this.circularLoader = false;
                    this.setAlert("error",true,"There is internal server error",5000);
                }
            }
            }).catch(()=>{

                this.circularLoader = false;
                if(error.response.data.generalErrorCode){
                    this.setAlert("error",true,error.response.data.message,10000);
                } else {
                    this.setAlert("error",true,"Client: There is internal error",5000);
                }
            })
        },

         fetchStudents(code){
            this.clearAlerts();
            this.circularLoader = true;
            ApiService.get("/schools/"+code+"/students").then((response)=>{
            
            if(response.status == 200){

                this.loadData = false;
                this.circularLoader = false;
                this.students = response.data.objects;

            } else {

                if(response.data.objects){

                    this.circularLoader = false;
                    this.setAlert("error",true,response.data.message,5000);

                } else {

                    this.circularLoader = false;
                    this.setAlert("error",true,"There is internal server error",5000);
                }
            }
            }).catch(()=>{

                this.circularLoader = false;
                if(error.response.data.generalErrorCode){
                    this.setAlert("error",true,error.response.data.message,10000);
                } else {
                    this.setAlert("error",true,"Client: There is internal error",5000);
                }
            })
        },

        close(){
            this.dialog = false;
        },

        save(){
            
            //console.log("save a student")
            this.dialog = false;
            this.circularLoader = true;
            this.clearAlerts();

            let data = {

                full_name: this.full_name,
                gender: this.gender,
                next_of_kin_full_name: this.next_of_kin_full_name,
                next_of_kin_phone_number: this.next_of_kin_phone_number,
                entry_year: this.entry_year,
                parent_full_name: this.parent_name,
                parent_phone_number: this.parent_phone,
                chair_full_name: this.chair_name,
                chair_phone_number: this.chair_phone,
                school_id: this.school.id,
            }

            ApiService.post("/students/",data).then((response)=>{

            if(response.status == 200){

                this.circularLoader = false;
                this.fetchStudents(this.school_code);
                this.setAlert("success",true,response.data.message,5000);
                //this.$store.commit('ADD_USER',response.data.objects)

            } else {

                if(response.data.objects){

                    this.circularLoader = false;
                    this.setAlert("error",true,response.data.message,5000);

                } else {

                    this.circularLoader = false;
                    this.setAlert("error",true,"There is internal server error",5000);
                }
            }
            }).catch(()=>{

                this.circularLoader = false;
                if(error.response.data.generalErrorCode){
                    this.setAlert("error",true,error.response.data.message,10000);
                } else {
                    this.setAlert("error",true,"Client: There is internal error",5000);
                }
            })
        },

        closeDelete(){
            this.dialogDelete = false;
        },

        deleteItemConfirm(){

            this.clearAlerts();
            this.dialogDelete = false;
            this.circularLoader = true;

            ApiService.delete('/students/'+this.selectedStudent.student_gid).then((response)=>{
            if(response.status == 200){
                this.circularLoader = false;
                this.fetchStudents(this.school_code);
                this.setAlert("success",true,response.data.message,5000);
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
                    this.setAlert("error",true,"Client: There is internal error",10000);
                }
            });
        },

        editItem(item){
            this.setStudentDetails(item);
            this.editDialog = true;
        },

        deleteItem(item){
            this.selectedStudent = item;
            this.dialogDelete = true;
        },

        setStudentDetails(user){

            //set student details
            this.parent_name = user.parent.full_name;
            this.parent_phone = user.parent.phone_number;
            this.parent_id = user.parent.id;
            this.full_name = user.full_name;
            this.entry_year = user.class.year;
            this.gender = user.gender;
            this.student_gid = user.student_gid;
            this.class_id = user.class.id;
            
            this.next_of_kin_full_name = user.next_of_kin_full_name;
            this.next_of_kin_phone_number = user.next_of_kin_phone_number;
            
            if(user.chair != null){
                this.chair_id = user.chair.id;
                this.chair_name = user.chair.full_name;
                this.chair_phone = user.chair.phone_number;
            }
           
            this.school_name = user.school.name;
            //
        },

        resetStudentDetails(){

            //set student details
            this.parent_name = '';
            this.parent_phone = '';
            this.full_name = '';
            this.entry_year = '';
            this.gender = '';
            this.student_gid = '';
            this.next_of_kin_full_name = '';
            this.next_of_kin_phone_number = '';
            this.chair_name = '';
            this.chair_phone = '';
            this.school_name = '';
            this.parent_id = '';
            this.chair_id = '';
            this.class_id = '';
        },

        showStudent(user){

            this.setStudentDetails(user);

            let class_level = (this.currentYear - user.class.year) + 1;

            switch(class_level){
                case 1:
                    this.class_level = 'I';
                break;

                case 2:
                    this.class_level = 'II';
                break;

                case 3:
                    this.class_level = 'III';
                break;

                case 4:
                    this.class_level = 'IV';
                break;
            }

            this.viewDialog = true;
        },
    },

    computed: {
      ...mapGetters(['user','STUDENT_CLASSES_NAMES']),
    },

    created(){ 
        this.currentYear = new Date().getFullYear()
    },

    beforeRouteEnter(to,from,next){
    
        next(vm=>{  

            vm.fetchSchool(to.params.code);
            vm.fetchStudents(to.params.code);
            vm.school_code = to.params.code;

            if(vm.STUDENT_CLASSES_NAMES.length > 0){

                vm.classes = vm.STUDENT_CLASSES_NAMES;

            } else {

                ApiService.get("student_classes/").then((response)=>{
                    if(response.status == 200){
                        const years = response.data.objects.map(({year})=>year)
                        vm.classes = years
                    } 
                });
            }
                
        });
    }
}
</script>

<style>

</style>
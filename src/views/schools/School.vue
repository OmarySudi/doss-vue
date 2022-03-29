<template>
  <v-container>
      <v-card class="mt-5">
            <v-row>
                <!-- <v-col cols="6">
                    <v-btn 
                    color="primary" 
                    @click.prevent="goBack()"
                    icon>
                    <v-icon>mdi-arrow-left-thick</v-icon>
                    </v-btn>
                </v-col> -->
                <v-col cols="12" sm="" md="3">
                    <v-card class="ml-3 pl-3">
                        <div>SCHOOL : {{school.name}}</div>
                        <div>REGION : {{ school.region.name}}</div>
                        <div>DISTRICT : KINONDONI</div>
                        <div>WARD : UPANGA</div>
                    </v-card>
                </v-col>
            </v-row>

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

          <v-row></v-row>
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
                            v-model="dialog"
                            max-width="500px"
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

                            <v-card-text>
                                <v-container>
                                <v-row>
                                    <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                    >
                                    <v-text-field
                                        v-model="student.full_name"
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
                                        v-model="student.gender"
                                        solo
                                    ></v-select>
                                    </v-col>
                                        <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                    >
                                    <v-select
                                        :items="years"
                                        label="Entry Year"
                                        v-model="student.entry_year"
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
                                    <v-select
                                        :items="years"
                                        label="Leave Year"
                                        v-model="student.leave_year"
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
                                            v-model="student.parent_name"
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
                                            v-model="student.parent_number"
                                            label="Parent mobile"
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
                                            v-model="student.chair_name"
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
                                            v-model="student.chair_mobile"
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
                                @click="save"
                                >
                                Save
                                </v-btn>
                            </v-card-actions>
                            </v-card>
                        </v-dialog>

                        <v-dialog v-model="dialogDelete" max-width="500px">
                            <v-card>
                            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                            </v-card>
                        </v-dialog>

                        </v-toolbar>
                    </template>

                    <template v-slot:[`item.actions`]="{ item }">
                        <v-icon
                        small
                        size="large"
                        class="mr-5"
                        color="primary"
                        @click="editItem(item)"
                        >
                        mdi-pencil
                        </v-icon>
                        <v-icon
                        small
                        class="ml-2 mr-5"
                        size="large"
                        color="red"
                        @click="deleteItem(item)"
                        >
                        mdi-delete
                        </v-icon>
                        <v-btn color="green" small class="ml-3">
                        <span style="color:white">VIEW</span>
                        </v-btn>
                    </template>
                </v-data-table>
              </v-col>
          </v-row>
      </v-card>
  </v-container>
</template>

<script>
import ApiService from '../../services/api'

export default {

    data: () => ({
        school:{},
        students: [],
        loadData: true,
        search: '',

        student: {
            full_name: '',
            gender: '',
            entry_year: '',
            leave_year:''
        },

        dialog: false,
        dialogDelete: false,

        years: [
            "2019","2020","2021","2022"
        ],

        genders: ["MALE","FEMALE"],

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

        async fetchSchool(code){

            ApiService.get("/schools/"+code).then((response)=>{

            if(response.status == 200){
                this.school = response.data.objects;
                console.log(this.school)
            } else {

            }
            }).catch(()=>{

            })
        },

         async fetchStudents(code){

            ApiService.get("/schools/"+code+"/students").then((response)=>{
            if(response.status == 200){
                this.loadData = false;
                this.students = response.data.objects;
            } else {

            }
            }).catch(()=>{

            })
        },

        close(){
            this.dialog = false;
        },

        save(){
            console.log("save a student")
        },

        closeDelete(){
            this.dialogDelete = false;
        },

        deleteItemConfirm(){
            console.log("confirm deleting a student")
        },

        editItem(item){
            console.log("edit a student")
        },

        deleteItem(){
            console.log("deleting an item")
        }
    },

    beforeRouteEnter(to,from,next){
    
        next(vm=>{  

         vm.fetchSchool(to.params.code);

         vm.fetchStudents(to.params.code);

        // if(vm.LOAD_STAFFS == null){

        //     // fetching a user from the server when page is reloaded
        //     vm.fetchUser(to.params.id)

        // } else {

        //     // getting user from the store
        //     vm.staff = vm.LOAD_STAFFS.find((staff)=>staff._id === to.params.id)

        // }

        });
    }
}
</script>

<style>

</style>
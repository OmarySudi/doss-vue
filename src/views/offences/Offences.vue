<template>
    <v-container>

      <Snackbar 
        :type="snackbarType" 
        :snackbar="snackbar" 
        :text="snackbarText" 
        :timeout="snackbarTimeout"
      />

        <v-card class="mt-3">
            <v-tabs
                color="blue accent-4"
            >
               
                <v-tab>Offence Actions</v-tab>
                <v-tab>Offence Types</v-tab>
                <v-tab>Offences</v-tab>
               
                <v-tab-item>
                    <v-container fluid>
                      <v-row>
                        <v-col>
                          <v-data-table
                            :headers="actionsHeaders"
                            :items="actions"
                            :loading="loadActionsData"
                            sort-by="created_at"
                            class="elevation-1 mt-3"
                          >

                            <template v-slot:top>
                              <v-toolbar
                                flat
                              >
                                <span class="font-weight-bold">ACTIONS</span>
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <v-dialog
                                  v-model="actionDialog"
                                  max-width="500px"
                                >
                                  <!-- <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                      color="primary"
                                      dark
                                      class="mb-2"
                                      v-bind="attrs"
                                      v-on="on"
                                    >
                                      <v-icon>mdi-plus-box</v-icon>
                                    </v-btn>
                                  </template> -->

                                  <v-card>
                                    <!-- <v-spacer></v-spacer>
                                    <v-card-title class="text-center">
                                      <span class="">ADD USER</span>
                                    </v-card-title> -->
                                    <v-toolbar>
                                      <v-spacer></v-spacer>
                                      <span class="font-weight-bold">ADD ACTION</span>
                                      <v-spacer></v-spacer>
                                    </v-toolbar>
                                    <v-card-text>
                                      <v-container>
                                        <v-row>
                                          <v-col
                                            cols="12"
                                          >
                                            <v-text-field
                                              v-model="action.action"
                                              label="Action"
                                            ></v-text-field>
                                          </v-col>
                                          <v-col
                                            cols="12"
                                          >
                                            <v-textarea
                                              v-model="action.description"
                                              label="Description"
                                            ></v-textarea>
                                          </v-col>
                                        </v-row>
                                      </v-container>
                                    </v-card-text>

                                    <v-card-actions>
                                      <v-spacer></v-spacer>
                                      <v-btn
                                        color="blue darken-1"
                                        text
                                        @click="closeActionDialog"
                                      >
                                        Cancel
                                      </v-btn>
                                      <v-btn
                                        color="blue darken-1"
                                        class="ml-2 mr-5"
                                        text
                                        @click="saveAction"
                                      >
                                        Save
                                      </v-btn>
                                    
                                    </v-card-actions>
                                  </v-card>
                                </v-dialog>

                                <v-dialog
                                  v-model="actionEditDialog"
                                  max-width="500px"
                                >
                                  <v-card>
                                    <v-toolbar>
                                      <v-spacer></v-spacer>
                                      <span class="font-weight-bold">EDIT ACTION</span>
                                      <v-spacer></v-spacer>
                                    </v-toolbar>
                                    <v-card-text>
                                      <v-container>
                                        <v-row>
                                          <v-col
                                            cols="12"
                                          >
                                            <v-text-field
                                              v-model="selectedAction.action"
                                              label="Action"
                                            ></v-text-field>
                                          </v-col>
                                          <v-col
                                            cols="12"
                                          >
                                            <v-textarea
                                              v-model="selectedAction.description"
                                              label="Description"
                                            ></v-textarea>
                                          </v-col>
                                        </v-row>
                                      </v-container>
                                    </v-card-text>

                                    <v-card-actions>
                                      <v-spacer></v-spacer>
                                      <v-btn
                                        color="blue darken-1"
                                        text
                                        @click="actionEditDialog = false"
                                      >
                                        Cancel
                                      </v-btn>
                                      <v-btn
                                        color="blue darken-1"
                                        class="ml-2 mr-5"
                                        text
                                        @click="saveEditAction"
                                      >
                                        Save
                                      </v-btn>
                                    </v-card-actions>
                                  </v-card>
                                </v-dialog>


                                <v-dialog
                                  v-model="actionDialogDelete"
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
                                        @click="actionDialogDelete = false"
                                      >
                                        NO
                                      </v-btn>
                                      <v-btn
                                        color="primary"
                                        text
                                        @click="actionDeleteItemConfirm(selectedAction.id)"
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
                                size="large"
                                class="mr-5"
                                color="primary"
                                @click="editActionItem(item)"
                              >
                                mdi-pencil
                              </v-icon> -->
                              <v-icon
                                class="ml-2 mr-5"
                                size="large"
                                color="red"
                                @click="deleteActionItem(item)"
                              >
                                mdi-delete
                              </v-icon>
                              <!-- <v-btn color="green" small class="ml-3" @click="showAction(item)">
                                <span style="color:white">VIEW</span>
                              </v-btn> -->
                            </template>
                          </v-data-table>
                        </v-col>
                      </v-row>
                    </v-container>
                </v-tab-item>

                <v-tab-item>
                  <v-container fluid>
                    <v-row>
                        <v-col>
                           <v-data-table
                            :headers="offenceTypeHeaders"
                            :items="offenceTypes"
                            :loading="loadOffenseTypeData"
                            :search="offenceTypeSearch"
                            sort-by="created_at"
                            class="elevation-1 mt-3"
                          >

                            <template v-slot:top>
                              <v-toolbar
                                flat
                              >
                                <span class="font-weight-bold">OFFENSE TYPES</span>
                                <v-spacer></v-spacer>
                                <v-text-field
                                  v-model="offenceTypeSearch"
                                  append-icon="mdi-magnify"
                                  label="Search"
                                  single-line
                                  hide-details
                                ></v-text-field>
                                <v-spacer></v-spacer>
                                
                                <v-dialog
                                  v-model="offenceTypeDialog"
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
                                      <span class="font-weight-bold">ADD OFFENSE TYPE</span>
                                      <v-spacer></v-spacer>
                                    </v-toolbar>

                                    <v-card-text>
                                      <v-container>
                                        <v-row>
                                          <v-col
                                            cols="12"
                   
                                          >
                                            <v-text-field
                                              v-model="offenceTypeName"
                                              label="Name"
                                            ></v-text-field>
                                          </v-col>
                                          <v-col
                                            cols="12"
                                  
                                          >
                                            <v-select
                                              :items="offenseTypeActions"
                                              label="Action"
                                              v-model="offenceTypeAction"
                                              solo
                                          ></v-select>
                                          </v-col>
                                        </v-row>
                                      </v-container>
                                    </v-card-text>

                                    <v-card-actions>
                                      <v-spacer></v-spacer>
                                      <v-btn
                                        color="blue darken-1"
                                        text
                                        @click="closeOffenseTypeDialog"
                                      >
                                        Cancel
                                      </v-btn>
                                      <v-btn
                                        color="blue darken-1"
                                        text
                                        @click="saveOffenseType"
                                      >
                                        Save
                                      </v-btn>
                                    </v-card-actions>
                                  </v-card>
                                </v-dialog>

                                <v-dialog
                                  v-model="offenseTypeEditDialog"
                                  max-width="500px"
                                >
                                  <v-card>
                                    <v-toolbar>
                                      <v-spacer></v-spacer>
                                      <span class="font-weight-bold">EDIT OFFENSE TYPE</span>
                                      <v-spacer></v-spacer>
                                    </v-toolbar>
                                    <v-card-text>
                                      <v-container>
                                        <v-row>
                                          <v-col
                                            cols="12"
                                          >
                                            <v-text-field
                                              v-model="selectedOffenseTypeName"
                                              label="Name"
                                            ></v-text-field>
                                          </v-col>
                                          <v-col
                                            cols="12"
                                          >
                                            <v-select
                                              :items="offenseTypeActions"
                                              label="Action"
                                              v-model="selectedOffenseTypeAction"
                                              solo
                                            ></v-select>
                                          </v-col>
                                        </v-row>
                                      </v-container>
                                    </v-card-text>

                                    <v-card-actions>
                                      <v-spacer></v-spacer>
                                      <v-btn
                                        color="blue darken-1"
                                        text
                                        @click="offenseTypeEditDialog = false"
                                      >
                                        Cancel
                                      </v-btn>
                                      <v-btn
                                        color="blue darken-1"
                                        class="ml-2 mr-5"
                                        text
                                        @click="editOffenseType"
                                      >
                                        Save
                                      </v-btn>
                                    </v-card-actions>
                                  </v-card>
                                </v-dialog>

                                <v-dialog v-model="offenceTypeDialogDelete" max-width="500px">
                                  <v-card>
                                    <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                                    <v-card-actions>
                                      <v-spacer></v-spacer>
                                      <v-btn color="blue darken-1" text @click="closeOffenseTypeDelete">Cancel</v-btn>
                                      <v-btn color="blue darken-1" text @click="OffenseTypeDeleteItemConfirm">OK</v-btn>
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
                                @click="OffenseTypeEditItem(item)"
                              >
                                mdi-pencil
                              </v-icon>
                              <!-- <v-icon
                                small
                                class="ml-2 mr-5"
                                size="large"
                                color="red"
                                @click="OffenseTypeDeleteItem(item)"
                              >
                                mdi-delete
                              </v-icon> -->
                              <!-- <v-btn color="green" small class="ml-3">
                                <span style="color:white">VIEW</span>
                              </v-btn> -->
                            </template>
                          </v-data-table>
                        </v-col>
                    </v-row>
                  </v-container>
                </v-tab-item>

                <v-tab-item>
                  <v-container fluid>
                    <v-row>
                      
                       <v-col>
                          <v-container fluid>
                            <v-row>
                                <v-col>
                                  <v-data-table
                                    :headers="offenseHeaders"
                                    :items="offenses"
                                    :loading="loadOffenseData"
                                    :search="offenseSearch"
                                    sort-by="created_at"
                                    class="elevation-1 mt-3"
                                  >

                                    <template v-slot:top>
                                      <v-toolbar
                                        flat
                                      >
                                        <span class="font-weight-bold">OFFENSES</span>
                                        <v-spacer></v-spacer>
                                        <v-text-field
                                          v-model="offenseSearch"
                                          append-icon="mdi-magnify"
                                          label="Search"
                                          single-line
                                          hide-details
                                        ></v-text-field>
                                        <v-spacer></v-spacer>
                                        <v-dialog
                                          v-model="offenseDialog"
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
                                              <span class="font-weight-bold">ADD OFFENSE</span>
                                              <v-spacer></v-spacer>
                                            </v-toolbar>

                                            <v-card-text>
                                              <v-container>
                                                <v-row>
                                                  <v-col
                                                    cols="12"
                          
                                                  >
                                                    <v-text-field
                                                      v-model="offenseName"
                                                      label="Name"
                                                    ></v-text-field>
                                                  </v-col>
                                                  <v-col
                                                    cols="12"
                                          
                                                  >
                                                    <v-select
                                                      :items="offenseTypes"
                                                      label="Type"
                                                      v-model="offenseTypeName"
                                                      solo
                                                  ></v-select>
                                                  </v-col>
                                                </v-row>
                                              </v-container>
                                            </v-card-text>

                                            <v-card-actions>
                                              <v-spacer></v-spacer>
                                              <v-btn
                                                color="blue darken-1"
                                                text
                                                @click="closeOffenseDialog"
                                              >
                                                Cancel
                                              </v-btn>
                                              <v-btn
                                                color="blue darken-1"
                                                text
                                                @click="saveOffense"
                                              >
                                                Save
                                              </v-btn>
                                            </v-card-actions>
                                          </v-card>
                                        </v-dialog>

                                        <v-dialog
                                          v-model="offenseEditDialog"
                                          max-width="500px"
                                        >
                                          <v-card>
                                            <v-toolbar>
                                              <v-spacer></v-spacer>
                                              <span class="font-weight-bold">EDIT OFFENSE</span>
                                              <v-spacer></v-spacer>
                                            </v-toolbar>
                                            <v-card-text>
                                              <v-container>
                                                <v-row>
                                                  <v-col
                                                    cols="12"
                                                  >
                                                    <v-text-field
                                                      v-model="selectedOffenseName"
                                                      label="Name"
                                                    ></v-text-field>
                                                  </v-col>

                                                  <v-col cols="12">
                                                    <v-select
                                                      :items="offenseTypes"
                                                      label="Type"
                                                      v-model="selectedOffenseTypeName"
                                                      solo
                                                    >
                                                    </v-select>
                                                  </v-col>
                                                  <!-- <v-col
                                                    cols="12"
                                                  >
                                                    <v-textarea
                                                      v-model="selectedAction.description"
                                                      label="Description"
                                                    ></v-textarea>
                                                  </v-col> -->
                                                </v-row>
                                              </v-container>
                                            </v-card-text>

                                            <v-card-actions>
                                              <v-spacer></v-spacer>
                                              <v-btn
                                                color="blue darken-1"
                                                text
                                                @click="offenseEditDialog = false"
                                              >
                                                Cancel
                                              </v-btn>
                                              <v-btn
                                                color="blue darken-1"
                                                class="ml-2 mr-5"
                                                text
                                                @click="editOffense"
                                              >
                                                Save
                                              </v-btn>
                                            </v-card-actions>
                                          </v-card>
                                        </v-dialog>

                                        <v-dialog
                                          v-model="offenseDialogDelete"
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
                                                @click="closeOffenseDelete = false"
                                              >
                                                NO
                                              </v-btn>
                                              <v-btn
                                                color="primary"
                                                text
                                                @click="OffenseDeleteItemConfirm()"
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
                                        small
                                        size="large"
                                        class="mr-5"
                                        color="primary"
                                        @click="OffenseEditItem(item)"
                                      >
                                        mdi-pencil
                                      </v-icon>
                                      <v-icon
                                        small
                                        class="ml-2 mr-5"
                                        size="large"
                                        color="red"
                                        @click="OffenseDeleteItem(item)"
                                      >
                                        mdi-delete
                                      </v-icon>

                                       <!-- <v-btn color="green" small class="ml-3">
                                        <span style="color:white">VIEW</span>
                                      </v-btn> -->
                                    </template>
                                  </v-data-table>
                                </v-col>
                            </v-row>
                          </v-container>
                       </v-col>
                      </v-row>
                    </v-container>
                </v-tab-item>
            </v-tabs>
        </v-card>
        <CircularLoader :loading="circularLoader"/>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import ApiService from '../../services/api'
import {projectMixin} from '../../mixins/mixins'
import Snackbar from '../../components/Snackbar.vue'
import CircularLoader from '../../components/CircularLoader.vue'

export default {

  components: {Snackbar,CircularLoader},
  
  mixins: [projectMixin],

    data: () => ({
  
      //offence actions data

      actions: [],
      loadActionsData: true,

      selectedAction:{},
      selectedActionType: {},
    
      actionsHeaders: [
        {
          text: 'Action',
          align: 'start',
          sortable: false,
          value: 'action',
        },
        { text: 'description', value: 'description' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],

      actionDialog: false,
      actionEditDialog: false,
      actionDialogMode: 'add',
      ActionViewDialog: false,
      actionDialogDelete: false,

      action: {
        action: '',
        description: '',
      },

      offenseTypeActions: [
        "SEND_SMS",
        "DO_NOT_SEND_SMS"
      ],

      //offence types data

      offenceTypes: [],

      selectedOffenseTypeAction:'',
      selectedOffenseTypeName:'',
      selectedOffenseTypeId:'',

      loadOffenseTypeData: true,
      offenceTypeSearch: '',
      offenceTypeHeaders: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Action', value: 'offence_type_action.action' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],

      offenceTypeDialog: false,
      offenceTypeDialogDelete: false,
      offenseTypeEditDialog: false,

      offenceType: {
        name: '',
        offence_type_action: {},
      },

      offenceTypeName:'',
      offenceTypeAction:'',

      //offence data

      //offenses
        offenses: [],
        loadOffenseData: true,
        offenseSearch: '',
        offenseHeaders: [
          {
            text: 'Name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Type', value: 'offence_type.name' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],

        offenseDialog: false,
        offenseDialogDelete: false,
        offenseEditDialog: false,

        offense: {
          name: '',
          offence_type: {},
        },

        offenseName:'',
        offenseTypeName:'',

        selectedOffenseTypeName:'',
        selectedOffenseName:'',
        selectedOffenseId:'',

        offenseTypes: []
      //end offense

    }),

      computed:{
      ...mapGetters(['OFFENSE_ACTIONS','OFFENSE_TYPES','OFFENSES','OFFENSE_TYPE_NAMES'])
    },

    methods: {

        //actions
        async fetchOffenceTypesActions(){

          await ApiService.get("/offence-type-actions").then((response)=>{

          if(response.status == 200){
              this.loadActionsData = false;
              this.actions = response.data.objects;
              this.$store.commit('SET_OFFENSE_ACTIONS',response.data.objects)
          } else {

          }
          }).catch(()=>{

          })
      },

      closeActionDialog(){
        this.actionDialog = false;
      },

      saveAction(){
        console.log("saving the action")
      },

      closeActionDialogDelete(){
        this.actionDialogDelete = false;
      },

      saveEditAction(){

        this.clearAlerts();
        this.actionEditDialog = false;
        this.circularLoader = true;

        ApiService.put('/offence-type-actions/'+this.selectedAction.id,this.selectedAction).then((response)=>{
          if(response.status == 200){
            this.circularLoader = false;
            this.setAlert("success",true,response.data.message,5000);
            this.$store.commit('SET_ACTION',response.data.objects)
            this.actions = this.OFFENSE_ACTIONS;
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

      actionDeleteItemConfirm(action_id){

        this.clearAlerts();
        this.actionDialogDelete = false;
        this.circularLoader = true;

        ApiService.delete('/offence-type-actions/'+action_id).then((response)=>{
          if(response.status == 200){
            this.circularLoader = false;
            this.setAlert("success",true,response.data.message,5000);
            this.$store.commit('REMOVE_ACTION',response.data.objects)
            this.actions = this.OFFENSE_ACTIONS;
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

      deleteActionItem(action){
        this.actionDialogDelete = true;
        this.selectedAction = action;
      },

      editActionItem(action){
        this.actionEditDialog = true;
        this.selectedAction = action;
      },

      showAction(action){
        this.selectedAction = action;
        this.ActionViewDialog = true;
      },

      // offence types:
      async fetchOffenceTypes(){

          ApiService.get("/offence-types").then((response)=>{

          if(response.status == 200){

              this.loadOffenseTypeData = false;
              this.offenceTypes = response.data.objects;
              this.$store.commit('SET_OFFENSE_TYPES',response.data.objects)

              const names = response.data.objects.map(({name})=>name)
              this.$store.commit('SET_OFFENSE_TYPE_NAMES',names);
              this.offenseTypes = this.OFFENSE_TYPE_NAMES;

          } else {

          }
          }).catch(()=>{

          })
      },

      closeOffenseTypeDialog(){

        this.offenceTypeDialog = false;
      },

      saveOffenseType(){

        this.clearAlerts();
        this.offenceTypeDialog = false;
        this.circularLoader = true;

        let offense_type_action_id;

        if(this.offenceTypeAction == 'SEND_SMS'){

          offense_type_action_id = 1;
        } else {
          offense_type_action_id = 2;
        }

        let data = {
          name: this.offenceTypeName,
          offence_type_action_id: offense_type_action_id
        }

        ApiService.post('/offence-types/',data).then((response)=>{
          if(response.status == 200){
            this.circularLoader = false;
            this.setAlert("success",true,response.data.message,5000);
            this.$store.commit('ADD_OFFENSE_TYPE',response.data.objects)
            this.offenceTypes = this.OFFENSE_TYPES;
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


      editOffenseType(){

        this.clearAlerts();
        this.offenseTypeEditDialog = false;
        this.circularLoader = true;

        let offense_type_action_id;

        if(this.selectedOffenseTypeAction == 'SEND_SMS'){

          offense_type_action_id = 1;
        } else {
          offense_type_action_id = 2;
        }

        let data = {
          name: this.selectedOffenseTypeName,
          offence_type_action_id: offense_type_action_id
        }

        ApiService.put('/offence-types/'+this.selectedOffenseTypeId,data).then((response)=>{
          if(response.status == 200){
            this.circularLoader = false;
            this.setAlert("success",true,response.data.message,5000);
            this.fetchOffenceTypes();
            this.fetchOffenses();
            // this.$store.commit('REPLACE_OFFENSE_TYPE',response.data.objects)
            // this.offenceTypes = this.OFFENSE_TYPES;
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

      closeOffenseTypeDelete(){

        this.offenceTypeDialogDelete = false;
      },

      OffenseTypeDeleteItemConfirm(){
        console.log("offense type delete")
      },

      OffenseTypeEditItem(item){

        this.selectedOffenseTypeName = item.name;
        this.selectedOffenseTypeAction = item.offence_type_action.action;
        this.selectedOffenseTypeId = item.id;
        this.offenseTypeEditDialog = true;

      },

      OffenseTypeDeleteItem(item){
        console.log("delete item");
      },

      //

      //offense
      async fetchOffenses(){

          ApiService.get("/offences").then((response)=>{

          if(response.status == 200){
              this.loadOffenseData = false;
              this.$store.commit('SET_OFFENSES',response.data.objects)
              this.offenses = this.OFFENSES
          } else {

          }
          }).catch(()=>{

          })
      },

      closeOffenseDialog(){
        this.offenseDialog = false;
      },

      async saveOffense(){

        this.clearAlerts();
        this.offenseDialog = false;
        this.circularLoader = true;

        let offenseType = this.OFFENSE_TYPES.find((offense_type)=>offense_type.name == this.offenseTypeName);
       
        let data = {
          name: this.offenseName,
          offence_type_id: offenseType.id
        }

        await ApiService.post('/offences/',data).then((response)=>{
          if(response.status == 200){
            this.circularLoader = false;
            this.setAlert("success",true,response.data.message,5000);
            this.fetchOffenses();
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


      async editOffense(){

        this.clearAlerts();
        this.offenseEditDialog = false;
        this.circularLoader = true;

        let offenseType = this.OFFENSE_TYPES.find((offense_type)=>offense_type.name == this.selectedOffenseTypeName);
      
        let data = {
          name: this.selectedOffenseName,
          offence_type_id: offenseType.id
        }

        await ApiService.put('/offences/'+this.selectedOffenseId,data).then((response)=>{
          if(response.status == 200){
            this.circularLoader = false;
            this.setAlert("success",true,response.data.message,5000);
            this.fetchOffenses();
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

      closeOffenseDelete(){
        this.offenseDialogDelete = false;
      },

      async OffenseDeleteItemConfirm(){

        this.clearAlerts();
        this.offenseDialogDelete = false;
        this.circularLoader = true;

        await ApiService.delete('/offences/'+this.selectedOffenseId).then((response)=>{
          if(response.status == 200){
            this.circularLoader = false;
            this.setAlert("success",true,response.data.message,5000);
            this.fetchOffenses();
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

      OffenseEditItem(item){
        this.selectedOffenseName = item.name;
        this.selectedOffenseId = item.id;
        this.selectedOffenseTypeName = item.offence_type.name
        this.offenseEditDialog = true;
      },

      OffenseDeleteItem(item){
        this.selectedOffenseId = item.id
        this.offenseDialogDelete = true;
      },

    },

    created(){
      //this.fetchOffenceTypesActions();
      //this.fetchOffenceTypes();
      //this.fetchOffenses();
    },

    beforeRouteEnter (to, from, next) {
      next(vm=>{

        if(vm.OFFENSE_ACTIONS == null){
          vm.fetchOffenceTypesActions();
        } else {
          vm.loadActionsData = false;
          vm.actions = vm.OFFENSE_ACTIONS;
        }

        if(vm.OFFENSE_TYPES == null){
            vm.fetchOffenceTypes();
        } else {
          vm.loadOffenseTypeData = false;
          vm.offenceTypes = vm.OFFENSE_TYPES;
        }

        if(vm.OFFENSES == null){
            vm.fetchOffenses();
        } else {
          vm.loadOffenseData = false;
          vm.offenses = vm.OFFENSES;
        }

      })
    }

}
</script>

<style>

</style>
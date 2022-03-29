<template>
    <v-container>
        <v-card class="mt-3">
            <v-tabs
                color="blue accent-4"
            >
                <v-tab>Offences</v-tab>
                <v-tab>Offence Types</v-tab>
                <v-tab>Offence Actions</v-tab>
               
                <v-tab-item
                >
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
                                                      v-model="offense.name"
                                                      label="Name"
                                                    ></v-text-field>
                                                  </v-col>
                                                  <v-col
                                                    cols="12"
                                          
                                                  >
                                                    <v-select
                                                      :items="offenseTypes"
                                                      label="Type"
                                                      v-model="offense.offence_type.name"
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

                                        <v-dialog v-model="offenseDialogDelete" max-width="500px">
                                          <v-card>
                                            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                                            <v-card-actions>
                                              <v-spacer></v-spacer>
                                              <v-btn color="blue darken-1" text @click="closeOffenseDelete">Cancel</v-btn>
                                              <v-btn color="blue darken-1" text @click="OffenseDeleteItemConfirm">OK</v-btn>
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
                                      <v-btn color="green" small class="ml-3">
                                        <span style="color:white">VIEW</span>
                                      </v-btn>
                                    </template>
                                  </v-data-table>
                                </v-col>
                            </v-row>
                          </v-container>
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
                                              v-model="offenceType.name"
                                              label="Name"
                                            ></v-text-field>
                                          </v-col>
                                          <v-col
                                            cols="12"
                                  
                                          >
                                            <v-select
                                              :items="offenseTypeActions"
                                              label="Action"
                                              v-model="offenceType.offence_type_action.action"
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
                              <v-icon
                                small
                                class="ml-2 mr-5"
                                size="large"
                                color="red"
                                @click="OffenseTypeDeleteItem(item)"
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
                  </v-container>
                </v-tab-item>

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

                                <v-dialog v-model="actionDialogDelete" max-width="500px">
                                  <v-card>
                                    <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                                    <v-card-actions>
                                      <v-spacer></v-spacer>
                                      <v-btn color="blue darken-1" text @click="closeActionDialogDelete">Cancel</v-btn>
                                      <v-btn color="blue darken-1" text @click="actionDeleteItemConfirm">OK</v-btn>
                                      <v-spacer></v-spacer>
                                    </v-card-actions>
                                  </v-card>
                                </v-dialog>

                              </v-toolbar>
                            </template>

                             <template v-slot:[`item.actions`]="{ item }">
                              <v-icon
                                size="large"
                                class="mr-5"
                                color="primary"
                                @click="editActionItem(item)"
                              >
                                mdi-pencil
                              </v-icon>
                              <v-icon
                                class="ml-2 mr-5"
                                size="large"
                                color="red"
                                @click="deleteActionItem(item)"
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
                    </v-container>
                </v-tab-item>
            </v-tabs>
        </v-card>
    </v-container>
</template>

<script>
import ApiService from '../../services/api'
export default {
    data: () => ({
  
      //offence actions data

      actions: [],
      loadActionsData: true,

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

      offenceType: {
        name: '',
        offence_type_action: {},
      },

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

        offense: {
          name: '',
          offence_type: {},
        },

        offenseTypes: [
          "Kuchelewa"
        ]
      //end offense

    }),

    methods: {

        //actions

        async fetchOffenceTypesActions(){

          ApiService.get("/offence-type-actions").then((response)=>{

          if(response.status == 200){
              this.loadActionsData = false;
              this.actions = response.data.objects;
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

      actionDeleteItemConfirm(){
        console.log("confirm deleting action");
      },

      deleteActionItem(action){
        console.log("deleting action ")
      },

      editActionItem(action){
        console.log("deleting action ")
      },

      //

      // offence types:
      async fetchOffenceTypes(){

          ApiService.get("/offence-types").then((response)=>{

          if(response.status == 200){
              this.loadOffenseTypeData = false;
              this.offenceTypes = response.data.objects;
          } else {

          }
          }).catch(()=>{

          })
      },

      closeOffenseTypeDialog(){

        this.offenceTypeDialog = false;
      },

      saveOffenseType(){
        console.log("save offense type");
      },

      closeOffenseTypeDelete(){

        this.offenceTypeDialogDelete = false;
      },

      OffenseTypeDeleteItemConfirm(){
        console.log("offense type delete")
      },

      OffenseTypeEditItem(item){
        console.log("edit item");
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
              this.offenses = response.data.objects;
          } else {

          }
          }).catch(()=>{

          })
      },

      closeOffenseDialog(){
        this.offenseDialog = false;
      },

      saveOffense(){
        console.log("save offense type");
      },

      closeOffenseDelete(){
        this.offenseDialogDelete = false;
      },

      OffenseDeleteItemConfirm(){
        console.log("offense type delete")
      },

      OffenseEditItem(item){
        console.log("edit item");
      },

      OffenseDeleteItem(item){
        console.log("delete item");
      },
    },

    created(){
      this.fetchOffenceTypesActions();
      this.fetchOffenceTypes();
      this.fetchOffenses();
    }
}
</script>

<style>

</style>
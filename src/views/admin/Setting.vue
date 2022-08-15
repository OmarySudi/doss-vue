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
              
              <v-tab>Message Template</v-tab>
              
              <v-tab-item>
                  <v-container fluid>
                    <v-row>
                      <v-col>
                        <v-data-table
                            :headers="headers"
                            :items="message_structures"
                            :loading="load_structures"
                            sort-by="created_at"
                            class="elevation-1 mt-3"
                        >
                          <template v-slot:top>
                            <v-toolbar flat>
                              <v-spacer></v-spacer>
                              <v-spacer></v-spacer>

                              <v-dialog
                                  v-model="addDialog"
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
                                      <span class="font-weight-bold">ADD MESSAGE TEMPLATE</span>
                                      <v-spacer></v-spacer>
                                    </v-toolbar>

                                    <v-card-text>
                                      <v-container>
                                        <v-row>
                                          <v-col cols="12">
                                            <v-select
                                              :items="offenseTypeNames"
                                              label="Offense Type"
                                              v-model="offenseTypeName"
                                              solo
                                            >
                                            </v-select>
                                          </v-col>

                                          <v-col
                                            cols="12"
                                          >
                                             <v-textarea
                                                label="Template"
                                                v-model="messageStructure"
                                                auto-grow
                                                outlined
                                                rows="8"
                                                row-height="15"
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
                                        @click="addDialog = false"
                                      >
                                        Cancel
                                      </v-btn>
                                      <v-btn
                                        color="blue darken-1"
                                        class="ml-2 mr-5"
                                        text
                                        @click="saveTemplate"
                                      >
                                        Save
                                      </v-btn>
                                    </v-card-actions>
                                  </v-card>
                                </v-dialog>

                                <v-dialog
                                  v-model="editDialog"
                                  max-width="600px"
                                >
                                  <v-card>
                                    <v-toolbar>
                                      <v-spacer></v-spacer>
                                      <span class="font-weight-bold">EDIT MESSAGE TEMPLATE</span>
                                      <v-spacer></v-spacer>
                                    </v-toolbar>

                                    <v-card-text>
                                      <v-container>
                                        <v-row>
                                          <v-col
                                            cols="12"
                                          >
                                            <v-text-field
                                              v-model="selectedTemplateOffenseType"
                                              label="Offense Type"
                                              disabled
                                            ></v-text-field>
                                          </v-col>

                                          <v-col
                                            cols="12"
                                          >
                                              <v-textarea
                                                label="Template"
                                                v-model="selectedTemplateStructure"
                                                auto-grow
                                                outlined
                                                rows="8"
                                                row-height="15"
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
                                        @click="cancelEditTemplate()"
                                      >
                                        Cancel
                                      </v-btn>
                                      <v-btn
                                        color="blue darken-1"
                                        class="ml-2 mr-5"
                                        text
                                        @click="editTemplate()"
                                      >
                                        Save
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
                                @click="setEditTemplate(item)"
                              >
                                mdi-pencil
                              </v-icon>
                            </template>
                        </v-data-table>

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

  computed:{
      ...mapGetters(['OFFENSE_ACTIONS','OFFENSE_TYPES','OFFENSES','OFFENSE_TYPE_NAMES','TEMPLATES'])
  },

  data: ()=>({

    //dialogs flags
    addDialog: false,
    editDialog: false,


    offenseTypeNames: [],
    offenseTypes:[],
    offenseTypeName:'',
    messageStructure:'',
    selectedTemplateStructure:'',
    selectedTemplateOffenseType:'',
    selectedTemplateId:'',

    message_structures: [],
    load_structures: true,
    headers:[
      {
          text: 'Offense Type',
          align: 'start',
          sortable: false,
          value: 'offense.name',
        },
        { text: 'Template', value: 'structure' },
        { text: 'Actions', value: 'actions', sortable: false },
    ]
  }),

  methods: {

      //fetch message structures
      async fetchMessageStructures(){

        ApiService.get("/structures").then((response)=>{
        if(response.status == 200){
            this.load_structures = false;
            this.$store.commit('SET_TEMPLATES',response.data.objects)
            this.message_structures = this.TEMPLATES;
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

      //offence types:
      async fetchOffenceTypes(){

          ApiService.get("/offence-types").then((response)=>{

          if(response.status == 200){

              this.offenseTypes = response.data.objects;
              this.$store.commit('SET_OFFENSE_TYPES',response.data.objects)
              const names = response.data.objects.map(({name})=>name)
              this.$store.commit('SET_OFFENSE_TYPE_NAMES',names);
              this.offenseTypeNames = this.OFFENSE_TYPE_NAMES;
            
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

      async saveTemplate(){

        let data = {
          structure: this.selectedTemplateStructure
        };

        this.circularLoader = true;
         ApiService.put("/structures/"+this.selectedTemplateId,data).then((response)=>{

          if(response.status == 200){

              this.offenseTypes = response.data.objects;
              this.$store.commit('SET_OFFENSE_TYPES',response.data.objects)
              const names = response.data.objects.map(({name})=>name)
              this.$store.commit('SET_OFFENSE_TYPE_NAMES',names);
              this.offenseTypeNames = this.OFFENSE_TYPE_NAMES;
            
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

      setEditTemplate(item){
       
        this.selectedTemplateStructure = item.structure;
        this.selectedTemplateId = item.offense.id;

        this.editDialog = true;
      },


      editTemplate(){

        let data = {
          structure: this.selectedTemplateStructure
        };

        this.editDialog = false;
        this.circularLoader = true;

         ApiService.put("/structures/"+this.selectedTemplateId,data).then((response)=>{

          if(response.status == 200){
              this.circularLoader = false;
              this.setAlert("success",true,response.data.message,5000); 
              this.fetchMessageStructures();
          } else {
            this.editDialog = true;
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

      cancelEditTemplate(){

        this.selectedTemplateStructure = "";
        this.selectedTemplateId = "";
      
        this.editDialog = false;
      }
  },


  created(){
    this.fetchMessageStructures();
    this.fetchOffenceTypes();
  }
}
</script>

<style>

</style>
<template>
    <v-container>
        <Snackbar 
            :type="snackbarType" 
            :snackbar="snackbar" 
            :text="snackbarText" 
            :timeout="snackbarTimeout"
        />

        <v-card class="mt-3">
            <v-container fluid>
                <v-row>
                    <v-col>
                        <v-data-table
                            :headers="headers"
                            :items="offense_occurrences"
                            :loading="load_offense_occurrences"
                            :search="search"
                            sort-by="created_at"
                            class="elevation-1 mt-3"
                        >
                        <template v-slot:top>
                            <v-toolbar flat>
                                <v-spacer></v-spacer>
                                <v-text-field
                                    v-model="search"
                                    append-icon="mdi-magnify"
                                    label="Search"
                                    single-line
                                    hide-details
                                ></v-text-field>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                        </template>

                        <template v-slot:[`item.id`]="{ item }">
                            #{{ item.id}}
                        </template>

                        <template v-slot:[`item.actions`]="{ item }">
                                <v-btn 
                                    color="green" 
                                    small 
                                    class="ml-3"
                                    @click="viewOffense(item)"
                                >
                                    <span style="color:white">VIEW</span>
                                </v-btn> 

                                <v-btn 
                                    color="blue" 
                                    small 
                                    class="ml-3"
                                    :disabled="item.resolution != null"
                                    @click="closeOffense(item)"
                                >
                                    <span style="color:white">CLOSE</span>
                                </v-btn> 
                        </template>

                        </v-data-table>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>

        <v-dialog
            v-model="show_offense"
            max-width="620px"    
        >
            <v-card
                outlined
                elevation="4"
                shaped
            >
                <v-card elevation="3" class="my-3 mx-3">
                    <v-card-subtitle 
                        class="text-center font-weight-bold"
                    >
                        OFFENSE
                    </v-card-subtitle>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12">
                                <v-row>
                                    <v-col cols="4"><span class="font-weight-medium">Offense:</span><span class="ml-2">{{offense.name}}</span></v-col>
                                    <v-col cols="4"><span class="font-weight-medium">Type:</span><span class="ml-2">{{offense.type}}</span></v-col>
                                    <v-col cols="4"><span class="font-weight-medium">Action:</span><span class="ml-2">{{offense.action}}</span></v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12"><span class="font-weight-medium">Description:</span><span class="ml-2">{{offense.description}}</span></v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
                <v-card elevation="3" class="my-3 mx-3" v-if="offense.action =='SEND_SMS'">
                    <v-card-subtitle class="text-center font-weight-bold">OFFENSE REACTIONS</v-card-subtitle>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12">
                                <v-row>
                                    <v-col cols="5" offset="1">
                                        <span class="font-weight-medium">Message Sent:</span>
                                        <span class="ml-3">
                                            <v-icon :color="message_sent_icon_color">{{message_sent_icon}}</v-icon>
                                        </span>
                                    </v-col>
                                    <v-col cols="5" offset="1">
                                        <span class="font-weight-medium">Message Response:</span>
                                        <span class="ml-3">
                                            <v-icon :color="message_reply_icon_color">{{message_reply_icon}}</v-icon>
                                        </span>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
                <v-card elevation="3" class="my-3 mx-3">
                    <v-card-subtitle class="text-center font-weight-bold">OFFENSE RESOLUTION</v-card-subtitle>
                    <v-card-text v-if="offense.resolution !=null">
                        <v-row>
                            <v-col cols="12">
                                <v-row>
                                    <v-col cols="6"><span class="font-weight-medium">Action:</span><span class="ml-2">{{offense.resolution.action}}</span></v-col>
                                    <v-col cols="6"><span class="font-weight-medium">Status:</span><span class="ml-2">{{offense.resolution.status}}</span></v-col>
                                </v-row>
                            </v-col>

                            <v-col cols="12" v-if="offense.resolution.description !=null">
                                <span class="font-weight-medium">Description:</span>
                                <span>
                                    {{offense.resolution.description}}
                                </span>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>

                <v-card-actions>

                </v-card-actions>
            </v-card>
        </v-dialog>


        <v-dialog
            v-model="close_dialog"
            max-width="620px"    
        >
            <v-card
                outlined
                elevation="4"
            >
                <v-card-subtitle 
                    class="text-center font-weight-bold"
                >
                    OFFENSE RESOLUTION
                </v-card-subtitle>

                <v-card-text>
                    <v-row>

                        <v-col cols="12">
                            <v-select
                                :items="statuses"
                                label="Status"
                                v-model="resolution_status"
                            ></v-select>
                        </v-col>

                        <v-col cols="12">
                            <v-select
                                :items="actions"
                                label="Action"
                                v-model="resolution_action"
                            ></v-select>
                        </v-col>

                        <v-col cols="12">
                            <v-textarea
                                v-model="resolution_description"
                                label="Description"
                                rows="3"
                            ></v-textarea>
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="close_dialog = false"
                    >
                    Cancel
                    </v-btn>

                    <v-btn
                        color="blue darken-1"
                        class="ml-2 mr-5"
                        text
                        @click="saveOffenseResolution"
                    >
                    Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <CircularLoader :loading="circularLoader"/>
    </v-container>
</template>

<script>
import ApiService from '../../services/api'
import { mapGetters,mapActions } from 'vuex';
import {projectMixin} from '../../mixins/mixins'
import Snackbar from '../../components/Snackbar.vue'
import CircularLoader from '../../components/CircularLoader.vue'


export default {

    components: {Snackbar,CircularLoader},
    
    mixins: [projectMixin],

    data: ()=>({

        offense_occurrences:[],
        load_offense_occurrences: true,
        selected_offense: {},
        close_dialog: false,
        message_sent_icon: "",
        message_sent_icon_color: "",
        message_reply_icon: "",
        message_reply_icon_color:"",
        resolution_action:"",
        resolution_description:"",
        resolution_status: "CLOSED",

        actions: [
            "School dropout",
            "School dismissal",
            "School continuation"
        ],

        statuses:[
            "CLOSED",
            "OPEN"
        ],


        offense: {
            id:"",
            name:"",
            description: "",
            action: "",
            type: "",
            processes: null,
            resolution: null,
        },
       
        show_offense: false,
        search:'',
        headers:[    
            {
                text: 'ID',
                align: 'start',
                sortable: false,
                value: 'id',
            },
            { text: 'NAME', value: 'student.full_name',sortable: false},
            { text: 'GENDER', value: 'student.gender',sortable: false },
            { text: 'LEVEL', value: 'student.student_level',sortable: false},
            { text: 'OFFENSE', value: 'offence.name',sortable: false},
            { text: 'ACTIONS', value: 'actions', sortable: false },
        ],
    }),

    computed: {
      ...mapGetters(['OFFENSE_OCCURRENCES']),
    },

    methods:{
        ...mapActions(['FETCH_OFFENSE_OCCURRENCES']),

        async setOffenseOccurrences(){
            await this.FETCH_OFFENSE_OCCURRENCES();
            this.offense_occurrences = this.OFFENSE_OCCURRENCES;
            this.load_offense_occurrences = false;
        },

        closeOffense(item){
            this.offense.id = item.id;
            this.close_dialog = true;
        },

        saveOffenseResolution(){

            let data = {
                offence_occurance_id: this.offense.id,
                status: this.resolution_status,
                action: this.resolution_action
            }

            this.close_dialog = false;
            this.circularLoader = true;

            ApiService.post('/offence-resolutions/',data).then((response)=>{
                if(response.status == 200){
                    this.circularLoader = false;
                    this.setAlert("success",true,response.data.message,5000);
                    this.setOffenseOccurrences();
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

        viewOffense(item){
            this.offense.name = item.offence.name;
            this.offense.description = item.description;
            this.offense.action = item.offence.offence_type.offence_type_action.action;
            this.offense.type = item.offence.offence_type.name;


            if(item.processes !=null && item.processes.length > 0){

                const status = item.processes[item.processes.length - 1].status;

                if(status == "REPORTED" || status == "NOTIFIED"){

                    this.message_sent_icon = "mdi-check"
                    this.message_sent_icon_color = "green"
                    this.message_reply_icon = "mdi-close"
                    this.message_reply_icon_color = "red"

                } else if(status == "REPLIED" || status == "RESOLVED"){

                    this.message_sent_icon = "mdi-check"
                    this.message_sent_icon_color = "green"
                    this.message_reply_icon = "mdi-check"
                    this.message_reply_icon_color = "green"

                } 

            } else {

                this.message_sent_icon = "mdi-close"
                this.message_sent_icon_color = "red"
                this.message_reply_icon = "mdi-close"
                this.message_reply_icon_color = "red"
            }
                
            this.offense.resolution = item.resolution; 
            
            this.show_offense = true;
        }
    },

    beforeRouteEnter (to, from, next) {

        next(vm=>{  

            if(vm.OFFENSE_OCCURRENCES == null){

                vm.setOffenseOccurrences();

            } else {
                vm.offense_occurrences = vm.OFFENSE_OCCURRENCES;
                vm.load_offense_occurrences = false;
            }

        });
    }

}
</script>

<style>

</style>
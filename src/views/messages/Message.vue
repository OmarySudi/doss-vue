<template>
    <v-container>
        <v-card class="mt-3">
            <v-tabs
                color="blue accent-4"
            >
                
                <v-tab>SENT</v-tab>
                <v-tab-item>
                    <v-container fluid>
                        <v-row>
                            <v-col>
                                <v-data-table
                                    :headers="headers"
                                    :items="outbound_messages"
                                    :loading="load_outbound_messages"
                                    sort-by="created_at"
                                    class="elevation-1 mt-3"
                                >
                                <template v-slot:[`item.datetime`]="{ item }">
                                    {{ item.datetime.substring(0,10)}}
                                </template>

                                </v-data-table>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-tab-item>

                <v-tab>RECEIVED</v-tab>
                <v-tab-item>
                    <v-container fluid>
                        <v-row>
                            <v-col>
                                <v-data-table
                                    :headers="headers"
                                    :items="inbound_messages"
                                    :loading="load_inbound_messages"
                                    sort-by="created_at"
                                    class="elevation-1 mt-3"
                                >
                                <template v-slot:[`item.datetime`]="{ item }">
                                    {{ item.datetime.substring(0,10)}}
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
import { mapActions,mapGetters } from 'vuex'

export default {
    
    computed: {
      ...mapGetters(['OUTBOUND_MESSAGES','INBOUND_MESSAGES']),
    },

     data: ()=>({
        
        load_outbound_messages: true,
        load_inbound_messages: true,
        outbound_messages: [],
        inbound_messages: [],
        headers:[
            {
            text: 'Message',
            align: 'start',
            sortable: false,
            value: 'message',
            },
            { text: 'From', value: 'from' },
            { text: 'To', value: 'to'},
            { text: 'Date', value: 'datetime'},
        ]
    }),
    

    methods: {
        ...mapActions(['FETCH_OUTBOUND_MESSAGES','FETCH_INBOUND_MESSAGES']),

        async setOutBoundMessages(){
            await this.FETCH_OUTBOUND_MESSAGES();
            this.outbound_messages = this.OUTBOUND_MESSAGES;
            this.load_outbound_messages = false;
        },

        async setInBoundMessages(){
            await this.FETCH_INBOUND_MESSAGES();
            this.inbound_messages = this.INBOUND_MESSAGES;
            this.load_inbound_messages = false;
        }
    },

    beforeRouteEnter (to, from, next) {

      next(vm=>{  

        if(vm.OUTBOUND_MESSAGES == null){

            vm.setOutBoundMessages();

        } else {
            vm.outbound_messages = vm.OUTBOUND_MESSAGES;
            vm.load_outbound_messages = false;
        }

        if(vm.INBOUND_MESSAGES == null){
           vm.setInBoundMessages();
        } else {
            vm.inbound_messages = vm.INBOUND_MESSAGES;
            vm.load_inbound_messages = false;
        }
      });
    }

}
</script>

<style>

</style>
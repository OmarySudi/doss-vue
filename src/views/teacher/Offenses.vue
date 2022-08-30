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
                                    :items="offense_occurrences"
                                    :loading="load_offense_occurrences"
                                    sort-by="created_at"
                                    class="elevation-1 mt-3"
                                >
                                <!-- <template v-slot:[`item.datetime`]="{ item }">
                                    {{ item.datetime.substring(0,10)}}
                                </template> -->

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
import { mapGetters,mapActions } from 'vuex';

export default {
    data: ()=>({

        offense_occurrences:[],
        load_offense_occurrences: true,
        headers:[],
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
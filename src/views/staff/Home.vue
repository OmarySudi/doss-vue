<template>
  <v-container>
      <v-row class="mt-2">
        <v-col cols="12" md="4">
          <v-row>

          </v-row>
        </v-col>

        <v-col cols="6" md="4">
          <v-row>

          </v-row>
        </v-col>

        <v-col cols="6" md="4">
          <v-row justify="end">
            <v-btn color="secondary" to="/staffs/create">
              ADD
            </v-btn>
          </v-row>
        </v-col>

      </v-row>

      <v-data-iterator
        class="mt-3"
        v-if="ready"
        :items="LOAD_STAFFS"
        :items-per-page.sync="itemsPerPage"
        item-key="_id"
        :page="page"
        :search="search"
        :sort-by="sortBy.toLowerCase()"
        :sort-desc="sortDesc"
        hide-default-footer
      >
        <template v-slot:default="{ items }">
            <v-row>
              <v-col
                v-for="item in items"
                :key="item._id"
                cols="12"
                sm="6"
                md="4"
                lg="3"
              >
                <v-hover>
                  <template v-slot="{ hover}">
                    <v-card
                      width="200px"
                      :elevation="hover? 10:3"
                      @click.prevent="redirectToStaff(item._id)"
                    >
                      <v-img v-if="item.profilePhoto"

                        class="white--text align-end"
                        height="160px"
                        :src="item.profilePhoto"
                        fill
                        position="top left"
                      />

                        <v-img v-else
                        class="white--text align-end"
                        height="160px"
                        src="../../assets/no-profile.png"
                        fill
                        position="top left"
                      />

                      <span style="display:flex; justify-content:center" class="mt-1 body-2 font-weight-medium">{{ item.fullName}}</span>
                      <span style="display:flex; justify-content:center" class="body-2 font-weight-medium">{{ item.jobTitle }}</span>

                    </v-card>
                  </template>
                </v-hover>
              </v-col>
            </v-row>
        </template>

      </v-data-iterator>
  </v-container>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
import ApiService from '../../services/api'

export default {

  name: 'StaffsHome',

  data: ()=>({

    //details
    itemsPerPageArray: [4, 8, 12],
    search: '',
    filter: {},
    sortDesc: false,
    page: 1,
    itemsPerPage: 8,
    sortBy: 'fullName',

    STAFFS: [],
    ready: false,
  }),

  computed: {
    ...mapGetters(['LOAD_STAFFS']),
  },

  //   beforeRouteEnter(to, from, next){

  //       next(vm=>{

  //             ApiService.get('staffs').then((response)=>{

  //               vm.LOAD_STAFFS = response.data.body;
  //               console.log(vm.LOAD_STAFFS)
  //               vm.ready = true;
  //           }).catch((error)=>{
  //               console.log(error);
  //           });
  //   });

  // },

  methods: {
    ...mapActions(['GET_STAFFS']),

    async fetchStaffs(){

      await ApiService.get('staffs').then((response)=>{

        this.STAFFS = response.data.body;
        this.$store.commit('SET_STAFFS',this.STAFFS)
        this.ready = true;

      }).catch((error)=>{
                console.log(error);
      });
    },

    redirectToStaff(staffId){

        this.$router.push({name: 'Staff', params: {id: staffId}})
    }

  },

  created(){
    this.fetchStaffs();
  },

}
</script>

<style>

</style>
<template>
  <v-container>
      <v-row class="mt-2">
        <v-col cols="12" md="4">
          <v-row>

          </v-row>
        </v-col>

        <v-col cols="6" md="4">
          
          <v-row>
              <v-toolbar
              rounded
              shape
              dense
              floating
              height="40"
              width="300"
              >
                <v-text-field
                  v-model="search"
                  class="inputtext"
                  color="primary" 
                  clearable
                  flat
                  hide-details
                  prepend-inner-icon="mdi-magnify"
                  label="Search"
                />
              </v-toolbar>
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

        <template v-slot:footer>
          <v-row class="mt-2" align="center" justify="center">
            <span class="grey--text">Items per page</span>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  dark
                  text
                  color="primary"
                  class="ml-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  {{ itemsPerPage }}
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(number, index) in itemsPerPageArray"
                  :key="index"
                  @click="updateItemsPerPage(number)"
                >
                  <v-list-item-title>{{ number }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <v-spacer></v-spacer>

            <span
              class="mr-4
              grey--text"
            >
              Page {{ page }} of {{ numberOfPages }}
            </span>
            <v-btn
              fab
              dark
              small
              color="primary"
              class="mr-1"
              @click="formerPage"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn
              fab
              dark
              small
              color="primary"
              class="ml-1"
              @click="nextPage"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
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
    itemsPerPageArray: [2,4, 8, 12],
    search: '',
    filter: {},
    sortDesc: false,
    page: 1,
    itemsPerPage: 8,
    sortBy: 'fullName',

    STAFFS: [],
    ready: false,
    keys: ["TANZANIA","GHANA"]
  }),

  computed: {
    ...mapGetters(['LOAD_STAFFS']),

     numberOfPages () {
          return Math.ceil(this.LOAD_STAFFS.length / this.itemsPerPage)
      },
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

    nextPage () {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage () {
      if (this.page - 1 >= 1) this.page -= 1
    },
    updateItemsPerPage (number) {
      this.itemsPerPage = number
    },

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
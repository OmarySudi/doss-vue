<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="schools"
      :loading="loadData"
      :search="search"
      sort-by="created_at"
      class="elevation-1 mt-3"
    >

      <template v-slot:top>
        <v-toolbar
          flat
        >
          <span class="font-weight-bold">SCHOOLS</span>
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
                <span class="font-weight-bold">ADD SCHOOL</span>
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
                        v-model="user.name"
                        label="School Name"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="user.email"
                        label="Code"
                      ></v-text-field>
                    </v-col>
                         <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                       <v-select
                        :items="regions"
                        label="Region"
                        v-model="user.phone_number"
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
                        :items="districts"
                        label="District"
                        v-model="user.phone_number"
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
                        :items="wards"
                        label="Ward"
                        v-model="user.phone_number"
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
  </v-container>
</template>

<script>

import ApiService from '../../services/api'

export default {
   name: 'Users',

    data: () => ({
  
      schools: [],
      loadData: true,
      search: '',
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Code', value: 'code' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],

      dialog: false,
      dialogDelete: false,

      user: {
        name: '',
        email: '',
        user_type: '',
        phone_number: '',
      },

      regions: [
        "DAR-ES-SALAAM"
      ],

      districts: [
        "TEMEKE",
        "KINONDONI",
        "ILALA",
        "UBUNGO",
        "KIGAMBONI"
      ],

      wards: [
        "MIBURANI"
      ]

    }),

    methods: {
      async fetchSchools(){
        ApiService.get("/schools").then((response)=>{

          if(response.status == 200){
            this.loadData = false;
            this.schools = response.data.objects;
          } else {

          }
        }).catch(()=>{

        })
      },

      deleteItem(){
        console.log("deleting a user")
      },

      deleteItemConfirm(){
        console.log("confirm delete")
      },

      closeDelete(){
        console.log("close delete")
      },

      close(){
        console.log("close")
        this.dialog = false;
      },

      save(){
        console.log("save")
      }
    },

    beforeRouteEnter (to, from, next) {

      // ...
      next(vm=>{  
        vm.fetchSchools();
        vm.loadData = false;
      });

    }

}

</script>

<style scoped>

</style>
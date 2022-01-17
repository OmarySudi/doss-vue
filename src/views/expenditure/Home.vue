<template>
  <v-container>
      
      <Snackbar 
            :type="snackbarType" 
            :snackbar="snackbar" 
            :text="snackbarText" 
            :timeout="snackbarTimeout"
      />

      <div class="text-center">
        <v-dialog
          v-model="delete_dialog"
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
                @click="delete_dialog = false"
              >
                NO
              </v-btn>
              <v-btn
                color="primary"
                text
                @click="deleteItem()"
              >
                YES
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>

      <div class="text-center">

        <v-dialog
          v-model="viewDialog"
          width="400"
          persistent
        >
    
          <v-card>
            <p class="body-1 text-center font-weight-regular mb-2 secondary white--text">EXPENDITURE</p>
            <v-card-text>

              <v-row>
                <v-col cols="4">
                  Type
                </v-col>
                <v-col cols="8">
                    {{ viewedItem.expenditureType}}
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="4">
                  Category
                </v-col>
                <v-col cols="8">
                    {{ viewedItem.category }}
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="4">
                  Country
                </v-col>
                <v-col cols="8">
                    {{ viewedItem.country }}
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="4">
                  Amount
                </v-col>
                <v-col cols="8">
                    {{viewedItem.currency}} {{ viewedItem.amount}}
                </v-col>
              </v-row>

              <v-row v-if="viewedItem.staffId">
                <v-col cols="4">
                  ExpendedTo
                </v-col>
                <v-col cols="8">
                    {{ viewItemStaffName }}
                </v-col>
              </v-row>

              <v-row v-if="viewedItem.description">
                <v-col cols="4">
                  Description
                </v-col>
                <v-col cols="8">
                    {{ viewedItem.description }}
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                class="mr-3"
                color="primary"
                text
                @click="viewDialog = false"
              >
                CANCEL
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      
        <v-dialog
          v-model="createExpenditureDialog"
          width="400"
          persistent
        >
          <v-card>
            <p class="body-1 text-center font-weight-regular mb-2 secondary white--text">EXPENDITURE</p>
            
            <v-card-text>
             <v-row class="mt-1">
               <v-col cols="12">
                 <v-hover>
                  <template v-slot="{hover}">
                    <v-card 
                      color="transparent" 
                      height="40" 
                      class="ml-2 mr-2 mb-5"
                      :elevation="hover? 6 : 0"
                    >
                        <v-select
                          v-model="expenditureType"
                          :items="expenditureTypes"
                          chips
                          label="Type"
                          class="inputtext"
                          color="primary"
                          menu-props="auto"
                          dense
                          outlined
                          small-chips
                          :error-messages="expenditureTypeErrors"
                          @input="$v.expenditureType.$touch()"
                          @blur="$v.expenditureType.$touch()"
                         >
                        </v-select> 
                    </v-card>
                  </template>
                 </v-hover>

                  <v-hover>
                  <template v-slot="{hover}">
                    <v-card 
                      color="transparent" 
                      height="40" 
                      class="ml-2 mr-2 mb-5"
                      :elevation="hover? 6 : 0"
                    >
                        <v-select
                          v-model="category"
                          :items="GET_CATEGORIES"
                          chips
                          label="Category"
                          class="inputtext"
                          color="primary"
                          menu-props="auto"
                          dense
                          outlined
                          small-chips
                          :error-messages="categoryErrors"
                          @input="$v.category.$touch()"
                          @blur="$v.category.$touch()"
                         >
                        </v-select> 
                      </v-card>
                    </template>
                  </v-hover>

                  <v-hover>
                    <template v-slot="{hover}">
                      <v-card 
                        color="transparent" 
                        height="40" 
                        class="ml-2 mr-2 mb-5"
                        :elevation="hover? 6 : 0"
                      >
                        <v-select
                          v-model="country"
                          :items="countries"
                          chips
                          label="Country"
                          class="inputtext"
                          color="primary"
                          menu-props="auto"
                          dense
                          outlined
                          small-chips
                          :error-messages="countryErrors"
                          @input="$v.country.$touch()"
                          @blur="$v.country.$touch()"
                         >
                        </v-select> 
                      </v-card>
                    </template>
                  </v-hover>

                  <v-hover>
                    <template v-slot="{hover}">
                      <v-card 
                        color="transparent" 
                        height="50" 
                        class="ml-2 mr-2 mb-5 pd-0"
                        :elevation="hover? 6 : 0"
                      >
                        <v-row>
                          <v-col cols="5">
                            <v-select
                              v-model="currency"
                              :items="GET_CURRENCIES"
                              chips
                              label="Currency"
                              class="inputtext"
                              color="primary"
                              menu-props="auto"
                              dense
                              outlined
                              small-chips
                              :error-messages="currencyErrors"
                              @input="$v.currency.$touch()"
                              @blur="$v.currency.$touch()"
                            >
                            </v-select> 
                          </v-col>

                          <v-col cols="7">
                             <v-text-field 
                                v-model="amount"
                                outlined
                                class="inputtext" 
                                color="primary" 
                                type="text"
                                label="Amount"
                                background-color="transparent"
                                dense
                                :error-messages="amountErrors"
                                @input="$v.amount.$touch()"
                                @blur="$v.amount.$touch()"
                            > 
                            </v-text-field>
                          </v-col>
                        </v-row>
                      </v-card>
                    </template>
                  </v-hover>

                  
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="date"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="date"
                        label="Date"
                        class="mt-1 inputtext" 
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        :error-messages="dateErrors"
                        @input="$v.date.$touch()"
                        @blur="$v.date.$touch()"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="date"
                      no-title
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="primary"
                        @click="menu = false"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(date)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>

                  <v-hover>
                    <template v-slot="{hover}">
                      <v-card 
                        color="transparent" 
                        height="40" 
                        class="ml-2 mr-2 mb-5"
                        :elevation="hover? 6 : 0"
                      >
                        <v-select
                          v-model="staffName"
                          :items="staffs"
                          chips
                          class="inputtext"
                          color="primary"
                          menu-props="auto"
                          dense
                          outlined
                          small-chips
                          @change="setStaffId(staffName)"
                         >
                          <template #label>
                            Staff<span class="red--text">  (optional)</span>
                          </template>
                        </v-select> 
                      </v-card>
                    </template>
                  </v-hover>

                   <v-hover>
                    <template v-slot="{hover}">
                        <v-textarea
                            v-model="description"
                            label="write a short note"
                            class="mb-0 mt-1 inputtext"
                            color="primary"
                            auto-grow
                            outlined
                            rows="2"
                            row-height="20"
                            :elevation="hover ? 6 : 0"
                          >
                          <template #label>
                            Description <span class="red--text">  (optional)</span>
                          </template>
                        </v-textarea>
                    </template>
                  </v-hover>
                </v-col>
              </v-row>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                class="mr-3"
                color="primary"
                text
                @click="createExpenditureDialog = false"
              >
                CANCEL
              </v-btn>

              <v-btn
                color="primary"
                text
                @click="createExpenditure"
              >
                SAVE
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>





        <v-dialog
          v-model="editExpenditureDialog"
          width="400"
          persistent
        >
          <v-card>
            <p class="body-1 text-center font-weight-regular mb-2 secondary white--text"> EDIT EXPENDITURE</p>
            
            <v-card-text>
             <v-row class="mt-1">
               <v-col cols="12">
                 <v-hover>
                  <template v-slot="{hover}">
                    <v-card 
                      color="transparent" 
                      height="40" 
                      class="ml-2 mr-2 mb-5"
                      :elevation="hover? 6 : 0"
                    >
                        <v-select
                          v-model="editedItem.expenditureType"
                          :items="expenditureTypes"
                          chips
                          label="Type"
                          class="inputtext"
                          color="primary"
                          menu-props="auto"
                          dense
                          outlined
                          small-chips
                         >
                        </v-select> 
                    </v-card>
                  </template>
                 </v-hover>

                  <v-hover>
                  <template v-slot="{hover}">
                    <v-card 
                      color="transparent" 
                      height="40" 
                      class="ml-2 mr-2 mb-5"
                      :elevation="hover? 6 : 0"
                    >
                        <v-select
                          v-model="editedItem.category"
                          :items="GET_CATEGORIES"
                          chips
                          label="Category"
                          class="inputtext"
                          color="primary"
                          menu-props="auto"
                          dense
                          outlined
                          small-chips
                         >
                        </v-select> 
                      </v-card>
                    </template>
                  </v-hover>

                  <v-hover>
                    <template v-slot="{hover}">
                      <v-card 
                        color="transparent" 
                        height="40" 
                        class="ml-2 mr-2 mb-5"
                        :elevation="hover? 6 : 0"
                      >
                        <v-select
                          v-model="editedItem.country"
                          :items="countries"
                          chips
                          label="Country"
                          class="inputtext"
                          color="primary"
                          menu-props="auto"
                          dense
                          outlined
                          small-chips
                         >
                        </v-select> 
                      </v-card>
                    </template>
                  </v-hover>
                  
                  <v-hover>
                    <template v-slot="{hover}">
                      <v-card 
                        color="transparent" 
                        height="50" 
                        class="ml-2 mr-2 mb-5 pd-0"
                        :elevation="hover? 6 : 0"
                      >
                        <v-row>
                          <v-col cols="5">
                            <v-select
                              v-model="editedItem.currency"
                              :items="GET_CURRENCIES"
                              chips
                              label="Currency"
                              class="inputtext"
                              color="primary"
                              menu-props="auto"
                              dense
                              outlined
                              small-chips
                              :error-messages="currencyErrors"
                              @input="$v.currency.$touch()"
                              @blur="$v.currency.$touch()"
                            >
                            </v-select> 
                          </v-col>

                          <v-col cols="7">
                             <v-text-field 
                                v-model="editedItem.amount"
                                outlined
                                class="inputtext" 
                                color="primary" 
                                type="text"
                                label="Amount"
                                background-color="transparent"
                                dense
                                :error-messages="amountErrors"
                                @input="$v.amount.$touch()"
                                @blur="$v.amount.$touch()"
                            > 
                            </v-text-field>
                          </v-col>
                        </v-row>
                      </v-card>
                    </template>
                  </v-hover>

                  
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="editedItem.date"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="editedItem.date"
                        label="Date"
                        class="mt-1 inputtext" 
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="editedItem.date"
                      no-title
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="primary"
                        @click="menu = false"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(editedItem.date)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>

                  <v-hover>
                    <template v-slot="{hover}">
                      <v-card 
                        color="transparent" 
                        height="40" 
                        class="ml-2 mr-2 mb-5"
                        :elevation="hover? 6 : 0"
                      >
                        <v-select
                          v-model="editedStaffName"
                          :items="staffs"
                          chips
                          class="inputtext"
                          color="primary"
                          menu-props="auto"
                          dense
                          outlined
                          small-chips
                          @change="setEditedStaffId(editedStaffName)"
                         >
                          <template #label>
                            Staff<span class="red--text">  (optional)</span>
                          </template>
                        </v-select> 
                      </v-card>
                    </template>
                  </v-hover>

                   <v-hover>
                    <template v-slot="{hover}">
                        <v-textarea
                            v-model="editedItem.description"
                            label="write a short note"
                            class="mb-0 mt-1 inputtext"
                            color="primary"
                            auto-grow
                            outlined
                            rows="2"
                            row-height="20"
                            :elevation="hover ? 6 : 0"
                          >
                          <template #label>
                            Description <span class="red--text">  (optional)</span>
                          </template>
                        </v-textarea>
                    </template>
                  </v-hover>
                </v-col>
              </v-row>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                class="mr-3"
                color="primary"
                text
                @click="editExpenditureDialog = false"
              >
                CANCEL
              </v-btn>

              <v-btn
                color="primary"
                text
                @click="editExpenditure()"
              >
                SAVE
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>

      <v-row class="mt-1 mb-3" justify="end">
        <v-card height="30" class="pl-5">
          <v-row class="mt-1">
            <v-select
              class="mr-2 subtitle-2 font-weight-regular"
              :items="years"
              dense
              label="Year"
              v-model="selectedYear"
              @change="filterExpenditures(selectedCurrency,selectedCategory,selectedType)"
              >
            </v-select>
          
            <v-select
              class="mr-2 subtitle-2 font-weight-regular"
              :items="getMonths"
              dense
              label="Month"
              v-model="selectedMonth"
              @change="filterExpenditures(selectedCurrency,selectedCategory,selectedType)"
              >
            </v-select>
          </v-row>
        </v-card>
      </v-row>

      <v-row class="mt-3">
        <v-col cols="12">
            <v-row>
              <v-col  cols="6" sm="6" md="3">
                  <v-card height="30" class="pl-5">
                     <v-select
                      :items="countries"
                      class="subtitle-2 font-weight-regular"
                      dense
                      label="Country"
                      v-model="selectedCountry"
                      @change="countryFilter(selectedCountry)"
                     >
                     </v-select>
                  </v-card>
              </v-col>

              <v-col  cols="6" sm="6" md="3">
                  <v-card height="30" class="pl-5">
                     <v-select
                      :items="GET_CURRENCIES"
                      class="subtitle-2 font-weight-regular"
                      dense
                      clearable
                      label="Currency"
                      v-model="selectedCurrency"
                      @change="filterExpenditures(selectedCurrency,selectedCategory,selectedType)"
                     >
                     </v-select>
                  </v-card>
              </v-col>

              <v-col  cols="6" sm="6" md="3">
                <v-card height="30" class="pl-5">
                     <v-select
                      :items="GET_CATEGORIES"
                      class="subtitle-2 font-weight-regular"
                      dense
                      clearable
                      label="Category"
                      v-model="selectedCategory"
                      @change="filterExpenditures(selectedCurrency,selectedCategory,selectedType)"
                     >
                      
                     </v-select>
                  </v-card>
              </v-col>

              <v-col cols="6" sm="6" md="3">
                <v-card height="30" class="pl-5">
                     <v-select
                      :items="expenditureTypes"
                      class="subtitle-2 font-weight-regular"
                      dense
                      clearable
                      label="Type"
                      v-model="selectedType"
                      @change="filterExpenditures(selectedCurrency,selectedCategory,selectedType)"
                     >
                     </v-select>
                  </v-card>
              </v-col>
            </v-row>
        </v-col>
      </v-row>

      <v-row dense class="pt-4">
        <v-col cols="12" md="4" lg="3">
          <v-card>
            <!-- <p class="body-1 text-center font-weight-regular mb-2 primary white--text">SUMMARY</p>
            <p class="body-1 text-center font-weight-regular mb-2 primary white--text">SUMMARY</p> -->
            <v-card class="primary pl-1" height="130">
              <p class="body-1 text-center font-weight-regular mb-10 white--text">SUMMARY</p> 
              <p class="font-weight-regular mb-2 white--text" style="font-size:0.85em">COUNTRY: {{displayedCountry}}</p> 
              <p class="font-weight-regular mb-4 white--text" style="font-size:0.85em">CURRENCY: {{ displayedCurrency}}</p> 
            </v-card>
          
            <v-simple-table>
            <template v-slot:default>
              <thead>
                <!-- <tr>
                  <th class="text-left font-weight-800">
                    Type
                  </th>
                  <th class="text-left font-weight-800">
                    Amount
                  </th>
                </tr> -->
              </thead>
              <tbody>
                <tr
                >
                  <td style="background:#dcdfe3;font-weight:bold">Cash In</td>
                  <td style="background:#dcdfe3;font-weight:bold">{{ GET_TOTAL_CASH_IN }}</td>
                </tr>
                
                <tr v-for="(item,index) in getCashInKeys" :key="index">
                  <td>{{item}}</td><td>{{GET_CASHIN_EXPENDITURE_MAP.get(item)}}</td>
                </tr>

                <tr
                >
                  <td style="background:#dcdfe3;font-weight:bold">Cash Out</td>
                  <td style="background:#dcdfe3;font-weight:bold">{{ GET_TOTAL_CASH_OUT }}</td>
                </tr>

                <tr v-for="(item,index) in getCashOutKeys" :key="index">
                  <td>{{item}}</td><td>{{GET_CASHOUT_EXPENDITURE_MAP.get(item)}}</td>
                </tr>
              
                 <tr
                >
                  <th class="text-left body-2 font-weight-bold">PROFIT</th>
                  <th class="text-left body-2 font-weight-bold">{{ getTotal}}</th>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          </v-card>
        </v-col>

        <v-col cols="12" md="8" lg="9">
          <v-data-table
            :headers="headers"
            :items="expenditures"
            sort-by="date"
            dense
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar
                color="primary"
                flat
              >

                  <v-spacer></v-spacer>
                  <v-btn
                    small
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                    @click="showCreateDialog()"
                    v-if="getUserRole == 'operator'"
                  >
                    ADD
                  </v-btn>
              </v-toolbar>
            </template>

            <template v-slot:[`item.date`]="{ item }">
                {{ item.date.substr(0,7) }}
            </template>

            <template v-slot:[`item.amount`]="{ item }">
                {{item.currency}} {{ item.amount}}
            </template>

            <template v-slot:[`item.actions`] ="{ item }">
                <v-icon
                  small
                  class="mr-2"
                  @click="showEditDialog(item)"
                  v-if="getUserRole == 'operator'"
                >
                  mdi-pencil
                </v-icon>
                <v-icon
                  small
                  @click="showDeleteDialog(item)"
                  v-if="getUserRole == 'operator'"
                >
                  mdi-delete
                </v-icon>

                <v-btn x-small color="primary" class="ml-2" @click="viewItem(item)">
                  view
                </v-btn>
            </template>
          </v-data-table>
        </v-col>

          
      </v-row>
    <LinearLoader :loading="LinearLoading"/>
  </v-container>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import { required,numeric} from 'vuelidate/lib/validators'

import ApiService from '../../services/api'
import Snackbar from '../../components/Snackbar.vue'
import {projectMixin} from '../../mixins/mixins'
import LinearLoader from '../../components/LinearLoader.vue'
import {userService} from '../../services/storage'



export default {

  mixins: [projectMixin],
  components: {Snackbar,LinearLoader},
  data:()=>({
    
    countries:[],
    expenditureTypes: [ "Cash In","Cash Out"],
    createExpenditureDialog: false,
    viewDialog: false,
    delete_dialog: false,
    editExpenditureDialog: false,

    expenditureType: 'Cash Out',
    category:'',
    currency: '',
    country:'',
    amount:'',
    staffName:'',
    description:'',
    staffId:'',
    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    menu: false,

    staffs: [],
    expenditures: [],
    totalCashIn:'',
    totalCashOut: '',

    editedItem: {},
    viewedItem:{},
    viewItemStaffName: '',
    deletedItem: {},
    editedStaffName: '',
    displayedCountry:'',
    displayedCurrency: '',

    cashOutExpenditures: {},
    cashOutExpenditureKeys: [],

    headers:[

      {
        text: 'Type',
        align: 'start',
        sortable: false,
        value: 'expenditureType',
      },
      { text: 'Category', value: 'category' },
      { text: 'RegisteredBy', value: 'registeredBy' },
      { text: 'Amount', value: 'amount' },
      { text: 'Date', value: 'date'},
      { text: 'Actions', value: 'actions', sortable: false },
    ],

    formTitle:"Expenditures",

    filters:[
      
    ],

    selectedCountry:'',
    selectedCategory:null,
    selectedType:null,
    selectedCurrency: null,

    selectedMonth: 'All',
    selectedYear: 'All',

    selection: {

      'COUNTRY': false,
      'TYPE': false,
      'CATEGORY': false,
    },

    months: {

        "JANUARY": "01",
        "FEBRUARY": "02",
        "MARCH": "03",
        "APRIL": "04",
        "MAY": "05",
        "JUNE": "06",
        "JULY": "07",
        "AUGUST": "08",
        "SEPTEMBER": "09",
        "OCTOBER": "10",
        "NOVEMBER": "11",
        "DECEMBER": "12"
    },

    years:[],

  }), 

  validations: {

    expenditureType: { required},
    category: {required},
    amount: { required,numeric},
    currency: {required},
    country: {required},
    date: {required}
  },

  computed: {

    ...mapGetters([
        'GET_COUNTRIES',
        'GET_CATEGORIES',
        'GET_CURRENCIES',
        'LOAD_STAFFS',
        'LOAD_STAFFS_NAMES',
        'LOAD_EXPENDITURES',
        'GET_TOTAL_CASH_IN',
        'GET_TOTAL_CASH_OUT',
        'GET_CASHOUT_EXPENDITURE_MAP',
        'GET_CASHIN_EXPENDITURE_MAP'
        ]),


      getTotal(){
        return this.GET_TOTAL_CASH_IN - this.GET_TOTAL_CASH_OUT
      },

      getCashOutKeys(){
        return Array.from(this.GET_CASHOUT_EXPENDITURE_MAP.keys())
      },

      getMonths(){
        let months = Object.keys(this.months);
        months.unshift('All')
        return months;
      },

      getCashInKeys(){
        return Array.from(this.GET_CASHIN_EXPENDITURE_MAP.keys())
      },

      getUserRole(){
        return userService.getUserRole();
      },

      expenditureTypeErrors(){

          const errors = []
          if (!this.$v.expenditureType.$dirty) return errors
          !this.$v.expenditureType.required && errors.push('Type is required')
          return errors
      },

      currencyErrors(){
        const errors = []
        if (!this.$v.currency.$dirty) return errors
        !this.$v.currency.required && errors.push('Currency required')
        return errors
      },

      categoryErrors(){

          const errors = []
          if (!this.$v.category.$dirty) return errors
          !this.$v.category.required && errors.push('Category is required')
          return errors
      },

      countryErrors(){

          const errors = []
          if (!this.$v.country.$dirty) return errors
          !this.$v.country.required && errors.push('Country is required')
          return errors
      },

      dateErrors(){

          const errors = []
          if (!this.$v.date.$dirty) return errors
          !this.$v.date.required && errors.push('Date is required')
          return errors
      },

      amountErrors(){

          const errors = []
          if (!this.$v.amount.$dirty) return errors
          !this.$v.amount.required && errors.push('Amount is required')
          !this.$v.amount.numeric && errors.push('Accepts numbers only')
          return errors
      },
  },

  created(){

    this.countries = Object.keys(this.GET_COUNTRIES)
    this.displayedCountry = userService.getUserCountry();
    this.country = userService.getUserCountry();
    this.currency = userService.getUserCurrency();
    this.displayedCurrency = userService.getUserCurrency();

  },
  
  methods:{

    ...mapActions([
      'SET_STAFFS',
      'FETCH_EXPENDITURES',
      'DELETE_EXPENDITURE',
      'SET_TOTAL_CASH_IN',
      'SET_TOTAL_CASH_OUT'
      ]),

    // setCurrency(country){
    //   console.log(country)
    //   this.currency = this.GET_COUNTRIES[country]
    // },

    // setEditedCurrency(country){
    //   this.editedItem.currency = this.GET_COUNTRIES[country];
    // },

    viewItem(item){

      if(item.staffId){
          this.viewItemStaffName = this.LOAD_STAFFS.find((staff)=>staff._id == item.staffId).fullName
      } 
      this.viewedItem = item;
      this.viewDialog = true;

    },

    showDeleteDialog(item){

      this.deletedItem = item;
      this.delete_dialog = true;

    },

    setSelection(selection,value){
        console.log("selection: "+selection+" value: "+value)
        this.selection[selection] = value;
    },

    async showEditDialog(item){

      this.editedItem = item;

      if(item.staffId){
          //this.editIviewItemStaffName = this.LOAD_STAFFS.find((staff)=>staff._id == item.staffId).fullName
          this.editedStaffName = this.LOAD_STAFFS.find((staff)=>staff._id == item.staffId).fullName
      } 

      this.editExpenditureDialog = true;
    },

    async deleteItem(){

      this.LinearLoading = true;
     
      await ApiService.delete('expenditures/'+this.deletedItem._id).then((response)=>{

        this.LinearLoading = false;

        if(this.deletedItem.country == userService.getUserCountry() && 
          this.deletedItem.currency == userService.getUserCurrency()) {

          this.$store.commit('REMOVE_EXPENDITURE',this.deletedItem._id);
          console.log("expenditures---------")
          console.log(this.LOAD_EXPENDITURES)

          if(this.deletedItem.expenditureType == "Cash In"){

            //this.$store.commit('SUBTRACT_TOTAL_CASH_IN',this.deletedItem.amount)

            let data = {
              expenditures: this.LOAD_EXPENDITURES,
              currency: userService.getUserCurrency()
            }

            this.$store.commit('SET_TOTAL_CASH_IN',data)

          } else {
            
            //this.$store.commit('SUBTRACT_TOTAL_CASH_OUT',this.deletedItem.amount)

            let data = {
              expenditures: this.LOAD_EXPENDITURES,
              currency: userService.getUserCurrency()
            }

            this.$store.commit('SET_TOTAL_CASH_OUT',data)
          }
        }

        this.fetchExpenditures(userService.getUserCountry());
        this.delete_dialog = false;
        this.displayAlert("success",response.data.message,4000);

      }).catch((error)=>{

        console.log("error"+error)
         this.LinearLoading = false;
      })
    },

    printDate(date){
      return date.substr(0,10);
    },

    showCreateDialog(){
      this.resettingForm();
      this.createExpenditureDialog = true;
    },

    generateYears(){

      let min = 2020
      let max = new Date().getFullYear();
     
      for (let i = min; i<=max; i++){
        this.years.push(i)
      }

      this.years.unshift('All')
    },

    resettingForm(){
      this.expenditureType = 'Cash Out'
      this.category = ''
      this.currency =  ''
      this.country = ''
      this.amount = ''
      this.staffName = ''
      this.description = ''
      this.staffId = ''
      this.date = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
      this.menu = false
    },

    async fetchStaffs(){

      await ApiService.get('staffs').then((response)=>{
        this.$store.commit('SET_STAFFS',response.data.body)
        this.staffs = this.LOAD_STAFFS_NAMES;
      }).catch((error)=>{
          console.log(error);
      });
    },

    async fetchExpenditures(country){
      await ApiService.get('expenditures?country='+country).then((response)=>{
        this.$store.commit('SET_EXPENDITURES',response.data.body)
        this.expenditures = this.LOAD_EXPENDITURES;
      }).catch((error)=>{
          console.log(error);
      });
    },

    setStaffId(staffName){
      let staff = this.LOAD_STAFFS.find((staff)=> staff.fullName == staffName)
      this.staffId = staff._id;
    },

    setEditedStaffId(editedStaffName){

      let staff = this.LOAD_STAFFS.find((staff)=> staff.fullName == editedStaffName)
      this.editedItem.staffId = staff._id;
    },

    async countryFilter(country){

      this.displayedCountry = country

      let fetchData = {
        country: country,
        currency: userService.getUserCurrency()
      }

      await this.FETCH_EXPENDITURES(fetchData);
      
      if((this.selectedCategory != null) && (this.selectedType != null) && (this.selectedCurrency !=null)) {

          
          let expenditures;
            
            if (this.selectedYear == 'All' && this.selectedMonth == 'All'){

              expenditures = this.LOAD_EXPENDITURES.filter((expenditure) => 
                (expenditure.category == this.selectedCategory) && 
                expenditure.expenditureType == this.selectedType &&
                expenditure.currency == this.selectedCurrency
              );

            } else if(this.selectedYear != 'All' && this.selectedMonth != 'All'){
               
              var yearAndMonth = this.selectedYear+'-'+this.months[this.selectedMonth];

              expenditures = this.LOAD_EXPENDITURES.filter((expenditure) => 
                (expenditure.category == this.selectedCategory) && 
                expenditure.expenditureType == this.selectedType &&
                expenditure.currency == this.selectedCurrency &&
                (expenditure.date.substr(0,7) == yearAndMonth)
              );

            } else if (this.selectedYear != 'All' && this.selectedMonth == 'All'){
              
              expenditures = this.LOAD_EXPENDITURES.filter((expenditure) => 
                (expenditure.category == this.selectedCategory) && 
                expenditure.expenditureType == this.selectedType &&
                expenditure.currency == this.selectedCurrency &&
                expenditure.date.substr(0,4) == this.selectedYear
              );
            } 

          this.expenditures = expenditures;

          let expenditureData = 
          {
            expenditures: expenditures,
            currency: this.selectedCurrency
          }

          this.displayedCurrency = this.selectedCurrency

          this.$store.commit('SET_TOTAL_CASH_IN',expenditureData)
          this.$store.commit('SET_TOTAL_CASH_OUT',expenditureData)

        } else if((this.selectedCategory == null) && ( this.selectedType == null) && (this.selectedCurrency == null)){

            let expenditures;
            
            if (this.selectedYear == 'All' && this.selectedMonth == 'All'){

              this.expenditures = this.LOAD_EXPENDITURES;

            } else if(this.selectedYear != 'All' && this.selectedMonth != 'All'){
               
              var yearAndMonth = this.selectedYear+'-'+this.months[this.selectedMonth];

              expenditures = this.LOAD_EXPENDITURES.filter((expenditure) => 
                (expenditure.date.substr(0,7) == yearAndMonth)
              );

              console.log(expenditures)
              
              this.expenditures = expenditures;

            } else if (this.selectedYear != 'All' && this.selectedMonth == 'All'){
              
              expenditures = this.LOAD_EXPENDITURES.filter((expenditure)=>
                expenditure.date.substr(0,4) == this.selectedYear
              );

              this.expenditures = expenditures;
            } 
            
            let expenditureData = 
            {
              expenditures: expenditures,
              currency: userService.getUserCurrency()
            }

            this.displayedCurrency = userService.getUserCurrency()

            this.$store.commit('SET_TOTAL_CASH_IN',expenditureData)
            this.$store.commit('SET_TOTAL_CASH_OUT',expenditureData)

        } else if((this.selectedCategory != null) && (this.selectedType == null) && (this.selectedCurrency == null)){

            let expenditures;
            
            if (this.selectedYear == 'All' && this.selectedMonth == 'All'){

              expenditures = this.LOAD_EXPENDITURES.filter((expenditure) => 
              (expenditure.category == this.selectedCategory));

            } else if(this.selectedYear != 'All' && this.selectedMonth != 'All'){
               
              var yearAndMonth = this.selectedYear+'-'+this.months[this.selectedMonth];

              expenditures = this.LOAD_EXPENDITURES.filter((expenditure) => 
                (expenditure.category == this.selectedCategory) &&
                (expenditure.date.substr(0,7) == yearAndMonth)
              );

            } else if (this.selectedYear != 'All' && this.selectedMonth == 'All'){
              
               expenditures = this.LOAD_EXPENDITURES.filter((expenditure) => 
                (expenditure.category == this.selectedCategory) &&
                (expenditure.date.substr(0,4) == this.selectedYear)
              );
            } 

          this.expenditures = expenditures;

          let expenditureData = 
          {
            expenditures: expenditures,
            currency: userService.getUserCurrency()
          }

          this.displayedCurrency = userService.getUserCurrency()

          this.$store.commit('SET_TOTAL_CASH_IN',expenditureData)
          this.$store.commit('SET_TOTAL_CASH_OUT',expenditureData)

        } else if((this.selectedCategory != null) && (this.selectedType != null) && (this.selectedCurrency == null)){

            let expenditures;
            
            if (this.selectedYear == 'All' && this.selectedMonth == 'All'){

            expenditures = this.LOAD_EXPENDITURES.filter((expenditure) => 
              (expenditure.expenditureType == this.selectedType) &&
              (expenditure.category == this.selectedCategory)
            );

            } else if(this.selectedYear != 'All' && this.selectedMonth != 'All'){
               
              var yearAndMonth = this.selectedYear+'-'+this.months[this.selectedMonth];

              expenditures = this.LOAD_EXPENDITURES.filter((expenditure) => 
              (expenditure.expenditureType == this.selectedType) &&
              (expenditure.category == this.selectedCategory) &&
              (expenditure.date.substr(0,7) == yearAndMonth)
              );

            } else if (this.selectedYear != 'All' && this.selectedMonth == 'All'){
              
              expenditures = this.LOAD_EXPENDITURES.filter((expenditure) => 
                (expenditure.expenditureType == this.selectedType) &&
                (expenditure.category == this.selectedCategory) &&
                expenditure.date.substr(0,4) == this.selectedYear
              );
            } 

          this.expenditures = expenditures;

          let expenditureData = 
          {
            expenditures: expenditures,
            currency: userService.getUserCurrency()
          }

          this.displayedCurrency = userService.getUserCurrency()

          this.$store.commit('SET_TOTAL_CASH_IN',expenditureData)
          this.$store.commit('SET_TOTAL_CASH_OUT',expenditureData)

        } else if((this.selectedCategory != null) && (this.selectedCurrency != null) && (this.selectedType == null)){

            let expenditures;
            
            if (this.selectedYear == 'All' && this.selectedMonth == 'All'){

            expenditures = this.LOAD_EXPENDITURES.filter((expenditure) => 
              (expenditure.currency == this.selectedCurrency) &&
              (expenditure.category == this.selectedCategory)
            );

            } else if(this.selectedYear != 'All' && this.selectedMonth != 'All'){
               
              var yearAndMonth = this.selectedYear+'-'+this.months[this.selectedMonth];

              expenditures = this.LOAD_EXPENDITURES.filter((expenditure) => 
              (expenditure.currency == this.selectedCurrency) &&
              (expenditure.category == this.selectedCategory) &&
              (expenditure.date.substr(0,7) == yearAndMonth)
            );

            } else if (this.selectedYear != 'All' && this.selectedMonth == 'All'){
              
              expenditures = this.LOAD_EXPENDITURES.filter((expenditure) => 
                (expenditure.currency == this.selectedCurrency) &&
                (expenditure.category == this.selectedCategory) &&
                expenditure.date.substr(0,4) == this.selectedYear
              );
            } 

          this.expenditures = expenditures;

          let expenditureData = 
          {
            expenditures: expenditures,
            currency: this.selectedCurrency
          }

          this.displayedCurrency = this.selectedCurrency

          this.$store.commit('SET_TOTAL_CASH_IN',expenditureData)
          this.$store.commit('SET_TOTAL_CASH_OUT',expenditureData)

        } else if((this.selectedType != null) && (this.selectedCurrency == null) && (this.selectedCategory == null)){

            let expenditures;
            
            if (this.selectedYear == 'All' && this.selectedMonth == 'All'){

              expenditures = this.LOAD_EXPENDITURES.filter((expenditure) => 
                (expenditure.expenditureType == this.selectedType) 
              );

            } else if(this.selectedYear != 'All' && this.selectedMonth != 'All'){
               
              var yearAndMonth = this.selectedYear+'-'+this.months[this.selectedMonth];

              expenditures = this.LOAD_EXPENDITURES.filter((expenditure) => 
                (expenditure.expenditureType == this.selectedType) &&
                (expenditure.date.substr(0,7) == yearAndMonth)
              );

            } else if (this.selectedYear != 'All' && this.selectedMonth == 'All'){
              
              expenditures = this.LOAD_EXPENDITURES.filter((expenditure) => 
                (expenditure.expenditureType == this.selectedType) &&
                expenditure.date.substr(0,4) == this.selectedYear
              );
            } 

          this.expenditures = expenditures;

          let expenditureData = 
          {
            expenditures: expenditures,
            currency: userService.getUserCurrency()
          }

         
          this.displayedCurrency = userService.getUserCurrency()

          this.$store.commit('SET_TOTAL_CASH_IN',expenditureData)
          this.$store.commit('SET_TOTAL_CASH_OUT',expenditureData)

        }  else if((this.selectedType != null) && (this.selectedCurrency != null) && (this.selectedCategory == null)){


            let expenditures;
            
            if (this.selectedYear == 'All' && this.selectedMonth == 'All'){

              expenditures = this.LOAD_EXPENDITURES.filter((expenditure) => 
                (expenditure.expenditureType == this.selectedType) &&
                (expenditure.currency == this.selectedCurrency)
              );

            } else if(this.selectedYear != 'All' && this.selectedMonth != 'All'){
               
                var yearAndMonth = this.selectedYear+'-'+this.months[this.selectedMonth];
                
                expenditures = this.LOAD_EXPENDITURES.filter((expenditure) => 
                  (expenditure.expenditureType == this.selectedType) &&
                  (expenditure.currency == this.selectedCurrency) &&
                  (expenditure.date.substr(0,7) == yearAndMonth)
                );

            } else if (this.selectedYear != 'All' && this.selectedMonth == 'All'){
            
                expenditures = this.LOAD_EXPENDITURES.filter((expenditure) => 
                  (expenditure.expenditureType == this.selectedType) &&
                  (expenditure.currency == this.selectedCurrency) &&
                  expenditure.date.substr(0,4) == this.selectedYear
                );
            } 

          this.expenditures = expenditures;

          let expenditureData = 
          {
            expenditures: expenditures,
            currency: this.selectedCurrency
          }

          this.displayedCurrency = this.selectedCurrency

          this.$store.commit('SET_TOTAL_CASH_IN',expenditureData)
          this.$store.commit('SET_TOTAL_CASH_OUT',expenditureData)

        }  else if((this.selectedCurrency != null) && (this.selectedCategory == null) && (this.selectedType == null)){

            let expenditures;
            
            if (this.selectedYear == 'All' && this.selectedMonth == 'All'){

              expenditures = this.LOAD_EXPENDITURES.filter((expenditure) => 
                (expenditure.currency == this.selectedCurrency)
              );

            } else if(this.selectedYear != 'All' && this.selectedMonth != 'All'){
               
              var yearAndMonth = this.selectedYear+'-'+this.months[this.selectedMonth];

              expenditures = this.LOAD_EXPENDITURES.filter((expenditure) => 
                (expenditure.currency == this.selectedCurrency) &&
                (expenditure.date.substr(0,7) == yearAndMonth)
              );

            } else if (this.selectedYear != 'All' && this.selectedMonth == 'All'){
              
              expenditures = this.LOAD_EXPENDITURES.filter((expenditure) => 
                (expenditure.currency == this.selectedCurrency) &&
                expenditure.date.substr(0,4) == this.selectedYear
              );
            } 

          this.expenditures = expenditures;

          let expenditureData = 
          {
            expenditures: expenditures,
            currency: this.selectedCurrency
          }

          this.displayedCurrency = this.selectedCurrency

          this.$store.commit('SET_TOTAL_CASH_IN',expenditureData)
          this.$store.commit('SET_TOTAL_CASH_OUT',expenditureData)
        }  

    },

    filterExpenditures(currency,category,type){

      console.log("currency: "+currency+" category: "+category+" type: "+type)

      if((currency !=null && category != null) && (type != null)) {

          let expenditures;
          
          if (this.selectedYear == 'All' && this.selectedMonth == 'All'){

            expenditures = this.LOAD_EXPENDITURES.filter((expenditure) => 
            (
            expenditure.category == category) && 
            expenditure.expenditureType == type &&
            expenditure.currency == currency
            );

          } else if(this.selectedYear != 'All' && this.selectedMonth != 'All'){
              
            var yearAndMonth = this.selectedYear+'-'+this.months[this.selectedMonth];

            expenditures = this.LOAD_EXPENDITURES.filter((expenditure) => 
            (
              expenditure.category == category) && 
              expenditure.expenditureType == type &&
              expenditure.currency == currency &&
              (expenditure.date.substr(0,7) == yearAndMonth)
            );

          } else if (this.selectedYear != 'All' && this.selectedMonth == 'All'){
            
             expenditures = this.LOAD_EXPENDITURES.filter((expenditure) => 
            (
              expenditure.category == category) && 
              expenditure.expenditureType == type &&
              expenditure.currency == currency &&
              expenditure.date.substr(0,4) == this.selectedYear
            );
          } 

        
          let fetchData = {
            expenditures: expenditures,
            currency: currency
          }

          this.expenditures = expenditures;

          this.displayedCountry = this.selectedCountry
          this.displayedCurrency = currency

          this.$store.commit('SET_TOTAL_CASH_IN',fetchData)
          this.$store.commit('SET_TOTAL_CASH_OUT',fetchData)

      } if((currency == null && category == null) && (type == null)) {

            var expenditures;
            
            if (this.selectedYear == 'All' && this.selectedMonth == 'All'){

              expenditures = this.LOAD_EXPENDITURES;

            } else if(this.selectedYear != 'All' && this.selectedMonth != 'All'){
               
              var yearAndMonth = this.selectedYear+'-'+this.months[this.selectedMonth];

              expenditures = this.LOAD_EXPENDITURES.filter((expenditure) => 
                (expenditure.date.substr(0,7) == yearAndMonth)
              );

            } else if (this.selectedYear != 'All' && this.selectedMonth == 'All'){

              expenditures = this.LOAD_EXPENDITURES.filter((expenditure)=>
                expenditure.date.substr(0,4) == this.selectedYear
              );
            } 

          let fetchData = {
            expenditures: expenditures,
            currency: userService.getUserCurrency()
          }

          this.expenditures = expenditures;

          this.displayedCountry = this.selectedCountry
          this.displayedCurrency = userService.getUserCurrency()

          this.$store.commit('SET_TOTAL_CASH_IN',fetchData)
          this.$store.commit('SET_TOTAL_CASH_OUT',fetchData)

      } else if(currency !=null && category == null && type == null){


          let expenditures;
          
          if (this.selectedYear == 'All' && this.selectedMonth == 'All'){

            expenditures = this.LOAD_EXPENDITURES.filter((expenditure) => 
              expenditure.currency == currency
            );

          } else if(this.selectedYear != 'All' && this.selectedMonth != 'All'){
              
            var yearAndMonth = this.selectedYear+'-'+this.months[this.selectedMonth];

            expenditures = this.LOAD_EXPENDITURES.filter((expenditure) => 
              expenditure.currency == currency &&
              (expenditure.date.substr(0,7) == yearAndMonth)
            );

          } else if (this.selectedYear != 'All' && this.selectedMonth == 'All'){

            expenditures = this.LOAD_EXPENDITURES.filter((expenditure) => 
              expenditure.currency == currency &&
              expenditure.date.substr(0,4) == this.selectedYear
            );
          } 
        
          let fetchData = {
            expenditures: expenditures,
            currency: currency
          }

          this.expenditures = expenditures;

          this.displayedCountry = this.selectedCountry
          this.displayedCurrency = currency

          this.$store.commit('SET_TOTAL_CASH_IN',fetchData)
          this.$store.commit('SET_TOTAL_CASH_OUT',fetchData)

      }  else if(currency !=null && category != null && type == null){

          let expenditures;
          
          if (this.selectedYear == 'All' && this.selectedMonth == 'All'){

            expenditures = this.LOAD_EXPENDITURES.filter((expenditure) => 
              expenditure.currency == currency &&
              expenditure.category == category
            );

          } else if(this.selectedYear != 'All' && this.selectedMonth != 'All'){
              
            var yearAndMonth = this.selectedYear+'-'+this.months[this.selectedMonth];

            expenditures = this.LOAD_EXPENDITURES.filter((expenditure) => 
              expenditure.currency == currency &&
              expenditure.category == category &&
              (expenditure.date.substr(0,7) == yearAndMonth)
            );

          } else if (this.selectedYear != 'All' && this.selectedMonth == 'All'){

            expenditures = this.LOAD_EXPENDITURES.filter((expenditure) => 
              expenditure.currency == currency &&
              expenditure.category == category &&
              expenditure.date.substr(0,4) == this.selectedYear
            );
          } 

          let fetchData = {
            expenditures: expenditures,
            currency: currency
          }

          this.expenditures = expenditures;

          this.displayedCountry = this.selectedCountry
          this.displayedCurrency = currency

          this.$store.commit('SET_TOTAL_CASH_IN',fetchData)
          this.$store.commit('SET_TOTAL_CASH_OUT',fetchData)

      } else if(currency !=null && type != null && category == null){

          let expenditures;
          
          if (this.selectedYear == 'All' && this.selectedMonth == 'All'){

            expenditures = this.LOAD_EXPENDITURES.filter((expenditure) => 
              expenditure.currency == currency &&
              expenditure.expenditureType == type
            );

          } else if(this.selectedYear != 'All' && this.selectedMonth != 'All'){
              
            var yearAndMonth = this.selectedYear+'-'+this.months[this.selectedMonth];

            expenditures = this.LOAD_EXPENDITURES.filter((expenditure) => 
              expenditure.currency == currency &&
              expenditure.expenditureType == type &&
              (expenditure.date.substr(0,7) == yearAndMonth)
            );

          } else if (this.selectedYear != 'All' && this.selectedMonth == 'All'){
          
            expenditures = this.LOAD_EXPENDITURES.filter((expenditure) => 
              expenditure.currency == currency &&
              expenditure.expenditureType == type &&
              expenditure.date.substr(0,4) == this.selectedYear
            );
          } 
          
          let fetchData = {
            expenditures: expenditures,
            currency: currency
          }

          this.expenditures = expenditures;

          this.displayedCountry = this.selectedCountry
          this.displayedCurrency = currency

          this.$store.commit('SET_TOTAL_CASH_IN',fetchData)
          this.$store.commit('SET_TOTAL_CASH_OUT',fetchData)

      } else if(category !=null && currency == null && type == null){

          let expenditures;
          
          if (this.selectedYear == 'All' && this.selectedMonth == 'All'){

            expenditures = this.LOAD_EXPENDITURES.filter((expenditure) => 
              expenditure.category == category
            );

          } else if(this.selectedYear != 'All' && this.selectedMonth != 'All'){
              
            var yearAndMonth = this.selectedYear+'-'+this.months[this.selectedMonth];

           expenditures = this.LOAD_EXPENDITURES.filter((expenditure) => 
              expenditure.category == category &&
              (expenditure.date.substr(0,7) == yearAndMonth)
            );

          } else if (this.selectedYear != 'All' && this.selectedMonth == 'All'){
            
            expenditures = this.LOAD_EXPENDITURES.filter((expenditure) => 
              expenditure.category == category &&
               expenditure.date.substr(0,4) == this.selectedYear
            );
          } 

          let fetchData = {
            expenditures: expenditures,
            currency: userService.getUserCurrency()
          }

          this.expenditures = expenditures;

          this.displayedCountry = this.selectedCountry
          this.displayedCurrency = userService.getUserCurrency()

          this.$store.commit('SET_TOTAL_CASH_IN',fetchData)
          this.$store.commit('SET_TOTAL_CASH_OUT',fetchData)

      } else if(category !=null && type != null && currency == null){

          let expenditures;
          
          if (this.selectedYear == 'All' && this.selectedMonth == 'All'){

            expenditures = this.LOAD_EXPENDITURES.filter((expenditure) => 
              expenditure.category == category &&
              expenditure.expenditureType == type
            );

          } else if(this.selectedYear != 'All' && this.selectedMonth != 'All'){
              
            var yearAndMonth = this.selectedYear+'-'+this.months[this.selectedMonth];

            expenditures = this.LOAD_EXPENDITURES.filter((expenditure) => 
              expenditure.category == category &&
              expenditure.expenditureType == type &&
              (expenditure.date.substr(0,7) == yearAndMonth)
            );

          } else if (this.selectedYear != 'All' && this.selectedMonth == 'All'){

            expenditures = this.LOAD_EXPENDITURES.filter((expenditure) => 
              expenditure.category == category &&
              expenditure.expenditureType == type &&
              expenditure.date.substr(0,4) == this.selectedYear
            );
          } 
          
          let fetchData = {
            expenditures: expenditures,
            currency: userService.getUserCurrency()
          }

          this.expenditures = expenditures;

          this.displayedCountry = this.selectedCountry
          this.displayedCurrency = userService.getUserCurrency()

          this.$store.commit('SET_TOTAL_CASH_IN',fetchData)
          this.$store.commit('SET_TOTAL_CASH_OUT',fetchData)

      }  else if(type !=null && category == null && currency == null){

          let expenditures;
          
          if (this.selectedYear == 'All' && this.selectedMonth == 'All'){

            expenditures = this.LOAD_EXPENDITURES.filter((expenditure) => 
              expenditure.expenditureType == type
            );

          } else if(this.selectedYear != 'All' && this.selectedMonth != 'All'){
              
            var yearAndMonth = this.selectedYear+'-'+this.months[this.selectedMonth];

             expenditures = this.LOAD_EXPENDITURES.filter((expenditure) => 
              expenditure.expenditureType == type &&
              (expenditure.date.substr(0,7) == yearAndMonth)
            );

          } else if (this.selectedYear != 'All' && this.selectedMonth == 'All'){
            
             expenditures = this.LOAD_EXPENDITURES.filter((expenditure) => 
              expenditure.expenditureType == type &&
              expenditure.date.substr(0,4) == this.selectedYear
            );
          } 

          let fetchData = {
            expenditures: expenditures,
            currency: userService.getUserCurrency()
          }

          this.expenditures = expenditures;

          this.displayedCountry = this.selectedCountry
          this.displayedCurrency = userService.getUserCurrency()

          this.$store.commit('SET_TOTAL_CASH_IN',fetchData)
          this.$store.commit('SET_TOTAL_CASH_OUT',fetchData)
      }
    },

    async editExpenditure(){
      if(  
              this.editedItem.expenditureType !="" &&
              this.editedItem.amount !="" &&
              this.editedItem.country !="" &&
              this.editedItem.date !="" &&
              this.editedItem.currency !="" &&
              this.editedItem.category !=""
        ) 
        {
          
          this.LinearLoading = true;
                
          await ApiService.put("expenditures/"+this.editedItem._id,this.editedItem).then((response)=>{
            
            let fetchData = {

              country: userService.getUserCountry(),
              currency: userService.getUserCurrency()
            }
            
            this.FETCH_EXPENDITURES(fetchData);

            this.editExpenditureDialog = false;

            this.LinearLoading = false;

            this.displayAlert("success",response.data.message,4000);

          }).catch((err)=>{

              this.LinearLoading = false
              this.displayAlert("error","Server error: "+err,4000)
          })
          
        } 

        else 
        {
           this.displayAlert("warning","You need to fill all required fields",4000);
        }
    },

    async createExpenditure(){

           if(  
              this.expenditureType !="" &&
              this.amount !="" &&
              this.country !="" &&
              this.date !="" &&
              this.category !=""
            )

            {
              
              if(
                this.expenditureTypeErrors.length > 0 || 
                this.amountErrors.length > 0 ||
                this.countryErrors.length > 0 ||
                this.dateErrors.length > 0 ||
                this.categoryErrors.length > 0 
              )
              {
                this.displayAlert("warning","There are validation errors, fix before you proceed",4000);
                
              } else {

                console.log("before creating a expenditure")
                console.log(this.LOAD_EXPENDITURES);
                console.log(this.date)

                const expenditure = {

                  expenditureType: this.expenditureType,
                  category: this.category,
                  amount: this.amount,
                  country: this.country,
                  currency: this.currency,
                  description: this.description,
                  registeredBy: userService.getUserName(),
                  staffId: this.staffId,
                  date: this.date

                }

                this.LinearLoading = true;
                
                await ApiService.post("expenditures",expenditure).then((response)=>{

                  const expenditure = response.data.body

                  if(expenditure.country == userService.getUserCountry()){
                    
                    this.$store.commit('ADD_EXPENDITURE',expenditure);

                    if(expenditure.currency == userService.getUserCurrency()){

                      if(expenditure.expenditureType == "Cash In")
                      {
                        //this.$store.commit('ADD_TOTAL_CASH_IN',expenditure.amount)

                        let data = {
                          expenditures: this.LOAD_EXPENDITURES,
                          currency: userService.getUserCurrency()
                        }

                        this.$store.commit('SET_TOTAL_CASH_IN',data)

                      }

                      else {

                        let data = {
                          expenditures: this.LOAD_EXPENDITURES,
                          currency: userService.getUserCurrency()
                        }
                        
                        this.$store.commit('SET_TOTAL_CASH_OUT',data)
                      }

                      //this.$store.commit('ADD_TOTAL_CASH_OUT',expenditure.amount)
                    }
                  }
                   
                  this.createExpenditureDialog = false;
                  this.LinearLoading = false;

                  this.displayAlert("success",response.data.message,4000);

                }).catch((err)=>{

                    this.LinearLoading = false
                    this.displayAlert("error","Server error: "+err,4000)
                })
      
              }

            } else {

              this.displayAlert("warning","You need to fill all required fields",4000);

            }
    }

  },

  beforeRouteEnter(to,from,next){
    
    next(async (vm)=>{  

     
      //vm.fetchExpenditures()
      vm.selectedCountry = userService.getUserCountry();
      vm.generateYears()
      
      if(vm.LOAD_STAFFS == null){
        
        //fetching a user from the server when page is reloaded

        vm.LinearLoading = true;

        vm.fetchStaffs()

        let fetchData = {
          country: userService.getUserCountry(),
          currency: userService.getUserCurrency()
        }

        await vm.FETCH_EXPENDITURES(fetchData);
        
        vm.expenditures = vm.LOAD_EXPENDITURES;

        vm.LinearLoading = false;

      } else {
        // getting user from the store
        vm.staffs = vm.LOAD_STAFFS_NAMES;
        vm.expenditures = vm.LOAD_EXPENDITURES;
      }

    });

  }

}
</script>

<style>
.v-dialog{
  position: absolute;
  top: 50px
}
</style>
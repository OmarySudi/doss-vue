<template>
  <v-container>
    <v-row>
      <v-col cols="4">
        <v-card height="50" class="pl-3 pt-2">
          <span class="text-subtitle-2">SCHOOL: {{ school}}</span>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-select
          height="20"
          width="30"
          solo
          :items="years"
          label="Year"
          v-model="selected_year"
          @change="fetchLevelReports()"
        ></v-select>
      </v-col>
      <v-col cols="4" class="text-subtitle-2">
        <v-select
          height="20"
          width="30"
          solo
          :items="levels"
          label="Levels"
          v-model="selected_level"
          @change="fetchLevelReports()"
        ></v-select>
      </v-col>
    </v-row>
    
    <v-row>
      <v-col cols="6">
        <apexchart 
          v-if="offense_loaded"
          width="500" 
          height="200"
          type="bar" 
          :options="offenseByCategoryOptions" 
          :series="offenseByCategorySeries"
          >
        </apexchart>
      </v-col>

      <v-col cols="6"> 
        <apexchart 
          class="ml-5"
          v-if="gender_loaded"
          type="pie" 
          width="400"
          :options="offenseByGenderOptions" 
          :series="offenseByGenderSeries"
        >
        </apexchart>
      </v-col>

      <v-col cols="6">
        <apexchart 
          v-if="level_loaded"
          type="bar" 
          height="220" 
          :options="offenseByLevelOptions" 
          :series="offenseByLevelSeries">
        </apexchart>
      </v-col>
    </v-row>

    <CircularLoader :loading="circularLoader"/>
  </v-container>
</template>

<script>
import CircularLoader from '../../components/CircularLoader.vue'
import ApiService from '../../services/api'
import { mapGetters,mapActions} from 'vuex';
import { join } from 'path';

export default {
  name: 'Report',

  components: {CircularLoader},
  data () {
    return {

      offense_loaded:false,
      gender_loaded:false,
      level_loaded:false,

      school:'',
      levels: ['All levels','Form One','Form Two','Form Three','Form Four'],
      selected_level: 'All levels',

      school_level_offense:{},
      school_level_gender:{},
      school_level_level:{},

      circularLoader: false,

      offenseByCategoryOptions:null,
      offenseByCategorySeries: null,
      offenseByGenderOptions: null,
      offenseByGenderSeries: null,
      offenseByLevelOptions: null,
      offenseByLevelSeries: null,

      years: [],
      selected_year: new Date().getFullYear(),
    }
  },
  computed:{
      ...mapGetters(['SCHOOL_OFFENSE','SCHOOL_GENDER','SCHOOL_LEVEL']),
  },
  methods: {
      ...mapActions(['FETCH_SCHOOL_OFFENSE_REPORT']),

      async fetchLevelReports(){
        this.offense_loaded =false,
        this.gender_loaded = false,
        this.level_loaded = false,
        this.circularLoader = true;

        if(this.selected_level != "All levels"){

            await ApiService.get('/reports/school/'+localStorage.getItem("school_code")+'/'+this.selected_level+'/'+this.selected_year).then((response)=>{

            if(response.status == 200){
             
              this.school_level_offense = response.data.objects.offense
              this.school_level_gender = response.data.objects.gender
              this.school_level_level = response.data.objects.level
              this.circularLoader = false;
              this.setOffenseByCategoryData(this.school_level_offense);
              this.setOffenseByGenderData(this.school_level_gender);

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
                this.setAlert("error",true,"Client: There is internal error",5000);
              }
            });

          } else {
            await this.FETCH_SCHOOL_OFFENSE_REPORT(this.selected_year);

            this.setReportData(this.SCHOOL_OFFENSE,this.SCHOOL_GENDER,this.SCHOOL_LEVEL);
          }
        
      },

      setReportData(school_offense,school_gender,school_level){
        this.setOffenseByCategoryData(school_offense);
        this.setOffenseByGenderData(school_gender);
        this.setOffenseByLevelData(school_level);
      },

      getLastFiveYears(){
        var currentYear  = new Date().getFullYear();
        for(var i = currentYear; i >= (currentYear - 4) ; i--){
          this.years.push(i);
        }
      },

      setOffenseByCategoryData(school_offense){

        this.offenseByCategoryOptions = {

          chart: {
            id: 'offensesByCategory',
          },
          title: {
            text: 'Offenses By Category',
            align: 'center',
            floating: true
        },
          xaxis: {
            categories: school_offense.labels
          },
          dataLabels: {
            enabled: true,
            formatter: function (val) {
              return val + "%"
            },
          }
        }
        
        this.offenseByCategorySeries = [{
          name: 'categories',
          data: school_offense.data
        }]

        this.circularLoader = false
        this.offense_loaded = true
      },

      setOffenseByGenderData(school_gender){

      this.offenseByGenderOptions = {
        chart: {
          width: 400,
          type: 'pie',
        },
        title: {
            text: 'Offenses By Gender',
            align: 'center',
            floating: true
        },
        labels: school_gender.labels,
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }],
        plotOptions:{
          pie: {
            customScale: 0.8
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val + "%"
          },
        }
      }

      this.offenseByGenderSeries = school_gender.data

      this.circularLoader = false
      this.gender_loaded = true
      },

      setOffenseByLevelData(school_level){
        this.offenseByLevelOptions = {

        chart: {
          id: 'offensesByLevel',
          type: 'bar',
          height: 400
        },
        plotOptions: {
          bar: {
            barHeight: '100%',
            distributed: true,
            horizontal: true,
            dataLabels: {
              position: 'bottom'
            },
          }
        },
        colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa',],
        dataLabels: {
          enabled: true,
          textAnchor: 'start',
          style: {
            colors: ['#fff'],
          },
          // formatter: function (val, opt) {
          //   return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
          // },
          offsetX: 0,
          dropShadow: {
            enabled: true
          }
        },
        stroke: {
          width: 1,
          colors: ['#fff']
        },
        xaxis: {
          categories: school_level.labels
        },
        yaxis: {
          labels: {
            show: true
          }
        },
        title: {
            text: 'Offenses By Student level',
            align: 'center',
            floating: true
        },

          dataLabels: {
            enabled: true,
            textAnchor: 'start',
            formatter: function (val) {
              return val + "%"
            },
          },
          
        }

        this.offenseByLevelSeries = [{
          name: 'offenseByLevel',
          data: school_level.data
        }]

        this.circularLoader = false
        this.level_loaded = true
      }
  },

  async mounted(){ 
    
    this.getLastFiveYears();

    this.school = localStorage.getItem('school');
    
    if(this.SCHOOL_OFFENSE == null || this.SCHOOL_GENDER == null || this.SCHOOL_LEVEL == null){

      this.circularLoader = true;

      await this.FETCH_SCHOOL_OFFENSE_REPORT(this.selected_year);

      this.setReportData(this.SCHOOL_OFFENSE,this.SCHOOL_GENDER,this.SCHOOL_LEVEL);
    
    } else {

      this.setReportData(this.SCHOOL_OFFENSE,this.SCHOOL_GENDER,this.SCHOOL_LEVEL);
    }
  }
}
</script>

<style>

</style>
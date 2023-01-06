<template>
  <v-container>
    <v-row v-if="OFFICER_DISTRICT">
      <v-col cols="6">
        <v-card height="50" class="pl-3 pt-2 text-center font-weight-bold">
          <span class="text-subtitle-2 font-weight-bold"><span>DISTRICT: </span>{{OFFICER_DISTRICT}}</span>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-select
          height="20"
          width="30"
          solo
          :items="years"
          label="Year"
          v-model="selected_year"
          @change="fetchReports()"
        ></v-select>
      </v-col>
    </v-row>
    
    <v-row>
      <v-col cols="6">
        <apexchart 
          v-if="ward_loaded"
          width="500" 
          height="200"
          type="bar" 
          :options="offenseByWardOptions" 
          :series="offenseByWardSeries"
          >
        </apexchart>
      </v-col>

      <v-col cols="6"> 
        <apexchart 
          class="ml-5"
          v-if="gender_loaded"
          type="pie" 
          width="70%"
          :options="offenseByGenderOptions" 
          :series="offenseByGenderSeries"
        >
        </apexchart>
      </v-col>

      <v-col cols="6">
        <apexchart 
          v-if="level_loaded"
          type="bar" 
          height="180" 
          :options="offenseByLevelOptions" 
          :series="offenseByLevelSeries">
        </apexchart>
      </v-col>

      <v-col cols="6">
        <apexchart 
          v-if="offense_loaded"
          height="250"
          type="bar" 
          :options="offenseByCategoryOptions" 
          :series="offenseByCategorySeries"
          >
        </apexchart>
      </v-col>
    </v-row>

    <CircularLoader :loading="circularLoader"/>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CircularLoader from '../../components/CircularLoader.vue'
export default {

  components: {CircularLoader},

  data () {
    return {
      offense_loaded:false,
      gender_loaded:false,
      level_loaded:false,
      ward_loaded:false,
      
      district_offenses:{},
      district_gender:{},
      district_level:{},
      district_wards: {},

      circularLoader: false,

      offenseByCategoryOptions:null,
      offenseByCategorySeries: null,
      offenseByGenderOptions: null,
      offenseByGenderSeries: null,
      offenseByLevelOptions: null,
      offenseByLevelSeries: null,
      offenseByWardOptions: null,
      offenseByWardSeries: null,

      years: [],
      selected_year: new Date().getFullYear(),
    }
  },

  computed:{
    ...mapGetters(['OFFICER_DISTRICT','DISTRICT_OFFENSE','DISTRICT_GENDER','DISTRICT_LEVEL','DISTRICT_WARDS'])
  },

  methods: {
    ...mapActions(['DISTRICT_OFFENSE_REPORT']),

    setReportData(district_offense,district_gender,district_level,district_wards){
      this.setOffenseByCategoryData(district_offense);
      this.setOffenseByGenderData(district_gender);
      this.setOffenseByLevelData(district_level);
      this.setOffenseByWardData(district_wards);
    },

    getLastFiveYears(){
        var currentYear  = new Date().getFullYear();
        for(var i = currentYear; i >= (currentYear - 4) ; i--){
          this.years.push(i);
        }
    },

    async fetchReports(){
      this.circularLoader = true;

      await this.DISTRICT_OFFENSE_REPORT(this.selected_year);;

      this.setReportData(this.DISTRICT_OFFENSE,this.DISTRICT_GENDER,this.DISTRICT_LEVEL,this.DISTRICT_WARDS);
    },

      setOffenseByCategoryData(district_offense){
        
        this.offenseByCategoryOptions = {
          chart: {
            id: 'offensesByCategory',
            type: 'bar',
          },
          title: {
            text: 'Offenses By Category',
            align: 'center',
            floating: true
          },
          xaxis: {
            categories: district_offense.labels
          },

          plotOptions: {
            bar: {
              barHeight: '100%',
              //distributed: true,
              horizontal: true,
              dataLabels: {
                position: 'bottom'
              },
            }
          },
          //colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa',],

          yaxis: {
            labels: {
              show: true
            }
          },
          
          stroke: {
            width: 1,
            colors: ['#fff']
          },

          dataLabels: {
            enabled: true,
            distributed: true,
            style: {
              colors: ['#fff'],
            },
            offsetX: 5,
            dropShadow: {
              enabled: true
            },
            formatter: function (val) {
              return val + "%"
            },
          },
      }
      
      this.offenseByCategorySeries = [{
        name: 'categories',
        data: district_offense.data
      }]
      
      this.circularLoader = false
      this.offense_loaded = true
    },

      setOffenseByGenderData(district_gender){

        this.offenseByGenderOptions = {
          chart: {
            type: 'pie',
          },
          title: {
              text: 'Offenses By Gender',
              align: 'center',
              floating: true
          },
          labels: district_gender.labels,
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
              return Math.round(val) + "%"
            },
          }
        }

        this.offenseByGenderSeries = district_gender.data

        this.circularLoader = false
        this.gender_loaded = true
      },

      setOffenseByLevelData(district_level){
        this.offenseByLevelOptions = {

        chart: {
          id: 'offensesByLevel',
          type: 'bar',
        },
        plotOptions: {
          bar: {
            barHeight: '100%',
            distributed: true,
            //horizontal: true,
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
          categories: district_level.labels
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
          data: district_level.data
        }]

        this.circularLoader = false
        this.level_loaded = true
      },

      setOffenseByWardData(district_wards){

        this.offenseByWardOptions = {

          chart: {
            id: 'offensesByWard',
          },
          title: {
            text: 'Offenses By Ward',
            align: 'center',
            floating: true
        },
          xaxis: {
            categories: district_wards.labels
          },
          dataLabels: {
            enabled: true,
            formatter: function (val) {
              return val + "%"
            },
          }
        }

        this.offenseByWardSeries = [{
          name: 'categories',
          data: district_wards.data
        }]

        this.circularLoader = false
        this.ward_loaded = true
        },
  },

  async mounted(){

    this.getLastFiveYears();

    if(this.DISTRICT_OFFENSE == null || this.DISTRICT_GENDER == null || this.DISTRICT_LEVEL == null || this.DISTRICT_WARDS == null){

      this.circularLoader = true;

      await this.DISTRICT_OFFENSE_REPORT(this.selected_year);;

      this.setReportData(this.DISTRICT_OFFENSE,this.DISTRICT_GENDER,this.DISTRICT_LEVEL,this.DISTRICT_WARDS);

    } else {

      this.setReportData(this.DISTRICT_OFFENSE,this.DISTRICT_GENDER,this.DISTRICT_LEVEL,this.DISTRICT_WARDS);
    }
  }
}
</script>

<style>

</style>
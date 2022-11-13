<template>
  <v-container>
    <v-row v-if="OFFICER_WARD">
      <v-col cols="6">
        <v-card height="50" class="pl-3 pt-2 text-center font-weight-bold">
          <span class="text-subtitle-2 font-weight-bold"><span>WARD: </span>{{OFFICER_WARD.name}}</span>
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
          v-if="school_loaded"
          width="500" 
          height="200"
          type="bar" 
          :options="offenseBySchoolOptions" 
          :series="offenseBySchoolSeries"
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

      <v-col cols="6">
        <apexchart 
          v-if="offense_loaded"
          width="400" 
          height="200"
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
      school_loaded:false,
      
      ward_offenses:{},
      ward_gender:{},
      ward_level:{},
      ward_schools: {},

      circularLoader: false,

      offenseByCategoryOptions:null,
      offenseByCategorySeries: null,
      offenseByGenderOptions: null,
      offenseByGenderSeries: null,
      offenseByLevelOptions: null,
      offenseByLevelSeries: null,
      offenseBySchoolOptions: null,
      offenseBySchoolSeries: null,

      years: [],
      selected_year: new Date().getFullYear(),
    }
  },

  computed:{
    ...mapGetters(['OFFICER_WARD','WARD_OFFENSE','WARD_GENDER','WARD_LEVEL','WARD_SCHOOLS'])
  },

  methods: {
    ...mapActions(['WARD_OFFENSE_REPORT']),

    setReportData(ward_offense,ward_gender,ward_level,ward_schools){
      this.setOffenseByCategoryData(ward_offense);
      this.setOffenseByGenderData(ward_gender);
      this.setOffenseByLevelData(ward_level);
      this.setOffenseBySchoolData(ward_schools);
    },

    getLastFiveYears(){
        var currentYear  = new Date().getFullYear();
        for(var i = currentYear; i >= (currentYear - 4) ; i--){
          this.years.push(i);
        }
      },

    setOffenseByCategoryData(ward_offense){

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
          categories: ward_offense.labels
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
        data: ward_offense.data
      }]

      this.circularLoader = false
      this.offense_loaded = true
      },

      setOffenseByGenderData(ward_gender){

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
          labels: ward_gender.labels,
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

        this.offenseByGenderSeries = ward_gender.data

        this.circularLoader = false
        this.gender_loaded = true
      },

      async  fetchReports(){

        this.circularLoader = true;

        console.log(this.selected_year);

        await this.WARD_OFFENSE_REPORT(this.selected_year);

        this.setReportData(this.WARD_OFFENSE,this.WARD_GENDER,this.WARD_LEVEL,this.WARD_SCHOOLS);
      },

      setOffenseByLevelData(ward_level){
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
          categories: ward_level.labels
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
          data: ward_level.data
        }]

        this.circularLoader = false
        this.level_loaded = true
      },

      setOffenseBySchoolData(ward_schools){

        this.offenseBySchoolOptions = {

          chart: {
            id: 'offensesBySchool',
          },
          title: {
            text: 'Offenses By School',
            align: 'center',
            floating: true
        },
          xaxis: {
            categories: ward_schools.labels
          },
          dataLabels: {
            enabled: true,
            formatter: function (val) {
              return val + "%"
            },
          }
        }

        this.offenseBySchoolSeries = [{
          name: 'categories',
          data: ward_schools.data
        }]

        this.circularLoader = false
        this.school_loaded = true
        },
  },

  async mounted(){

    this.getLastFiveYears();

    if(this.WARD_OFFENSE == null || this.WARD_GENDER == null || this.WARD_LEVEL == null || this.WARD_SCHOOLS == null){

      this.circularLoader = true;

      await this.WARD_OFFENSE_REPORT(this.selected_year);

      this.setReportData(this.WARD_OFFENSE,this.WARD_GENDER,this.WARD_LEVEL,this.WARD_SCHOOLS);

    } else {

      this.setReportData(this.WARD_OFFENSE,this.WARD_GENDER,this.WARD_LEVEL,this.WARD_SCHOOLS);
    }
  }
}
</script>

<style>

</style>
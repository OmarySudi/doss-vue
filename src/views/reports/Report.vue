<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-toolbar dense>
          <v-toolbar-title>Title</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="3"></v-col>
      <v-col cols="9">
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

    </v-row>
    <v-row>
      <v-col cols="6">
        <apexchart 
          v-if="level_loaded"
          type="bar" 
          height="250" 
          :options="offenseByLevelOptions" 
          :series="offenseByLevelSeries">
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
    </v-row>
    <CircularLoader :loading="circularLoader"/>
  </v-container>
</template>

<script>
import CircularLoader from '../../components/CircularLoader.vue'
import { mapGetters,mapActions} from 'vuex';

export default {
  name: 'Report',

  components: {CircularLoader},
  data () {
    return {

      offense_loaded:false,
      gender_loaded:false,
      level_loaded:false,

      circularLoader: false,

      offenseByCategoryOptions:null,
      offenseByCategorySeries: null,
      offenseByGenderOptions: null,
      offenseByGenderSeries: null,
      offenseByLevelOptions: null,
      offenseByLevelSeries: null,
    }
  },
  computed:{
      ...mapGetters(['SCHOOL_OFFENSE','SCHOOL_GENDER','SCHOOL_LEVEL'])
  },
  methods: {
      ...mapActions(['FETCH_SCHOOL_OFFENSE_REPORT']),

      setOffenseByCategoryData(){

        this.offenseByCategoryOptions = {

          chart: {
            id: 'offensesByCategory'
          },
          title: {
            text: 'Offenses By Category',
            align: 'center',
            floating: true
        },
          xaxis: {
            categories: this.SCHOOL_OFFENSE.labels
          }
        }
        
        this.offenseByCategorySeries = [{
          name: 'categories',
          data: this.SCHOOL_OFFENSE.data
        }]

        this.circularLoader = false
        this.offense_loaded = true
      },

      setOffenseByGenderData(){

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
        labels: this.SCHOOL_GENDER.labels,
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
        }
      }

      this.offenseByGenderSeries = this.SCHOOL_GENDER.data

      this.circularLoader = false
      this.gender_loaded = true
      },

      setOffenseByLevelData(){
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
          categories: this.SCHOOL_LEVEL.labels
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
        }

        this.offenseByLevelSeries = [{
          name: 'offenseByLevel',
          data: this.SCHOOL_LEVEL.data
        }]

        this.circularLoader = false
        this.level_loaded = true
      }
  },

  async mounted(){

    if(this.SCHOOL_OFFENSE == null || this.SCHOOL_GENDER == null || this.SCHOOL_LEVEL == null){

      this.circularLoader = true;

      await this.FETCH_SCHOOL_OFFENSE_REPORT();

      this.setOffenseByCategoryData();
      this.setOffenseByGenderData();
      this.setOffenseByLevelData();
    
    } else {

      this.setOffenseByCategoryData();
      this.setOffenseByGenderData();
      this.setOffenseByLevelData();

    }
  }
}
</script>

<style>

</style>
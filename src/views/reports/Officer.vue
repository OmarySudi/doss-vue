<template>
  
</template>

<script>
export default {

  data () {
    return {
      officer_type:'',
    }
  },

  mounted(){
    this.officer_type = localStorage.getItem('officer_type')

    if(this.officer_type == "DISTRICT_OFFICER"){
        this.$router.push('/reports/district')
    } else if(this.officer_type == "WARD_OFFICER"){
        this.$router.push('/reports/ward')
    }
  }
}
</script>

<style>

</style>
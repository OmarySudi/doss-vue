<template>
   <div class="text-center">
       <v-dialog v-model="loading" width="100" persistent>
           <div class="progress text-center">
                <v-progress-circular
                    :size="70"
                    :width="7"
                    color="primary"
                    indeterminate
                ></v-progress-circular>
           </div>
       </v-dialog>
  </div>
</template>
<script>
export default {
    name: "CircularLoader",
    props: ["loading"]
}
</script>

<style scoped>

    .progress{
        width: 100px;
        height: 85px
    }
</style>
<template>
   <v-row justify="center">
       <v-dialog v-model="loading" width="100" persistent>
            <v-progress-linear
                indeterminate
                color="primary"
                height="10"
            ></v-progress-linear>
       </v-dialog>
   </v-row>
</template>

<script>
export default {
    name: "LinearLoader",
    props: ["loading"]
}
</script>

<style>

</style>
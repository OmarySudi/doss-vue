<template>

    <v-snackbar
      :value="snackbar"
      :timeout="timeout"
      height="4"
      top
      right
      outlined
      multi-line
      transition="slide-x-transition"
      :color="type"
    >
      <P class="text-body-1"> {{ text }}</P>
     
      <template v-slot:action="{ attrs }">
        <v-btn
          :color="type"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
</template>

<script>
export default {
    name: "Snackbar",
    props: ["type","text","snackbar","timeout"],
}
</script>

<style>

</style>
<template>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      absolute
      top
      right
      outlined
      multi-line
      transition="slide-x-reverse-transition"
      :color="type"
    >
      <P class="text-body-1"> {{ text }}</P>
     

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
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
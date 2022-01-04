<template>
    <v-dialog v-model="pdf_dialog"  >                 
        <v-col cols="12" xs="12" sm="12" md="12" lg="12" class="mb-0 " >
            <v-card class=" ml-6 "  elevation="0" transition="scroll-y-transition">
            
            <v-progress-linear
            v-if="download_loading == true"
                indeterminate
                class="mb-2"
                color="primary">
            </v-progress-linear>

            <v-row class="">
                <v-col class="text-center ">
                <v-btn class=" " small color="error" outlined @click.prevent="pdf_dialog = false">
                    cancel
                </v-btn>
                </v-col>
                <v-col class="text-center">
                    <v-btn class="primary white--text " small color="" outlined @click.prevent="downloadPdf()">
                        download
                    </v-btn>    
                </v-col>
            </v-row> 
            <center  width="100%">
                <pdf
                    v-for="i in numPages"
                    :key="i"
                    :src="src"
                    :page="i"
                    style="display: inline-block; width: 70%">
                </pdf>
            </center>

                <v-row class=" pb-3 ">
                <v-col class="text-center ">
                    <v-btn class=" " small color="error" outlined @click.prevent="pdf_dialog = false">
                    cancel
                    </v-btn>
                </v-col>
                <v-col class="text-center">
                <v-btn class="primary white--text " small color="" outlined @click.prevent="downloadPdf()">
                        download
                </v-btn>    
                </v-col>
            </v-row> 

            <v-progress-linear
            v-if="download_loading == true"
                indeterminate
                class="mb-2"
                color="primary">
            </v-progress-linear>
            </v-card>
        </v-col>
    </v-dialog>
</template>

<script>
export default {
    name: "PdfViewer",
    props: ["pdf_dialog","download_loading","src","numPages"],
}
</script>

<style>

</style>
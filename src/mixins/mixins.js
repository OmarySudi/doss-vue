export const projectMixin = {

    data: ()=>({

         //snackbar data
         snackbarType: "",
         snackbar: false,
         snackbarText: "",
         snackbarTimeout: -1,
 
         //linearLoader data
         LinearLoading: false,

    }),

    methods: {

        setAlert(type, snackbar, text, timeout){
            this.snackbarType = type;
            this.snackbar = snackbar;
            this.snackbarText = text;
            this.snackbarTimeout = timeout;
        },

        clearAlerts(){
            this.snackbarType = "";
            this.snackbar = false;
            this.snackbarText = "";
            this.snackbarTimeout = -1;
        },
    }
}
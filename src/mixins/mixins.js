import router from '../router'

export const projectMixin = {

    data: ()=>({

         //snackbar data
         snackbarType: "",
         snackbar: false,
         snackbarText: "",
         snackbarTimeout: -1,
 
         //linearLoader data
         LinearLoading: false,

         //circularLoader data
         circularLoader: false,

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

        displayAlert(type,text,timeout){

            this.clearAlerts();
            this.setAlert(type,true,text,-1); 

            setTimeout(()=>{
                this.snackbar = false;
            },timeout);
        },

        displayAlertAndRedirect(type,text,timeout,path){
            
            this.clearAlerts();
            this.setAlert(type,true,text,-1); 

            setTimeout(()=>{
                this.snackbar = false;
                router.push(path)
            },timeout);
        },

        displayAlertAndRedirectWithReload(type,text,timeout,path){
            
            this.clearAlerts();
            this.setAlert(type,true,text,-1); 

            setTimeout(()=>{
                this.snackbar = false;
                router.push(path)
            },timeout);
        },
  }
}
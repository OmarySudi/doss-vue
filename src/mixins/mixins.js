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

        async getUrl(file){

            let fileUrl = '';
            
            const {url} = await fetch(`http://localhost:5000/s3Url/${file.fileExtension}`).
                                        then(response => response.json()).
                                            catch((error)=>{
                                                console.log(error)
                                            });

            await fetch(url,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    body: file.file
                }
            ).then((res) => {
                if(res.ok)
                    fileUrl = url.split('?')[0];
            }).catch((error)=>{
                console.log(error)
            });

            return fileUrl;
        },
    }
}
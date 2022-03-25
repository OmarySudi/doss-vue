import router from '../../router'
import ApiService from '../../services/api'
import TokenService from '../../services/storage' 
import store from '../../store'

export default {

    state: {
        accessToken: null,
        user: {},
        message: null,
    },

    getters: {

        user: (state) => state.user,

        token: (state)=>state.accessToken,

        authenticated: (state)=>{
            return state.accessToken? true: false
        },

        load_message: (state)=>{
            return state.message
        }
    },

    mutations: {

        SET_TOKEN(state, token){
            state.accessToken = token;
        },

        SET_USER(state,user){
            state.user = user;
        },

        LOGOUT_SUCCESS(state) {
            state.accessToken = null;
            state.user = null;
            state.message = null;
        },

        SET_MESSAGE: (state, payload)=>{
            state.message = payload
        },
    },

    actions: {
        async Login({commit},data){
            
            await ApiService.post("auth/login",data).then((response)=>{
                
                if(response.data.error){
                    commit('SET_MESSAGE',response.data.message)
                } else {
                    alert(response.data.message)
                    //return store.dispatch('attempt',response.data.accessToken)
                }
            }).catch(()=>{
                commit('SET_MESSAGE',"Server: There is internal server error")
            });
        },


        async attempt({commit},token){
            if(token)
                commit('SET_TOKEN',token);

            if(!store.getters.token)
              return;

            await ApiService.get("auth/me").then((response)=>{

                if(response.data.error){
                    commit('SET_MESSAGE',response.data.message)
                } else {
                    console.log(response.data.body)
                    
                    commit('SET_USER',response.data.body)

                    localStorage.setItem("email",response.data.body.email)
                    localStorage.setItem("userName",response.data.body.userName)
                    localStorage.setItem("role",response.data.body.role)
                }
            }).catch((error)=>{
                commit('SET_MESSAGE',"Server: There is internal server error")
            })
            
        },

        logout({commit}){

            console.log("commit logout");

            commit('LOGOUT_SUCCESS')

            TokenService.removeToken();
            ApiService.removeHeader()

            ApiService.unmount401Interceptor();
            localStorage.removeItem('role')
            localStorage.removeItem('userName')
            localStorage.removeItem('email')
            localStorage.clear()

            console.log("finishing logout");
            
            router.replace({
                name:'Login'
            });
        },

        setMessage({commit},message){

            commit('SET_MESSAGE',message)
        }
    },
}
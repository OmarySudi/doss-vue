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

                    localStorage.setItem('name',response.data.objects.name);
                    localStorage.setItem('user_gid',response.data.objects.user_gid);
                    localStorage.setItem('email',response.data.objects.email);
                    localStorage.setItem('user_type',response.data.objects.user_type);
                    localStorage.setItem('code',response.data.objects.code);
                   
                    return store.dispatch('attempt',response.data.objects.accessToken)

                }
            }).catch((error)=>{
                // console.log("inside a function")
                // console.log(error.response.data)
                //commit('SET_MESSAGE',"Server: There is internal server error")
            });
        },


        async attempt({commit},accessToken){
        
                if(accessToken)
                    commit('SET_TOKEN',accessToken);

                if(!store.getters.token)
                return;

                let user = {
                    name: localStorage.getItem('name'),
                    user_gid: localStorage.getItem('user_gid'),
                    email: localStorage.getItem('email'),
                    user_type: localStorage.getItem('user_type'),
                    code: localStorage.getItem('code'),
                }

                commit('SET_USER',user)
        },

        logout({commit}){

            commit('LOGOUT_SUCCESS')

            TokenService.removeToken();
            ApiService.removeHeader()

            ApiService.unmount401Interceptor();
            localStorage.removeItem('user_type')
            localStorage.removeItem('name')
            localStorage.removeItem('user_gid')
            localStorage.removeItem('email')
            localStorage.removeItem('code')
            localStorage.clear()
            
            // router.replace({
            //     name:'Home'
            // });

            router.push('/')
        },

        setMessage({commit},message){

            commit('SET_MESSAGE',message)
        }
    },
}
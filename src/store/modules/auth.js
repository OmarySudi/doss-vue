import router from '../../router'
import ApiService from '../../services/api'
import TokenService from '../../services/storage' 
import store from '../../store'

export default {

    state: {
        accessToken: null,
        user: {},
        message: null,
        circularLoader: false,
        teacherSchool: null
    },

    getters: {

        user: (state) => state.user,

        token: (state)=>state.accessToken,

        authenticated: (state)=>{
            return state.accessToken? true: false
        },

        get_circular_loader: (state)=>{
            return state.circularLoader;
        },

        load_message: (state)=>{
            return state.message
        },

        get_teacher_school: (state)=>{
            return state.teacherSchool;
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

        SET_CIRCULAR_LOADER: (state, payload)=>{
            state.circularLoader = payload
        },

        SET_TEACHER_SCHOOL: (state, payload)=>{
            state.teacherSchool = payload;
        }


    },

    actions: {
        
        async Login({commit},data){
            
            await ApiService.post("auth/login",data).then((response)=>{
            
                if(response.data.error){

                    commit('SET_MESSAGE',response.data.message)

                } else {

                    let user = response.data.objects;

                    localStorage.setItem('name',user.name);
                    localStorage.setItem('user_gid',user.user_gid);
                    localStorage.setItem('email',user.email);
                    localStorage.setItem('user_type',user.user_type);
                    localStorage.setItem('code',user.code);
                    
                    switch(user.user_type){
                        
                        case 'TEACHER':

                                localStorage.setItem('phone_number',user.user.phone_number);
                                localStorage.setItem('school',user.user.school.name);
                                store.dispatch('attempt',user.accessToken)
                                router.push('/user')
                            break;

                        case 'OFFICER':
                                localStorage.setItem('phone_number',user.user.phone_number);
                                store.dispatch('attempt',user.accessToken)
                                router.push('/user')
                            break;

                        case 'ADMIN':
                                localStorage.setItem('phone_number',user.user.phone_number);
                                store.dispatch('attempt',user.accessToken)
                                router.push('/users')
                            break;

                        case 'RESEARCHER':
                                localStorage.setItem('phone_number',user.user.phone_number);
                                store.dispatch('attempt',user.accessToken)
                                router.push('/user')
                            break;
                    }
                   
                    //return store.dispatch('attempt',user.accessToken)

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
                    phone_number: localStorage.getItem('phone_number'),
                    school: localStorage.getItem('school'),
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
        },

        setCircularLoader({commit},value){
            
            commit('SET_CIRCULAR_LOADER',value);
        }
    },
}
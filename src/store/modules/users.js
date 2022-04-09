import router from '../../router'
import ApiService from '../../services/api'
import TokenService from '../../services/storage' 
import store from '..'

export default {

    state: {
        users: [],
    },

    getters: {
        USERS: (state) => state.users,
    },

    mutations: {

        SET_USERS(state, users){
            state.users = users;
        },

        ADD_USER(state, user){
            state.users.push(user);
        },

        REMOVE_USER(state, deletedUser){
           state.users =  state.users.filter((user)=>user.user_gid != deletedUser.user_gid)
        }
    },

    actions: {

    },
}
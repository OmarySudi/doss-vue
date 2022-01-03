import router from '../../router'
import ApiService from '../../services/api'
import TokenService from '../../services/storage' 
import store from '../../store'

export default {

    state: {

        staffs: null,
        staff_details: null,
    },

    getters: {

        LOAD_STAFFS: (state)=>{
            console.log(state.staffs)
            return state.staffs;
        },

        LOAD_STAFF: (state,staffId)=>{
            return state.staffs.find((staff)=>staff.id === staffId)
        },

        LOAD_STAFF_DETAILS: (state)=>{
            console.log(state.staff_details)
            return state.staff_details;
        }
    },

    mutations: {

        SET_STAFFS: (state,staffs)=>{
            state.staffs = staffs;
        },

        SET_STAFFS_DETAILS: (state, staff_details)=> {
            state.staff_details = staff_details;
        }
    },

    actions: {

        GET_STAFFS: async ({commit})=>{
            await ApiService.get('staffs').then((response)=>{
                
                console.log(response.data.body)
                commit('SET_STAFFS',response.data.body)

            }).catch((error)=>{
                console.log(error);
            });
        },

        SET_STAFFS: ({commit},staffs)=>{
            commit('SET_STAFFS',staffs)
        }
    },
}
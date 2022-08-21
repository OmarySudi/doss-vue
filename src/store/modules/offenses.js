import router from '../../router'
import ApiService from '../../services/api'
import TokenService from '../../services/storage' 
import store from '..'

export default {

    state: {
        offenseActions: null,
        offenseTypes: null,
        offenseTypeNames:[],
        offenses:null,
        schoolOffenses: null,
    },

    getters: {

        OFFENSE_ACTIONS: (state) => state.offenseActions,

        OFFENSE_TYPES: (state) => state.offenseTypes,

        OFFENSES: (state) => state.offenses,

        OFFENSE_TYPE_NAMES: (state) => state.offenseTypeNames,

        SCHOOL_OFFENSES: (state)=>state.schoolOffenses
    },

    mutations: {
        
        SET_OFFENSE_ACTIONS(state, actions){
            state.offenseActions = actions;
        },

        SET_OFFENSE_TYPES(state, types){
            state.offenseTypes = types;
        },

        SET_OFFENSE_TYPE_NAMES(state, types){
            state.offenseTypeNames = types;
        },

        SET_OFFENSES: (state, offenses)=>{
            state.offenses = offenses
        },

        ADD_OFFENSE_TYPE(state, offenseType){
            state.offenseTypes.push(offenseType);
        },

        REMOVE_ACTION(state,action){
            state.offenseActions =  state.offenseActions.filter((offense_action)=>offense_action.id != action.id)
        },

        SET_ACTION(state,selectedAction){
            let index = state.offenseActions.findIndex((action)=>action.id == selectedAction.id)
            state.offenseActions[index] = selectedAction;
        },

        REPLACE_OFFENSE_TYPE(state,selectedOffenseType){

            let index = state.offenseTypes.findIndex((type)=>type.id == selectedOffenseType.id)
            state.offenseTypes[index] = selectedOffenseType;
        },

        SET_SCHOOL_OFFENSES(state,schoolOffenses){
            state.schoolOffenses = schoolOffenses;
        }
    },

    actions: {

        async FETCH_SCHOOL_OFFENSES({commit}){
            await ApiService.get("messages/fetch-messages/OUTBOUND/"+localStorage.getItem('school_id')).then((response)=>{
                if(response.status == 200){
                    commit('SET_OUTBOUND_MESSAGES',response.data.objects);
                } else {
                    commit('SET_MESSAGE',response.data.message)
                }
            });
        },
    },
}
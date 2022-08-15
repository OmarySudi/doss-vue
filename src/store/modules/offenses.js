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
    },

    getters: {

        OFFENSE_ACTIONS: (state) => state.offenseActions,

        OFFENSE_TYPES: (state) => state.offenseTypes,

        OFFENSES: (state) => state.offenses,

        OFFENSE_TYPE_NAMES: (state) => state.offenseTypeNames,
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
        }
    },

    actions: {

        
    },
}
import ApiService from '../../services/api'
export default {

    state: {
        offense_occurrences: null,   
    },

    getters: {

        OFFENSE_OCCURRENCES: (state) => state.offense_occurrences,
    },

    mutations: {
        SET_OFFENSE_OCCURRENCES(state, offense_occurrences){
            state.offense_occurrences = offense_occurrences;
        },
    },

    actions: {
        async FETCH_OFFENSE_OCCURRENCES({commit}){
            await ApiService.get("offence-occurances/").then((response)=>{
                if(response.status == 200){
                    commit('SET_OFFENSE_OCCURRENCES',response.data.objects);
                } else {
                    commit('SET_MESSAGE',response.data.message)
                }
            });
        },
    },
}
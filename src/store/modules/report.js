import ApiService from '../../services/api'

export default{
    state: {
        school_offense: null,
        school_gender: null,
        school_level:null,
    },

    getters: {
        SCHOOL_OFFENSE: (state) => state.school_offense,

        SCHOOL_GENDER: (state) => state.school_gender,

        SCHOOL_LEVEL: (state) => state.school_level,
    },

    mutations: {
        
        SET_SCHOOL_OFFENSE(state, school_offense){
            state.school_offense = school_offense;
        },

        SET_SCHOOL_GENDER(state, school_gender){
            state.school_gender = school_gender;
        },

        SET_SCHOOL_LEVEL(state, school_level){
            state.school_level = school_level;
        },
    },

    actions: {

        async FETCH_SCHOOL_OFFENSE_REPORT({commit}){
            await ApiService.get("reports/school").then((response)=>{
                if(response.status == 200){
                    commit('SET_SCHOOL_OFFENSE',response.data.objects.offense);
                    commit('SET_SCHOOL_GENDER',response.data.objects.gender);
                    commit('SET_SCHOOL_LEVEL',response.data.objects.level);
                    
                } else {
                    commit('SET_MESSAGE',response.data.message)
                }
            });
        },
    },

}
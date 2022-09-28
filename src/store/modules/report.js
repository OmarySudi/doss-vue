import ApiService from '../../services/api'

export default{
    state: {

        // school
        school_offense: null,
        school_gender: null,
        school_level:null,

        // ward
        ward_offense: null,
        ward_gender: null,
        ward_level: null,
        ward_schools: null,

        // district
        district_offense: null,
        district_gender: null,
        district_level: null,
        district_wards: null,

        // general
        school: null,
        ward: null,
        officer_ward: null,
        officer_district: null,
    
    },

    getters: {

        //school

        SCHOOL_OFFENSE: (state) => state.school_offense,

        SCHOOL_GENDER: (state) => state.school_gender,

        SCHOOL_LEVEL: (state) => state.school_level,


        // ward
        WARD_OFFENSE: (state) => state.ward_offense,

        WARD_GENDER: (state) => state.ward_gender,

        WARD_LEVEL: (state) => state.ward_level,

        WARD_SCHOOLS: (state) => state.ward_schools,


        // district
        DISTRICT_OFFENSE: (state) => state.district_offense,

        DISTRICT_GENDER: (state) => state.district_gender,

        DISTRICT_LEVEL: (state) => state.district_level,

        DISTRICT_WARDs: (state) => state.district_wards,

        // general
        SCHOOL: (state) => state.school,
        WARD: (state) => state.ward,
        OFFICER_WARD: (state) => state.officer_ward,
        OFFICER_DISTRICT: (state) => state.officer_district,
    },

    mutations: {
        
        // school
        SET_SCHOOL_OFFENSE(state, school_offense){
            state.school_offense = school_offense;
        },

        SET_SCHOOL_GENDER(state, school_gender){
            state.school_gender = school_gender;
        },

        SET_SCHOOL_LEVEL(state, school_level){
            state.school_level = school_level;
        },

        // ward

        SET_WARD_OFFENSE(state, ward_offense){
            state.ward_offense = ward_offense;
        },

        SET_WARD_GENDER(state, ward_gender){
            state.ward_gender = ward_gender;
        },

        SET_WARD_LEVEL(state, ward_level){
            state.ward_level = ward_level;
        },

        SET_WARD_SCHOOLS(state, ward_schools){
            state.ward_schools  = ward_schools;
        },

        // district
        SET_DISTRICT_OFFENSE(state, district_offense){
            state.district_offense = district_offense;
        },

        SET_DISTRICT_GENDER(state, district_gender){
            state.district_gender = district_gender;
        },

        SET_DISTRICT_LEVEL(state, district_level){
            state.district_level = district_level;
        },

        SET_DISTRICT_WARDS(state, district_wards){
            state.district_wards  = district_wards;
        },

        // general
        SET_SCHOOL(state,school){
            state.school = school;
        },

        SET_WARD(state,ward){
            state.ward = ward;
        },

        SET_OFFICER_WARD(state,officer_ward){
            state.officer_ward = officer_ward;
        },

        SET_OFFICER_DISTRICT(state,officer_district){
            state.officer_district = officer_district;
        }
    },

    actions: {

        async FETCH_SCHOOL_OFFENSE_REPORT({commit}){
            await ApiService.get("reports/school/"+localStorage.getItem("school_code")).then((response)=>{
                if(response.status == 200){
                    commit('SET_SCHOOL_OFFENSE',response.data.objects.offense);
                    commit('SET_SCHOOL_GENDER',response.data.objects.gender);
                    commit('SET_SCHOOL_LEVEL',response.data.objects.level);
                    
                } else {
                    commit('SET_MESSAGE',response.data.message)
                }
            });
        },

        async WARD_OFFENSE_REPORT({commit}){
            await ApiService.get("reports/ward").then((response)=>{
                if(response.status == 200){
                    commit('SET_WARD_OFFENSE',response.data.objects.offense);
                    commit('SET_WARD_GENDER',response.data.objects.gender);
                    commit('SET_WARD_LEVEL',response.data.objects.level);
                    commit('SET_WARD_SCHOOLS',response.data.objects.school);
                    commit('SET_OFFICER_WARD',response.data.objects.officer_ward);
                    
                } else {
                    commit('SET_MESSAGE',response.data.message)
                }
            });
        },

        async DISTRICT_OFFENSE_REPORT({commit}){
            await ApiService.get("reports/district").then((response)=>{
                if(response.status == 200){
                    commit('SET_DISTRICT_OFFENSE',response.data.objects.offense);
                    commit('SET_DISTRICT_GENDER',response.data.objects.gender);
                    commit('SET_DISTRICT_LEVEL',response.data.objects.level);
                    commit('SET_DISTRICT_WARDS',response.data.objects.ward);
                    commit('SET_OFFICER_DISTRICT',response.data.objects.officer_district);
                    
                } else {
                    commit('SET_MESSAGE',response.data.message)
                }
            });
        },
    },

}
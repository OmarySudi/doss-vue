import router from '../../router'
import ApiService from '../../services/api'
import TokenService from '../../services/storage' 
import store from '..'

export default {

    state: {
        schools: null,
        school_names: [],
        class_levels_names:[],
        class_levels: null,
        students: null,
    },

    getters: {

        SCHOOLS: (state) => state.schools,

        SCHOOL_NAMES: (state) => state.school_names,

        CLASS_LEVELS_NAMES: (state) => state.class_levels_names,

        CLASS_LEVELS: (state)=>state.class_levels,

        STUDENTS: (state)=>state.students
    },

    mutations: {

        SET_SCHOOLS(state, schools){
            state.schools = schools;
        },

        SET_CLASS_LEVELS(state, class_levels){
            state.class_levels = class_levels;
        },

        SET_STUDENTS: (state, students)=>{
            state.students = students
        },

        SET_SCHOOL_NAMES: (state, school_names)=>{
            state.school_names = school_names
        },

        SET_CLASS_LEVELS_NAMES: (state, class_levels_names)=>{
            state.class_levels_names = class_levels_names
        },

        UPDATE_SCHOOL: (state, editSchool)=>{
           let index =  state.schools.findIndex((school)=> school.id == editSchool.id);
           state.schools[index] = editSchool;
        },

        ADD_SCHOOL: (state,school)=>{
            state.schools.push(school);
        }
    },

    actions: {

        async FETCH_SCHOOLS({commit}){
            await ApiService.get("schools/").then((response)=>{
                if(response.status == 200){
                    commit('SET_SCHOOLS',response.data.objects);

                    const names = response.data.objects.map(({name})=>name)
                    commit('SET_SCHOOL_NAMES',names);

                } else {
                    commit('SET_MESSAGE',response.data.message)
                }
            });
        },

        async FETCH_CLASS_LEVELS({commit}){

            await ApiService.get("class-levels/").then((response)=>{
                if(response.status == 200){
                    commit('SET_CLASS_LEVELS',response.data.objects);

                    const names = response.data.objects.map(({name})=>name)
                    commit('SET_CLASS_LEVELS_NAMES',names);
                } else {
                    commit('SET_MESSAGE',response.data.message)
                }
            });
        },
    },
}
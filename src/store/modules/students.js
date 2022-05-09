import router from '../../router'
import ApiService from '../../services/api'
import TokenService from '../../services/storage' 
import store from '..'

export default {

    state: {
        student_classes: null,
        student_classes_names: [],
    },

    getters: {

        STUDENT_CLASSES: (state)=>state.student_classes,

        STUDENT_CLASSES_NAMES: (state)=>state.student_classes_names,

    },

    mutations: {

        SET_STUDENT_CLASSES(state, student_classes){
            state.student_classes = student_classes;
        },

        SET_STUDENT_CLASSES_NAMES(state, student_classes_names){
            state.student_classes_names = student_classes_names;
        },
    },

    actions: {

        async FETCH_STUDENT_CLASSES({commit}){

            await ApiService.get("student_classes/").then((response)=>{
                if(response.status == 200){
                    commit('SET_STUDENT_CLASSES',response.data.objects);

                    const years = response.data.objects.map(({year})=>year)
                    commit('SET_STUDENT_CLASSES_NAMES',years);
                } else {
                    commit('SET_MESSAGE',response.data.message)
                }
            });
        },
    },
}
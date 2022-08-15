
export default {

    state: {
        templates: null,
    },

    getters: {
        TEMPLATES: (state) => state.templates,
    },

    mutations: {
        
        SET_TEMPLATES(state, templates){
            state.templates = templates;
        },

        ADD_TEMPLATE(state, template){
            state.templates.push(template);
        },

        REPLACE_TEMPLATE(state,selectedTemplate){
            let index = state.templates.findIndex((template)=>template.id == selectedTemplate.id)
            state.templates[index] = selectedTemplate;
        }
    },

    actions: {

        
    },
}
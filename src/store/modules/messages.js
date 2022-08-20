import ApiService from '../../services/api'
export default {

    state: {
        outbound_messages: null,
        inbound_messages: null,    
    },

    getters: {

        OUTBOUND_MESSAGES: (state) => state.outbound_messages,
        INBOUND_MESSAGES: (state) => state.inbound_messages,
    },

    mutations: {
        
        SET_OUTBOUND_MESSAGES(state, outbound_messages){
            state.outbound_messages = outbound_messages;
        },
        
        SET_INBOUND_MESSAGES(state, inbound_messages){
            state.inbound_messages = inbound_messages;
        },
    },

    actions: {
        async FETCH_OUTBOUND_MESSAGES({commit}){
            await ApiService.get("messages/fetch-messages/OUTBOUND/"+localStorage.getItem('school_id')).then((response)=>{
                if(response.status == 200){
                    commit('SET_OUTBOUND_MESSAGES',response.data.objects);
                } else {
                    commit('SET_MESSAGE',response.data.message)
                }
            });
        },

        async FETCH_INBOUND_MESSAGES({commit}){
            await ApiService.get("messages/fetch-messages/INBOUND/"+localStorage.getItem('school_id')).then((response)=>{
                if(response.status == 200){
                    commit('SET_INBOUND_MESSAGES',response.data.objects);
                } else {
                    commit('SET_MESSAGE',response.data.message)
                }
            });
        },
    },
}
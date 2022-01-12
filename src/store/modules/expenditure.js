import ApiService from "../../services/api";

export default {
    state: {
        expenditures: null,
        totalCashIn: null,
        totalCashOut: null,
    },

    getters: {

        LOAD_EXPENDITURES: (state) => state.expenditures,

        GET_TOTAL_CASH_IN: (state)=>state.totalCashIn,

        GET_TOTAL_CASH_OUT: (state) => state.totalCashOut,

        GET_CASH_OUT_EXPENDITURES: (state)=>{
            
            return state.expenditures.find((expenditure)=>expenditure.Type == "Cash Out");
        },

        GET_CASH_IN_EXPENDITURES: (state)=>{

            return state.expenditures.find((expenditure)=>expenditure.Type == "Cash In");
        }
    },

    mutations: {

        ADD_EXPENDITURE: (state,expenditure)=>{
            state.expenditures.unshift(expenditure);
        },

        SET_EXPENDITURES: (state,expenditures)=>{
            state.expenditures = expenditures;
        },

        SET_TOTAL_CASH_IN: (state,expenditures)=>{

            let cashINExpenditures = expenditures.filter((expenditure)=>expenditure.expenditureType == "Cash In");
            let totalCashInAmount = cashINExpenditures.reduce((accumulator,current)=>accumulator + current.amount,0)

            state.totalCashIn = totalCashInAmount
        },

        SET_TOTAL_CASH_OUT: (state,expenditures)=>{
            
            let cashOUTExpenditures = expenditures.filter((expenditure)=>expenditure.expenditureType == "Cash Out");
            let totalCashOutAmount = cashOUTExpenditures.reduce((accumulator,current)=>accumulator + current.amount,0)

            state.totalCashOut = totalCashOutAmount
        },

        ADD_TOTAL_CASH_IN: (state,cashIn)=>{

            console.log("adding cash in")
            state.totalCashIn += cashIn;
            console.log("cashin is "+state.totalCashIn)
        },

        SUBTRACT_TOTAL_CASH_IN: (state,cashIn)=>{
            state.totalCashIn -=cashIn;
        },

        SUBTRACT_TOTAL_CASH_OUT: (state,cashOut)=>{
            
            state.totalCashOut -= cashOut;
        },

        ADD_TOTAL_CASH_OUT: (state,cashOut)=>{
            
            state.totalCashOut += cashOut;
        }

    },

    actions: {

        CREATE_EXPENDITURE: async ({commit},expenditure)=>{

            await ApiService.post("expenditures",expenditure).then(()=>{

            }).catch((error)=>{
                console.log("error")
            }); 
        },

        FETCH_EXPENDITURES: async ({commit},country)=>{

            if(country == null){

                await ApiService.get('expenditures').then((response)=>{
                    commit('SET_EXPENDITURES',response.data.body)
                    commit('SET_TOTAL_CASH_IN',response.data.body)
                    commit('SET_TOTAL_CASH_OUT',response.data.body)
                  }).catch((error)=>{
                      console.log(error);
                  });

            } else {

                await ApiService.get('expenditures?country='+country).then((response)=>{
                    commit('SET_EXPENDITURES',response.data.body)
                    commit('SET_TOTAL_CASH_IN',response.data.body)
                    commit('SET_TOTAL_CASH_OUT',response.data.body)
                  }).catch((error)=>{
                      console.log(error);
                  });
            }
           
        },

        // SET_TOTAL_CASH_IN: async({commit},expenditures)=>{

        //     let cashINExpenditures = state.expenditures.filter((expenditure)=>expenditure.expenditureType == "Cash In");
        //     let totalCashInAmount = cashINExpenditures.reduce((accumulator,current)=>accumulator + current.amount,0)

        //     return totalCashInAmount;

        // }
    },
}
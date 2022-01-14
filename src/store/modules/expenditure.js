import store from "..";
import ApiService from "../../services/api";
import { userService } from "../../services/storage";

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

        SET_TOTAL_CASH_IN: (state,expenditureData)=>{

            let cashINExpenditures = expenditureData.expenditures.filter((expenditure)=>expenditure.expenditureType == "Cash In" && expenditure.currency == expenditureData.currency);
            let totalCashInAmount = cashINExpenditures.reduce((accumulator,current)=>accumulator + current.amount,0)

            state.totalCashIn = totalCashInAmount
        },

        SET_TOTAL_CASH_OUT: (state,expenditureData)=>{
            
            let cashOUTExpenditures = expenditureData.expenditures.filter((expenditure)=>expenditure.expenditureType == "Cash Out" && expenditure.currency == expenditureData.currency);
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

        FETCH_EXPENDITURES: async ({commit},fetchData)=>{

            if(fetchData.country == null){

                await ApiService.get('expenditures').then((response)=>{
                    commit('SET_EXPENDITURES',response.data.body)

                    let expenditureData = {

                        currency: fetchData.currency,
                        expenditures: response.data.body
                    }

                    commit('SET_TOTAL_CASH_IN',expenditureData)
                    commit('SET_TOTAL_CASH_OUT',expenditureData)

                  }).catch((error)=>{
                      console.log(error);
                  });

            } else if(fetchData.country != null){
                await ApiService.get('expenditures?country='+fetchData.country).then((response)=>{
                    commit('SET_EXPENDITURES',response.data.body)

                    let expenditureData = {

                        currency: fetchData.currency,
                        expenditures: response.data.body
                    }

                    commit('SET_TOTAL_CASH_IN',expenditureData)
                    commit('SET_TOTAL_CASH_OUT',expenditureData)
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

export default {

    state: {
        countries:{

            "TANZANIA": "TZS",
            "MAURITIUS": "USD",
            "GHANA": "USD",
            "GUINEE": "USD",
            "ETHIOPIA": "USD",
            "SENEGAL": "USD",
        },

        categories: [

            "Salary",
            "Allowance",
            "Rent",
            "Transport",
        ]
    },

    getters: {
        
        GET_COUNTRIES: (state)=>{
            return state.countries;
        },

        GET_CATEGORIES: (state)=>{
            return state.categories;
        },
    },

}
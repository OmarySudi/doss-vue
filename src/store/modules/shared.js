
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

        months: {

            "JANUARY": "01",
            "FEBRUARY": "02",
            "MARCH": "03",
            "APRIL": "04",
            "MAY": "05",
            "JUNE": "06",
            "JULY": "07",
            "AUGUST": "08",
            "SEPTEMBER": "09",
            "OCTOBER": "10",
            "NOVEMBER": "11",
            "DECEMBER": "12"
        },

        categories: [

            "Salary",
            "Allowance",
            "Rent",
            "Transport",
        ],

        currencies: [
            "USD",
            "TZS",
            "EUR",
            "GBP"
        ],
    },

    getters: {
        
        GET_COUNTRIES: (state)=>{
            return state.countries;
        },

        GET_MONTHS: (state)=>{
            return state.months;
        },

        GET_CATEGORIES: (state)=>{
            return state.categories;
        },

        GET_CURRENCIES: (state)=>{
            
            return state.currencies;
        }
    },

}
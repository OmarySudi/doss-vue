/* jshint esversion: 6 */
/* jshint esversion: 8 */
/* jshint -W033 */

import store from '@/store'
import ApiService from '@/services/api'
import TokenService from '@/services/storage'

store.subscribe((mutation)=>{
    switch(mutation.type){

        case 'SET_TOKEN':

            if(mutation.payload){

                TokenService.saveToken(mutation.payload);

                if(TokenService.getToken()){

                    ApiService.setHeader();
                }
            }
            else {
                
                ApiService.removeHeader();

                TokenService.removeToken();
            }
            
            break;
    }

});
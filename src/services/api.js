/* jshint esversion: 6 */
/* jshint esversion: 8 */
/* jshint -W033 */

import axios from 'axios';
import store from '../store';
import TokenService from '../services/storage';

const ApiService = {

    _401interceptor: null,

    init(baseURL){

        axios.defaults.baseURL = baseURL;
    },

    setHeader() {
        axios.defaults.headers.common["Authorization"] = `Bearer ${TokenService.getToken()}`;
        // axios.defaults.headers.common['Content-Type'] = 'application/json';
        // axios.defaults.headers.common['Accept'] = '*/*';
        // axios.defaults.headers.common['Connection'] = 'keep-alive';
    },

    removeHeader() {
        axios.defaults.headers.common = {}
    },

    get(resource) {
        return axios.get(resource)
    },

    post(resource, data) {
        return axios.post(resource, data)
    },

    put(resource, data) {
        return axios.put(resource, data)
    },

    delete(resource) {
        return axios.delete(resource)
    },

    /**
     * Perform a custom Axios request.
     *
     * data is an object containing the following properties:
     *  - method
     *  - url
     *  - data ... request payload
     *  - auth (optional)
     *    - username
     *    - password
    **/
   customRequest(data) {
       
        return axios(data)
    },

    mount401Interceptor() {
        this._401interceptor = axios.interceptors.response.use(
            
            (response) => {

                return response
            },
            async (error) => {

                if(error.request.status === 401){

                    console.log("interrupt request")

                    store.dispatch('logout')

                    throw error;
                } 
                else {

                    let status = error.request.status.toString().charAt(0);

                    switch(status){

                        case '4':

                            if(error.response.data.generalErrorCode){

                                store.dispatch('setMessage',error.response.data.message);

                            } else {

                                store.dispatch('setMessage',"Client: There is internal error");
                            }
                           
                            break;

                        case '5':

                            store.dispatch('setMessage',"Server: There is internal server error");

                            break;
                    }

                }

                // If error was not 401 just reject as is

                throw error
            }
        )
    },

    unmount401Interceptor() {

        // Eject the interceptor
        axios.interceptors.response.eject(this._401interceptor)
    }

}

export default ApiService

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
        axios.defaults.headers.common["Authorization"] = `Bearer ${TokenService.getToken()}`
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

                            console.log('Client: There is Client error');

                            store.dispatch('setMessage',"Client: There is Client error")
                            break;

                        case '5':

                            console.log('Server: There is internal server error');

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

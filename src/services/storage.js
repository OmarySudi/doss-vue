/* jshint esversion: 6 */
/*jshint esversion: 8 */

const TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

const TokenService = {

    getToken() {
        return localStorage.getItem(TOKEN_KEY);
    },

    saveToken(accessToken) {
        localStorage.setItem(TOKEN_KEY, accessToken);
    },

    removeToken() {
        localStorage.removeItem(TOKEN_KEY);
    },

    getRefreshToken() {
        return localStorage.getItem(REFRESH_TOKEN_KEY);
    },

    saveRefreshToken(refreshToken) {
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    },

    removeRefreshToken() {
        localStorage.removeItem(REFRESH_TOKEN_KEY);
    }
};

export const userService = {

    getUserEmail(){
        return localStorage.getItem("email");
    },

    getUserName(){
        return localStorage.getItem("userName");
    },

    getUserRole(){
        return localStorage.getItem("role");
    },
}

export default TokenService;


import axios from "axios/index";

class AuthStore {
    static TOKEN_NAME = 'token';

    static isLoggedIn() {
        return localStorage.getItem(this.TOKEN_NAME) !== null;
    }

    static saveToken(token) {
        localStorage.setItem(this.TOKEN_NAME, token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    static removeToken() {
        localStorage.removeItem(this.TOKEN_NAME);
    }

    static getToken() {
        return localStorage.getItem(this.TOKEN_NAME)
    }
}

export default AuthStore;
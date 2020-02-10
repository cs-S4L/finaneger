import Vue from 'vue';

class UserManager {
    constructor() {
        this.loggedIn = false;
    }

    logout() {
        this.loggedIn = false;
    }

    login() {
        this.loggedIn = true;
    }

    getLoggedIn() {
        return this.loggedIn;
    }
}

// export const userManager = new UserManager();

// export const loggedIn = Vue.observable({
//     loggedIn: userManager.loggedIn
// });

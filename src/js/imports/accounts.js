import { Api } from "./finanegerApi.js";

class Accounts {
    constructor() {
        this.limit = 20;
        this.endpoint = "Accounts";
    }

    getAccounts(userToken, success, offset = 0, limit = this.limit) {
        const params = {
            userToken,
            offset,
            limit
        };
        Api.submitAjax(params, this.endpoint, "get", "POST", success);
    }

    getAccount(userToken, success, id) {
        const params = {
            userToken,
            id
        };
        Api.submitAjax(params, this.endpoint, "get", "POST", success);
    }

    setAccount(userToken, success, data) {
        const params = {
            data,
            userToken
        };
        // data.userToken = userToken;
        Api.submitAjax(params, this.endpoint, "set", "POST", success);
    }

    updateAccount(userToken, success, data) {
        const params = {
            data,
            userToken
        };
        Api.submitAjax(params, this.endpoint, "update", "POST", success);
    }

    deleteAccount(userToken, success, data) {
        const params = {
            data,
            userToken
        };
        Api.submitAjax(params, this.endpoint, "delete", "POST", success);
    }
}

export const accounts = new Accounts();

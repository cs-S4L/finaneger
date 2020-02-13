import { Api } from "./finanegerApi.js";

class Accounts {
    constructor() {
        this.limit = 20;
        this.endpoint = "Accounts";
    }

    getAccounts(success, offset = 0, limit = this.limit) {
        const params = {
            offset,
            limit
        };
        Api.submitAjax(params, this.endpoint, "get", "POST", success);
    }

    getAccount(success, id) {
        const params = {
            id
        };
        Api.submitAjax(params, this.endpoint, "get", "POST", success);
    }

    setAccount(success, data) {
        Api.submitAjax(data, this.endpoint, "set", "POST", success);
    }

    updateAccount(success, data) {
        Api.submitAjax(data, this.endpoint, "update", "POST", success);
    }
}

export const accounts = new Accounts();

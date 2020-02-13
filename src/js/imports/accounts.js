import { Api } from "./finanegerApi.js";

class Accounts {
    constructor() {
        this.limit = 20;
    }

    loadAccounts(success, params) {
        Api.submitAjax(params, "getAccounts", "POST", success);
    }
}

export const accounts = new Accounts();

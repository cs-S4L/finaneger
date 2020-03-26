import { Api } from "./finanegerApi.js";

class Finances {
    constructor() {
        this.limit = 2;
        this.endpoint = "Finances";
    }

    getFinances(userToken, success, offset = 0, limit = this.limit) {
        const params = { userToken, offset, limit };
        Api.submitAjax(params, this.endpoint, "get", "POST", success);
    }

    getFinance(userToken, success, id) {
        const params = { userToken, id };
        Api.submitAjax(params, this.endpoint, "get", "POST", success);
    }

    setFinance(userToken, success, data) {
        const params = { userToken, data };
        Api.submitAjax(params, this.endpoint, "set", "POST", success);
    }

    updateFinance(userToken, success, data) {
        const params = { userToken, data };
        Api.submitAjax(params, this.endpoint, "update", "POST", success);
    }

    deleteFinance(userToken, success, data) {
        const params = { userToken, data };
        Api.submitAjax(params, this.endpoint, "delete", "POST", success);
    }
}

export const finances = new Finances();

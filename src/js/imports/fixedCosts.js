import { Api } from "./finanegerApi.js";

class FixedCosts {
    constructor() {
        this.limit = 20;
        this.endpoint = "FixedCosts";
    }

    getFixedCosts(userToken, success, offset = 0, limit = this.limit) {
        const params = { userToken, offset, limit };
        Api.submitAjax(params, this.endpoint, "get", "POST", success);
    }

    getFixedCost(userToken, success, id) {
        const params = { userToken, id };
        Api.submitAjax(params, this.endpoint, "get", "POST", success);
    }

    setFixedCost(userToken, success, data) {
        const params = { userToken, data };
        Api.submitAjax(params, this.endpoint, "set", "POST", success);
    }

    updateFixedCost(userToken, success, data) {
        const params = { userToken, data };
        Api.submitAjax(params, this.endpoint, "update", "POST", success);
    }

    deleteFixedCost(userToken, success, data) {
        const params = { userToken, data };
        Api.submitAjax(params, this.endpoint, "delete", "POST", success);
    }
}

export const fixedCosts = new FixedCosts();

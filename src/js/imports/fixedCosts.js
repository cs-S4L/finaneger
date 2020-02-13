import { Api } from "./finanegerApi.js";

class FixedCosts {
    constructor() {
        this.limit = 20;
        this.endpoint = "FixedCosts";
    }

    loadFixedCosts(success, offset = 0, limit = this.limit) {
        const params = { offset, limit };
        Api.submitAjax(params, this.endpoint, "get", "POST", success);
    }

    loadFixedCost(success, id) {
        const params = { id };
        Api.submitAjax(params, this.endpoint, "get", "POST", success);
    }
}

export const fixedCosts = new FixedCosts();

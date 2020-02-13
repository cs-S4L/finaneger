import { Api } from "./finanegerApi.js";

class FixedCosts {
    constructor() {
        this.limit = 20;
    }

    loadFixedCosts(success, params) {
        Api.submitAjax(params, "getFixedCosts", "POST", success);
    }
}

export const fixedCosts = new FixedCosts();

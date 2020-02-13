import { Api } from "./finanegerApi.js";

class Finances {
    constructor() {
        this.limit = 20;
    }

    loadFinances(success, params) {
        Api.submitAjax(params, "getFinances", "POST", success);
    }
}

export const finances = new Finances();

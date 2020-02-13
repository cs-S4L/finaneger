import { Api } from "./finanegerApi.js";

class Finances {
    constructor() {
        this.limit = 20;
        this.endpoint = "Finances";
    }

    loadFinances(success, offset = 0, limit = this.limit) {
        const params = {
            offset,
            limit
        };
        Api.submitAjax(params, this.endpoint, "get", "POST", success);
    }

    loadFinance(succes, id) {
        const params = {
            id
        };
        Api.submitAjax(params, this.endpoint, "get", "POST", success);
    }
}

export const finances = new Finances();

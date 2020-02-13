import { Api } from "./finanegerApi.js";

class Bills {
    constructor() {
        this.limit = 20;
        this.endpoint = "Bills";
    }

    getBills(success, offset = 0, limit = this.limit) {
        const params = {
            offset,
            limit
        };
        Api.submitAjax(params, this.endpoint, "get", "POST", success);
    }

    getBill(success, id) {
        const params = { id };
        Api.submitAjax(params, this.endpoint, "get", "POST", success);
    }

    setBill(success, data) {
        Api.submitAjax(data, this.endpoint, "set", "POST", success);
    }

    updateBill(success, data) {
        Api.submitAjax(data, this.endpoint, "update", "POST", success);
    }
}

export const bills = new Bills();

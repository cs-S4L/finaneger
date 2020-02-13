import { Api } from "./finanegerApi.js";

class Bills {
    constructor() {
        this.limit = 20;
        this.endpoint = "Bills";
    }

    loadBills(success, offset = 0, limit = this.limit) {
        const params = {
            offset,
            limit
        };
        Api.submitAjax(params, this.endpoint, "get", "POST", success);
    }

    loadBill(success, id) {
        const params = { id };
        Api.submitAjax(params, this.endpoint, "get", "POST", success);
    }
}

export const bills = new Bills();

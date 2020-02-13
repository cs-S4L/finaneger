import { Api } from "./finanegerApi.js";

class Bills {
    constructor() {
        this.limit = 20;
    }

    loadBills(success, params) {
        Api.submitAjax(params, "getBills", "POST", success);
    }
}

export const bills = new Bills();

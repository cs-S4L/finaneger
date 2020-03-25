import { Api } from "./finanegerApi.js";

class Bills {
    constructor() {
        this.limit = 20;
        this.endpoint = "Bills";
    }

    getBills(userToken, success, offset = 0, limit = this.limit) {
        const params = { userToken, offset, limit };
        Api.submitAjax(params, this.endpoint, "get", "POST", success);
    }

    getBill(userToken, success, id) {
        const params = { userToken, id };
        Api.submitAjax(params, this.endpoint, "get", "POST", success);
    }

    setBill(userToken, success, data) {
        const params = { userToken, id };
        Api.submitAjax(params, this.endpoint, "set", "POST", success);
    }

    updateBill(userToken, success, data) {
        const params = { userToken, data };
        Api.submitAjax(params, this.endpoint, "update", "POST", success);
    }

    deleteBill(userToken, success, data) {
        const params = { userToken, data };
        Api.submitAjax(params, this.endpoint, "delete", "POST", success);
    }
}

export const bills = new Bills();

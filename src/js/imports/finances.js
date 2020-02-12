import {Api} from './finanegerApi.js';

class Finances {
    constructor() {
        this.limit = 20;
    }
    loadFinanceList(success, limit, offset = 0) {
        var postData = {
            limit,
            offset,
        };

        Api.submitAjax(
            postData,
            'listFinances',
            'POST',
            success
        );
    }
}

export const finances = new Finances();
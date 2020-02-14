class FinanegerApi {
    constructor() {
        this.prefix = "http://";
        this.base = "localhost:8888/finanegerApi";
        this.baseUrl = `${this.prefix}${this.base}`;
    }

    submitAjaxForm(form, action, success, error) {
        const endpoint = form.attr("action");
        const method = form.attr("method");

        if (!action) {
            console.log("Error! Action missing!");
            return;
        }
        if (!method) {
            console.log("Error! Method missing!");
            return;
        }

        this.submitAjax(form.serialize(), endpoint, action, method, success, error);
    }

    submitAjax(data, endpoint, action, method, success, error) {
        if (!error) {
            error = this.error;
        }

        const url = `${this.baseUrl}/${endpoint}/${action}`;

        $.ajax({
            type: method,
            url: url,
            data: data,
            success: success,
            error: error
        });
    }

    addUserToken($data, $userToken) {
        return ($data.userToken = $userToken);
    }

    defaultError(err) {
        console.log(err);
    }
}

export const Api = new FinanegerApi();

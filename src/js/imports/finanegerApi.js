class FinanegerApi {

    constructor() {
        this.prefix = 'http://';
        this.base = 'localhost:8888/finanegerApi';
        this.baseUrl = `${this.prefix}${this.base}`;
    }

    submitAjaxForm(form, success, error) {
        const action = form.attr('action');
        const method = form.attr('method');

        if (!action) {console.log('Error! Action missing!'); return}
        if (!method) {console.log('Error! Method missing!'); return}

        this.submitAjax(
            form.serialize(),
            action,
            method,
            success,
            error);
    }

    submitAjax(data, endpoint, method, success, error) {
        if (!error) {
            error = this.error;
        }
        const url = `${this.baseUrl}/?endpoint=${endpoint}`;
        console.log(url);
        $.ajax({
            type: method,
            url: url,
            data: data, // serializes the form's elements.
            success: success,
            error: error,
        });
    }

    defaultError(err) {
        console.log(err);
    }
}

export const Api = new FinanegerApi();
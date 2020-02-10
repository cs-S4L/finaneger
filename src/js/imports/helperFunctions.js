class HelperFunctions {
    toogleInnerHTML(el, content1, content2) {
        if (el.innerHTML == content1) {
            el.innerHTML = content2;
        } else {
            el.innerHTML = content1;
        }
    }
}

export const helper = new HelperFunctions();
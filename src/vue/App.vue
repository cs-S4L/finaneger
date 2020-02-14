<template>
    <div id="app">
        <site-login v-if="!loggedIn"></site-login>

        <app-navi v-if="loggedIn"></app-navi>

        <router-view class="site" v-if="loggedIn"></router-view>
    </div>
</template>

<script>
import Vue from "vue";
import AppNavi from "./components/AppNavi.vue";
import SiteLogin from "./sites/SiteLogin.vue";

import { Api } from "../js/imports/finanegerApi.js";

export const store = Vue.observable({
    userToken: "",
    auth_key: "",
    api_key: ""
});

if (!store.userToken) {
    const sessionId = Cookies.get("sessionId");
    const userId = Cookies.get("userId");

    if (sessionId && userId) {
        store.userToken = {
            sessionId: sessionId,
            userId: userId
        };
    } else {
        Api.submitAjax("", "token", "get", "POST", data => {
            if (data) {
                data = JSON.parse(data);

                if (data.auth_key && data.api_key) {
                    store.auth_key = data.auth_key;
                    store.api_key = data.api_key;
                }
            }
        });
    }
}

export default {
    name: "app",
    components: {
        AppNavi,
        SiteLogin
    },
    data: function() {
        return {};
    },
    computed: {
        loggedIn() {
            return store.userToken;
        }
    },
    methods: {}
};
</script>

<style></style>

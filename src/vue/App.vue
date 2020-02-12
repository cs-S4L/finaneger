<template>
    <div id="app">
        <site-login v-if="!loggedIn"></site-login>

        <app-navi v-if="loggedIn"></app-navi>

        <router-view class="site" v-if="loggedIn"></router-view>
    </div>
</template>

<script>
import Vue from 'vue';
import AppNavi from './components/AppNavi.vue';
import SiteLogin from './sites/SiteLogin.vue';

import {Api} from '../js/imports/finanegerApi.js';

export const store = Vue.observable({
    userToken: '',
});

//check if User is logged In
Api.submitAjax(
    '',
    'login',
    'POST',
    (data)=>{
        if (data) {
            data = JSON.parse(data);
            store.userToken = data.userToken;
        }
    }
);

export default {
    name: 'app',
    components: {
        AppNavi,
        SiteLogin,
    },
    data: function () {
        return {}
    },
    computed: {
        loggedIn() {
            return store.userToken;
        },
    },
    methods: {
        Logout: () => {
            console.log('logout');
            // TODO
        },
    }
}
</script>

<style>

</style>

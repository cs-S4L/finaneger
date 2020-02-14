<template>
    <div id="app-navi">
        <nav>
            <i id="menu-icon" class="material-icons menu" v-on:click="toggleMenu"></i>
            <i class="material-icons account" v-on:click="toggleAccountPopUp">account_circle</i>

            <div id="accountPopUp" class="accountPopUp">
                <button class="button button--default button--small" v-on:click="logout">
                    Logout
                </button>
            </div>
        </nav>

        <aside id="side-navi" class="side-navi">
            <router-link class="navi-item" v-on:click.native="toggleMenu" v-bind:to="'/'">
                Home
            </router-link>
            <router-link class="navi-item" v-on:click.native="toggleMenu" v-bind:to="'/finanzen'">
                Finanzen
            </router-link>
            <router-link class="navi-item" v-on:click.native="toggleMenu" v-bind:to="'/fixkosten'">
                Fixkosten
            </router-link>
            <router-link class="navi-item" v-on:click.native="toggleMenu" v-bind:to="'/konten'">
                Konten
            </router-link>
            <router-link class="navi-item" v-on:click.native="toggleMenu" v-bind:to="'/rechnungen'">
                Rechnungen
            </router-link>
        </aside>
    </div>
</template>

<script>
import { Api } from "../../js/imports/finanegerApi.js";

import { store } from "../App.vue";

function toggleMenu() {
    const menuIcon = document.querySelector("#menu-icon");
    const sideNavi = document.querySelector("#side-navi");

    menuIcon.classList.toggle("active");
    sideNavi.classList.toggle("active");
}

export default {
    components: {},
    computed: {},
    methods: {
        toggleMenu: () => {
            toggleMenu();
        },
        toggleAccountPopUp: () => {
            const accountPopUp = document.querySelector("#accountPopUp");
            accountPopUp.classList.toggle("active");
        },
        logout: e => {
            Api.submitAjax({ userToken: store.userToken }, "token", "delete", "POST", data => {
                if (data) {
                    data = JSON.parse(data);
                    if (data.success) {
                        store.userToken = "";
                        Cookies.remove("sessionId");
                        Cookies.remove("userId");
                        location.reload();
                    }
                }
            });
        }
    }
};
</script>

<style></style>

import Vue from "vue";
import VueRouter from "vue-router";
import Homepage from "../views/Homepage";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import MyAccount from "../views/MyAccount.vue";
import Apiaries from "../views/Apiaries";
import Hives from "../views/Hives";
import { auth } from "../firebase";

Vue.use(VueRouter);

const routes = [
    {
        path: "*",
        redirect: "/login"
    },

    {
        path: "/register",
        name: "Register",
        component: Register
    },

    {
        path: "/login",
        name: "Login",
        component: Login
    },

    {
        path: "/",
        name: "Homepage",
        component: Homepage,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: "/myaccount/",
        name: "MyAccount",
        component: MyAccount,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: "/apiaries",
        name: "Apiaries",
        component: Apiaries,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: "/hives",
        name: "Hives",
        component: Hives,
        meta: {
            requiresAuth: true
        }
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

// navigation guard to check for logged in users
router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth);

    if (requiresAuth && !auth.currentUser) {
        next("/login");
    } else {
        next();
    }
});

export default router;

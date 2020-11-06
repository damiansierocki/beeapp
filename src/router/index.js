import Vue from "vue";
import VueRouter from "vue-router";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import { auth } from "../firebase";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Dashboard",
        //  component: Dashboard,
        meta: {
            requiresAuth: true
        }
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

import Vue from "vue";
import Vuex from "vuex";
import * as fb from "../firebase";
import router from "../router/index";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userProfile: {}
    },
    mutations: {
        setUserProfile(state, val) {
            state.userProfile = val;
        }
    },
    actions: {
        async signup({ dispatch }, form) {
            // sign user up
            const { user } = await fb.auth.createUserWithEmailAndPassword(
                form.email,
                form.password
            );

            // create user profile object in userCollection
            await fb.usersCollection.doc(user.uid).set({
                name: form.name,
                email: form.email
            });

            // fetch user profile and set in state
            dispatch("fetchUserProfile", user);

            // router.push("/login");
        },

        async fetchUserProfile({ commit }, user) {
            // fetch user profile
            const userProfile = await fb.usersCollection.doc(user.uid).get();

            // set user profile in state
            commit("setUserProfile", userProfile.data());

            // change router to dashboard
            router.push("/");
        }
    },
    modules: {}
});

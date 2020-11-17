import Vue from 'vue';
import Vuex from 'vuex';
import * as fb from '../firebase';
import router from '../router/index';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        userProfile: {},
        notes: []
    },

    mutations: {
        setUserProfile(state, val) {
            state.userProfile = val;
        },

        setNotes(state, val) {
            state.notes = val;
        }
    },

    actions: {
        async getNotes() {
            await fb.usersCollection
                .doc(fb.auth.currentUser.uid)
                .collection('notes')
                .orderBy('createdOn', 'desc')
                .onSnapshot(snapshot => {
                    let notesArray = [];

                    snapshot.forEach(doc => {
                        let note = doc.data();
                        note.id = doc.id;

                        notesArray.push(note);
                    });

                    store.commit('setNotes', notesArray);
                });
        },

        async addNote({}, note) {
            if (window.confirm('Jesteś pewny/a, że chcesz dodać notatkę?')) {
                await fb.usersCollection
                    .doc(fb.auth.currentUser.uid)
                    .collection('notes')
                    .add({
                        createdOn: new Date(),
                        content: note.content,
                        userId: fb.auth.currentUser.uid
                    });
            }
        },

        async editNote({}, { docId, note }) {
            if (window.confirm('Jesteś pewny/a, że chcesz edytować notatkę?')) {
                await fb.usersCollection
                    .doc(fb.auth.currentUser.uid)
                    .collection('notes')
                    .doc(docId)
                    .update({
                        content: note.content
                    });
            }
        },

        async deleteNote({}, docId) {
            if (window.confirm('Jesteś pewny/a, że chcesz usunąć notatkę?')) {
                await fb.usersCollection
                    .doc(fb.auth.currentUser.uid)
                    .collection('notes')
                    .doc(docId)
                    .delete();
            }
        },

        async signup({ dispatch }, form) {
            // sign user up
            const { user } = await fb.auth.createUserWithEmailAndPassword(
                form.email,
                form.password
            );

            // create user profile object in userCollection
            await fb.usersCollection.doc(user.uid).set({
                username: form.username,
                email: form.email,
                password: form.password
            });

            // fetch user profile and set in state
            dispatch('fetchUserProfile', user);

            router.push('/login');
        },

        async login({ dispatch }, form) {
            // sign user in
            const { user } = await fb.auth.signInWithEmailAndPassword(
                form.email,
                form.password
            );

            // fetch user profile and set in state
            dispatch('fetchUserProfile', user);
        },

        async logout({ commit }) {
            await fb.auth.signOut();

            // clear userProfile and redirect to /login
            commit('setUserProfile', {});
            router.push('/login');
        },

        async updateProfile({ commit, dispatch }, user) {
            const userId = fb.auth.currentUser.uid;

            const currentEmail = await fb.usersCollection
                .where('email', '==', user.email)
                .get();

            const currentUser = await fb.usersCollection
                .where('username', '==', user.username)
                .get();

            if (currentEmail.empty === true) {
                await fb.usersCollection.doc(userId).update({
                    username: user.username,
                    email: user.email,
                    password: user.password
                });

                alert('Pomyślnie zmieniono email!');
            } else {
                alert('Email jest zajęty, wpisz inny.');
            }

            dispatch('fetchUserProfile', { uid: userId });
        },

        async fetchUserProfile({ commit }, user) {
            // fetch user profile
            const userProfile = await fb.usersCollection.doc(user.uid).get();

            // set user profile in state
            commit('setUserProfile', userProfile.data());

            // change router to dashboard
            if (router.currentRoute.path === '/login') {
                router.push('/');
            }
        }
    },
    modules: {}
});

export default store;

import Vue from 'vue';
import Vuex from 'vuex';
import * as fb from '../firebase';
import router from '../router/index';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        userProfile: {},
        apiaries: [],
        hives: [],
        inspections: [],
    },

    mutations: {
        setUserProfile(state, val) {
            state.userProfile = val;
        },

        setApiaries(state, val) {
            state.apiaries = val;
        },

        setHives(state, val) {
            state.hives = val;
        },

        setInspections(state, val) {
            state.inspections = val;
        },
    },

    actions: {
        async getApiaries() {
            fb.usersCollection
                .doc(fb.auth.currentUser.uid)
                .collection('apiaries')
                .onSnapshot(snapshot => {
                    const apiariesArray = [];

                    snapshot.forEach(doc => {
                        const apiary = doc.data();
                        apiary.id = doc.id;

                        apiariesArray.push(apiary);
                    });

                    store.commit('setApiaries', apiariesArray);
                });
        },

        async addApiary({}, apiary) {
            await fb.usersCollection
                .doc(fb.auth.currentUser.uid)
                .collection('apiaries')
                .add({
                    // general
                    name: apiary.name,
                    type: apiary.type,
                    forages: apiary.forages,
                    description: apiary.description,

                    // address
                    address: apiary.address,
                    city: apiary.city,
                    zip: apiary.zip,
                    province: apiary.province,
                });
        },

        async editApiary({}, { docId, apiary }) {
            await fb.usersCollection
                .doc(fb.auth.currentUser.uid)
                .collection('apiaries')
                .doc(docId)
                .update({
                    name: apiary.name,
                    type: apiary.type,
                    forages: apiary.forages,
                    description: apiary.description,

                    // address
                    address: apiary.address,
                    city: apiary.city,
                    zip: apiary.zip,
                    province: apiary.province,
                });
        },

        async deleteApiary({}, docId) {
            if (window.confirm('Czy na pewno chcesz usunąć pasiekę?')) {
                await fb.usersCollection
                    .doc(fb.auth.currentUser.uid)
                    .collection('apiaries')
                    .doc(docId)
                    .delete();
            }
        },

        async getHives() {
            fb.usersCollection
                .doc(fb.auth.currentUser.uid)
                .collection('hives')
                .onSnapshot(snapshot => {
                    const hivesArray = [];
                    snapshot.docs.forEach(doc => {
                        const hive = doc.data();
                        hive.id = doc.id;
                        hivesArray.push(hive);
                    });
                    store.commit('setHives', hivesArray);
                });
        },

        async addHives({}, hives) {
            await fb.usersCollection
                .doc(fb.auth.currentUser.uid)
                .collection('hives')
                .add({
                    // general
                    number: hives.number,
                    apiary: hives.apiary,
                    status: hives.status,
                    purpose: hives.purpose,
                    created: hives.created,
                    generalNote: hives.generalNote,

                    // bees
                    strength: hives.strength,
                    temperament: hives.temperament,
                    frames: hives.frames,

                    // queen
                    isQueen: hives.isQueen,
                    age: hives.age,
                    installed: hives.installed,
                    race: hives.race,
                    queenColor: hives.queenColor,
                    queenNote: hives.queenNote,
                });
        },

        async editHives({}, { docId, hives }) {
            await fb.usersCollection
                .doc(fb.auth.currentUser.uid)
                .collection('hives')
                .doc(docId)
                .update({
                    // general
                    number: hives.number,
                    apiary: hives.apiary,
                    status: hives.status,
                    purpose: hives.purpose,
                    created: hives.created,
                    generalNote: hives.generalNote,

                    // bees
                    strength: hives.strength,
                    temperament: hives.temperament,
                    frames: hives.frames,

                    // queen
                    isQueen: hives.isQueen,
                    age: hives.age,
                    installed: hives.installed,
                    race: hives.race,
                    queenColor: hives.queenColor,
                    queenNote: hives.queenNote,
                });
        },

        async deleteHives({}, docId) {
            if (window.confirm('Czy na pewno chcesz usunąć ul?')) {
                await fb.usersCollection
                    .doc(fb.auth.currentUser.uid)
                    .collection('hives')
                    .doc(docId)
                    .delete();
            }
        },

        async getInspections() {
            fb.usersCollection
                .doc(fb.auth.currentUser.uid)
                .collection('inspections')
                .onSnapshot(snapshot => {
                    const inspectionsArray = [];
                    snapshot.docs.forEach(doc => {
                        const inspection = doc.data();
                        inspection.id = doc.id;
                        inspectionsArray.push(inspection);
                    });
                    store.commit('setInspections', inspectionsArray);
                });
        },

        async addInspections({}, inspections) {
            await fb.usersCollection
                .doc(fb.auth.currentUser.uid)
                .collection('inspections')
                .add({
                    purpose: inspections.purpose,
                    apiary: inspections.apiary,
                    hive: inspections.hive,
                    date: inspections.date,
                    strength: inspections.strength,
                    temperament: inspections.temperament,
                    frames: inspections.frames,
                    isQueen: inspections.isQueen,
                    age: inspections.age,
                    installed: inspections.installed,
                    race: inspections.race,
                    queenColor: inspections.queenColor,
                    queenNote: inspections.queenNote,
                    framesWithBees: inspections.framesWithBees,
                    framesWithBrood: inspections.framesWithBrood,
                    framesWithHoney: inspections.framesWithHoney,
                    framesWithPollen: inspections.framesWithPollen,
                    problems: inspections.problems,
                    note: inspections.note,
                    includeWeather: inspections.includeWeather,
                    conditions: inspections.conditions,
                    temperature: inspections.temperature,
                    humidity: inspections.humidity,
                    pressure: inspections.pressure,
                    wind: inspections.wind,
                });
        },

        async editInspections({}, { docId, inspections }) {
            await fb.usersCollection
                .doc(fb.auth.currentUser.uid)
                .collection('inspections')
                .doc(docId)
                .update({
                    purpose: inspections.purpose,
                    apiary: inspections.apiary,
                    hive: inspections.hive,
                    date: inspections.date,
                    strength: inspections.strength,
                    temperament: inspections.temperament,
                    frames: inspections.frames,
                    isQueen: inspections.isQueen,
                    age: inspections.age,
                    installed: inspections.installed,
                    race: inspections.race,
                    queenColor: inspections.queenColor,
                    queenNote: inspections.queenNote,
                    framesWithBees: inspections.framesWithBees,
                    framesWithBrood: inspections.framesWithBrood,
                    framesWithHoney: inspections.framesWithHoney,
                    framesWithPollen: inspections.framesWithPollen,
                    problems: inspections.problems,
                    note: inspections.note,
                    includeWeather: inspections.includeWeather,
                    conditions: inspections.conditions,
                    temperature: inspections.temperature,
                    humidity: inspections.humidity,
                    pressure: inspections.pressure,
                    wind: inspections.wind,
                });
        },

        async deleteInspections({}, docId) {
            if (window.confirm('Czy na pewno chcesz usunąć inspekcję?')) {
                await fb.usersCollection
                    .doc(fb.auth.currentUser.uid)
                    .collection('inspections')
                    .doc(docId)
                    .delete();
            }
        },

        async signup({ dispatch }, form) {
            // sign user up
            const { user } = await fb.auth.createUserWithEmailAndPassword(
                form.email,
                form.password,
            );

            // create user profile object in userCollection
            await fb.usersCollection.doc(user.uid).set({
                fullName: form.fullName,
                email: form.email,
            });

            // fetch user profile and set in state
            dispatch('fetchUserProfile', user);

            router.push('/login');
        },

        async login({ dispatch }, form) {
            // sign user in
            const { user } = await fb.auth.signInWithEmailAndPassword(
                form.email,
                form.password,
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

        async editFullName({ dispatch }, user) {
            await fb.usersCollection.doc(fb.auth.currentUser.uid).update({
                fullName: user.fullName,
            });

            dispatch('fetchUserProfile', { uid: fb.auth.currentUser.uid });
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
        },
    },
    modules: {},
});

export default store;

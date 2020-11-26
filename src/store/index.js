import Vue from "vue";
import Vuex from "vuex";
import * as fb from "../firebase";
import router from "../router/index";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        userProfile: {},
        notes: [],
        apiaries: [],
        hives: [],
        inspections: []
    },

    mutations: {
        setUserProfile(state, val) {
            state.userProfile = val;
        },

        setNotes(state, val) {
            state.notes = val;
        },

        setApiaries(state, val) {
            state.apiaries = val;
        },

        setHives(state, val) {
            state.hives = val;
        },

        setInspections(state, val) {
            state.inspections = val;
        }
    },

    actions: {
        async getNotes() {
            fb.usersCollection
                .doc(fb.auth.currentUser.uid)
                .collection("notes")
                .orderBy("createdOn", "desc")
                .onSnapshot(snapshot => {
                    let notesArray = [];

                    snapshot.forEach(doc => {
                        let note = doc.data();
                        note.id = doc.id;

                        notesArray.push(note);
                    });

                    store.commit("setNotes", notesArray);
                });
        },

        async addNote({}, note) {
            if (window.confirm("Jesteś pewny/a, że chcesz dodać notatkę?")) {
                await fb.usersCollection
                    .doc(fb.auth.currentUser.uid)
                    .collection("notes")
                    .add({
                        createdOn: new Date(),
                        content: note.content,
                        userId: fb.auth.currentUser.uid
                    });
            }
        },

        async editNote({}, { docId, note }) {
            if (window.confirm("Jesteś pewny/a, że chcesz edytować notatkę?")) {
                await fb.usersCollection
                    .doc(fb.auth.currentUser.uid)
                    .collection("notes")
                    .doc(docId)
                    .update({
                        content: note.content
                    });
            }
        },

        async deleteNote({}, docId) {
            if (window.confirm("Jesteś pewny/a, że chcesz usunąć notatkę?")) {
                await fb.usersCollection
                    .doc(fb.auth.currentUser.uid)
                    .collection("notes")
                    .doc(docId)
                    .delete();
            }
        },

        async getApiaries() {
            fb.usersCollection
                .doc(fb.auth.currentUser.uid)
                .collection("apiaries")
                .onSnapshot(snapshot => {
                    let apiariesArray = [];

                    snapshot.forEach(doc => {
                        let apiary = doc.data();
                        apiary.id = doc.id;

                        apiariesArray.push(apiary);
                    });

                    store.commit("setApiaries", apiariesArray);
                });
        },

        async addApiary({}, apiary) {
            if (window.confirm("Jesteś pewny/a, że chcesz dodać pasiekę?")) {
                await fb.usersCollection
                    .doc(fb.auth.currentUser.uid)
                    .collection("apiaries")
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
                        province: apiary.province
                    });
            }
        },

        async editApiary({}, { docId, apiary }) {
            if (window.confirm("Jesteś pewny/a, że chcesz edytować notatkę?")) {
                await fb.usersCollection
                    .doc(fb.auth.currentUser.uid)
                    .collection("apiaries")
                    .doc(docId)
                    .update({
                        name: apiary.name,
                        type: apiary.type,
                        description: apiary.description
                    });
            }
        },

        async deleteApiary({}, docId) {
            if (window.confirm("Jesteś pewny/a, że chcesz usunąć pasiekę?")) {
                await fb.usersCollection
                    .doc(fb.auth.currentUser.uid)
                    .collection("apiaries")
                    .doc(docId)
                    .delete();
            }
        },

        async getHives() {
            fb.usersCollection
                .doc(fb.auth.currentUser.uid)
                .collection("hives")
                .onSnapshot(snapshot => {
                    let hivesArray = [];
                    snapshot.docs.forEach(doc => {
                        let hive = doc.data();
                        hive.id = doc.id;
                        hivesArray.push(hive);
                    });
                    store.commit("setHives", hivesArray);
                });
        },

        async addHives({}, hives) {
            if (window.confirm("Jesteś pewny/a, że chcesz dodać ul?")) {
                await fb.usersCollection
                    .doc(fb.auth.currentUser.uid)
                    .collection("hives")
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
                        queenNote: hives.queenNote
                    });
            }
        },

        async editHives({}, { docId, hives }) {
            if (window.confirm("Jesteś pewny/a, że chcesz edytować ul?")) {
                await fb.usersCollection
                    .doc(fb.auth.currentUser.uid)
                    .collection("hives")
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
                        queenNote: hives.queenNote
                    });
            }
        },

        async deleteHives({}, docId) {
            if (window.confirm("Jesteś pewny/a, że chcesz usunąć ul?")) {
                await fb.usersCollection
                    .doc(fb.auth.currentUser.uid)
                    .collection("hives")
                    .doc(docId)
                    .delete();
            }
        },

        async getInspections() {
            fb.usersCollection
                .doc(fb.auth.currentUser.uid)
                .collection("inspections")
                .onSnapshot(snapshot => {
                    let inspectionsArray = [];
                    snapshot.docs.forEach(doc => {
                        let inspection = doc.data();
                        inspection.id = doc.id;
                        inspectionsArray.push(inspection);
                    });
                    store.commit("setInspections", inspectionsArray);
                });
        },

        async addInspections({}, inspections) {
            if (window.confirm("Jesteś pewny/a, że chcesz dodać inspekcję?")) {
                await fb.usersCollection
                    .doc(fb.auth.currentUser.uid)
                    .collection("inspections")
                    .add({
                        name: inspections.name,
                        apiary: inspections.apiary,
                        hive: inspections.hive,
                        date: inspections.date,
                        equipment: inspections.equipment,
                        odor: inspections.odor,
                        deadBees: inspections.deadBees,
                        moisture: inspections.moisture,
                        mold: inspections.mold,
                        otherObservation: inspections.otherObservation
                    });
            }
        },

        async editInspections({}, { docId, inspections }) {
            if (
                window.confirm("Jesteś pewny/a, że chcesz edytować inspekcję?")
            ) {
                await fb.usersCollection
                    .doc(fb.auth.currentUser.uid)
                    .collection("inspections")
                    .doc(docId)
                    .update({
                        name: inspections.name,
                        apiary: inspections.apiary,
                        hive: inspections.hive,
                        date: inspections.date,
                        equipment: inspections.equipment,
                        odor: inspections.odor,
                        deadBees: inspections.deadBees,
                        moisture: inspections.moisture,
                        mold: inspections.mold,
                        otherObservation: inspections.otherObservation
                    });
            }
        },

        async deleteInspections({}, docId) {
            if (window.confirm("Jesteś pewny/a, że chcesz usunąć inspekcję?")) {
                await fb.usersCollection
                    .doc(fb.auth.currentUser.uid)
                    .collection("inspections")
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
            dispatch("fetchUserProfile", user);

            router.push("/login");
        },

        async login({ dispatch }, form) {
            // sign user in
            const { user } = await fb.auth.signInWithEmailAndPassword(
                form.email,
                form.password
            );

            // fetch user profile and set in state
            dispatch("fetchUserProfile", user);
        },

        async logout({ commit }) {
            await fb.auth.signOut();

            // clear userProfile and redirect to /login
            commit("setUserProfile", {});
            router.push("/login");
        },

        async updateProfile({ dispatch }, user) {
            const userId = fb.auth.currentUser.uid;

            const currentEmail = await fb.usersCollection
                .where("email", "==", user.email)
                .get();

            /* const currentUser = await fb.usersCollection
                .where('username', '==', user.username)
                .get(); */

            if (currentEmail.empty === true) {
                await fb.usersCollection.doc(userId).update({
                    username: user.username,
                    email: user.email,
                    password: user.password
                });

                alert("Pomyślnie zmieniono email!");
            } else {
                alert("Email jest zajęty, wpisz inny.");
            }

            dispatch("fetchUserProfile", { uid: userId });
        },

        async fetchUserProfile({ commit }, user) {
            // fetch user profile
            const userProfile = await fb.usersCollection.doc(user.uid).get();

            // set user profile in state
            commit("setUserProfile", userProfile.data());

            // change router to dashboard
            if (router.currentRoute.path === "/login") {
                router.push("/");
            }
        }
    },
    modules: {}
});

export default store;

import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import { auth } from './firebase';
import './assets/scss/app.scss';

Vue.use(Vuelidate);

Vue.config.productionTip = false;

let app;
auth.onAuthStateChanged(user => {
    if (!app) {
        app = new Vue({
            router,
            store,
            render: h => h(App),
        }).$mount('#app');
    }

    if (user) {
        store.dispatch('fetchUserProfile', user);
    }
});

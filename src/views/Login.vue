<template>
    <div class="login">
        <transition
            enter-active-class="animate__animated animate__fadeInLeftBig animate__faster"
            leave-active-class="animate__animated animate__fadeOutRightBig animate__faster"
            mode="out-in"
            appear
        >
            <PasswordReset
                v-if="showPasswordReset"
                @close="togglePasswordReset()"
            ></PasswordReset>
        </transition>
        <div class="content">
            <form class="form" @submit.prevent>
                <h2 class="form__header">Logowanie 🐝</h2>
                <label class="form__label" for="email">Email</label>
                <input
                    class="form__input"
                    type="text"
                    placeholder="jan@kowalski.pl"
                    id="email"
                    v-model.trim="email"
                />
                <label class="form__label" for="password">Hasło </label>

                <input
                    class="form__input"
                    type="password"
                    id="password"
                    placeholder="******"
                    v-model.trim="password"
                />
                <div class="form__extras">
                    <ul class="form__list">
                        <li class="form__item">
                            <a class="form__link" @click="togglePasswordReset()"
                                >Zapomniałeś hasła ?</a
                            >
                        </li>
                        <li class="form__item">
                            <router-link class="form__link" to="/register"
                                >Stwórz konto</router-link
                            >
                        </li>
                    </ul>
                </div>
                <button class="btn" @click="login()">
                    Zaloguj
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import PasswordReset from "@/components/PasswordReset";

export default {
    components: {
        PasswordReset
    },
    data() {
        return {
            email: "",
            password: "",
            showPasswordReset: false
        };
    },
    methods: {
        login() {
            this.$store.dispatch("login", {
                email: this.email,
                password: this.password
            });
        },

        togglePasswordReset() {
            this.showPasswordReset = !this.showPasswordReset;
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/login.scss";
</style>

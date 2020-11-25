<template>
    <div class="passwordreset">
        <div class="content">
            <div class="content__close" @click="$emit('close')">
                <span>
                    <i class="fas fa-times"></i>
                </span>
            </div>

            <div class="content__inside" v-if="!showSuccess">
                <h3 class="content__h3">
                    Zresetuj hasło 🐝
                </h3>
                <p class="content__p">
                    Wpisz swój email aby zresetować hasło
                </p>
                <form class="content__form" @submit.prevent>
                    <input
                        class="content__input"
                        type="email"
                        placeholder="jan@kowalski.pl"
                        v-model.trim="email"
                    />
                </form>
                <transition
                    enter-active-class="animate__animated animate__shakeX animate__faster"
                    mode="out-in"
                    appear
                >
                    <p
                        v-if="errorMsg !== ''"
                        class="content__p content__p--error"
                    >
                        {{ errorMsg }}
                    </p></transition
                >
                <button @click="resetPassword()" class="btn">
                    Zresetuj
                </button>
            </div>

            <transition
                v-if="showSuccess"
                enter-active-class="animate__animated animate__bounceIn animate__fast"
                mode="out-in"
                appear
            >
                <div class="content__extras">
                    <p class="content__p content__p--success">Sukces 👍</p>
                    <p class="content__p">
                        Sprawdź email w celu odnalezienia linka do resetowania
                        hasła
                    </p>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import { auth } from "@/firebase";

export default {
    data() {
        return {
            email: "",
            showSuccess: false,
            errorMsg: ""
        };
    },
    methods: {
        async resetPassword() {
            this.errorMsg = "";

            try {
                await auth.sendPasswordResetEmail(this.email);
                this.showSuccess = true;

                setTimeout(() => {
                    this.showSuccess = false;
                }, 5000);

                this.email = "";
            } catch (err) {
                this.errorMsg = err.message;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/passwordReset.scss";
</style>

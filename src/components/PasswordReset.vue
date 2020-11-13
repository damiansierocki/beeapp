<template>
    <div class="passwordreset">
        <div class="content">
            <div class="content__close" @click="$emit('close')">
                <span>
                    <i class="fas fa-times"></i>
                </span>
            </div>

            <div v-if="!showSuccess" class="content__inside">
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
                v-else
                enter-active-class="animate__animated animate__bounceIn animate__fast"
                mode="out-in"
                appear
            >
                <div class="content__extras">
                    <p class="content__p--success">Sukces 👍</p>
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
            } catch (err) {
                this.errorMsg = err.message;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.passwordreset {
    display: flex;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(#333, 0.5);

    .content {
        position: relative;
        margin: auto;
        width: 90%;
        max-width: 400px;
        background: #fff;
        padding: 2rem;
        border-radius: 5px;
        box-shadow: 0 0 5px 0 rgba(#333, 0.5);
        z-index: 1;

        &__close {
            position: absolute;
            top: 0.7rem;
            right: 0.7rem;
            padding: 0.5rem;
        }

        &__h3 {
            font-size: 1.6rem;
        }

        &__p {
            margin: 1rem 0;
        }

        &__input {
            padding: 0.8rem;
            border: 0.5px solid black;
            font-size: 1rem;
            width: 90%;

            &:focus {
                outline: none;
                box-shadow: inset 2px 2px 5px 0 rgba(42, 45, 48, 0.12);
            }

            &::placeholder {
                color: #c8cddf;
            }
        }

        &__p--error {
            color: tomato;
            font-size: 0.8rem;
        }

        .btn {
            margin: 0 auto;
            margin-top: 12px;
            width: 50%;
            box-shadow: 0px 1px 0px 0px #fff6af;
            background: linear-gradient(to bottom, #ffec64 5%, #ff9d00 100%);
            background-color: #ffec64;
            border-radius: 6px;
            border: 1px solid #ffaa22;
            display: block;
            color: #333333;
            font-size: 15px;
            padding: 6px 24px;
            text-shadow: 0px 1px 0px #ffee66;

            &:active {
                position: relative;
                top: 1px;
            }
        }

        &__p--success {
            font-weight: bold;
            font-size: 2rem;
            color: green;
        }
    }
}

@media (min-width: 1024px) {
    .passwordreset {
        .content {
            &__close {
                cursor: pointer;
                display: block;
                transition: all 0.2s;

                &:hover {
                    transform: scale(1.2);
                }
            }

            .btn {
                cursor: pointer;
                display: block;

                transition: all 0.2s;

                &:hover {
                    font-weight: bold;
                }
            }
        }
    }
}
</style>

<template>
    <div class="passwordreset">
        <div class="container">
            <div class="container__logo">
                <h1 class="container__header">🐝app</h1>
            </div>

            <form class="form" @submit.prevent v-if="!showSuccess">
                <h2 class="form__header">Odzyskaj hasło</h2>

                <p class="form__text">
                    Nie martw się, zdarza się najlepszym z nas.
                </p>

                <!-- email -->
                <label for="email" class="form__label">Email</label>
                <input
                    class="form__input"
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Wpisz swój email..."
                    v-model.trim="email"
                />

                <transition
                    enter-active-class="animate__animated animate__shakeX"
                    mode="out-in"
                    appear
                >
                    <p
                        class="error"
                        v-if="!$v.email.required && $v.email.$dirty"
                    >
                        Email jest wymagany!
                    </p>

                    <p class="error" v-if="!$v.email.email && $v.email.$dirty">
                        Email ma zły format! (jankowalski@email.com)
                    </p>
                </transition>

                <button
                    class="form__button"
                    type="submit"
                    @click="resetPassword()"
                    v-if="!isPending"
                >
                    Przywróć hasło
                </button>

                <transition
                    enter-active-class="animate__animated animate__shakeX"
                    mode="out-in"
                    appear
                >
                    <p class="info" v-if="authStatus === 'USER-NOT-FOUND'">
                        Nie znaleziono użytkownika.
                    </p>
                </transition>

                <div class="sk-chase" v-if="resetStatus === 'PENDING'">
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                </div>
            </form>

            <transition
                v-if="showSuccess"
                enter-active-class="animate__animated animate__bounceIn animate__fast"
                mode="out-in"
                appear
            >
                <div class="container__success">
                    <p class="container__text--big ">
                        Sukces 👍
                    </p>
                    <p class="container__text--small">
                        Sprawdź email w celu odnalezienia linku do resetowania
                        hasła.
                    </p>
                </div>
            </transition>

            <div class="container__extras">
                <router-link class="back-to-login" to="/login">
                    Cofnij do logowania
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { auth } from '@/firebase';
import { required, email } from 'vuelidate/lib/validators';

export default {
    data() {
        return {
            email: '',
            showSuccess: false,
            resetStatus: null,
            isPending: false,
            authStatus: '',
        };
    },

    validations: {
        email: {
            required,
            email,
        },
    },

    methods: {
        async resetPassword() {
            this.$v.$touch();

            if (this.$v.$invalid) {
                this.resetStatus = 'ERROR';
            } else {
                await auth
                    .sendPasswordResetEmail(this.email)
                    .then(() => {
                        this.resetStatus = 'PENDING';
                        this.isPending = true;
                        this.authStatus = '';

                        setTimeout(() => {
                            this.showSuccess = true;
                            this.resetStatus = 'OK';
                            this.isPending = false;
                        }, 2000);
                    })
                    .catch(err => {
                        const errCode = err.code;

                        if (errCode === 'auth/user-not-found') {
                            this.authStatus = 'USER-NOT-FOUND';
                        } else if (errCode === 'auth/too-many-requests') {
                            this.authStatus = 'TOO-MANY-REQUESTS';
                        }
                    });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &__logo {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #dddddda1;
        width: 100%;
        height: 100%;
        user-select: none;
    }

    &__header {
        font-family: 'Fredericka the Great', cursive;
        font-size: 6rem;
    }

    .form {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-radius: 0.2rem;
        padding: 3rem;

        &__header {
            font-size: 2rem;
            position: relative;
            padding: 2rem 0rem;

            &::after {
                content: '';
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                width: 100%;
                height: 0.5px;
                background: #000000;
            }
        }

        &__text {
            margin-top: 1rem;
        }

        &__label {
            padding: 1.5rem 0rem;
            font-size: 1.5rem;
        }

        &__input {
            border: 1px solid #ccc;
            padding: 1rem;
            border-radius: 0.2rem;
            transition: all 0.1s;

            &:focus {
                outline: 2px solid orange;
            }
        }

        &__button {
            margin-top: 4rem;
            padding: 1rem 0;
            cursor: pointer;
            border: 1px solid #ccc;
            border-radius: 0.2rem;
            background-color: #f5f5f5;

            &:hover {
                background-color: #e7e7e7c7;
            }
        }

        .error {
            color: tomato;
            margin-top: 0.5rem;
        }

        .info {
            margin-top: 0.5rem;
        }

        // sk-chase
        .sk-chase {
            width: 40px;
            height: 40px;
            position: relative;
            animation: sk-chase 2.5s infinite linear both;
            margin: 0 auto;
            margin-top: 2rem;
        }

        .sk-chase-dot {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            animation: sk-chase-dot 2s infinite ease-in-out both;
        }

        .sk-chase-dot:before {
            content: '';
            display: block;
            width: 25%;
            height: 25%;
            background-color: black;
            border-radius: 100%;
            animation: sk-chase-dot-before 2s infinite ease-in-out both;
        }

        .sk-chase-dot:nth-child(1) {
            animation-delay: -1.1s;
        }
        .sk-chase-dot:nth-child(2) {
            animation-delay: -1s;
        }
        .sk-chase-dot:nth-child(3) {
            animation-delay: -0.9s;
        }
        .sk-chase-dot:nth-child(4) {
            animation-delay: -0.8s;
        }
        .sk-chase-dot:nth-child(5) {
            animation-delay: -0.7s;
        }
        .sk-chase-dot:nth-child(6) {
            animation-delay: -0.6s;
        }
        .sk-chase-dot:nth-child(1):before {
            animation-delay: -1.1s;
        }
        .sk-chase-dot:nth-child(2):before {
            animation-delay: -1s;
        }
        .sk-chase-dot:nth-child(3):before {
            animation-delay: -0.9s;
        }
        .sk-chase-dot:nth-child(4):before {
            animation-delay: -0.8s;
        }
        .sk-chase-dot:nth-child(5):before {
            animation-delay: -0.7s;
        }
        .sk-chase-dot:nth-child(6):before {
            animation-delay: -0.6s;
        }

        @keyframes sk-chase {
            100% {
                transform: rotate(360deg);
            }
        }

        @keyframes sk-chase-dot {
            80%,
            100% {
                transform: rotate(360deg);
            }
        }

        @keyframes sk-chase-dot-before {
            50% {
                transform: scale(0.4);
            }
            100%,
            0% {
                transform: scale(1);
            }
        }
    }

    &__success {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 3rem;
    }

    &__text {
        &--big {
            font-size: 2.5rem;
            color: green;
        }

        &--small {
            font-size: 1.8rem;
            margin-top: 2rem;
            text-align: center;
        }
    }

    &__extras {
        margin-top: 2rem;
        font-size: 1.4rem;
        display: flex;
        flex-direction: column;
        text-decoration: underline;

        .back-to-login {
            cursor: pointer;
            color: black;

            &:hover {
                font-weight: bold;
            }
        }
    }
}

@media (min-width: 480px) {
    .container {
        background-color: #dddddda1;
        height: 100vh;
        justify-content: space-evenly;

        &__logo {
            background-color: transparent;
            height: 0;
        }

        .form {
            border: 1px solid #ccc;
            background: white;
            max-width: 480px;
        }

        &__extras {
            margin: 0;
        }
    }
}
</style>

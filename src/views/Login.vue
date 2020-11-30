<template>
    <div class="login">
        <div class="container">
            <div class="container__logo">
                <h1 class="container__header">🐝app</h1>
            </div>

            <form class="form" @submit.prevent>
                <h2 class="form__header">Zaloguj się</h2>

                <!-- email -->
                <label class="form__label" for="email">Email</label>
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

                <!-- password -->
                <label class="form__label" for="password">Hasło</label>
                <input
                    class="form__input"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Wpisz swoje hasło..."
                    v-model.trim="password"
                />

                <transition
                    enter-active-class="animate__animated animate__shakeX"
                    mode="out-in"
                    appear
                >
                    <p
                        class="error"
                        v-if="!$v.password.required && $v.password.$dirty"
                    >
                        Hasło jest wymagane!
                    </p>
                </transition>

                <button
                    class="form__button "
                    type="submit"
                    @click="login()"
                    v-if="!isPending"
                >
                    Zaloguj się
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

                <transition
                    enter-active-class="animate__animated animate__shakeX"
                    mode="out-in"
                    appear
                >
                    <p class="info" v-if="authStatus === 'WRONG-PASSWORD'">
                        Złe hasło.
                    </p>
                </transition>

                <transition
                    enter-active-class="animate__animated animate__shakeX"
                    mode="out-in"
                    appear
                >
                    <p class="info" v-if="authStatus === 'TOO-MANY-REQUESTS'">
                        Zbyt dużo logowań. Spróbuj później.
                    </p>
                </transition>

                <div class="sk-chase" v-if="loginStatus === 'PENDING'">
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                </div>
            </form>

            <div class="container__extras">
                <router-link class="forgot-password" to="/passwordreset"
                    >Zapomniałaś/eś hasła?</router-link
                >
                <router-link class="create-account" to="/register"
                    >Stwórz konto</router-link
                >
            </div>
        </div>
    </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';

export default {
    data() {
        return {
            email: '',
            password: '',
            loginStatus: null,
            isPending: false,
            authStatus: '',
        };
    },

    validations: {
        email: {
            required,
            email,
        },

        password: {
            required,
        },
    },

    methods: {
        login() {
            this.$v.$touch();

            if (this.$v.$invalid) {
                this.loginStatus = 'ERROR';
            } else {
                this.$store
                    .dispatch('login', {
                        email: this.email,
                        password: this.password,
                    })
                    .then(() => {
                        this.loginStatus = 'PENDING';
                        this.isPending = true;
                        this.authStatus = '';

                        setTimeout(() => {
                            this.loginStatus = 'OK';
                            this.isPending = false;
                        }, 2000);
                    })
                    .catch(err => {
                        const errCode = err.code;

                        if (errCode === 'auth/user-not-found') {
                            this.authStatus = 'USER-NOT-FOUND';
                        } else if (errCode === 'auth/wrong-password') {
                            this.authStatus = 'WRONG-PASSWORD';
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

    &__extras {
        margin-top: 2rem;
        font-size: 1.4rem;
        display: flex;
        flex-direction: column;
        text-decoration: underline;

        .forgot-password {
            cursor: pointer;
            color: black;

            &:hover {
                font-weight: bold;
            }
        }

        .create-account {
            cursor: pointer;
            margin-top: 1.5rem;
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

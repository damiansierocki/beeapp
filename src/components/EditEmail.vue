<template>
    <div class="editemail">
        <div class="container">
            <form class="form" @submit.prevent>
                <h2 class="form__header">Zmień email</h2>

                <div class="container__close" @click="$emit('close')">
                    <i class="fas fa-times"></i>
                </div>

                <!-- email -->
                <label for="email" class="form__label">Email</label>
                <input
                    class="form__input"
                    type="text"
                    id="email"
                    name="email"
                    :placeholder="oldEmail"
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
                    @click="editEmail()"
                    v-if="!isPending"
                >
                    Zmień email
                </button>

                <transition
                    enter-active-class="animate__animated animate__shakeX"
                    mode="out-in"
                    appear
                >
                    <p
                        class="info"
                        v-if="authStatus === 'EMAIL-ALREADY-IN-USE'"
                    >
                        Email jest zajęty. Spróbuj inny.
                    </p>
                </transition>

                <transition
                    enter-active-class="animate__animated animate__shakeX"
                    mode="out-in"
                    appear
                >
                    <p class="info" v-if="authStatus === 'TOO-MANY-REQUESTS'">
                        Zbyt dużo zapytań. Spróbuj później.
                    </p>
                </transition>

                <transition
                    enter-active-class="animate__animated animate__shakeX"
                    mode="out-in"
                    appear
                >
                    <p
                        class="info"
                        v-if="authStatus === 'REQUIRES-RECENT-LOGIN'"
                    >
                        Wymagane ponowne zalogowanie.
                    </p>
                </transition>

                <div class="sk-chase" v-if="editEmailStatus === 'PENDING'">
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                </div>

                <p class="success" v-if="editEmailStatus === 'OK'">
                    Pomyślnie edytowano email 👍
                </p>
            </form>
        </div>
    </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import { mapState } from 'vuex';
import * as firebase from '../firebase';

export default {
    data() {
        return {
            email: '',
            editEmailStatus: null,
            isPending: false,
            oldEmail: '',
            authStatus: '',
        };
    },

    validations: {
        email: {
            required,
            email,
        },
    },

    computed: {
        ...mapState(['userProfile']),
    },

    created() {
        this.oldEmail = firebase.auth.currentUser.email;
    },

    methods: {
        editEmail() {
            this.$v.$touch();

            if (this.$v.$invalid) {
                this.editEmailStatus = 'ERROR';
            } else {
                firebase.auth.currentUser
                    .updateEmail(this.email)
                    .then(() => {
                        this.editEmailStatus = 'PENDING';
                        this.isPending = true;

                        setTimeout(() => {
                            this.editEmailStatus = 'OK';
                            this.isPending = false;
                        });
                    })
                    .catch(err => {
                        const errCode = err.code;

                        if (errCode === 'auth/email-already-in-use') {
                            this.authStatus = 'EMAIL-ALREADY-IN-USE';
                        } else if (errCode === 'auth/too-many-requests') {
                            this.authStatus = 'TOO-MANY-REQUESTS';
                        } else if (errCode === 'auth/requires-recent-login') {
                            this.authStatus = 'REQUIRES-RECENT-LOGIN';
                        }
                    });

                setTimeout(() => {
                    this.email = '';
                    this.editEmailStatus = '';
                }, 2000);
            }

            this.$store.dispatch('fetchUserProfile', {
                uid: firebase.auth.currentUser.uid,
            });
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
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #eee;
    width: 100%;
    z-index: 1;
    padding: 2rem;

    &__close {
        position: absolute;
        padding: 1rem 2rem;
        font-size: 2rem;
        top: 0;
        right: 0;
        cursor: pointer;
        transition: 0.1s;

        &:hover {
            transform: scale(1.1);
        }
    }

    .form {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-top: 2rem;

        &__header {
            font-size: 2rem;
            position: relative;
            padding: 2rem 0;

            &::after {
                content: '';
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                width: 100%;
                height: 0.5px;
                background: #000;
            }
        }

        &__label {
            padding: 1.5rem 0;
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
            margin-top: 2rem;
            padding: 1rem 0;
            cursor: pointer;
            border: 1px solid #ccc;
            border-radius: 0.2rem;
            background-color: #f5f5f5;
            transition: 0.1s;

            &:hover {
                background-color: #e7e7e7c7;
            }
        }

        .error {
            color: tomato;
            margin-top: 0.5rem;
        }

        .success {
            color: green;
            margin: 0 auto;
            margin-top: 1.5rem;
            font-size: 1.5rem;
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

        .sk-chase-dot::before {
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

        .sk-chase-dot:nth-child(1)::before {
            animation-delay: -1.1s;
        }

        .sk-chase-dot:nth-child(2)::before {
            animation-delay: -1s;
        }

        .sk-chase-dot:nth-child(3)::before {
            animation-delay: -0.9s;
        }

        .sk-chase-dot:nth-child(4)::before {
            animation-delay: -0.8s;
        }

        .sk-chase-dot:nth-child(5)::before {
            animation-delay: -0.7s;
        }

        .sk-chase-dot:nth-child(6)::before {
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

            0% {
                transform: scale(1);
            }
        }
    }
}

@media (min-width: 480px) {
    .container {
        max-width: 480px;
        border-radius: 0.2rem;
        border: 0.5px solid black;
        background: white;
        top: 50%;
    }
}
</style>

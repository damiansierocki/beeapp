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
@import "../assets/scss/colors";

.login {
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .content {
        .form {
            background-color: $white;
            padding: 3rem;
            display: flex;
            flex-direction: column;
            border-radius: 1rem;
            box-shadow: 10px 10px 64px 22px rgba(0, 0, 0, 0.5);
            width: 90vw;

            &__header {
                font-size: 1.8rem;
                margin-bottom: 1rem;
            }

            &__label {
                margin: 0.7rem 0 0.7rem 0;
                font-size: 1.4rem;
            }

            &__input {
                padding: 1rem;
                border: 0.5px solid $black;
                font-size: 1rem;

                transition: 0.2s;

                &:focus {
                    outline: 0;
                    -webkit-box-shadow: 0px 10px 13px -7px #000000,
                        5px 5px 15px 5px rgba(0, 0, 0, 0);
                    box-shadow: 0px 10px 13px -7px #000000,
                        5px 5px 15px 5px rgba(0, 0, 0, 0);
                }

                &::placeholder {
                    color: $base-placeholder;
                }
            }

            &__extras {
                margin-top: 10px;
                font-size: 1.1rem;
            }

            &__list {
                list-style: none;
                display: flex;
                flex-direction: column;
            }

            &__item {
                line-height: 2rem;
            }

            &__link {
                text-decoration: none;
                color: black;
                padding: 0.4rem;
            }

            .btn {
                margin: 0 auto;
                margin-top: 1rem;
                width: 70%;
                box-shadow: 0px 1px 0px 0px #fff6af;
                background: linear-gradient(
                    to bottom,
                    #ffec64 5%,
                    #ff9d00 100%
                );
                background-color: #ffec64;
                border-radius: 6px;
                border: 1px solid #ffaa22;
                display: block;
                color: $greyer;
                font-size: 1rem;
                padding: 0.5rem;

                &:active {
                    position: relative;
                    top: 0.2rem;
                }
            }
        }
    }
}

@media (max-width: 319px) {
    .login {
        .content {
            .form {
                padding: 2rem;

                &__header {
                    font-size: 1.8rem;
                }

                &__label {
                    font-size: 1.3rem;
                }

                &__input {
                    padding: 0.7rem;
                }

                .btn {
                    width: 70%;
                }
            }
        }
    }
}

@media (min-width: 320px) {
    .login {
        .content {
            .form {
                .btn {
                    width: 80%;
                }
            }
        }
    }
}

@media (min-width: 360px) {
    .login {
        .content {
            .form {
                .btn {
                    width: 70%;
                }
            }
        }
    }
}

@media (min-width: 414px) {
    .login {
        .content {
            .form {
                width: 85vw;

                .btn {
                    width: 70%;
                }
            }
        }
    }
}

@media (min-width: 540px) {
    .login {
        .content {
            .form {
                width: 70vw;

                .btn {
                    width: 60%;
                }
            }
        }
    }
}

@media (min-width: 768px) {
    .login {
        .content {
            .form {
                width: 55vw;
                padding: 3rem;

                &__item {
                    line-height: 1.5rem;
                }

                &__link {
                    cursor: pointer;
                    transition: 0.2s;
                    display: block;
                    width: 50%;

                    &:hover {
                        transform: scale(1.2);
                        font-weight: bold;
                    }
                }

                .btn {
                    cursor: pointer;
                    transition: 0.2s;

                    &:hover {
                        transform: scale(1.1);
                        font-weight: bold;
                    }
                }
            }
        }
    }
}

@media (min-width: 1024px) {
    .login {
        .content {
            .form {
                width: 45vw;
            }
        }
    }
}

@media (min-width: 1280px) {
    .login {
        .content {
            .form {
                width: 35vw;
            }
        }
    }
}

@media (min-width: 1440px) {
    .login {
        .content {
            .form {
                width: 30vw;
            }
        }
    }
}
</style>

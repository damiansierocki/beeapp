<template>
    <div class="register">
        <div class="content">
            <form class="form" @submit.prevent>
                <h2 class="form__header">Rejestracja 🐝</h2>
                <label class="form__label" for="username"
                    >Nazwa użytkownika</label
                >
                <input
                    class="form__input"
                    type="text"
                    placeholder="janek123"
                    id="username"
                    v-model.trim="username"
                />
                <label class="form__label" for="email">Email</label>
                <input
                    class="form__input"
                    type="text"
                    placeholder="jan@kowalski.pl"
                    id="email"
                    v-model.trim="email"
                />
                <label class="form__label" for="password">Hasło</label>
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
                            <router-link class="form__link" to="/login"
                                >Cofnij do logowania</router-link
                            >
                        </li>
                    </ul>
                </div>
                <button class="btn" @click="signup()">
                    Zarejestruj się
                </button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            email: '',
            password: '',
        };
    },
    methods: {
        signup() {
            this.$store.dispatch('signup', {
                username: this.username,
                email: this.email,
                password: this.password,
            });
        },
    },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/colors';

.register {
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .content {
        .form {
            background: $base-background;
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

                transition: all 0.2s ease-out;

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
                padding: 0.4rem;
            }

            &__link {
                text-decoration: none;
                color: $black;
            }

            .btn {
                margin: 0 auto;
                margin-top: 1rem;
                width: 60%;
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
                color: #333333;
                font-size: 1rem;
                padding: 0.5rem;
                text-shadow: 0px 1px 0px #ffee66;

                &:active {
                    position: relative;
                    top: 0.2rem;
                }
            }
        }
    }
}

@media (max-width: 319px) {
    .register {
        .content {
            .form {
                width: 90vw;
                padding: 2rem;

                &__header {
                    font-size: 1.6rem;
                }

                &__label {
                    font-size: 1.2rem;
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
    .register {
        .content {
            .form {
                .btn {
                    width: 70%;
                }
            }
        }
    }
}

@media (min-width: 360px) {
    .register {
        .content {
            .form {
                .btn {
                    width: 65%;
                }
            }
        }
    }
}

@media (min-width: 414px) {
    .register {
        .content {
            .form {
                width: 85vw;

                .btn {
                    width: 60%;
                }
            }
        }
    }
}

@media (min-width: 540px) {
    .register {
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
    .register {
        .content {
            .form {
                width: 55vw;

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
                    width: 60%;
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
    .register {
        .content {
            .form {
                width: 45vw;
            }
        }
    }
}

@media (min-width: 1280px) {
    .register {
        .content {
            .form {
                width: 35vw;
            }
        }
    }
}

@media (min-width: 1440px) {
    .register {
        .content {
            .form {
                width: 30vw;
            }
        }
    }
}
</style>

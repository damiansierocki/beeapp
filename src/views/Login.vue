<template>
    <div class="login">
        <PasswordReset
            v-if="showPasswordReset"
            @close="togglePasswordReset()"
        ></PasswordReset>
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
                            <a class="form__link" @click="togglePasswordReset()"
                                >Zapomniałeś hasła ?</a
                            >
                        </li>
                        <li>
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
.login {
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;

    .content {
        .form {
            background: #f9faff;
            padding: 3rem;
            display: flex;
            flex-direction: column;
            border-radius: 5px;
            box-shadow: 10px 10px 64px 22px rgba(0, 0, 0, 0.5);

            &__header {
                font-size: 2rem;
                border-bottom: 1px dashed black;
                margin-bottom: 1rem;
            }

            &__label {
                margin: 0.7rem 0 0.7rem 0;
                font-size: 1.4rem;
            }

            &__input {
                padding: 0.8rem;
                border: 0.5px solid black;
                font-size: 1rem;

                transition: all 0.2s ease-out;

                &:focus {
                    outline: none;
                    box-shadow: inset 2px 2px 5px 0 rgba(42, 45, 48, 0.12);
                }

                &::placeholder {
                    color: #c8cddf;
                }
            }

            &__extras {
                margin-top: 10px;
                font-size: 1rem;
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
                color: #333333;
                font-size: 1.3rem;
                padding: 7px 25px;
                text-shadow: 0px 1px 0px #ffee66;

                &:active {
                    position: relative;
                    top: 0.2rem;
                }
            }
        }
    }
}

@media (min-width: 1024px) {
    .login {
        .content {
            .form {
                &__link {
                    cursor: pointer;
                    transition: all 0.2s;

                    &:hover {
                        font-weight: bold;
                    }
                }

                .btn {
                    cursor: pointer;
                    transition: all 0.2s;

                    &:hover {
                        font-weight: bold;
                    }
                }
            }
        }
    }
}
</style>

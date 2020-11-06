<template>
    <div class="register">
        <div class="form">
            <form @submit.prevent>
                <h2>Rejestracja 🐝</h2>
                <label for="username">Nazwa użytkownika</label>
                <input
                    type="text"
                    placeholder="janek123"
                    id="username"
                    v-model.trim="username"
                />
                <label for="email">Email</label>
                <input
                    type="text"
                    placeholder="jan@kowalski.pl"
                    id="email"
                    v-model.trim="email"
                />
                <label for="password">Hasło</label>
                <input
                    type="password"
                    id="password"
                    placeholder="******"
                    v-model.trim="password"
                />
                <div class="extras">
                    <ul>
                        <li>
                            <router-link class="link" to="/login"
                                >Cofnij do logowania</router-link
                            >
                        </li>
                    </ul>
                </div>
                <button class="button" @click="signup()">
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
            username: "",
            email: "",
            password: ""
        };
    },
    methods: {
        signup() {
            this.$store.dispatch("signup", {
                username: this.username,
                email: this.email,
                password: this.password
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.register {
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .header {
        h1 {
            font-size: 3rem;
        }
    }

    .form {
        padding: 0 1.5rem 0 1.5rem;

        h2 {
            font-size: 2rem;
        }

        form {
            background: #f9faff;
            padding: 1rem 2rem 2rem 2rem;
            display: flex;
            flex-direction: column;
            border-radius: 30px;
            box-shadow: 10px 10px 64px 22px rgba(0, 0, 0, 0.5);

            label {
                margin: 10px 0 10px 0;
                font-size: 1.3rem;
            }

            input {
                padding: 15px;
                border-radius: 50px;
                border: 0.5px solid black;
                font-size: 0.9rem;

                transition: all 0.2s ease-out;

                &:focus {
                    outline: none;
                    box-shadow: inset 2px 2px 5px 0 rgba(42, 45, 48, 0.12);
                }

                &::placeholder {
                    color: #c8cddf;
                }
            }

            .extras {
                margin-top: 10px;
                text-align: left;

                ul {
                    list-style: none;
                    display: flex;
                    flex-direction: column;

                    li {
                        line-height: 2rem;

                        a {
                            text-decoration: none;
                            cursor: pointer;
                            color: black;
                        }

                        .link {
                            text-decoration: none;
                            cursor: pointer;
                            color: black;
                        }
                    }
                }
            }

            .button {
                margin: 0 auto;
                margin-top: 12px;
                width: 80%;
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
                cursor: pointer;
                color: #333333;
                font-size: 15px;
                font-weight: bold;
                padding: 6px 24px;
                text-shadow: 0px 1px 0px #ffee66;

                &:hover {
                    background: linear-gradient(
                        to bottom,
                        #ff9d00 5%,
                        #ffec64 100%
                    );
                    background-color: #ff9d00;
                }

                &:active {
                    position: relative;
                    top: 1px;
                }
            }
        }
    }
}

// min-width: 768 px - ipad width, each elements multiplied by 1.2
@media (min-width: 768px) {
    .register {
        .header {
            h1 {
                font-size: 3.6rem;
            }
        }

        .form {
            h2 {
                font-size: 2.4rem;
            }

            form {
                padding: 1.2rem 2.4rem 2.4rem 2.4rem;

                label {
                    margin: 12px 0 12px 0;
                }

                input {
                    padding: 18px;
                    font-size: 1.08rem;

                    &:hover {
                        box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.5);
                    }
                }
            }

            .extras {
                margin-top: 12px;

                ul {
                    li {
                        line-height: 2.4rem;

                        a {
                            &:hover {
                                font-weight: bold;
                            }
                        }

                        .link {
                            &:hover {
                                font-weight: bold;
                            }
                        }
                    }
                }
            }

            .button {
                margin-top: 12px;
                font-size: 18px;
                padding: 7.2px 28.8px;

                &:hover {
                    background: none;
                }

                &:active {
                    top: 1.2px;
                }
            }
        }
    }
}
</style>

<template>
    <div class="myaccount">
        <Nav v-if="showIfUserLogged">
            <template v-slot:nav-center__slot>
                <h1 class="nav-center__slot">Moje konto</h1>
            </template>
        </Nav>

        <div class="content">
            <h1 class="content__title">Edytuj profil 🐝</h1>

            <form class="content__form" @submit.prevent>
                <label for="username" class="content__label"
                    >Nazwa użytkownika</label
                >
                <input
                    class="content__input"
                    type="text"
                    v-model.trim="user.username"
                    id="username"
                    :placeholder="userProfile.username"
                />

                <label for="email" class="content__label">Email</label>
                <input
                    class="content__input"
                    type="text"
                    v-model.trim="user.email"
                    id="email"
                    :placeholder="userProfile.email"
                />

                <label for="password" class="content__label">Hasło</label>
                <input
                    class="content__input"
                    type="text"
                    v-model.trim="user.password"
                    id="password"
                    :placeholder="userProfile.password"
                />

                <div class="content__buttons">
                    <button
                        class="content__button content__button--cancel"
                        @click="cancel()"
                    >
                        Wyczyść
                        <i class="fas fa-window-close"></i>
                    </button>
                    <button
                        class="content__button content__button--save"
                        @click="updateProfile()"
                    >
                        Zapisz
                        <i class="fas fa-save"></i>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Nav from "@/components/Nav";
import { mapState } from "vuex";

export default {
    data() {
        return {
            user: {
                username: "",
                email: "",
                password: ""
            }
        };
    },

    components: {
        Nav
    },

    computed: {
        ...mapState(["userProfile"]),

        showIfUserLogged() {
            return Object.keys(this.userProfile).length > 1;
        }
    },

    methods: {
        cancel() {
            this.user.username = "";
            this.user.email = "";
            this.user.password = "";
        },

        updateProfile() {
            this.$store.dispatch("updateProfile", {
                username:
                    this.user.username !== ""
                        ? this.user.username
                        : this.userProfile.username,
                email:
                    this.user.email !== ""
                        ? this.user.email
                        : this.userProfile.email,
                password:
                    this.user.password !== ""
                        ? this.user.password
                        : this.userProfile.password
            });

            this.user.username = "";
            this.user.email = "";
            this.user.password = "";
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/colors";

.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: calc(100vh - 5.5rem);
    background: #eee;

    &__title {
        font-size: 1.8rem;
        margin-top: 4rem;
    }

    &__form {
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 2.5rem;
    }

    &__label {
        font-size: 1.3rem;
        margin-top: 0.3rem;
    }

    &__input {
        margin-top: 0.3rem;
        padding: 0.7rem;
        transition: 0.2s;

        &:focus {
            outline: 0;
            -webkit-box-shadow: 0px 10px 13px -7px #000000,
                5px 5px 15px 5px rgba(0, 0, 0, 0);
            box-shadow: 0px 10px 13px -7px #000000,
                5px 5px 15px 5px rgba(0, 0, 0, 0);
        }
    }

    &__buttons {
        display: flex;
        justify-content: space-around;
    }

    &__button {
        padding: 0.6rem;
        font-size: 1rem;
        margin-top: 2rem;
        background-color: $white;
        outline: 0;
        border: 0;
        -webkit-box-shadow: 0px 10px 13px -7px #000000,
            5px 5px 15px 5px rgba(0, 0, 0, 0);
        box-shadow: 0px 10px 13px -7px #000000,
            5px 5px 15px 5px rgba(0, 0, 0, 0);
        transition: all 0.2s;

        &--cancel {
            color: red;
        }

        &--save {
            color: green;
        }

        &:active {
            transform: scale(1.3);
        }
    }
}

@media (min-width: 320px) {
    .content {
        height: calc(100vh - 5.48rem);
    }
}

@media (min-width: 360px) {
    .content {
        &__form {
            padding: 2.5rem 3.5rem;
        }
    }
}

@media (min-width: 375px) {
    .content {
        &__form {
            padding: 2.5rem 5rem;
        }
    }
}

@media (min-width: 540px) {
    .content {
        justify-content: center;
        height: calc(100vh - 5.2rem);

        &__title {
            margin: 0;
        }

        &__form {
            padding: 2.5rem 9rem;
        }

        &__button {
            font-size: 1.2rem;
        }
    }
}

@media (min-width: 768px) {
    .content {
        &__title {
            font-size: 2.5rem;
        }

        &__label {
            font-size: 1.5rem;
        }

        &__input {
            padding: 1rem;
        }

        &__form {
            padding: 2.5rem 17rem;
        }

        &__button {
            cursor: pointer;
            font-size: 1.3rem;
            transition: 0.2s;

            &:hover {
                transform: scale(1.3);
            }

            &:active {
                position: relative;
                top: 0.5rem;
            }
        }
    }
}

@media (min-width: 1024px) {
    .content {
        &__form {
            padding: 2.5rem 24rem;
        }
    }
}

@media (min-width: 1280px) {
    .content {
        &__form {
            padding: 2.5rem 33rem;
        }
    }
}

@media (min-width: 1440px) {
    .content {
        &__form {
            padding: 2.5rem 40rem;
        }
    }
}
</style>

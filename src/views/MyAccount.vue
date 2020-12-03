<template>
    <div class="myaccount">
        <Nav v-if="showIfUserLogged">
            <template v-slot:actual-page__slot>
                <p class="actual-page__slot">Moje konto</p>
            </template>
        </Nav>

        <EditFullName
            v-if="showEditFullName"
            @close="toggleEditFullName()"
        ></EditFullName>

        <EditEmail v-if="showEditEmail" @close="toggleEditEmail()"></EditEmail>

        <EditPassword
            v-if="showEditPassword"
            @close="toggleEditPassword()"
        ></EditPassword>

        <div class="container">
            <div class="container__inside">
                <h2 class="container__header">Twoje konto</h2>

                <!-- Imię i nazwisko -->
                <p class="container__label">Imię i nazwisko</p>
                <p class="container__text">
                    {{ userProfile.fullName }}
                    <span class="container__edit" @click="toggleEditFullName()"
                        ><i class="fas fa-user-edit "></i
                    ></span>
                </p>

                <!-- adres email -->
                <p class="container__label">Adres Email</p>
                <p class="container__text">
                    {{ this.email }}
                    <span class="container__edit" @click="toggleEditEmail()"
                        ><i class="fas fa-user-edit"></i
                    ></span>
                </p>

                <!-- haslo -->
                <p class="container__label">Hasło</p>
                <p class="container__text">
                    ******
                    <span class="container__edit" @click="toggleEditPassword()"
                        ><i class="fas fa-user-edit "></i
                    ></span>
                </p>
            </div>

            <div class="container__extras">
                <router-link class="homepage" to="/"
                    >Wróć do strony głównej</router-link
                >
            </div>
        </div>
    </div>
</template>

<script>
import Nav from '@/components/Nav';
import EditFullName from '@/components/EditFullName';
import EditEmail from '@/components/EditEmail';
import EditPassword from '@/components/EditPassword';
import { auth } from '@/firebase';
import { mapState } from 'vuex';
import * as firebase from '../firebase';

export default {
    data() {
        return {
            showEditFullName: false,
            showEditEmail: false,
            showEditPassword: false,
            email: '',
        };
    },

    components: {
        Nav,
        EditFullName,
        EditEmail,
        EditPassword,
    },

    computed: {
        ...mapState(['userProfile']),

        showIfUserLogged() {
            return Object.keys(this.userProfile).length > 1;
        },
    },

    created() {
        this.email = firebase.auth.currentUser.email;
    },

    methods: {
        toggleEditFullName() {
            this.showEditFullName = !this.showEditFullName;
        },

        toggleEditEmail() {
            this.showEditEmail = !this.showEditEmail;
        },

        toggleEditPassword() {
            this.showEditPassword = !this.showEditPassword;
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

    &__inside {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-radius: 0.2rem;
        padding: 3rem;
    }

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
        margin: 2rem 0;
        font-size: 1.5rem;
    }

    &__text {
        border: 1px solid #ccc;
        padding: 1rem;
        border-radius: 0.2rem;
        font-size: 1.2rem;
        position: relative;
    }

    &__edit {
        position: absolute;
        top: 0.8rem;
        right: 1rem;
        font-size: 2rem;
        cursor: pointer;
    }

    &__extras {
        margin-top: 2rem;
        font-size: 1.4rem;
        display: flex;
        align-items: center;
        flex-direction: column;
        text-decoration: underline;

        .homepage {
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
        background-color: white;
        height: 100vh;
        justify-content: space-evenly;

        &__inside {
            border: 1px solid #ccc;
            max-width: 480px;
        }

        &__extras {
            margin: 0;
        }
    }
}
</style>

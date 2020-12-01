<template>
    <div class="myaccount">
        <Nav v-if="showIfUserLogged">
            <template v-slot:actual-page__slot>
                <p class="actual-page__slot">Moje konto</p>
            </template>
        </Nav>

        <div class="container">
            <div class="container__inside">
                <h2 class="container__header">Twoje konto</h2>

                <!-- Imię i nazwisko -->
                <p class="container__label">Imię i nazwisko</p>
                <p class="container__text">
                    Janusz Kowalski
                    <i class="fas fa-user-edit container__edit"></i>
                </p>

                <!-- adres email -->
                <p class="container__label">Adres Email</p>
                <p class="container__text">
                    jankowalski@email.com
                    <i class="fas fa-user-edit container__edit"></i>
                </p>

                <!-- haslo -->
                <p class="container__label">Hasło</p>
                <p class="container__text">
                    123456 <i class="fas fa-user-edit container__edit"></i>
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
import { mapState } from 'vuex';

export default {
    components: {
        Nav,
    },

    computed: {
        ...mapState(['userProfile']),

        showIfUserLogged() {
            return Object.keys(this.userProfile).length > 1;
        },
    },

    methods: {
        /* editAccount() {
            this.$v.$touch();

            if (this.$v.$invalid) {
                this.editAccountStatus = 'ERROR';
            } else {
                this.$store
                    .dispatch('updateProfile', {
                        fullName: this.fullName,
                        email: this.email,
                        password: this.password,
                    })
                    .then(() => {
                        this.editAccountStatus = 'PENDING';
                        this.isPending = true;
                        this.authStatus = '';

                        setTimeout(() => {
                            this.editAccountStatus = 'OK';
                            this.isPending = false;
                        }, 2000);
                    });

                setTimeout(() => {
                    this.editAccountStatus = '';
                    this.fullName = '';
                    this.email = '';
                    this.password = '';
                }, 2000);
            }
        }, */
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
            background: #dddddda1;
            max-width: 480px;
        }

        &__extras {
            margin: 0;
        }
    }
}
</style>

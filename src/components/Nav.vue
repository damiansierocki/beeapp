<template>
    <div class="nav">
        <About @close="toggleAbout()" v-if="showAbout"></About>

        <div class="container">
            <!-- hamburger -->
            <div class="hamburger-menu">
                <div class="hamburger-menu__icon" @click="toggleLeftMenu()">
                    <i class="fas fa-bars"></i>
                </div>

                <!-- left-menu -->
                <div class="left-menu" v-if="showLeftMenu">
                    <div class="left-menu__close" @click="toggleLeftMenu()">
                        <i class="fas fa-times"></i>
                    </div>

                    <router-link
                        class="left-menu__link left-menu__link--first"
                        to="/"
                        >Strona główna</router-link
                    >

                    <router-link class="left-menu__link" to="/apiaries"
                        >Pasieki</router-link
                    >

                    <router-link class="left-menu__link" to="/hives"
                        >Ule</router-link
                    >

                    <router-link class="left-menu__link" to="/inspections"
                        >Inspekcje</router-link
                    >

                    <router-link class="left-menu__link" to="/todos"
                        >Zadania</router-link
                    >
                </div>
            </div>

            <!-- actual page -->
            <div class="actual-page">
                <slot class="actual-page__slot" name="actual-page__slot"></slot>
            </div>

            <!-- elipse menu -->
            <div class="elipse-menu">
                <div class="elipse-menu__icon" @click="toggleRightMenu()">
                    <i class="fas fa-ellipsis-v"></i>
                </div>

                <div class="right-menu" v-if="showRightMenu">
                    <p class="right-menu__fullName">
                        {{ userProfile.fullName }}
                    </p>

                    <router-link class="right-menu__link" to="/myaccount"
                        >Moje konto</router-link
                    >
                    <a class="right-menu__link" @click="toggleAbout()"
                        >O aplikacji</a
                    >
                    <a class="right-menu__link" @click="logout()"
                        >Wyloguj się</a
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import About from '@/components/About';

export default {
    components: {
        About,
    },

    data() {
        return {
            showAbout: false,
            showLeftMenu: false,
            showRightMenu: false,
        };
    },

    computed: {
        ...mapState(['userProfile']),
    },

    methods: {
        toggleLeftMenu() {
            this.showLeftMenu = !this.showLeftMenu;

            const elipseIcon = document.querySelector('.elipse-menu__icon');

            elipseIcon.classList.toggle('disabled');
        },

        toggleRightMenu() {
            this.showRightMenu = !this.showRightMenu;

            const hamburgerIcon = document.querySelector(
                '.hamburger-menu__icon',
            );

            hamburgerIcon.classList.toggle('disabled');
        },

        toggleAbout() {
            this.showAbout = !this.showAbout;

            const hamburgerIcon = document.querySelector(
                '.hamburger-menu__icon',
            );
            const elipseIcon = document.querySelector('.elipse-menu__icon');

            if (this.showAbout) {
                this.showRightMenu = false;
                elipseIcon.classList.add('disabled');
                hamburgerIcon.classList.add('disabled');
            } else {
                elipseIcon.classList.remove('disabled');
                hamburgerIcon.classList.remove('disabled');
            }
        },

        logout() {
            this.$store.dispatch('logout');
        },
    },
};
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #dddddda1;
    font-size: 2rem;
    width: 100%;
    user-select: none;
    z-index: 999;

    .hamburger-menu {
        position: relative;

        &__icon {
            padding: 1rem 2rem;
            cursor: pointer;
        }

        .left-menu {
            background: #eee;
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 100%;
            width: 100%;
            position: fixed;
            z-index: 1;
            top: 0;
            left: 0;
            overflow: hidden;
            transition: 0.5s;

            &__close {
                padding: 1rem 2rem;
                position: absolute;
                top: 0;
                left: 0;
                cursor: pointer;
            }

            &__link {
                color: black;
                margin: 1rem;
                padding: 1rem;
                text-decoration: none;

                &--first {
                    margin-top: 5rem;
                }

                &:hover {
                    font-weight: bold;
                }
            }
        }
    }

    .elipse-menu {
        position: relative;

        &__icon {
            padding: 1rem 2rem;
            cursor: pointer;
        }

        .right-menu {
            background-color: #eee;
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 4.3rem;
            right: 0;
            padding: 1rem;
            width: 20rem;
            overflow: hidden;
            text-align: center;
            z-index: 1;
            transition: 0.5s;

            &__fullName {
                position: relative;

                &::after {
                    content: '';
                    position: absolute;
                    right: 0;
                    left: 0;
                    bottom: 0;
                    height: 0.5px;
                    background: #000;
                }
            }

            &__link {
                margin: 2rem 0;
                text-decoration: none;
                color: black;
                cursor: pointer;

                &:hover {
                    font-weight: bold;
                }
            }
        }
    }
}

.disabled {
    opacity: 0.2;
    pointer-events: none;
}

@media (min-width: 768px) {
    .container {
        .hamburger-menu {
            .left-menu {
                text-align: center;
                width: 20%;
            }
        }
    }
}
</style>

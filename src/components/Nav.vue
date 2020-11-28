<template>
    <div class="nav">
        <transition
            enter-active-class="animate__animated animate__backInDown animate__faster"
            leave-active-class="animate__animated animate__backOutUp animate__faster"
            mode="out-in"
            appear
        >
            <About v-if="showAbout" @close="toggleAbout"></About>
        </transition>

        <div class="nav-left">
            <span class="nav-left__icon" @click="toggleLeftMenu">
                <i class="fas fa-bars"></i>
            </span>

            <div class="nav-left__menu" v-if="showLeftMenu">
                <span class="nav-left__close" @click="toggleLeftMenu">
                    <i class="fas fa-times"></i>
                </span>
                <router-link class="nav-left__link" to="/"
                    >Strona główna</router-link
                >
                <router-link class="nav-left__link" to="/apiaries"
                    >Pasieki</router-link
                >
                <router-link class="nav-left__link" to="/hives"
                    >Ule</router-link
                >
                <router-link class="nav-left__link" to="/inspections"
                    >Inspekcje</router-link
                >
                <router-link class="nav-left__link" to="/todos"
                    >Zadania</router-link
                >
            </div>
        </div>

        <div class="nav-center">
            <slot class="nav-center__slot" name="nav-center__slot"></slot>
        </div>

        <div class="nav-right">
            <span class="nav-right__icon" @click="toggleRightMenu">
                <i class="fas fa-caret-down"> </i>
            </span>

            <div class="nav-right__menu" v-if="showRightMenu">
                <h2 class="nav-right__menu-username">
                    {{ userProfile.username }}
                </h2>
                <router-link class="nav-right__link" to="/myaccount"
                    ><i class="fas fa-user-circle right-icon"></i>Moje
                    konto</router-link
                >
                <a class="nav-right__link" @click="toggleAbout"
                    ><i class="fas fa-info-circle right-icon"></i>O aplikacji</a
                >
                <a class="nav-right__link" @click="logout()"
                    ><i class="fas fa-sign-out-alt right-icon"></i>Wyloguj
                    się</a
                >
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
        },

        toggleRightMenu() {
            this.showRightMenu = !this.showRightMenu;

            const navLeft = document.querySelector('.nav-left');
            const icon = document.querySelector('.fa-caret-down');

            if (this.showRightMenu) {
                icon.style.transform = 'rotate(180deg)';
                navLeft.classList.add('disabled');
            } else {
                icon.style.transform = 'rotate(0deg)';
                navLeft.classList.remove('disabled');
            }
        },

        toggleAbout() {
            this.showAbout = !this.showAbout;

            const navLeft = document.querySelector('.nav-left');
            const navRight = document.querySelector('.nav-right');
            const icon = document.querySelector('.fa-caret-down');

            if (this.showRightMenu) {
                this.showRightMenu = !this.showRightMenu;
                icon.style.transform = 'rotate(0deg)';
            }

            if (this.showAbout) {
                navLeft.classList.add('disabled');
                navRight.classList.add('disabled');
            } else {
                navLeft.classList.remove('disabled');
                navRight.classList.remove('disabled');
            }
        },

        logout() {
            this.$store.dispatch('logout');
        },
    },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/colors';

.nav {
    background-color: $black;
    color: $base-white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    user-select: none;

    &-left {
        position: relative;

        &__icon {
            font-size: 1.2rem;
            padding: 1rem;
            margin-left: 0.5rem;
        }

        &__menu {
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 100vh;
            width: 100vw;
            position: fixed;
            z-index: 999;
            top: 0;
            left: 0;
            background: $black;
            overflow-x: hidden;
            text-align: center;
        }

        &__close {
            padding: 1rem;
            font-size: 1.2rem;
            position: absolute;
            right: 0.5rem;
            top: 0;
        }

        &__link {
            text-decoration: none;
            font-size: 1.3rem;
            display: block;
            width: 60vw;
            margin: 0 auto;
            margin-top: 0.5rem;
            padding: 0.8rem;
            color: $base-white;
        }
    }

    &-center {
        &__slot {
            font-size: 1rem;
            padding: 1rem;
        }
    }

    &-right {
        position: relative;

        &__icon {
            font-size: 1.2rem;
            padding: 1rem;
            margin-right: 0.5rem;
        }

        &__menu {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 2rem;
            left: -11rem;
            box-shadow: 1px 1px 10px 1px $black;
            background-color: $white;
            padding: 1rem;
            color: $black;
            width: 13rem;
            text-align: center;
            z-index: 999;

            &-username {
                font-size: 1.2rem;
                border-bottom: 1px dashed $black;
                padding: 0.5rem;
            }
        }

        &__link {
            font-size: 1rem;
            margin: 0.7rem 0 0.6rem 0;
            padding: 0.2rem;
            text-decoration: none;
            color: $black;
        }

        .right-icon {
            margin-right: 0.6rem;
        }
    }
}

.disabled {
    opacity: 0.2;
    pointer-events: none;
}

@media (min-width: 320px) {
    .nav {
        &-left {
            &__icon {
                font-size: 1.3rem;
            }

            &__close {
                font-size: 1.3rem;
                top: 0.05rem;
                right: 0.55rem;
            }
        }

        &-center {
            &__slot {
                font-size: 1.1rem;
            }
        }

        &-right {
            &__icon {
                font-size: 1.3rem;
            }
        }
    }
}

@media (min-width: 414px) {
    .nav {
        &-left {
            &__icon {
                font-size: 1.4rem;
            }

            &__close {
                font-size: 1.4rem;
            }
        }

        &-center {
            &__slot {
                font-size: 1.2rem;
            }
        }

        &-right {
            &__icon {
                font-size: 1.4rem;
            }

            &__link {
                font-size: 1.1rem;
            }
        }
    }
}

@media (min-width: 768px) {
    .nav {
        &-left {
            &__icon {
                cursor: pointer;
                display: block;
                transition: 0.2s;

                &:hover {
                    transform: scale(1.3);
                }
            }

            &__close {
                cursor: pointer;
                display: block;
                transition: 0.2s;

                &:hover {
                    transform: scale(1.3);
                }
            }

            &__link {
                font-size: 1.4rem;
                cursor: pointer;
                display: block;
                transition: 0.2s;

                &:hover {
                    transform: scale(1.3);
                }
            }
        }

        &-right {
            &__icon {
                cursor: pointer;
                display: block;
                transition: 0.2s;

                &:hover {
                    transform: scale(1.3);
                }
            }

            &__link {
                cursor: pointer;
                display: block;
                transition: 0.2s;

                &:hover {
                    transform: scale(1.3);
                }
            }

            &__menu {
                top: 3rem;
            }
        }
    }
}
</style>

<template>
    <div class="nav">
        <div class="nav-left">
            <span class="nav-left__icon" @click="openNavLeft">
                <i class="fas fa-bars"></i>
            </span>
            <div class="nav-left__menu">
                <span class="nav-left__close" @click="closeNavLeft">
                    <i class="fas fa-times"></i>
                </span>
                <router-link class="nav-left__link" to="/"
                    >Strona główna</router-link
                >
                <router-link class="nav-left__link" to="/apiaries"
                    >Pasieki</router-link
                >
            </div>
        </div>

        <div class="nav-center">
            <slot class="nav-center__slot" name="nav-center__slot"></slot>
        </div>

        <div class="nav-right">
            <span class="nav-right__icon" @click="toggleRightMenu">
                <i class="fas fa-caret-down fa-rotate-270"> </i>
            </span>
            <div class="nav-right__menu">
                <h2 class="nav-right__menu-username">
                    {{ userProfile.username }}
                </h2>
                <router-link class="nav-right__link" to="/myaccount"
                    ><i class="fas fa-user-circle right-icon"></i>Moje
                    konto</router-link
                >
                <a class="nav-right__link"
                    ><i class="fas fa-info-circle right-icon"></i>O mnie</a
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
import { mapState } from "vuex";

export default {
    components: {
        // ! ADD COMPONENT ABOUT ME
    },
    data() {
        return {};
    },
    computed: {
        ...mapState(["userProfile"])
    },
    methods: {
        openNavLeft() {
            const navLeftMenu = document.querySelector(".nav-left__menu");

            navLeftMenu.style.display = "flex";
            navLeftMenu.style.width = "100vw";
            navLeftMenu.style.height = "100vh";
        },

        closeNavLeft() {
            const navLeftMenu = document.querySelector(".nav-left__menu");

            navLeftMenu.style.display = "none";
            navLeftMenu.style.width = "0";
            navLeftMenu.style.height = "0";
        },

        toggleRightMenu() {
            const navRight__menu = document.querySelector(".nav-right__menu");
            const faCaretDown = document.querySelector(".fa-caret-down");

            faCaretDown.classList.toggle("fa-rotate-270");

            if (window.getComputedStyle(navRight__menu).display === "none") {
                navRight__menu.style.display = "flex";
            } else {
                navRight__menu.style.display = "none";
            }
        },
        logout() {
            this.$store.dispatch("logout");
        }
    }
};
</script>

<style lang="scss" scoped>
// resolution above width 480px
.nav {
    background-color: #2d3436;
    background-image: linear-gradient(315deg, #2d3436 0%, #000000 74%);
    color: #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.2rem;
    width: 100vw;
    box-shadow: 1px 1px 10px 1px #000000;

    // hide text selection highlithing
    user-select: none;

    &-left {
        position: relative;

        &__icon {
            font-size: 1.2rem;
            padding: 0.36rem;
            cursor: pointer;
        }

        &__menu {
            flex-direction: column;
            height: 0;
            width: 0;
            position: fixed;
            z-index: 1;
            top: 0;
            left: 0;
            background: black;
            overflow-x: hidden;
            text-align: center;
            padding-top: 6rem;
        }

        &__close {
            padding: 0.6rem;
            font-size: 1.2rem;
            position: absolute;
            top: 0.7rem;
            right: 1.1rem;
            cursor: pointer;
        }

        &__link {
            text-decoration: none;
            font-size: 1.8rem;
            display: block;
            width: 60vw;
            margin: 0 auto;
            margin-top: 0.48rem;
            padding: 0.84rem;
            color: #eee;
        }
    }

    &-center {
        &__slot {
            font-size: 1.2rem;
        }
    }

    &-right {
        position: relative;

        &__icon {
            font-size: 1.2rem;
            padding: 0.36rem;
            cursor: pointer;
        }

        &__menu {
            display: none;
            flex-direction: column;
            position: absolute;
            top: 2rem;
            left: -11rem;
            border: 1px solid black;
            box-shadow: 1px 1px 10px 1px #000000;
            background-color: #eee;
            color: black;
            padding: 1.2rem;
            width: 13.2rem;
            text-align: center;

            &-username {
                font-size: 1.32rem;
                border: 1px dashed black;
                border-radius: 2rem;
                padding: 0.24rem;
            }
        }

        &__link {
            font-size: 1.2rem;
            margin: 0.6rem 0 0.48rem 0;
            padding: 0.24rem;
            text-decoration: none;
            color: black;
            cursor: pointer;
        }

        .right-icon {
            margin-right: 0.72rem;
        }
    }
}

// each elements multiplied by ~ 1.1
@media (min-width: 480px) {
    .nav {
        padding: 1.3rem;

        &-left {
            &__icon {
                font-size: 1.3rem;
                padding: 0.4rem;
            }

            &__close {
                padding: 0.7rem;
                font-size: 1.3rem;
                top: 0.7rem;
                right: 1rem;
            }

            &__link {
                font-size: 2rem;
                margin-top: 0.5rem;
                padding: 0.9rem;
            }
        }

        &-center {
            &__slot {
                font-size: 1.3rem;
            }
        }

        &-right {
            &__icon {
                font-size: 1.3rem;
                padding: 0.4rem;
            }

            &__menu {
                padding: 1.3rem;
                width: 15rem;
                left: -12.5rem;

                &-username {
                    font-size: 1.5rem;
                    padding: 0.3rem;
                }
            }

            &__link {
                font-size: 1.3rem;
                margin: 0.7rem 0 0.5rem 0;
                padding: 0.3rem;
            }

            .right-icon {
                margin-right: 0.8rem;
            }
        }
    }
}

// each elements multiplied by ~ 1.2 - 480px elements
@media (min-width: 768px) {
    .nav {
        padding: 1.6rem;

        &-left {
            &__icon {
                font-size: 1.6rem;
                padding: 0.5rem;
            }

            &__close {
                padding: 0.8rem;
                font-size: 1.6rem;
                top: 0.8rem;
                right: 1.2rem;
            }

            &__link {
                font-size: 2rem;
                margin-top: 0.7rem;
                padding: 1.1rem;
            }
        }

        &-center {
            &__slot {
                font-size: 1.6rem;
            }
        }

        &-right {
            &__icon {
                font-size: 1.6rem;
                padding: 0.5rem;
            }

            &__menu {
                padding: 1.6rem;
                width: 17rem;
                left: -14.5rem;

                &-username {
                    font-size: 1.7rem;
                    padding: 0.3rem;
                }
            }

            &__link {
                font-size: 1.6rem;
                margin: 0.8rem 0 0.6rem 0;
                padding: 0.3rem;
            }

            .right-icon {
                margin-right: 1rem;
            }
        }
    }
}

// each elements divided by 1.4
@media (min-width: 1024px) {
    .nav {
        padding: 1.1rem;

        &-left {
            &__icon {
                font-size: 1.1rem;
                padding: 0.4rem;
            }

            &__close {
                padding: 0.6rem;
                font-size: 1.1rem;
                top: 0.6rem;
                right: 1rem;
            }

            &__link {
                font-size: 1.4rem;
                margin-top: 0.5rem;
                padding: 0.8rem;
            }
        }

        &-center {
            &__slot {
                font-size: 1.1rem;
            }
        }

        &-right {
            &__icon {
                font-size: 1.1rem;
                padding: 0.4rem;
            }

            &__menu {
                padding: 1.1rem;
                width: 17rem;
                left: -15.5rem;

                &-username {
                    font-size: 1.2rem;
                    padding: 0.2rem;
                }
            }

            &__link {
                font-size: 1.1rem;
                margin: 0.6rem 0 0.4rem 0;
                padding: 0.2rem;
            }

            .right-icon {
                margin-right: 0.7rem;
            }
        }
    }
}
</style>

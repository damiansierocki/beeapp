<template>
    <div class="nav">
        <div class="nav-left">
            <span class="nav-left__icon" @click="openAndHideLeftMenu">
                <i class="fas fa-bars"></i>
            </span>
            <div class="nav-left__menu">
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
            <span class="nav-right__icon" @click="openAndHideRightMenu">
                <i class="fas fa-caret-down fa-rotate-270"> </i>
            </span>
            <div class="nav-right__menu">
                <h2 class="nav-right__menu-username">
                    {{ userProfile.username }}
                </h2>
                <router-link class="nav-right__link" to="/myaccount"
                    >Moje konto</router-link
                >
                <a class="nav-right__link" @click="logout()">Wyloguj się</a>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    components: {},
    data() {
        return {};
    },
    computed: {
        ...mapState(["userProfile"])
    },
    methods: {
        openAndHideLeftMenu() {
            const navLeft = document.querySelector(".nav-left");
            const navLeft__menu = document.querySelector(".nav-left__menu");

            // if (window.screen.width < 768) {
            //     navLeft.classList.toggle("--color-white");

            //     if (window.getComputedStyle(navLeft__menu).display === "none") {
            //         navLeft__menu.style.display = "flex";
            //     } else {
            //         navLeft__menu.style.display = "none";
            //     }
            // }

            navLeft.classList.toggle("--color-white");

            if (window.getComputedStyle(navLeft__menu).display === "none") {
                navLeft__menu.style.display = "flex";
            } else {
                navLeft__menu.style.display = "none";
            }
        },
        openAndHideRightMenu() {
            const navRight__menu = document.querySelector(".nav-right__menu");
            const faCaretDown = document.querySelector(".fa-caret-down");

            faCaretDown.classList.toggle("fa-rotate-270");
            faCaretDown.classList.toggle("--color-white");

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
.nav {
    background-color: #ffa500;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    width: 100vw;
    box-shadow: 1px 1px 10px 1px #000000;

    // hide text selection highlithing
    user-select: none;

    &-left {
        position: relative;

        &__icon {
            font-size: 18px;
            padding: 5px;
        }

        &__menu {
            display: none;
            flex-direction: column;
            position: absolute;
            box-shadow: 1px 1px 10px 1px #000000;
            background-color: #eee;
            padding: 15px;
            top: 38px;
            left: -20px;
            width: 50vw;
            height: calc(100vh - 53px);
        }

        &__link {
            font-size: 16px;
            margin: 10px 0 5px 0;
            text-decoration: none;
            color: black;
        }
    }

    &-center {
        &__slot {
            font-size: 18px;
        }
    }

    &-right {
        position: relative;

        &__icon {
            font-size: 18px;
            padding: 5px;
        }

        &__menu {
            display: none;
            flex-direction: column;
            position: absolute;
            top: 26px;
            left: -130px;
            border: 1px solid black;
            box-shadow: 1px 1px 10px 1px #000000;
            background-color: #eee;
            padding: 15px;
            width: 150px;
            text-align: center;

            &-username {
                font-size: 16px;
                border-bottom: 1px solid black;
            }
        }

        &__link {
            font-size: 16px;
            margin: 10px 0 5px 0;
            text-decoration: none;
            color: black;
        }
    }
}

.--color-white {
    color: #fff;
}

// min-width: 768 px - ipad width, each elements multiplied by 1.2
@media (min-width: 768px) {
    .nav {
        padding: 18px;

        // hide text selection highlithing
        user-select: none;

        &-left {
            &__icon {
                font-size: 21.6px;
                cursor: pointer;
                padding: 6px;
            }

            &__menu {
                padding: 18px;
                top: 45.6px;
                left: -24px;
                width: 60vw;
                height: calc(100vh - 53px);
            }

            &__link {
                font-size: 19.2px;
                margin: 12px 0 6px 0;

                &:hover {
                    font-weight: bold;
                }
            }
        }

        &-center {
            &__slot {
                font-size: 21.6px;
            }
        }

        &-right {
            &__icon {
                font-size: 21.6px;
                cursor: pointer;
                padding: 6px;
            }

            &__menu {
                top: 31.2px;
                left: -156px;
                padding: 18px;
                width: 180px;

                &-username {
                    font-size: 19.2px;
                }
            }

            &__link {
                font-size: 19.2px;
                margin: 12px 0 6px 0;
                cursor: pointer;

                &:hover {
                    font-weight: bold;
                }
            }
        }
    }
}
</style>

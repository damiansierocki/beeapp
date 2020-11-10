<template>
    <div class="nav">
        <div class="left">
            <span class="icon_hamburger" @click="openAndHideLeftMenu">
                <i class="fas fa-bars"></i>
            </span>
            <div class="dropmenuleft">
                <router-link class="link" to="/">Strona główna</router-link>
                <router-link class="link" to="/apiaries">Pasieki</router-link>
            </div>
        </div>
        <div class="center">
            <slot name="active-fields"></slot>
        </div>
        <div class="right">
            <span class="icon_menu" @click="openAndHideRightMenu">
                <i class="fas fa-caret-down fa-rotate-270"> </i>
            </span>
            <div class="dropmenu">
                <h2>{{ userProfile.username }}</h2>
                <router-link class="link" to="/myaccount"
                    >Moje konto</router-link
                >
                <a @click="logout()">Wyloguj się</a>
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
            const dropMenuLeft = document.querySelector(".dropmenuleft");
            const left = document.querySelector(".left");

            // if (window.screen.width < 768) {
            //     left.classList.toggle("color-white");

            //     if (window.getComputedStyle(dropMenuLeft).display === "none") {
            //         dropMenuLeft.style.display = "flex";
            //     } else {
            //         dropMenuLeft.style.display = "none";
            //     }
            // }

            left.classList.toggle("color-white");

            if (window.getComputedStyle(dropMenuLeft).display === "none") {
                dropMenuLeft.style.display = "flex";
            } else {
                dropMenuLeft.style.display = "none";
            }
        },
        openAndHideRightMenu() {
            const dropMenu = document.querySelector(".dropmenu");
            const faCaretDown = document.querySelector(".fa-caret-down");

            faCaretDown.classList.toggle("fa-rotate-270");
            faCaretDown.classList.toggle("color-white");

            if (window.getComputedStyle(dropMenu).display === "none") {
                dropMenu.style.display = "flex";
            } else {
                dropMenu.style.display = "none";
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

    .left {
        .icon_hamburger {
            font-size: 18px;
            cursor: pointer;
            padding: 5px;
        }

        position: relative;

        .dropmenuleft {
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

            .link {
                font-size: 16px;
                margin: 10px 0 5px 0;
                text-decoration: none;
                color: black;
            }
        }
    }

    .center {
        .activefield {
            font-size: 18px;
        }
    }

    .right {
        .icon_menu {
            font-size: 18px;
            cursor: pointer;
            padding: 5px;
        }

        position: relative;

        .dropmenu {
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

            h2 {
                font-size: 16px;
                border-bottom: 1px solid black;
            }

            a {
                font-size: 16px;
                margin: 10px 0 5px 0;
                text-decoration: none;
                color: black;
            }
        }
    }
}

.color-white {
    color: #fff;
}

// min-width: 768 px - ipad width, each elements multiplied by 1.2
@media (min-width: 768px) {
    .nav {
        padding: 18px;

        .left {
            .icon_hamburger {
                font-size: 21.6px;
                padding: 6px;
            }

            .dropmenuleft {
                display: flex;
                padding: 18px;
                width: 15vw;

                .link {
                    font-size: 19.2px;
                    margin: 12px 0 6px 0;
                    text-decoration: none;
                    color: black;
                    cursor: pointer;

                    &:hover {
                        font-weight: bold;
                    }
                }
            }
        }

        .center {
            .activefield {
                font-size: 21.6px;
            }
        }

        .right {
            .icon_menu {
                font-size: 21.6px;
                cursor: pointer;
                padding: 6px;
            }

            position: relative;

            .dropmenu {
                display: none;
                flex-direction: column;
                position: absolute;
                left: -156px;
                border: 1px solid black;
                box-shadow: 1px 1px 10px 1px #000000;
                background-color: #eee;
                padding: 18px;
                width: 180px;

                h2 {
                    font-size: 19.2px;
                    border-bottom: 1px solid black;
                }

                a {
                    font-size: 19.2px;
                    margin: 12px 0 6px 0;
                    text-decoration: none;
                    color: black;
                    cursor: pointer;

                    &:hover {
                        font-weight: bold;
                    }
                }

                .link {
                    font-size: 19.2px;
                    margin: 12px 0 6px 0;
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
}
</style>

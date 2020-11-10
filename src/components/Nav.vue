<template>
    <div class="nav">
        <div class="left">
            <span class="icon_hamburger">
                <i class="fas fa-bars"></i>
            </span>
        </div>
        <div class="center">
            <slot name="active-fields"></slot>
        </div>
        <div class="right">
            <span class="icon_menu" @click="openAndHideRightMenu">
                <i class="fas fa-caret-down"> </i>
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
    data() {
        return {};
    },
    computed: {
        ...mapState(["userProfile"])
    },
    methods: {
        openAndHideRightMenu() {
            const dropMenu = document.querySelector(".dropmenu");

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

    // hide text selection highlithing
    user-select: none;

    .left {
        .icon_hamburger {
            font-size: 18px;
            cursor: pointer;
            padding: 5px;
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

// min-width: 768 px - ipad width, each elements multiplied by 1.2
@media (min-width: 768px) {
    .nav {
        padding: 18px;

        .left {
            .icon_hamburger {
                font-size: 21.6px;
                padding: 6px;
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

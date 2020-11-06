<template>
    <div class="header">
        <div class="left">
            <span class="icon_hamburger">
                <i class="fas fa-bars"></i>
            </span>
        </div>
        <div class="center">
            <h1 class="activefield">Strona główna</h1>
        </div>
        <div class="right">
            <span class="icon_menu" @click="openAndHideMenu">
                <i class="fas fa-caret-down"> </i>
            </span>
            <div class="dropmenu">
                <h2>Nazwa użytkownika</h2>
                <a href="#">Moje konto</a>
                <a href="#">Wyloguj się</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        openAndHideMenu() {
            let x = document.querySelector(".dropmenu");
            if (x.style.display === "none") {
                x.style.display = "flex";
            } else {
                x.style.display = "none";
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.header {
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
                // background-color: red;
            }
        }
    }
}

// @media query above 768px - 1.2x
@media (min-width: 768px) {
    .header {
        padding: 18px;

        .left {
            .icon_hamburger {
                font-size: 21.6px;
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
                    // background-color: red;
                }
            }
        }
    }
}
</style>

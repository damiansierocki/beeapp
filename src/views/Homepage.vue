<template>
    <div class="homepage">
        <Nav v-if="showIfUserLogged">
            <template v-slot:nav-center__slot>
                <h1 class="nav-center__slot">Strona główna</h1>
            </template>
        </Nav>

        <div class="content">
            <div class="weather">
                <div class="weather__left">
                    <p class="weather__location">
                        Chicaco<span class="weather__country">, US</span>
                    </p>

                    <p class="weather__dateDesktop">
                        {{ this.currentDateDesktop }}
                    </p>
                    <p class="weather__dateMobile">
                        {{ this.currentDateMobile }}
                    </p>
                </div>

                <div class="weather__center">
                    <span class="weather__icon"
                        ><i class="fas fa-bolt"></i
                    ></span>
                    <p class="weather__description">
                        pochmurno z przejaśnieniami
                    </p>
                </div>

                <div class="weather__right">
                    <p class="weather__weather">27°C</p>
                    <p class="weather__wind">20 m/s</p>
                </div>
            </div>

            <div class="content__inside">
                <div class="content__item">
                    <p class="content__icon">
                        Pasieki
                        <i class="fas fa-home"></i>
                    </p>
                    <p class="content__paragraph">
                        0
                    </p>
                </div>
                <div class="content__item">
                    <p class="content__icon">
                        Ule
                        <i class="fas fa-archive"></i>
                    </p>
                    <p class="content__paragraph">
                        0
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Nav from "@/components/Nav";
import { mapState } from "vuex";
import moment from "moment";

export default {
    data() {
        return {
            currentDateDesktop: "",
            currentDateMobile: "",
            currentTemp: "",
            icon: "",
            location: ""
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
        getCurrentDate: function() {
            const newDate = new Date();
            const currentDateDesktop = moment(newDate)
                .locale("pl")
                .format("dddd, DD MMMM YYYY, HH:mm ");
            const currentDateMobile = moment(newDate)
                .locale("pl")
                .format("DD.MM.YYYY, HH:mm ");

            this.currentDateDesktop = currentDateDesktop;
            this.currentDateMobile = currentDateMobile;
        }
    },

    beforeMount() {
        this.getCurrentDate();
    }
};
</script>

<style lang="scss" scoped>
.content {
    width: 100vw;
    height: calc(100vh - 51.6px);
    display: flex;
    flex-direction: column;
    align-items: center;

    .weather {
        background-color: #045de9;
        background-image: linear-gradient(315deg, #045de9 0%, #09c6f9 74%);
        color: #eee;
        margin-top: 20px;
        width: 90vw;
        padding: 20px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-radius: 30px;

        &__location {
            font-size: 22px;
            font-weight: bold;
        }

        &__country {
            display: none;
        }

        &__dateMobile {
            margin-top: 10px;
            font-size: 16px;
        }

        &__dateDesktop {
            display: none;
        }

        &__icon {
            font-size: 22px;
        }

        &__description {
            display: none;
        }

        &__weather {
            font-size: 22px;
            font-weight: bold;
        }

        &__wind {
            margin-top: 10px;
            font-size: 16px;
        }
    }

    &__inside {
        display: none;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        width: 100vw;
        height: 25vh;
        margin-top: 35vh;
        background-color: green;
    }

    &__item {
        width: 150px;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        border: 1px dashed black;
    }

    &__icon {
        position: absolute;
        top: -30px;
        font-size: 25px;

        .fa-home {
            color: green;
        }

        .fa-archive {
            color: orange;
        }
    }
}

// each of elements multiplied by 1.2
@media (min-width: 768px) {
    .content {
        height: calc(100vh - 62.4px);

        .weather {
            margin-top: 24px;
            width: 45vw;
            padding: 24px;
            align-items: center;
            height: 20vh;

            &__left {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: flex-start;
            }

            &__center {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            &__right {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            &__location {
                font-size: 26.4px;
            }

            &__country {
                display: inline-block;
            }

            &__dateMobile {
                display: none;
            }

            &__dateDesktop {
                display: block;
                margin-top: 12px;
                font-size: 19.2px;
            }

            &__icon {
                font-size: 26.4px;
            }

            &__description {
                display: block;
                margin-top: 12px;
            }

            &__weather {
                font-size: 26.4px;
            }

            &__wind {
                margin-top: 12px;
                font-size: 19.2px;
            }
        }

        &__inside {
            display: none;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            width: 100vw;
            height: 25vh;
            margin-top: 35vh;
            background-color: green;
        }

        &__item {
            width: 150px;
            height: 80px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            border: 1px dashed black;
        }

        &__icon {
            position: absolute;
            top: -30px;
            font-size: 25px;

            .fa-home {
                color: green;
            }

            .fa-archive {
                color: orange;
            }
        }
    }
}
</style>

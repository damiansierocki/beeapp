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
                        {{ this.weather.location }}
                        <span class="weather__country">{{
                            this.weather.country
                        }}</span>
                    </p>

                    <p class="weather__dateDesktop">
                        {{ this.currentDateDesktop }}
                    </p>
                    <p class="weather__dateMobile">
                        {{ this.currentDateMobile }}
                    </p>
                </div>

                <div class="weather__center">
                    <img class="weather__icon" v-bind:src="this.weather.icon" />
                    <p class="weather__description">
                        {{ this.weather.description }}
                    </p>
                </div>

                <div class="weather__right">
                    <p class="weather__temp">
                        <i class="fas fa-temperature-low"></i>
                        {{ this.weather.currentTemp }}
                    </p>

                    <p class="weather__wind">
                        <i class="fas fa-wind"></i>
                        {{ this.weather.wind }}
                    </p>
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
import axios from "axios";

const API = "http://api.openweathermap.org/data/2.5/weather?units=metric";
const KEY = "&APPID=bff05973f18c6a1a19bc66976347f831";
const iconAPI = "http://openweathermap.org/img/w/";

export default {
    data() {
        return {
            currentDateDesktop: "",
            currentDateMobile: "",
            weather: {
                currentTemp: "",
                icon: "",
                location: "",
                wind: "",
                description: "",
                country: ""
            }
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
                .format("dddd, DD MMMM YYYY");
            const currentDateMobile = moment(newDate)
                .locale("pl")
                .format("DD.MM.YYYY");

            this.currentDateDesktop = currentDateDesktop;
            this.currentDateMobile = currentDateMobile;
        },

        getWeather(url) {
            axios
                .get(url)
                .then(response => {
                    this.weather.currentTemp = response.data.main.temp;
                    this.weather.wind = response.data.wind.speed + " m/s";
                    this.weather.location = response.data.name;
                    this.weather.description =
                        response.data.weather[0].description;
                    this.weather.country = response.data.sys.country;

                    this.weather.icon =
                        iconAPI + response.data.weather[0].icon + ".png";
                })
                .catch(error => {
                    console.log(error);
                });
        },

        geolocation() {
            navigator.geolocation.getCurrentPosition(
                this.buildUrl,
                this.geoError
            );
        },

        buildUrl(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            this.getWeather(
                API + "&lat=" + lat + "&lon=" + lon + "&lang=pl" + KEY
            );
        },

        geoError() {
            this.getWeather(API + "&lat=0&lon=0" + KEY);
        }
    },

    beforeMount() {
        this.getCurrentDate();
        this.geolocation();
    }
};
</script>

<style lang="scss" scoped>
.content {
    width: 100vw;
    height: calc(100vh - 51.6px);
    flex-direction: column;
    align-items: center;
    display: none;

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
        user-select: none;

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
            width: 50px;
        }

        &__description {
            display: none;
        }

        &__temp {
            font-size: 22px;
            font-weight: bold;

            .fa-temperature-low {
                display: none;
            }
        }

        &__wind {
            margin-top: 10px;
            font-size: 16px;

            .fa-wind {
                display: none;
            }
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
            width: 75vw;
            padding: 24px;
            align-items: center;
            height: 15vh;

            &__left {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
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
                font-size: 30px;
            }

            &__country {
                display: inline-block;
            }

            &__dateMobile {
                display: none;
            }

            &__dateDesktop {
                display: flex;
                text-align: center;
                margin-top: 15px;
                font-size: 18px;
            }

            &__icon {
                width: 100px;
            }

            &__description {
                font-size: 18px;
                display: flex;
                text-align: center;
                width: 120px;
                margin-bottom: 30px;
            }

            &__temp {
                font-size: 30px;
                display: flex;
                justify-content: center;
                align-items: center;

                .fa-temperature-low {
                    display: inline-block;
                    font-size: 20px;
                    margin-right: 20px;
                }
            }

            &__wind {
                margin-top: 15px;
                font-size: 18px;

                display: flex;
                justify-content: center;
                align-items: center;

                .fa-wind {
                    display: inline-block;
                    font-size: 15px;
                    margin-right: 20px;
                }
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

@media (min-width: 1024px) {
    .content {
        .weather {
            width: 50vw;
            height: 20vh;

            &__description {
                width: 100%;
                margin-bottom: 30px;
            }
        }
    }
}
</style>

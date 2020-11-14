<template>
    <div class="homepage">
        <Nav v-if="showIfUserLogged">
            <template v-slot:nav-center__slot>
                <h1 class="nav-center__slot">Strona główna</h1>
            </template>
        </Nav>

        <div class="content">
            <div class="weather" v-if="showDesktop">
                <div class="weather__content">
                    <div class="weather__left-div">
                        <p class="current-date">{{ currentDateDesktop }}</p>
                        <p class="weather__location">
                            <span>{{ this.weather.location }}</span>
                        </p>
                        <p class="weather__temp-min">
                            Minmalna: <span>{{ this.weather.temp_min }}</span>
                        </p>
                        <p class="weather__temp-max">
                            Maksymalna: <span>{{ this.weather.temp_min }}</span>
                        </p>
                        <div class="weather__current-temp">
                            <p class="weather__temp">
                                <span>{{ this.weather.currentTemp }}</span>
                            </p>
                            <p class="weather__celcius">°C</p>
                        </div>

                        <p class="weather__feels-like">
                            Odczuwalna:
                            <span>{{ this.weather.feels_like }}</span>
                        </p>
                    </div>

                    <div class="weather__center-div">
                        <img class="weather__icon" :src="this.weather.icon" />
                        <p class="weather__description">
                            <span>{{ this.weather.description }}</span>
                        </p>
                    </div>

                    <div class="weather__right-div">
                        <p class="weather__pressure">
                            Ciśnienie: <span>{{ this.weather.pressure }}</span>
                        </p>
                        <p class="weather__wind">
                            Prędkość wiatru:
                            <span>{{ this.weather.wind }}</span>
                        </p>
                        <p class="weather__humidity">
                            Wilgotność: <span>{{ this.weather.humidity }}</span>
                        </p>
                        <p class="weather__sunrise">
                            Wschód słońca:
                            <span>{{ this.weather.sunrise }}</span>
                        </p>
                        <p class="weather__sunset">
                            Zachód słońca:
                            <span>{{ this.weather.sunset }}</span>
                        </p>
                    </div>
                </div>
            </div>

            <div class="weather" v-else>
                <div class="weather__content">
                    <div class="weather__left-div">
                        <p class="current-date">{{ currentDateMobile }}</p>

                        <p class="weather__pressure">
                            Ciśnienie: <span>{{ this.weather.pressure }}</span>
                        </p>
                        <div class="weather__current-temp">
                            <p class="weather__temp">
                                <span>{{ this.weather.currentTemp }}</span>
                            </p>
                            <p class="weather__celcius">°C</p>
                        </div>

                        <p class="weather__feels-like">
                            Odczuwalna:
                            <span>{{ this.weather.feels_like }}</span>
                        </p>
                    </div>
                    <div class="weather__right-div">
                        <p class="weather__location">
                            <span>{{ this.weather.location }}</span>
                        </p>
                        <img class="weather__icon" :src="this.weather.icon" />
                        <p class="weather__description">
                            <span>{{ this.weather.description }}</span>
                        </p>
                    </div>
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

export default {
    data() {
        return {
            showDesktop: false,
            windowWidth: 0,
            currentDateMobile: "",
            currentDateDesktop: "",
            weather: {
                currentTemp: "",
                icon: "",
                location: "",
                wind: "",
                description: "",
                country: "",
                feels_like: "",
                temp_min: "",
                temp_max: "",
                pressure: "",
                sunrise: "",
                sunset: "",
                humidity: ""
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
        handleResize() {
            this.windowWidth = window.innerWidth;

            if (this.windowWidth > 768) {
                this.showDesktop = true;
            } else {
                this.showDesktop = false;
            }
        },

        getCurrentDate: function() {
            const newDate = new Date();

            const currentDateMobile = moment(newDate)
                .locale("pl")
                .format("DD MMMM, HH:mm");

            const currentDateDesktop = moment(newDate)
                .locale("pl")
                .format("dddd, DD MMMM YYYY, HH:mm");

            this.currentDateMobile = currentDateMobile;
            this.currentDateDesktop = currentDateDesktop;
        },

        getCurrentWeather(url) {
            axios
                .get(url)
                .then(response => {
                    this.weather.currentTemp = Math.round(
                        response.data.main.temp
                    );
                    this.weather.wind = response.data.wind.speed + " m/s";
                    this.weather.location = response.data.name;
                    this.weather.description =
                        response.data.weather[0].description
                            .charAt(0)
                            .toUpperCase() +
                        response.data.weather[0].description.slice(1);

                    this.weather.country = response.data.sys.country;
                    this.weather.icon =
                        "http://openweathermap.org/img/wn/" +
                        response.data.weather[0].icon +
                        "@4x.png";
                    this.weather.feels_like =
                        Math.round(response.data.main.feels_like) + " °C";
                    this.weather.temp_min =
                        Math.round(response.data.main.temp_min) + " °C";
                    this.weather.temp_max =
                        Math.round(response.data.main.temp_max) + " °C";
                    this.weather.humidity = response.data.main.humidity + "%";
                    this.weather.pressure = response.data.main.pressure + " Pa";
                    this.weather.sunrise = new Date(
                        response.data.sys.sunrise * 1000
                    )
                        .toLocaleTimeString("pl-PL")
                        .slice(0, 5);
                    this.weather.sunset = new Date(
                        response.data.sys.sunset * 1000
                    )
                        .toLocaleTimeString("pl-PL")
                        .slice(0, 5);
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

            this.getCurrentWeather(
                API + "&lat=" + lat + "&lon=" + lon + "&lang=pl" + KEY
            );
        },

        geoError() {
            this.getCurrentWeather(API + "&lat=0&lon=0" + KEY);
        }
    },

    beforeMount() {
        this.getCurrentDate();
        this.geolocation();
    },

    created() {
        window.addEventListener("resize", this.handleResize);
        this.handleResize();
    },

    destroyed() {
        window.removeEventListener("resize", this.handleResize);
    }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/homepage.scss";
</style>

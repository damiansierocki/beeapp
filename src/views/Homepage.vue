<template>
    <div class="homepage" v-if="showIfUserLogged">
        <Nav v-if="showIfUserLogged">
            <template v-slot:nav-center__slot>
                <h1 class="nav-center__slot">Strona główna</h1>
            </template>
        </Nav>

        <div class="content">
            <div class="weather" v-if="showDesktop">
                <div class="weather__content">
                    <div class="weather__left-div">
                        <p class="current-date">
                            <span>{{ currentDateDesktop }}</span>
                        </p>
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
                        <p class="current-date">
                            <span>{{ currentDateMobile }}</span>
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
                        <div class="weather__icon">
                            <img :src="this.weather.icon" />
                        </div>
                        <p class="weather__description">
                            <span>{{ this.weather.description }}</span>
                        </p>
                    </div>
                </div>
            </div>

            <div class="info">
                <h3 class="info__title">Informacje</h3>
                <div class="info__all">
                    <div class="info__apiaries">
                        <img
                            class="info__img"
                            src="./../assets/images/apiary.svg"
                            alt="apiary"
                        />
                        <p class="info__number">0</p>
                        <p class="info__description info__description--red">
                            Pasieki
                        </p>
                    </div>
                    <div class="info__hives">
                        <img
                            class="info__img"
                            src="./../assets/images/hives.svg"
                            alt="hives"
                        />
                        <p class="info__number">0</p>
                        <p class="info__description info__description--green">
                            Ule
                        </p>
                    </div>
                    <div class="info__inspections">
                        <img
                            class="info__img"
                            src="./../assets/images/inspections.svg"
                            alt="inspections"
                        />
                        <p class="info__number">0</p>
                        <p class="info__description info__description--blue">
                            Inspekcje
                        </p>
                    </div>
                    <div class="info__notes">
                        <img
                            class="info__img"
                            src="./../assets/images/notes.svg"
                            alt="notes"
                        />
                        <p class="info__number">0</p>
                        <p class="info__description info__description--orange">
                            Notatki
                        </p>
                    </div>
                </div>
            </div>

            <transition
                enter-active-class="animate__animated animate__backInUp animate__faster"
                leave-active-class="animate__animated animate__backOutDown animate__faster"
                mode="out-in"
                appear
            >
                <AddNotes v-if="showAddNotes" @close="toggleNotes"></AddNotes>
            </transition>

            <div class="notes">
                <div class="notes__container-title-icon" @click="toggleNotes">
                    <h3 class="notes__title">Notatki</h3>
                    <span class="notes__plus-icon">
                        <i class="fas fa-plus"></i>
                    </span>
                </div>

                <ul class="notes__list" v-if="notes.length">
                    <li
                        class="notes__item"
                        v-for="note in notes"
                        :key="note.id"
                    >
                        {{ note.content }}
                        <br />
                        <span class="notes__createdOn">{{
                            getCurrentDate(note.createdOn)
                        }}</span>
                    </li>
                </ul>

                <ul class="notes__list" style="list-style-type: none" v-else>
                    <li class="notes__item">
                        Nie ma żadnej notatki 😢
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import AddNotes from "@/components/AddNotes";
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
            showAddNotes: false,
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
        Nav,
        AddNotes
    },

    computed: {
        ...mapState(["userProfile", "notes"]),

        showIfUserLogged() {
            return Object.keys(this.userProfile).length > 1;
        }
    },

    methods: {
        toggleNotes() {
            this.showAddNotes = !this.showAddNotes;

            console.log(this.userProfile.username);
            console.log(this.notes.id);
            console.log(Object(this.userProfile));
        },

        handleResize() {
            this.windowWidth = window.innerWidth;

            if (this.windowWidth > 768) {
                this.showDesktop = true;
            } else {
                this.showDesktop = false;
            }
        },

        getCurrentDate: function(val) {
            const newDate = new Date();

            const currentDateMobile = moment(newDate)
                .locale("pl")
                .format("DD MMMM, HH:mm");

            const currentDateDesktop = moment(newDate)
                .locale("pl")
                .format("dddd, DD MMMM YYYY, HH:mm");

            this.currentDateMobile = currentDateMobile;
            this.currentDateDesktop = currentDateDesktop;

            if (!val) {
                return "-";
            }

            let date = val.toDate();
            return moment(date)
                .locale("pl")
                .fromNow();
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

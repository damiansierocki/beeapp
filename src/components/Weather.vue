<template>
    <div class="weather">
        <div class="weather__content" v-if="!showDesktop">
            <div class="weather__left">
                <p class="weather__p weather__p--description">
                    {{ weather.description }}
                </p>
                <p class="weather__p weather__p--temp">
                    {{ weather.currentTemp }}°
                </p>
            </div>

            <div class="weather__right">
                <p class="weather__p weather__p--date">
                    {{ currentDate }}
                </p>
                <p class="weather__p weather__p--location">
                    <i class="fas fa-map-marker-alt"></i>
                    {{ weather.location }}
                </p>
            </div>
        </div>

        <div class="weather__content" v-else>
            <div class="weather__left">
                <p class="weather__p weather__p--description">
                    {{ weather.description }}
                </p>
                <p class="weather__p weather__p--temp">
                    {{ weather.currentTemp }}°
                </p>
            </div>

            <div class="weather__right">
                <p class="weather__p weather__p--date">{{ currentDate }}</p>
                <p class="weather__p weather__p--location">
                    <i class="fas fa-map-marker-alt"></i>
                    {{ weather.location }}
                </p>
            </div>

            <div class="weather__wind-humidity">
                <p class="weather__p weather__p--wind">
                    Prędkość wiatru: {{ weather.wind }}
                </p>
                <p class="weather__p weather__p--humidity">
                    Wilgotność: {{ weather.humidity }}
                </p>
            </div>

            <div class="weather__sunrise-sunset">
                <p class="weather__p weather__p--sunrise">
                    Wschód Słońca: {{ weather.sunrise }}
                </p>
                <p class="weather__p weather__p--sunset">
                    Zachód Słońca: {{ weather.sunset }}
                </p>
            </div>

            <div class="weather__temp-min-max" v-if="showDesktop1280">
                <p class="weather__p weather__p--temp-min">
                    Temperatura minimalna: {{ weather.temp_min }}
                </p>
                <p class="weather__p weather__p--temp-max">
                    Temperatura maksymalna: {{ weather.temp_max }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

const API = "http://api.openweathermap.org/data/2.5/weather?units=metric";
const KEY = "&APPID=bff05973f18c6a1a19bc66976347f831";

export default {
    data() {
        return {
            showDesktop: false,
            showDesktop1280: false,
            windowWidth: 0,
            currentDate: "",
            weather: {
                currentTemp: "",
                location: "",
                wind: "",
                description: "",
                temp_min: "",
                temp_max: "",
                sunrise: "",
                sunset: "",
                humidity: "",
                main: ""
            }
        };
    },

    beforeMount() {
        this.geolocation();
        this.getCurrentDate();
    },

    created() {
        window.addEventListener("resize", this.handleResize);
        this.handleResize();
    },

    destroyed() {
        window.removeEventListener("resize", this.handleResize);
    },

    methods: {
        getCurrentDate() {
            const newDate = new Date();

            const currentDate = moment(newDate)
                .locale("pl")
                .format("dddd, DD MMMM");

            this.currentDate = currentDate;
        },

        handleResize() {
            this.windowWidth = window.innerWidth;

            if (this.windowWidth >= 768) {
                this.showDesktop = true;
            } else {
                this.showDesktop = false;
            }

            if (this.windowWidth >= 1280) {
                this.showDesktop1280 = true;
            } else {
                this.showDesktop1280 = false;
            }
        },

        getCurrentWeather(url) {
            axios
                .get(url)
                .then(response => {
                    this.weather.currentTemp = Math.round(
                        response.data.main.temp
                    );
                    this.weather.wind =
                        Math.round(response.data.wind.speed) + " m/s";
                    this.weather.location = response.data.name;
                    this.weather.description =
                        response.data.weather[0].description
                            .charAt(0)
                            .toUpperCase() +
                        response.data.weather[0].description.slice(1);
                    this.weather.main = response.data.weather[0].main;
                    this.weather.temp_min =
                        Math.round(response.data.main.temp_min) + "°C";
                    this.weather.temp_max =
                        Math.round(response.data.main.temp_max) + "°C";
                    this.weather.humidity = response.data.main.humidity + "%";
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
                    this.weather.id = response.data.weather[0].id;

                    const weather = document.querySelector(".weather");

                    let weatherMain = this.weather.main;
                    let weatherId = this.weather.id;

                    if (weatherMain === "Clouds") {
                        weather.style.backgroundImage =
                            'url("https://images.pexels.com/photos/2114014/pexels-photo-2114014.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")';
                    } else if (weatherMain === "Clear") {
                        weather.style.backgroundImage =
                            'url("https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")';
                    } else if (weatherMain === "Thunderstorm") {
                        weather.style.backgroundImage =
                            'url("https://images.pexels.com/photos/167755/pexels-photo-167755.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")';
                    } else if (weatherMain === "Drizzle") {
                        weather.style.backgroundImage =
                            'url("https://images.pexels.com/photos/5683567/pexels-photo-5683567.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")';
                    } else if (weatherMain === "Rain") {
                        weather.style.backgroundImage =
                            'url("https://images.pexels.com/photos/166360/pexels-photo-166360.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")';
                    } else if (weatherMain === "Snow") {
                        weather.style.backgroundImage =
                            'url("https://images.pexels.com/photos/60561/winter-snow-nature-60561.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")';
                        weather.style.color = "black";
                    } else if (weatherMain === "Mist") {
                        weather.style.backgroundImage =
                            "url('https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')";
                    }
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
    }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/colors";

.weather {
    display: flex;
    align-items: center;
    position: relative;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    width: 100%;
    font-weight: bold;
    color: $white;

    &__content {
        padding: 1.5rem;
        display: flex;
    }

    &__left {
        display: flex;
        flex-direction: column;
    }

    &__right {
        display: flex;
        flex-direction: column;
        margin-left: 2rem;
        justify-content: flex-end;
        padding-bottom: 0.6rem;
    }

    &__p {
        font-size: 0.7rem;

        &--temp {
            margin-top: 0.6rem;
            font-size: 2rem;
            font-weight: normal;
        }

        &--location {
            position: relative;

            &::before {
                content: "";
                position: absolute;
                bottom: 20%;
                left: -13%;
                height: 2rem;
                border-right: 1px solid $white;
            }
        }

        &--date {
            margin-bottom: 0.6rem;
        }
    }

    &__icon {
        position: absolute;
        top: 0;
        right: 0;
        width: 60px;
        height: 60px;

        display: none;

        img {
            width: 100%;
            height: 100%;
        }
    }
}

@media (min-width: 320px) {
    .weather {
        &__p {
            font-size: 0.8rem;

            &--temp {
                font-size: 2rem;
            }
        }

        &__icon {
            display: block;
            top: 10%;
            right: 10%;

            user-select: none;
        }
    }
}

@media (min-width: 360px) {
    .weather {
        &__icon {
            top: 15%;
            right: 5%;
        }
    }
}

@media (min-width: 375px) {
    .weather {
        &__icon {
            width: 65px;
            height: 65px;
        }
    }
}

@media (min-width: 414px) {
    .weather {
        &__icon {
            width: 70px;
            height: 70px;

            top: 8%;
            right: 5%;
        }

        &__p {
            &--description {
                font-size: 1rem;
            }
        }
    }
}

@media (min-width: 540px) {
    .weather {
        &__icon {
            width: 80px;
            height: 80px;
            top: 10%;
            right: 10%;
        }
    }
}

@media (min-width: 768px) {
    .weather {
        &__wind-humidity {
            display: flex;
            flex-direction: column;
            margin-left: 2rem;
            justify-content: flex-end;
            padding-bottom: 0.6rem;
        }

        &__sunrise-sunset {
            display: flex;
            flex-direction: column;
            margin-left: 2rem;
            justify-content: flex-end;
            padding-bottom: 0.6rem;
        }

        &__icon {
            width: 90px;
            height: 90px;
            top: 6%;
            right: 10%;
        }

        &__p {
            &--location {
                position: relative;
                &::after {
                    content: "";
                    position: absolute;
                    bottom: 25%;
                    right: -7%;
                    height: 2rem;
                    border-right: 1px solid $white;
                }
            }

            &--humidity {
                position: relative;
                &::after {
                    content: "";
                    position: absolute;
                    bottom: 25%;
                    right: -7%;
                    height: 2rem;
                    border-right: 1px solid $white;
                }
            }

            &--wind {
                margin-bottom: 0.6rem;
            }

            &--sunrise {
                margin-bottom: 0.6rem;
            }
        }
    }
}

@media (min-width: 1024px) {
    .weather {
        &__icon {
            width: 95px;
            height: 95px;
            top: 2%;
            right: 10%;
        }
    }
}

@media (min-width: 1280px) {
    .weather {
        &__temp-min-max {
            display: flex;
            flex-direction: column;
            margin-left: 2rem;
            justify-content: flex-end;
            padding-bottom: 0.6rem;
        }

        &__p {
            &--temp-min {
                margin-bottom: 0.6rem;
            }
            &--sunset {
                position: relative;
                &::after {
                    content: "";
                    position: absolute;
                    bottom: 25%;
                    right: -7%;
                    height: 2rem;
                    border-right: 1px solid $white;
                }
            }
        }

        &__icon {
            width: 100px;
            height: 100px;
            top: 0;
            right: 10%;
        }
    }
}
</style>

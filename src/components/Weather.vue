<template>
    <div class="weather">
        <div class="weather__content">
            <div class="weather__left">
                <p class="weather__p weather__p--description">Sunny</p>
                <p class="weather__p weather__p--temp">22°</p>
            </div>

            <div class="weather__right">
                <p class="weather__p weather__p--date">Monday, 21 September</p>
                <p class="weather__p weather__p--location">
                    <i class="fas fa-map-marker-alt"></i>
                    Paris
                </p>
            </div>

            <div class="weather__icon">
                <img :src="weather.icon" />
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

const API = 'http://api.openweathermap.org/data/2.5/weather?units=metric';
const KEY = '&APPID=bff05973f18c6a1a19bc66976347f831';

export default {
    data() {
        return {
            weather: {
                currentTemp: '',
                icon: '',
                location: '',
                wind: '',
                description: '',
                country: '',
                feels_like: '',
                temp_min: '',
                temp_max: '',
                pressure: '',
                sunrise: '',
                sunset: '',
                humidity: ''
            }
        };
    },

    beforeMount() {
        this.geolocation();
    },

    methods: {
        getCurrentWeather(url) {
            axios
                .get(url)
                .then(response => {
                    this.weather.currentTemp = Math.round(
                        response.data.main.temp
                    );
                    this.weather.wind = response.data.wind.speed + ' m/s';
                    this.weather.location = response.data.name;
                    this.weather.description =
                        response.data.weather[0].description
                            .charAt(0)
                            .toUpperCase() +
                        response.data.weather[0].description.slice(1);

                    this.weather.country = response.data.sys.country;
                    this.weather.icon =
                        'http://openweathermap.org/img/w/' +
                        response.data.weather[0].icon +
                        '.png';
                    this.weather.feels_like =
                        Math.round(response.data.main.feels_like) + ' °C';
                    this.weather.temp_min =
                        Math.round(response.data.main.temp_min) + ' °C';
                    this.weather.temp_max =
                        Math.round(response.data.main.temp_max) + ' °C';
                    this.weather.humidity = response.data.main.humidity + '%';
                    this.weather.pressure = response.data.main.pressure + ' Pa';
                    this.weather.sunrise = new Date(
                        response.data.sys.sunrise * 1000
                    )
                        .toLocaleTimeString('pl-PL')
                        .slice(0, 5);
                    this.weather.sunset = new Date(
                        response.data.sys.sunset * 1000
                    )
                        .toLocaleTimeString('pl-PL')
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
                API + '&lat=' + lat + '&lon=' + lon + '&lang=pl' + KEY
            );
        },

        geoError() {
            this.getCurrentWeather(API + '&lat=0&lon=0' + KEY);
        }
    }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/weather.scss';
</style>

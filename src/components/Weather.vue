<template>
    <div class="weather">
        <div class="container">
            <div class="container__top">
                <p class="container__description">{{ weather.description }}</p>

                <p class="container__time">{{ time }}</p>
            </div>

            <div class="container__bottom">
                <p class="container__temp">{{ weather.temp }}℃</p>

                <p class="container__location">
                    <i class="fas fa-map-marker-alt"> </i>
                    {{ weather.location }},
                    <span class="container__country">{{
                        weather.country
                    }}</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

const API = 'https://api.openweathermap.org/data/2.5/weather?units=metric';
const KEY = '&APPID=bff05973f18c6a1a19bc66976347f831';

export default {
    data() {
        return {
            time: '',
            weather: {
                temp: '',
                location: '',
                description: '',
                country: '',
            },
        };
    },

    beforeMount() {
        this.geolocation();
        this.getTime();
    },

    methods: {
        getTime() {
            const newDate = new Date();

            const time = moment(newDate)
                .locale('pl')
                .format('LT');

            this.time = time;
        },

        getCurrentWeather(url) {
            axios.get(url).then(response => {
                this.weather.temp = Math.round(response.data.main.temp);
                this.weather.location = response.data.name;
                this.weather.country = response.data.sys.country;
                this.weather.description =
                    response.data.weather[0].description
                        .charAt(0)
                        .toUpperCase() +
                    response.data.weather[0].description.slice(1);
                this.weather.main = response.data.weather[0].main;

                const weather = document.querySelector('.weather');

                const weatherMain = this.weather.main;

                if (weatherMain === 'Clouds') {
                    weather.style.backgroundImage =
                        'url("https://images.pexels.com/photos/2114014/pexels-photo-2114014.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")';
                } else if (weatherMain === 'Clear') {
                    weather.style.backgroundImage =
                        'url("https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")';
                } else if (weatherMain === 'Thunderstorm') {
                    weather.style.backgroundImage =
                        'url("https://images.pexels.com/photos/167755/pexels-photo-167755.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")';
                } else if (weatherMain === 'Drizzle') {
                    weather.style.backgroundImage =
                        'url("https://images.pexels.com/photos/5683567/pexels-photo-5683567.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")';
                } else if (weatherMain === 'Rain') {
                    weather.style.backgroundImage =
                        'url("https://images.pexels.com/photos/166360/pexels-photo-166360.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")';
                } else if (weatherMain === 'Snow') {
                    weather.style.backgroundImage =
                        'url("https://images.pexels.com/photos/60561/winter-snow-nature-60561.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")';
                    weather.style.color = 'black';
                } else if (weatherMain === 'Mist') {
                    weather.style.backgroundImage =
                        "url('https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')";
                } else if (weatherMain === 'Fog') {
                    weather.style.backgroundImage =
                        "url('https://images.pexels.com/photos/978844/pexels-photo-978844.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')";
                    weather.style.color = 'black';
                }
            });
        },

        geolocation() {
            navigator.geolocation.getCurrentPosition(
                this.buildUrl,
                this.geoError,
            );
        },

        buildUrl(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            this.getCurrentWeather(
                `${API}&lat=${lat}&lon=${lon}&lang=pl${KEY}`,
            );
        },

        geoError() {
            this.getCurrentWeather(`${API}&lat=0&lon=0${KEY}`);
        },
    },
};
</script>

<style lang="scss" scoped>
.weather {
    display: flex;
    align-items: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    width: 100%;
    padding: 2rem;
    color: white;
    animation: weather 30s infinite;

    .container {
        width: 100%;

        &__top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 2rem;
        }

        &__bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 1rem;
        }

        &__temp {
            font-size: 2.5rem;
        }

        &__location {
            font-size: 1.1rem;
        }
    }
}

@keyframes weather {
    50% {
        background-position: right center;
    }
}

@media (min-width: 480px) {
    .weather {
        max-width: 480px;
        margin: 0 auto;
        border: 0.5px solid black;
        border-radius: 1rem;
        margin-top: 2rem;
        animation: weather 10s infinite;
    }
}
</style>

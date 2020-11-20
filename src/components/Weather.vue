<template>
  <div class="weather">
    <div class="weather__content" v-if="!showDesktop">
      <div class="weather__left">
        <p class="weather__p weather__p--description">
          {{ weather.description }}
        </p>
        <p class="weather__p weather__p--temp">{{ weather.currentTemp }}°</p>
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

      <div class="weather__icon">
        <img :src="weather.icon" />
      </div>
    </div>

    <div class="weather__content" v-else>
      <div class="weather__left">
        <p class="weather__p weather__p--description">
          {{ weather.description }}
        </p>
        <p class="weather__p weather__p--temp">{{ weather.currentTemp }}°</p>
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
      showDesktop: false,
      showDesktop1280: false,
      windowWidth: 0,
      currentDate: '',
      weather: {
        currentTemp: '',
        icon: '',
        location: '',
        wind: '',
        description: '',
        temp_min: '',
        temp_max: '',
        sunrise: '',
        sunset: '',
        humidity: '',
        main: ''
      }
    };
  },

  beforeMount() {
    this.geolocation();
    this.getCurrentDate();
  },

  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },

  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },

  methods: {
    getCurrentDate() {
      const newDate = new Date();

      const currentDate = moment(newDate)
        .locale('pl')
        .format('dddd, DD MMMM');

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
          this.weather.currentTemp = Math.round(response.data.main.temp);
          this.weather.wind = Math.round(response.data.wind.speed) + ' m/s';
          this.weather.location = response.data.name;
          this.weather.description =
            response.data.weather[0].description.charAt(0).toUpperCase() +
            response.data.weather[0].description.slice(1);
          this.weather.main = response.data.weather[0].main;
          this.weather.icon =
            'http://openweathermap.org/img/w/' +
            response.data.weather[0].icon +
            '.png';
          this.weather.temp_min =
            Math.round(response.data.main.temp_min) + '°C';
          this.weather.temp_max =
            Math.round(response.data.main.temp_max) + '°C';
          this.weather.humidity = response.data.main.humidity + '%';
          this.weather.sunrise = new Date(response.data.sys.sunrise * 1000)
            .toLocaleTimeString('pl-PL')
            .slice(0, 5);
          this.weather.sunset = new Date(response.data.sys.sunset * 1000)
            .toLocaleTimeString('pl-PL')
            .slice(0, 5);

          const weather = document.querySelector('.weather');

          let weatherMain = this.weather.main;

          if (weatherMain === 'Clouds') {
            weather.style.backgroundImage =
              'url("https://www.popsci.com/resizer/eXGai221sRaUNXWRaw2Fs3Iy0Bk=/760x376/arc-anglerfish-arc2-prod-bonnier.s3.amazonaws.com/public/BESKPBEOLCXIMVYHKUMPY4JATI.jpg")';
            weather.style.backgroundPosition = 'top right';
          } else if (weatherMain === 'Clear') {
            weather.style.backgroundImage =
              'url("https://media.istockphoto.com/photos/landscape-of-the-clear-sky-picture-id936912376?k=6&m=936912376&s=170667a&w=0&h=Aual4865oDTUX626nWZc9GPH6SRJXTNm_9WV2UOp62k=")';
            weather.style.backgroundPosition = 'center';
          } else if (weatherMain === 'Thunderstorm') {
            weather.style.backgroundImage =
              'url("https://s7d2.scene7.com/is/image/TWCNews/lightning_jpg-8")';
            weather.style.backgroundPosition = 'center';
          } else if (weatherMain === 'Drizzle') {
            weather.style.backgroundImage =
              'url("https://img2.thejournal.ie/article/4668868/river?version=4668925&width=1340")';
            weather.style.backgroundPosition = 'center';
          } else if (weatherMain === 'Rain') {
            weather.style.backgroundImage =
              'url("https://www.wallpaperup.com/uploads/wallpapers/2015/11/17/838275/a6d998345ff8c9455cc43916377a2a7f-700.jpg")';
            weather.style.backgroundPosition = 'top right';
          } else if (weatherMain === 'Snow') {
            weather.style.backgroundImage =
              'url("https://s7d2.scene7.com/is/image/TWCNews/snowflake-formatted-snow-03222020jpg")';
            weather.style.backgroundPosition = 'center';
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    geolocation() {
      navigator.geolocation.getCurrentPosition(this.buildUrl, this.geoError);
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

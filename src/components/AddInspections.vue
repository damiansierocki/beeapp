<template>
    <div class="addinspections">
        <div class="container">
            <form class="form" @submit.prevent>
                <div class="form__close" @click="$emit('close')">
                    <i class="fas fa-times"></i>
                </div>

                <h2 class="form__header">Dodaj inspekcję</h2>

                <h2 class="form__header form__header--desc">
                    Informacje Generalne
                </h2>

                <label class="form__label" for="purpose">Cel inspekcji</label>
                <select
                    class="form__input"
                    name="purpose"
                    id="purpose"
                    v-model="inspection.purpose"
                >
                    <option disabled value="">Wybierz cel inspekcji</option>
                    <option value="Przegląd wczesno wiosenny"
                        >Przegląd wczesno wiosenny</option
                    >
                    <option value="Przegląd wiosenny">Przegląd wiosenny</option>
                    <option value="Powiększenie gniazd"
                        >Powiększenie gniazd</option
                    >
                    <option value="Dołożenie korpusu miodu"
                        >Dołożenie korpusu miodu</option
                    >
                    <option value="Miodobranie I">Miodobranie I</option>
                    <option value="Miodobranie II">Miodobranie II</option>
                    <option value="Zabranie korpusu miodu"
                        >Zabranie korpusu miodu</option
                    >
                    <option value="Przegląd przed podkarmianiem"
                        >Przegląd przed podkarmianiem</option
                    >
                    <option value="Przegląd po podkarmieniu"
                        >Przegląd po podkarmieniu</option
                    >
                    <option value="Przegląd przed zimą"
                        >Przeglą przed zimą</option
                    >
                    <option value="Inny">Inny</option>
                </select>

                <transition
                    enter-active-class="animate__animated animate__shakeX"
                    mode="out-in"
                    appear
                >
                    <p
                        class="error"
                        v-if="
                            !$v.inspection.purpose.required &&
                                $v.inspection.purpose.$dirty
                        "
                    >
                        Cel inspekcji musi być wpisany!
                    </p>
                </transition>

                <label
                    for="other"
                    class="form__label"
                    v-if="inspection.purpose === 'Inny'"
                    >Jaki?</label
                >
                <input
                    type="text"
                    id="other"
                    name="other"
                    class="form__input"
                    v-model="inspection.other"
                    v-if="inspection.purpose === 'Inny'"
                />

                <label class="form__label" for="apiary">Pasieka</label>
                <select
                    class="form__input"
                    name="apiary"
                    id="apiary"
                    v-model="inspection.apiary"
                >
                    <option disabled value="">Wybierz pasiekę</option>
                    <option
                        v-for="apiary in apiaries"
                        :key="apiary.id"
                        :value="apiary.name"
                        >{{ apiary.name }}</option
                    >
                </select>

                <transition
                    enter-active-class="animate__animated animate__shakeX"
                    mode="out-in"
                    appear
                >
                    <p
                        class="error"
                        v-if="
                            !$v.inspection.apiary.required &&
                                $v.inspection.apiary.$dirty
                        "
                    >
                        Pasieka musi być wybrana!
                    </p>
                </transition>

                <label class="form__label" for="hive">Ul</label>
                <select
                    class="form__input"
                    name="hive"
                    id="hive"
                    v-model="inspection.hive"
                >
                    <option disabled value="">Wybierz numer ula</option>
                    <option
                        v-for="hive in hives"
                        :key="hive.id"
                        :value="hive.number"
                        >{{ hive.number }}</option
                    >
                </select>

                <transition
                    enter-active-class="animate__animated animate__shakeX"
                    mode="out-in"
                    appear
                >
                    <p
                        class="error"
                        v-if="
                            !$v.inspection.hive.required &&
                                $v.inspection.hive.$dirty
                        "
                    >
                        Ul musi być wybrany!
                    </p>
                </transition>

                <label for="date" class="form__label">Data</label>
                <input
                    class="form__input"
                    type="date"
                    id="date"
                    name="date"
                    v-model="inspection.date"
                />

                <transition
                    enter-active-class="animate__animated animate__shakeX"
                    mode="out-in"
                    appear
                >
                    <p
                        class="error"
                        v-if="
                            !$v.inspection.date.required &&
                                $v.inspection.date.$dirty
                        "
                    >
                        Data musi być wybrana!
                    </p>
                </transition>

                <h2 class="form__header form__header--desc">
                    Informacje o pszczołach
                </h2>

                <label class="form__label" for="strength">Siła pszczół</label>
                <select
                    class="form__input"
                    name="strength"
                    id="strength"
                    v-model="inspection.strength"
                >
                    <option disabled value=""
                        >Wybierz siłę rodziny pszczelej</option
                    >
                    <option value="Bardzo słaba">Bardzo słaba</option>
                    <option value="Słaba">Słaba</option>
                    <option value="Normalna">Normalna</option>
                    <option value="Silna">Silna</option>
                    <option value="Bardzo silna">Bardzo silna</option>
                </select>

                <label class="form__label" for="temperament">Temperament</label>
                <select
                    class="form__input"
                    name="temperament"
                    id="temperament"
                    v-model="inspection.temperament"
                >
                    <option disabled value=""
                        >Wybierz temperament rodziny pszczelej</option
                    >
                    <option value="Spokojna">Spokojna</option>
                    <option value="Nerwowa">Nerwowa</option>
                    <option value="Agresywna">Agresywna</option>
                </select>

                <label class="form__label" for="frames"
                    >Ilość ramek w ulu</label
                >
                <input
                    id="frames"
                    name="frames"
                    class="form__input"
                    type="text"
                    placeholder="Wpisz ilość ramek w ulu..."
                    v-model.trim="inspection.frames"
                />

                <h2 class="form__header form__header--desc">
                    Informacje o matce
                </h2>

                <label class="form__label" for="isQueen">Matka</label>
                <select
                    class="form__input"
                    name="isQueen"
                    id="isQueen"
                    v-model="inspection.isQueen"
                >
                    <option disabled value="">Czy matka jest w ulu?</option>
                    <option value="Tak">Tak</option>
                    <option value="Nie">Nie</option>
                </select>

                <label
                    class="form__label"
                    for="age"
                    v-if="inspection.isQueen !== 'Nie'"
                    >Wiek matki (w latach)</label
                >
                <input
                    id="age"
                    name="age"
                    class="form__input"
                    type="number"
                    placeholder="Wpisz wiek matki..."
                    v-model.trim="inspection.age"
                    v-if="inspection.isQueen !== 'Nie'"
                />

                <label
                    class="form__label"
                    for="installed"
                    v-if="inspection.isQueen !== 'Nie'"
                    >Kiedy matka została wrzucona do ula</label
                >
                <input
                    id="installed"
                    name="installed"
                    class="form__input"
                    type="date"
                    v-model.trim="inspection.installed"
                    v-if="inspection.isQueen !== 'Nie'"
                />

                <label
                    class="form__label"
                    for="race"
                    v-if="inspection.isQueen !== 'Nie'"
                    >Rasa matki</label
                >
                <select
                    class="form__input"
                    name="race"
                    id="race"
                    v-model="inspection.race"
                    v-if="inspection.isQueen !== 'Nie'"
                >
                    <option disabled value="">Wybiesz rase matki</option>
                    <option value="Pszczoła Środkowoeuropejska"
                        >Pszczoła Środkowoeuropejska</option
                    >
                    <option value="Pszczoła Kaukaska">Pszczoła Kaukaska</option>
                    <option value="Pszczoła Kraińska">Pszczoła Kraińska</option>
                    <option value="Pszczoła Włoska">Pszczoła Włoska</option>
                    <option value="Pszczoła Buckfast">Pszczoła Buckfast</option>
                    <option value="Heterozja (mieszane)"
                        >Heterozja (mieszane)</option
                    >
                </select>

                <label
                    class="form__label"
                    for="queenColor"
                    v-if="inspection.isQueen !== 'Nie'"
                    >Kolor matki</label
                >
                <select
                    class="form__input"
                    name="queenColor"
                    id="queenColor"
                    v-model="inspection.queenColor"
                    v-if="inspection.isQueen !== 'Nie'"
                >
                    <option disabled value="">Wybierz kolor matki</option>
                    <option value="Biały">Biały</option>
                    <option value="Żółty">Żółty</option>
                    <option value="Czerwony">Czerwony</option>
                    <option value="Zielony">Zielony</option>
                    <option value="Niebieski">Niebieski</option>
                </select>

                <label
                    class="form__label"
                    for="queenNote"
                    v-if="inspection.isQueen !== 'Nie'"
                    >Notatka dotycząca matki</label
                >
                <textarea
                    id="queenNote"
                    name="queenNote"
                    class="form__input"
                    type="text"
                    placeholder="Wpisz notatkę dotyczącą matki..."
                    v-model.trim="inspection.queenNote"
                    v-if="inspection.isQueen !== 'Nie'"
                ></textarea>

                <h2 class="form__header form__header--desc">
                    Informacje o ramkach
                </h2>

                <label class="form__label" for="framesWithBees"
                    >Z pszczołami</label
                >
                <input
                    class="form__input"
                    type="number"
                    id="framesWithBees"
                    name="framesWithBees"
                    placeholder="Wpisz ilość ramek z pszczołami..."
                    v-model="inspection.framesWithBees"
                />

                <label class="form__label" for="framesWithBrood"
                    >Z czerwiem</label
                >
                <input
                    class="form__input"
                    type="number"
                    id="framesWithBrood"
                    name="framesWithBrood"
                    placeholder="Wpisz ilość ramek z czerwiem..."
                    v-model="inspection.framesWithBrood"
                />

                <label class="form__label" for="framesWithHoney"
                    >Z miodem</label
                >
                <input
                    class="form__input"
                    type="number"
                    id="framesWithHoney"
                    name="framesWithHoney"
                    placeholder="Wpisz ilość ramek z miodem..."
                    v-model="inspection.framesWithHoney"
                />

                <label class="form__label" for="framesWithPollen"
                    >Z pyłkiem</label
                >
                <input
                    class="form__input"
                    type="number"
                    id="framesWithPollen"
                    name="framesWithPollen"
                    placeholder="Wpisz ilość ramek z pyłkiem..."
                    v-model="inspection.framesWithPollen"
                />

                <h2 class="form__header form__header--desc">
                    Problemy & Notatki
                </h2>

                <label class="form__label" for="problems"
                    >Napotkane problemy</label
                >
                <input
                    class="form__input"
                    type="text"
                    id="problems"
                    name="problems"
                    placeholder="Wpisz napotkane problemy podczas inspekcji..."
                    v-model="inspection.problems"
                />

                <label class="form__label" for="note">Notatki</label>
                <textarea
                    class="form__input"
                    type="text"
                    id="note"
                    name="note"
                    placeholder="Wpisz notatki dotyczące inspekcji..."
                    v-model="inspection.note"
                ></textarea>

                <h2 class="form__header form__header--desc">
                    Informacje o pogodzie
                </h2>

                <label class="form__label" for="includeWeather"
                    >Warunki pogodowe</label
                >
                <select
                    class="form__input"
                    name="includeWeather"
                    id="includeWeather"
                    v-model="inspection.includeWeather"
                >
                    <option disabled value=""
                        >Czy chcesz uwzględnić pogodę?</option
                    >
                    <option value="Tak">Tak</option>
                    <option value="Nie">Nie</option>
                </select>

                <label
                    class="form__label"
                    for="conditions"
                    v-if="inspection.includeWeather === 'Tak'"
                    >Warunki pogodowe</label
                >
                <input
                    class="form__input"
                    type="text"
                    id="conditions"
                    name="conditions"
                    v-model="inspection.conditions"
                    v-if="inspection.includeWeather === 'Tak'"
                />

                <label
                    class="form__label"
                    for="temperature"
                    v-if="inspection.includeWeather === 'Tak'"
                    >Temperatura</label
                >
                <input
                    class="form__input"
                    type="text"
                    id="temperature"
                    name="temperature"
                    v-model="inspection.temperature"
                    v-if="inspection.includeWeather === 'Tak'"
                />

                <label
                    class="form__label"
                    for="humidity"
                    v-if="inspection.includeWeather === 'Tak'"
                    >Wilgotność</label
                >
                <input
                    class="form__input"
                    type="text"
                    id="humidity"
                    name="humidity"
                    v-model="inspection.humidity"
                    v-if="inspection.includeWeather === 'Tak'"
                />

                <label
                    class="form__label"
                    for="pressure"
                    v-if="inspection.includeWeather === 'Tak'"
                    >Ciśnienie</label
                >
                <input
                    class="form__input"
                    type="text"
                    id="pressure"
                    name="pressure"
                    v-model="inspection.pressure"
                    v-if="inspection.includeWeather === 'Tak'"
                />

                <label
                    class="form__label"
                    for="wind"
                    v-if="inspection.includeWeather === 'Tak'"
                    >Prędkość wiatru</label
                >
                <input
                    class="form__input"
                    type="text"
                    id="wind"
                    name="wind"
                    v-model="inspection.wind"
                    v-if="inspection.includeWeather === 'Tak'"
                />

                <button
                    class="form__button "
                    type="submit"
                    @click="addInspections()"
                    v-if="!isPending"
                >
                    Dodaj inspekcję
                </button>

                <div class="sk-chase" v-if="addInspectionsStatus === 'PENDING'">
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                </div>

                <p class="success" v-if="addInspectionsStatus === 'OK'">
                    Pomyślnie dodano inspekcję 👍
                </p>
            </form>
        </div>
    </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { mapState } from 'vuex';
import axios from 'axios';

const API = 'https://api.openweathermap.org/data/2.5/weather?units=metric';
const KEY = '&APPID=bff05973f18c6a1a19bc66976347f831';

export default {
    data() {
        return {
            inspection: {
                // general
                purpose: '',
                other: '',
                apiary: '',
                hive: '',
                date: '',

                // bees
                strength: '',
                temperament: '',
                frames: '',

                // queen
                isQueen: '',
                age: '',
                installed: '',
                race: '',
                queenColor: '',
                queenNote: '',

                // frames with
                framesWithBees: '',
                framesWithBrood: '',
                framesWithHoney: '',
                framesWithPollen: '',

                // spotted problems
                problems: '',
                note: '',

                // weather
                includeWeather: '',
                conditions: '',
                temperature: '',
                humidity: '',
                pressure: '',
                wind: '',
            },

            addInspectionsStatus: null,
            isPending: false,
        };
    },

    validations: {
        inspection: {
            purpose: {
                required,
            },

            apiary: {
                required,
            },

            hive: {
                required,
            },

            date: {
                required,
            },
        },
    },

    computed: {
        ...mapState(['apiaries', 'hives']),
    },

    beforeMount() {
        this.geolocation();
    },

    created() {
        this.getApiaries();
        this.getHives();
    },

    methods: {
        getApiaries() {
            this.$store.dispatch('getApiaries');
        },

        getHives() {
            this.$store.dispatch('getHives');
        },

        addInspections() {
            this.$v.$touch();

            if (this.$v.$invalid) {
                this.addInspectionsStatus = 'ERROR';
            } else {
                this.$store
                    .dispatch('addInspections', {
                        // general
                        purpose: this.inspection.purpose,
                        other: this.inspection.other,
                        apiary: this.inspection.apiary,
                        hive: this.inspection.hive,
                        date: this.inspection.date,

                        // bees
                        strength: this.inspection.strength,
                        temperament: this.inspection.temperament,
                        frames: this.inspection.frames,

                        // queen
                        isQueen: this.inspection.isQueen,
                        age: this.inspection.age,
                        installed: this.inspection.installed,
                        race: this.inspection.race,
                        queenColor: this.inspection.queenColor,
                        queenNote: this.inspection.queenNote,

                        // frames with
                        framesWithBees: this.inspection.framesWithBees,
                        framesWithBrood: this.inspection.framesWithBrood,
                        framesWithHoney: this.inspection.framesWithHoney,
                        framesWithPollen: this.inspection.framesWithPollen,

                        // spotted problems
                        problems: this.inspection.problems,
                        note: this.inspection.note,

                        // weather
                        includeWeather: this.inspection.includeWeather,
                        conditions: this.inspection.conditions,
                        temperature: this.inspection.temperature,
                        humidity: this.inspection.humidity,
                        pressure: this.inspection.pressure,
                        wind: this.inspection.wind,
                    })
                    .then(() => {
                        this.addInspectionsStatus = 'PENDING';
                        this.isPending = true;

                        setTimeout(() => {
                            this.addInspectionsStatus = 'OK';
                            this.isPending = false;
                        }, 1000);
                    });

                setTimeout(() => {
                    this.addInspectionsStatus = '';
                    // general
                    this.inspection.purpose = '';
                    this.inspection.other = '';
                    this.inspection.apiary = '';
                    this.inspection.hive = '';
                    this.inspection.date = '';

                    // bees
                    this.inspection.strength = '';
                    this.inspection.temperament = '';
                    this.inspection.frames = '';

                    // queen
                    this.inspection.isQueen = '';
                    this.inspection.age = '';
                    this.inspection.installed = '';
                    this.inspection.race = '';
                    this.inspection.queenColor = '';
                    this.inspection.queenNote = '';

                    // spotted problems
                    this.inspection.problems = '';
                    this.inspection.note = '';

                    // weather
                    this.inspection.includeWeather = '';
                    this.inspection.conditions = '';
                    this.inspection.temperature = '';
                    this.inspection.humidity = '';
                    this.inspection.pressure = '';
                    this.inspection.wind = '';
                });
            }
        },

        getCurrentWeather(url) {
            axios
                .get(url)
                .then(response => {
                    this.inspection.temperature =
                        // eslint-disable-next-line prefer-template
                        Math.round(response.data.main.temp) + '℃';
                    this.inspection.humidity = `${response.data.main.humidity} %`;
                    this.inspection.pressure = `${response.data.main.pressure} hPa`;
                    this.inspection.wind = `${Math.round(
                        response.data.wind.speed,
                    )} m/s`;
                    this.inspection.conditions =
                        response.data.weather[0].description
                            .charAt(0)
                            .toUpperCase() +
                        response.data.weather[0].description.slice(1);
                })
                .catch(error => {
                    console.log(error);
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
.addinspections {
    position: absolute;
    z-index: 1;
    display: flex;
    width: 100%;

    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        background: white;
        position: relative;

        .form {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            border-radius: 0.2rem;
            padding: 3rem;
            position: relative;

            &__close {
                padding: 1rem 2rem;
                font-size: 2rem;
                position: absolute;
                top: 0;
                right: 0;
                cursor: pointer;
                transition: 0.1s;

                &:hover {
                    transform: scale(1.1);
                }
            }

            &__header {
                font-size: 2rem;
                position: relative;
                padding: 2rem 0;

                &--desc {
                    font-size: 1.5rem;

                    &::after {
                        display: none;
                    }
                }

                &::after {
                    content: '';
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    width: 100%;
                    height: 0.5px;
                    background: #000;
                }
            }

            &__label {
                padding: 1.5rem 0;
                font-size: 1.5rem;
            }

            &__input {
                border: 1px solid #ccc;
                padding: 1rem;
                border-radius: 0.2rem;
                transition: all 0.1s;

                &:focus {
                    outline: 2px solid orange;
                }
            }

            &__button {
                margin-top: 4rem;
                padding: 1rem 0;
                cursor: pointer;
                border: 1px solid #ccc;
                border-radius: 0.2rem;
                background-color: #f5f5f5;
                transition: 0.1s;

                &:hover {
                    background-color: #e7e7e7c7;
                }
            }

            .error {
                color: tomato;
                margin-top: 0.5rem;
            }

            .success {
                color: green;
                margin: 0 auto;
                margin-top: 1.5rem;
                font-size: 1.5rem;
            }

            // sk-chase
            .sk-chase {
                width: 40px;
                height: 40px;
                position: relative;
                animation: sk-chase 2.5s infinite linear both;
                margin: 0 auto;
                margin-top: 2rem;
            }

            .sk-chase-dot {
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
                animation: sk-chase-dot 2s infinite ease-in-out both;
            }

            .sk-chase-dot::before {
                content: '';
                display: block;
                width: 25%;
                height: 25%;
                background-color: black;
                border-radius: 100%;
                animation: sk-chase-dot-before 2s infinite ease-in-out both;
            }

            .sk-chase-dot:nth-child(1) {
                animation-delay: -1.1s;
            }

            .sk-chase-dot:nth-child(2) {
                animation-delay: -1s;
            }

            .sk-chase-dot:nth-child(3) {
                animation-delay: -0.9s;
            }

            .sk-chase-dot:nth-child(4) {
                animation-delay: -0.8s;
            }

            .sk-chase-dot:nth-child(5) {
                animation-delay: -0.7s;
            }

            .sk-chase-dot:nth-child(6) {
                animation-delay: -0.6s;
            }

            .sk-chase-dot:nth-child(1)::before {
                animation-delay: -1.1s;
            }

            .sk-chase-dot:nth-child(2)::before {
                animation-delay: -1s;
            }

            .sk-chase-dot:nth-child(3)::before {
                animation-delay: -0.9s;
            }

            .sk-chase-dot:nth-child(4)::before {
                animation-delay: -0.8s;
            }

            .sk-chase-dot:nth-child(5)::before {
                animation-delay: -0.7s;
            }

            .sk-chase-dot:nth-child(6)::before {
                animation-delay: -0.6s;
            }

            @keyframes sk-chase {
                100% {
                    transform: rotate(360deg);
                }
            }

            @keyframes sk-chase-dot {
                80%,
                100% {
                    transform: rotate(360deg);
                }
            }

            @keyframes sk-chase-dot-before {
                50% {
                    transform: scale(0.4);
                }

                0% {
                    transform: scale(1);
                }
            }
        }

        &__extras {
            margin-top: 2rem;
            font-size: 1.4rem;
            display: flex;
            flex-direction: column;
            text-decoration: underline;

            .have-account {
                cursor: pointer;
                color: black;

                &:hover {
                    font-weight: bold;
                }
            }
        }
    }
}

@media (min-width: 768px) {
    .addinspections {
        .form {
            border: 1px solid #ccc;
            background: white;
            max-width: 768px;
        }
    }
}
</style>

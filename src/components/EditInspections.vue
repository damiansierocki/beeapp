<template>
    <div class="editinspections">
        <div class="container">
            <form class="form" @submit.prevent>
                <div class="form__close" @click="$emit('close')">
                    <i class="fas fa-times"></i>
                </div>

                <h2 class="form__header">Edytuj inspekcję</h2>

                <h2 class="form__header form__header--desc">
                    Informacje Generalne
                </h2>

                <label class="form__label" for="purpose">Cel inspekcji</label>
                <input
                    id="purpose"
                    name="purpose"
                    class="form__input"
                    type="text"
                    :placeholder="purpose"
                    v-model.trim="inspection.purpose"
                />

                <label class="form__label" for="apiary">Pasieka</label>
                <select
                    class="form__input"
                    name="apiary"
                    id="apiary"
                    v-model="inspection.apiary"
                >
                    <option disabled value="">{{ apiary }}</option>
                    <option
                        v-for="apiary in apiaries"
                        :key="apiary.id"
                        :value="apiary.name"
                        >{{ apiary.name }}</option
                    >
                </select>

                <label class="form__label" for="hive">Ul</label>
                <select
                    class="form__input"
                    name="hive"
                    id="hive"
                    v-model="inspection.hive"
                >
                    <option disabled value="">{{ hive }}</option>
                    <option
                        v-for="hive in hives"
                        :key="hive.id"
                        :value="hive.number"
                        >{{ hive.number }}</option
                    >
                </select>

                <label for="date" class="form__label">Data</label>
                <input
                    class="form__input"
                    type="date"
                    id="date"
                    name="date"
                    :placeholder="date"
                    v-model="inspection.date"
                    onfocus="(this.type='date')"
                    onblur="(this.type='text')"
                />

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
                    <option disabled value="">{{ strength }}</option>
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
                    <option disabled value="">{{ temperament }}</option>
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
                    :placeholder="frames"
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
                    <option disabled value="">{{ isQueen }}</option>
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
                    :placeholder="age"
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
                    :placeholder="installed"
                    v-if="inspection.isQueen !== 'Nie'"
                    onfocus="(this.type='date')"
                    onblur="(this.type='text')"
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
                    <option disabled value="">{{ race }}</option>
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
                    <option disabled value="">{{ queenColor }}</option>
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
                    :placeholder="queenNote"
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
                    :placeholder="framesWithBees"
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
                    :placeholder="framesWithBrood"
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
                    :placeholder="framesWithHoney"
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
                    :placeholder="framesWithPollen"
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
                    :placeholder="problems"
                    v-model="inspection.problems"
                />

                <label class="form__label" for="note">Notatki</label>
                <textarea
                    class="form__input"
                    type="text"
                    id="note"
                    name="note"
                    :placeholder="note"
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
                    <option disabled value="">{{ includeWeather }}</option>
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
                    :placeholder="conditions"
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
                    :placeholder="temperature"
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
                    :placeholder="humidity"
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
                    :placeholder="pressure"
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
                    :placeholder="wind"
                    v-model="inspection.wind"
                    v-if="inspection.includeWeather === 'Tak'"
                />

                <button
                    class="form__button "
                    type="submit"
                    @click="editInspections()"
                    v-if="!isPending"
                >
                    Edytuj inspekcję
                </button>

                <div
                    class="sk-chase"
                    v-if="editInspectionsStatus === 'PENDING'"
                >
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                </div>

                <p class="success" v-if="editInspectionsStatus === 'OK'">
                    Pomyślnie edytowano inspekcję 👍
                </p>
            </form>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    props: [
        'id',
        'purpose',
        'apiary',
        'hive',
        'date',
        'strength',
        'temperament',
        'frames',
        'isQueen',
        'age',
        'installed',
        'race',
        'queenColor',
        'queenNote',
        'framesWithBees',
        'framesWithBrood',
        'framesWithHoney',
        'framesWithPollen',
        'problems',
        'note',
        'includeWeather',
        'conditions',
        'temperature',
        'humidity',
        'pressure',
        'wind',
    ],

    data() {
        return {
            inspection: {
                // general
                purpose: '',
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

            editInspectionsStatus: null,
            isPending: false,
        };
    },

    created() {
        this.getHives();
        this.getApiaries();
        this.getInspections();
    },

    computed: {
        ...mapState(['hives', 'apiaries', 'inspections']),
    },

    methods: {
        getHives() {
            this.$store.dispatch('getHives');
        },

        getApiaries() {
            this.$store.dispatch('getApiaries');
        },

        getInspections() {
            this.$store.dispatch('getInspections');
        },

        editInspections() {
            const docId = this.id;

            const inspections = {
                purpose:
                    this.inspection.purpose !== ''
                        ? this.inspection.purpose
                        : this.purpose,
                apiary:
                    this.inspection.apiary !== ''
                        ? this.inspection.apiary
                        : this.apiary,
                hive:
                    this.inspection.hive !== ''
                        ? this.inspection.hive
                        : this.hive,
                date:
                    this.inspection.date !== ''
                        ? this.inspection.date
                        : this.date,

                // bees
                strength:
                    this.inspection.strength !== ''
                        ? this.inspection.strength
                        : this.strength,
                temperament:
                    this.inspection.temperament !== ''
                        ? this.inspection.temperament
                        : this.temperament,
                frames:
                    this.inspection.frames !== ''
                        ? this.inspection.frames
                        : this.frames,

                // queen
                isQueen:
                    this.inspection.isQueen !== ''
                        ? this.inspection.isQueen
                        : this.isQueen,
                age:
                    this.inspection.age !== '' ? this.inspection.age : this.age,
                installed:
                    this.inspection.installed !== ''
                        ? this.inspection.installed
                        : this.installed,
                race:
                    this.inspection.race !== ''
                        ? this.inspection.race
                        : this.race,
                queenColor:
                    this.inspection.queenColor !== ''
                        ? this.inspection.queenColor
                        : this.queenColor,
                queenNote:
                    this.inspection.queenNote !== ''
                        ? this.inspection.queenNote
                        : this.queenNote,

                // frames with
                framesWithBees:
                    this.inspection.framesWithBees !== ''
                        ? this.inspection.framesWithBees
                        : this.framesWithBees,
                framesWithBrood:
                    this.inspection.framesWithBrood !== ''
                        ? this.inspection.framesWithBrood
                        : this.framesWithBrood,
                framesWithHoney:
                    this.inspection.framesWithHoney !== ''
                        ? this.inspection.framesWithHoney
                        : this.framesWithHoney,
                framesWithPollen:
                    this.inspection.framesWithPollen !== ''
                        ? this.inspection.framesWithPollen
                        : this.framesWithPollen,

                // spotted problems
                problems:
                    this.inspection.problems !== ''
                        ? this.inspection.problems
                        : this.problems,
                note:
                    this.inspection.note !== ''
                        ? this.inspection.note
                        : this.note,

                // weather
                includeWeather:
                    this.inspection.includeWeather !== ''
                        ? this.inspection.includeWeather
                        : this.includeWeather,
                conditions:
                    this.inspection.conditions !== ''
                        ? this.inspection.conditions
                        : this.conditions,
                temperature:
                    this.inspection.temperature !== ''
                        ? this.inspection.temperature
                        : this.temperature,
                humidity:
                    this.inspection.humidity !== ''
                        ? this.inspection.humidity
                        : this.humidity,
                pressure:
                    this.inspection.pressure !== ''
                        ? this.inspection.pressure
                        : this.pressure,
                wind:
                    this.inspection.wind !== ''
                        ? this.inspection.wind
                        : this.wind,
            };

            this.$store
                .dispatch('editInspections', { docId, inspections })
                .then(() => {
                    this.editInspectionsStatus = 'PENDING';
                    this.isPending = true;

                    setTimeout(() => {
                        this.editInspectionsStatus = 'OK';
                        this.isPending = false;
                    }, 1000);
                });

            setTimeout(() => {
                this.editInspectionsStatus = '';

                // general
                this.inspection.purpose = '';
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
        },
    },
};
</script>

<style lang="scss" scoped>
.editinspections {
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
            }

            &__header {
                font-size: 2rem;
                position: relative;
                padding: 2rem 0rem;

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
                    background: #000000;
                }
            }
            &__label {
                padding: 1.5rem 0rem;
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

            .sk-chase-dot:before {
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
            .sk-chase-dot:nth-child(1):before {
                animation-delay: -1.1s;
            }
            .sk-chase-dot:nth-child(2):before {
                animation-delay: -1s;
            }
            .sk-chase-dot:nth-child(3):before {
                animation-delay: -0.9s;
            }
            .sk-chase-dot:nth-child(4):before {
                animation-delay: -0.8s;
            }
            .sk-chase-dot:nth-child(5):before {
                animation-delay: -0.7s;
            }
            .sk-chase-dot:nth-child(6):before {
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
                100%,
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
    .editinspections {
        .form {
            border: 1px solid #ccc;
            background: white;
            max-width: 768px;
        }
    }
}
</style>

<template>
    <div class="editinspections">
        <div class="content">
            <div class="content__header">
                <h2 class="content__title">
                    Edytuj inspekcję 🐝
                </h2>
                <span class="content__close" @click="$emit('close')">
                    <i class="fas fa-times"></i>
                </span>
            </div>

            <form class="content__form" @submit.prevent>
                <div class="content__general">
                    <h3 class="content__title-h3">Informacje generalne</h3>

                    <label class="content__label" for="purpose"
                        >Cel inspekcji</label
                    >
                    <input
                        id="purpose"
                        name="purpose"
                        class="content__input"
                        type="text"
                        :placeholder="purpose"
                        v-model.trim="inspection.purpose"
                    />

                    <label class="content__label" for="apiary">Pasieka</label>
                    <select
                        class="content__input"
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

                    <label class="content__label" for="hive">Ul</label>
                    <select
                        class="content__input"
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

                    <label for="date" class="content__label">Data</label>
                    <input
                        class="content__input"
                        type="date"
                        id="date"
                        name="date"
                        :placeholder="date"
                        v-model="inspection.date"
                        onfocus="(this.type='date')"
                        onblur="(this.type='text')"
                    />
                </div>

                <div class="content__bees">
                    <h3 class="content__title-h3">Pszczoły</h3>

                    <label class="content__label" for="strength"
                        >Siła pszczół</label
                    >
                    <select
                        class="content__input"
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

                    <label class="content__label" for="temperament"
                        >Temperament</label
                    >
                    <select
                        class="content__input"
                        name="temperament"
                        id="temperament"
                        v-model="inspection.temperament"
                    >
                        <option disabled value="">{{ temperament }}</option>
                        <option value="Spokojna">Spokojna</option>
                        <option value="Nerwowa">Nerwowa</option>
                        <option value="Agresywna">Agresywna</option>
                    </select>

                    <label class="content__label" for="frames"
                        >Ilość ramek w ulu</label
                    >
                    <input
                        id="frames"
                        name="frames"
                        class="content__input"
                        type="text"
                        :placeholder="frames"
                        v-model.trim="inspection.frames"
                    />
                </div>

                <div class="content__queen">
                    <h3 class="content__title-h3">Królowa</h3>

                    <label class="content__label" for="isQueen">Królowa</label>
                    <select
                        class="content__input"
                        name="isQueen"
                        id="isQueen"
                        v-model="inspection.isQueen"
                    >
                        <option disabled value="">{{ isQueen }}</option>
                        <option value="Tak">Tak</option>
                        <option value="Nie">Nie</option>
                    </select>

                    <label
                        class="content__label"
                        for="age"
                        v-if="inspection.isQueen !== 'Nie'"
                        >Wiek Królowej (w latach)</label
                    >
                    <input
                        id="age"
                        name="age"
                        class="content__input"
                        type="number"
                        :placeholder="age"
                        v-model.trim="inspection.age"
                        v-if="inspection.isQueen !== 'Nie'"
                    />

                    <label
                        class="content__label"
                        for="installed"
                        v-if="inspection.isQueen !== 'Nie'"
                        >Kiedy królowa została wrzucona do ula</label
                    >
                    <input
                        id="installed"
                        name="installed"
                        class="content__input"
                        type="date"
                        :placeholder="installed"
                        v-model.trim="inspection.installed"
                        v-if="inspection.isQueen !== 'Nie'"
                        onfocus="(this.type='date')"
                        onblur="(this.type='text')"
                    />

                    <label
                        class="content__label"
                        for="race"
                        v-if="inspection.isQueen !== 'Nie'"
                        >Rasa królowej</label
                    >
                    <select
                        class="content__input"
                        name="race"
                        id="race"
                        v-model="inspection.race"
                        v-if="inspection.isQueen !== 'Nie'"
                    >
                        <option disabled value="">{{ race }}</option>
                        <option value="Pszczoła Środkowoeuropejska"
                            >Pszczoła Środkowoeuropejska</option
                        >
                        <option value="Pszczoła Kaukaska"
                            >Pszczoła Kaukaska</option
                        >
                        <option value="Pszczoła Kraińska"
                            >Pszczoła Kraińska</option
                        >
                        <option value="Pszczoła Włoska">Pszczoła Włoska</option>
                        <option value="Pszczoła Buckfast"
                            >Pszczoła Buckfast</option
                        >
                        <option value="Heterozja (mieszane)"
                            >Heterozja (mieszane)</option
                        >
                    </select>

                    <label
                        class="content__label"
                        for="queenColor"
                        v-if="inspection.isQueen !== 'Nie'"
                        >Kolor królowej</label
                    >
                    <select
                        class="content__input"
                        name="queenColor"
                        id="queenColor"
                        v-model="inspection.queenColor"
                        v-if="inspection.isQueen !== 'Nie'"
                    >
                        <option disabled value="">{{ queenColor }}</option>
                        >
                        <option value="Biały">Biały</option>
                        <option value="Żółty">Żółty</option>
                        <option value="Czerwony">Czerwony</option>
                        <option value="Zielony">Zielony</option>
                        <option value="Niebieski">Niebieski</option>
                    </select>

                    <label
                        class="content__label"
                        for="queenNote"
                        v-if="inspection.isQueen !== 'Nie'"
                        >Notatka dotycząca królowej</label
                    >
                    <textarea
                        id="queenNote"
                        name="queenNote"
                        class="content__input"
                        type="text"
                        :placeholder="queenNote"
                        v-model.trim="inspection.queenNote"
                        v-if="inspection.isQueen !== 'Nie'"
                    ></textarea>
                </div>

                <div class="content__frames-with">
                    <h3 class="content__title-h3">Ramki</h3>

                    <label class="content__label" for="framesWithBees"
                        >Z pszczołami</label
                    >
                    <input
                        class="content__input"
                        type="number"
                        id="framesWithBees"
                        name="framesWithBees"
                        :placeholder="framesWithBees"
                        v-model="inspection.framesWithBees"
                    />

                    <label class="content__label" for="framesWithBrood"
                        >Z czerwiem</label
                    >
                    <input
                        class="content__input"
                        type="number"
                        id="framesWithBrood"
                        name="framesWithBrood"
                        :placeholder="framesWithBrood"
                        v-model="inspection.framesWithBrood"
                    />

                    <label class="content__label" for="framesWithHoney"
                        >Z miodem</label
                    >
                    <input
                        class="content__input"
                        type="number"
                        id="framesWithHoney"
                        name="framesWithHoney"
                        :placeholder="framesWithHoney"
                        v-model="inspection.framesWithHoney"
                    />

                    <label class="content__label" for="framesWithPollen"
                        >Z pyłkiem</label
                    >
                    <input
                        class="content__input"
                        type="number"
                        id="framesWithPollen"
                        name="framesWithPollen"
                        :placeholder="framesWithPollen"
                        v-model="inspection.framesWithPollen"
                    />
                </div>

                <div class="content__spotted-problems">
                    <h3 class="content__title-h3">
                        Problemy & Notatki
                    </h3>

                    <label class="content__label" for="problems"
                        >Napotkane problemy</label
                    >
                    <input
                        class="content__input"
                        type="text"
                        id="problems"
                        name="problems"
                        :placeholder="problems"
                        v-model="inspection.problems"
                    />

                    <label class="content__label" for="note">Notatki</label>
                    <textarea
                        class="content__input"
                        type="text"
                        id="note"
                        name="note"
                        :placeholder="note"
                        v-model="inspection.note"
                    ></textarea>
                </div>

                <div class="content__include-weather">
                    <h3 class="content__title-h3">Pogoda</h3>

                    <label class="content__label" for="includeWeather"
                        >Warunki pogodowe</label
                    >
                    <select
                        class="content__input"
                        name="includeWeather"
                        id="includeWeather"
                        v-model="inspection.includeWeather"
                    >
                        <option disabled value="">{{ includeWeather }}</option>
                        <option value="Tak">Tak</option>
                        <option value="Nie">Nie</option>
                    </select>

                    <label
                        class="content__label"
                        for="conditions"
                        v-if="inspection.includeWeather === 'Tak'"
                        >Warunki pogodowe</label
                    >
                    <input
                        class="content__input"
                        type="text"
                        id="conditions"
                        name="conditions"
                        v-model="inspection.conditions"
                        v-if="inspection.includeWeather === 'Tak'"
                        :placeholder="conditions"
                    />

                    <label
                        class="content__label"
                        for="temperature"
                        v-if="inspection.includeWeather === 'Tak'"
                        >Temperatura</label
                    >
                    <input
                        class="content__input"
                        type="text"
                        id="temperature"
                        name="temperature"
                        v-model="inspection.temperature"
                        v-if="inspection.includeWeather === 'Tak'"
                        :placeholder="temperature"
                    />

                    <label
                        class="content__label"
                        for="humidity"
                        v-if="inspection.includeWeather === 'Tak'"
                        >Wilgotność</label
                    >
                    <input
                        class="content__input"
                        type="text"
                        id="humidity"
                        name="humidity"
                        v-model="inspection.humidity"
                        v-if="inspection.includeWeather === 'Tak'"
                        :placeholder="humidity"
                    />

                    <label
                        class="content__label"
                        for="pressure"
                        v-if="inspection.includeWeather === 'Tak'"
                        >Ciśnienie</label
                    >
                    <input
                        class="content__input"
                        type="text"
                        id="pressure"
                        name="pressure"
                        v-model="inspection.pressure"
                        v-if="inspection.includeWeather === 'Tak'"
                        :placeholder="pressure"
                    />

                    <label
                        class="content__label"
                        for="wind"
                        v-if="inspection.includeWeather === 'Tak'"
                        >Prędkość wiatru</label
                    >
                    <input
                        class="content__input"
                        type="text"
                        id="wind"
                        name="wind"
                        v-model="inspection.wind"
                        v-if="inspection.includeWeather === 'Tak'"
                        :placeholder="wind"
                    />
                </div>

                <button class="content__btn" @click="editInspections">
                    Edytuj inspekcje
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    props: [
        "id",
        "purpose",
        "apiary",
        "hive",
        "date",
        "strength",
        "temperament",
        "frames",
        "isQueen",
        "age",
        "installed",
        "race",
        "queenColor",
        "queenNote",
        "framesWithBees",
        "framesWithBrood",
        "framesWithHoney",
        "framesWithPollen",
        "problems",
        "note",
        "includeWeather",
        "conditions",
        "temperature",
        "humidity",
        "pressure",
        "wind"
    ],

    data() {
        return {
            inspection: {
                // general
                purpose: "",
                apiary: "",
                hive: "",
                date: "",

                // bees
                strength: "",
                temperament: "",
                frames: "",

                // queen
                isQueen: "",
                age: "",
                installed: "",
                race: "",
                queenColor: "",
                queenNote: "",

                // frames with
                framesWithBees: "",
                framesWithBrood: "",
                framesWithHoney: "",
                framesWithPollen: "",

                // spotted problems
                problems: "",
                note: "",

                // weather
                includeWeather: "",
                conditions: "",
                temperature: "",
                humidity: "",
                pressure: "",
                wind: ""
            }
        };
    },

    created() {
        this.getHives();
        this.getApiaries();
        this.getInspections();
    },

    computed: {
        ...mapState(["hives", "apiaries", "inspections"])
    },

    methods: {
        getHives() {
            this.$store.dispatch("getHives");
        },

        getApiaries() {
            this.$store.dispatch("getApiaries");
        },

        getInspections() {
            this.$store.dispatch("getInspections");
        },

        editInspections() {
            const docId = this.id;

            const inspections = {
                purpose: this.inspection.purpose,
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
                wind: this.inspection.wind
            };

            this.$store.dispatch("editinspections", { docId, inspections });

            // general
            this.inspection.purpose = "";
            this.inspection.apiary = "";
            this.inspection.hive = "";
            this.inspection.date = "";

            // bees
            this.inspection.strength = "";
            this.inspection.temperament = "";
            this.inspection.frames = "";

            // queen
            this.inspection.isQueen = "";
            this.inspection.age = "";
            this.inspection.installed = "";
            this.inspection.race = "";
            this.inspection.queenColor = "";
            this.inspection.queenNote = "";

            // spotted problems
            this.inspection.problems = "";
            this.inspection.note = "";

            // weather
            this.inspection.includeWeather = "";
            this.inspection.conditions = "";
            this.inspection.temperature = "";
            this.inspection.humidity = "";
            this.inspection.pressure = "";
            this.inspection.wind = "";
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/colors";

.editinspections {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 999;
    display: flex;

    .content {
        width: 100%;
        background: $white;

        &__header {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-items: center;
            margin-top: 3rem;
        }

        &__title {
            font-size: 2rem;
        }

        &__close {
            position: absolute;
            top: 1%;
            right: 5%;
            padding: 0.5rem;
            font-size: 1.2rem;
        }

        &__form {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-items: center;
            margin-top: 3rem;
        }

        &__general {
            display: flex;
            flex-direction: column;
            width: 100%;
            justify-content: center;
            align-items: center;
            border: 2px solid $black;
            padding: 1rem;
        }

        &__bees {
            display: flex;
            flex-direction: column;
            width: 100%;
            justify-content: center;
            align-items: center;
            border: 2px solid $black;
            padding: 1rem;
        }

        &__queen {
            display: flex;
            flex-direction: column;
            width: 100%;
            justify-content: center;
            align-items: center;
            border: 2px solid $black;
            padding: 1rem;
        }

        &__frames-with {
            display: flex;
            flex-direction: column;
            width: 100%;
            justify-content: center;
            align-items: center;
            border: 2px solid $black;
            padding: 1rem;
        }

        &__spotted-problems {
            display: flex;
            flex-direction: column;
            width: 100%;
            justify-content: center;
            align-items: center;
            border: 2px solid $black;
            padding: 1rem;
        }

        &__include-weather {
            display: flex;
            flex-direction: column;
            width: 100%;
            justify-content: center;
            align-items: center;
            border: 2px solid $black;
            padding: 1rem;
        }

        &__title-h3 {
            font-size: 1.8rem;
            font-weight: bold;
            border-bottom: 5px solid $black;
        }
        &__general {
            display: flex;
            flex-direction: column;
            width: 100%;
            justify-content: center;
            align-items: center;
            border: 2px solid $black;
            padding: 1rem;
        }

        &__bees {
            display: flex;
            flex-direction: column;
            width: 100%;
            justify-content: center;
            align-items: center;
            border: 2px solid $black;
            padding: 1rem;
        }

        &__queen {
            display: flex;
            flex-direction: column;
            width: 100%;
            justify-content: center;
            align-items: center;
            border: 2px solid $black;
            padding: 1rem;
        }

        &__frames-with {
            display: flex;
            flex-direction: column;
            width: 100%;
            justify-content: center;
            align-items: center;
            border: 2px solid $black;
            padding: 1rem;
        }

        &__spotted-problems {
            display: flex;
            flex-direction: column;
            width: 100%;
            justify-content: center;
            align-items: center;
            border: 2px solid $black;
            padding: 1rem;
        }

        &__include-weather {
            display: flex;
            flex-direction: column;
            width: 100%;
            justify-content: center;
            align-items: center;
            border: 2px solid $black;
            padding: 1rem;
        }

        &__title-h3 {
            font-size: 1.8rem;
            font-weight: bold;
            border-bottom: 5px solid $black;
        }

        &__label {
            font-size: 1.3rem;
            padding: 1rem;
        }

        &__input {
            padding: 0.8rem;
            width: 70%;
        }

        &__btn {
            margin-top: 2rem;
            padding: 0.7rem;
            box-shadow: inset 0px 1px 0px 0px #fff6af;
            background: linear-gradient(to bottom, #ffec64 5%, #ffab23 100%);
            background-color: #ffec64;
            border-radius: 6px;
            border: 1px solid #ffaa22;
            display: inline-block;
            cursor: pointer;
            color: #333333;
            font-family: Arial;
            font-size: 15px;
            font-weight: bold;
            padding: 6px 24px;
            text-decoration: none;
            text-shadow: 0px 1px 0px #ffee66;

            &:focus {
                outline: 0;
            }
        }
    }
}
</style>

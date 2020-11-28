<template>
    <div class="addhives">
        <div class="content">
            <div class="content__header">
                <h2 class="content__title">
                    Dodaj ul 🐝
                </h2>
                <span class="content__close" @click="$emit('close')">
                    <i class="fas fa-times"></i>
                </span>
            </div>

            <form class="content__form" @submit.prevent>
                <div class="content__general">
                    <h3 class="content__title-h3">Informacje generalne</h3>

                    <label class="content__label" for="number">Numer Ula</label>
                    <input
                        id="number"
                        name="number"
                        class="content__input"
                        type="number"
                        placeholder="Wpisz numer ula..."
                        v-model.trim="hives.number"
                    />

                    <label class="content__label" for="apiary">Pasieka</label>
                    <select
                        class="content__input"
                        name="apiary"
                        id="apiary"
                        v-model="hives.apiary"
                    >
                        <option disabled value="">Wybierz pasiekę</option>
                        <option
                            v-for="apiary in apiaries"
                            :key="apiary.id"
                            :value="apiary.name"
                            >{{ apiary.name }}</option
                        >
                    </select>

                    <label class="content__label" for="status">Stan ula</label>
                    <select
                        class="content__input"
                        name="status"
                        id="status"
                        v-model="hives.status"
                    >
                        <option disabled value="">Wybierz stan ula</option>
                        <option value="Aktywny">Aktywny</option>
                        <option value="Sprzedany">Sprzedany</option>
                        <option value="Martwy (brak pszczół)"
                            >Martwy (brak pszczół)</option
                        >
                        <option value="Inny">Inny</option>
                    </select>

                    <label class="content__label" for="purpose"
                        >Przeznaczenie</label
                    >
                    <select
                        class="content__input"
                        name="purpose"
                        id="purpose"
                        v-model="hives.purpose"
                    >
                        <option disabled value=""
                            >Wybierz przeznaczenie ula</option
                        >
                        <option value="Produkcja miodu">Produkcja miodu</option>
                        <option value="Produkcja pszczół"
                            >Produkcja pszczół</option
                        >
                        <option value="Produkcja matek">Produkcja matek</option>
                        <option value="Inny">Inny</option>
                    </select>

                    <label class="content__label" for="created"
                        >Data dodania ula do pasieki</label
                    >
                    <input
                        id="created"
                        name="created"
                        class="content__input"
                        type="date"
                        v-model.trim="hives.created"
                    />

                    <label class="content__label" for="generalNote"
                        >Notatka odnośnie ula</label
                    >
                    <textarea
                        id="generalNote"
                        name="generalNote"
                        class="content__input"
                        type="text"
                        placeholder="Wpisz notatkę dotyczącą ula..."
                        v-model.trim="hives.generalNote"
                    ></textarea>
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
                        v-model="hives.strength"
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

                    <label class="content__label" for="temperament"
                        >Temperament</label
                    >
                    <select
                        class="content__input"
                        name="temperament"
                        id="temperament"
                        v-model="hives.temperament"
                    >
                        <option disabled value=""
                            >Wybierz temperament rodziny pszczelej</option
                        >
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
                        placeholder="Wpisz ilość ramek w ulu..."
                        v-model.trim="hives.frames"
                    />
                </div>

                <div class="content__queen">
                    <h3 class="content__title-h3">Królowa</h3>

                    <label class="content__label" for="isQueen">Królowa</label>
                    <select
                        class="content__input"
                        name="isQueen"
                        id="isQueen"
                        v-model="hives.isQueen"
                    >
                        <option disabled value=""
                            >Czy jest królowa w ulu?</option
                        >
                        <option value="Tak">Tak</option>
                        <option value="Nie">Nie</option>
                    </select>

                    <label
                        class="content__label"
                        for="age"
                        v-if="hives.isQueen !== 'Nie'"
                        >Wiek Królowej (w latach)</label
                    >
                    <input
                        id="age"
                        name="age"
                        class="content__input"
                        type="number"
                        placeholder="Wpisz wiek królowej..."
                        v-model.trim="hives.age"
                        v-if="hives.isQueen !== 'Nie'"
                    />

                    <label
                        class="content__label"
                        for="installed"
                        v-if="hives.isQueen !== 'Nie'"
                        >Kiedy królowa została wrzucona do ula</label
                    >
                    <input
                        id="installed"
                        name="installed"
                        class="content__input"
                        type="date"
                        v-model.trim="hives.installed"
                        v-if="hives.isQueen !== 'Nie'"
                    />

                    <label
                        class="content__label"
                        for="race"
                        v-if="hives.isQueen !== 'Nie'"
                        >Rasa królowej</label
                    >
                    <select
                        class="content__input"
                        name="race"
                        id="race"
                        v-model="hives.race"
                        v-if="hives.isQueen !== 'Nie'"
                    >
                        <option disabled value="">Wybiesz rase królowej</option>
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
                        v-if="hives.isQueen !== 'Nie'"
                        >Kolor królowej</label
                    >
                    <select
                        class="content__input"
                        name="queenColor"
                        id="queenColor"
                        v-model="hives.queenColor"
                        v-if="hives.isQueen !== 'Nie'"
                    >
                        <option disabled value=""
                            >Wybierz kolor królowej</option
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
                        v-if="hives.isQueen !== 'Nie'"
                        >Notatka dotycząca królowej</label
                    >
                    <textarea
                        id="queenNote"
                        name="queenNote"
                        class="content__input"
                        type="text"
                        placeholder="Wpisz notatkę dotyczącą królowej..."
                        v-model.trim="hives.queenNote"
                        v-if="hives.isQueen !== 'Nie'"
                    ></textarea>
                </div>

                <button class="content__btn" @click="addHives()">
                    Dodaj ul
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    data() {
        return {
            hives: {
                // general
                number: '',
                apiary: '',
                status: '',
                purpose: '',
                created: '',
                generalNote: '',

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
            },
        };
    },

    computed: {
        ...mapState(['userProfile', 'apiaries']),
    },

    created() {
        this.getApiaries();
    },

    methods: {
        getApiaries() {
            this.$store.dispatch('getApiaries');
        },

        addHives() {
            if (
                this.hives.number !== '' &&
                this.hives.status !== '' &&
                this.hives.apiary !== '' &&
                this.hives.isQueen !== ''
            ) {
                this.$store.dispatch('addHives', {
                    // general
                    number: this.hives.number,
                    apiary: this.hives.apiary,
                    status: this.hives.status,
                    purpose: this.hives.purpose,
                    created: this.hives.created,
                    generalNote: this.hives.generalNote,

                    // bees
                    strength: this.hives.strength,
                    temperament: this.hives.temperament,
                    frames: this.hives.frames,

                    // queen
                    isQueen: this.hives.isQueen,
                    age: this.hives.age,
                    installed: this.hives.installed,
                    race: this.hives.race,
                    queenColor: this.hives.queenColor,
                    queenNote: this.hives.queenNote,
                });
            } else {
                alert(
                    'Pola ["numer ula", "stan ula", "pasieka", "czy jest królowa"] muszą być wypełnione!',
                );
            }

            // general
            this.hives.number = '';
            this.hives.apiary = '';
            this.hives.status = '';
            this.hives.purpose = '';
            this.hives.created = '';
            this.hives.generalNote = '';

            // bees
            this.hives.strength = '';
            this.hives.temperament = '';
            this.hives.frames = '';

            // queen
            this.hives.isQueen = '';
            this.hives.age = '';
            this.hives.installed = '';
            this.hives.race = '';
            this.hives.queenColor = '';
            this.hives.queenNote = '';
        },
    },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/colors';

.addhives {
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
            box-shadow: inset 0px 1px 0px 0px #fff6af;
            background: linear-gradient(to bottom, #ffec64 5%, #ffab23 100%);
            background-color: #ffec64;
            border-radius: 6px;
            border: 1px solid #ffaa22;
            display: inline-block;
            cursor: pointer;
            color: #333333;
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

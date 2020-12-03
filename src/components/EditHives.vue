<template>
    <div class="edithives">
        <div class="container">
            <form class="form" @submit.prevent>
                <div class="form__close" @click="$emit('close')">
                    <i class="fas fa-times"></i>
                </div>

                <h2 class="form__header">Edytuj ul</h2>

                <h2 class="form__header form__header--desc">
                    Informacje Generalne
                </h2>
                <!-- nazwa -->
                <label class="form__label" for="number">Numer ula</label>
                <input
                    class="form__input"
                    type="number"
                    id="number"
                    name="number"
                    :placeholder="number"
                    v-model.trim="hives.number"
                />

                <label class="form__label" for="apiary">Pasieka</label>
                <select
                    class="form__input"
                    name="apiary"
                    id="apiary"
                    v-model="hives.apiary"
                >
                    <option disabled value="">{{ apiary }}</option>
                    <option
                        v-for="apiary in apiaries"
                        :key="apiary.id"
                        :value="apiary.name"
                        >{{ apiary.name }}</option
                    >
                </select>

                <label class="form__label" for="status">Stan ula</label>
                <select
                    class="form__input"
                    name="status"
                    id="status"
                    v-model="hives.status"
                >
                    <option disabled value="">{{ status }}</option>
                    <option value="Aktywny">Aktywny</option>
                    <option value="Sprzedany">Sprzedany</option>
                    <option value="Martwy (brak pszczół)"
                        >Martwy (brak pszczół)</option
                    >
                    <option value="Inny">Inny</option>
                </select>

                <label class="form__label" for="purpose">Przeznaczenie</label>
                <select
                    class="form__input"
                    name="purpose"
                    id="purpose"
                    v-model="hives.purpose"
                >
                    <option disabled value="">{{ purpose }}</option>
                    <option value="Produkcja miodu">Produkcja miodu</option>
                    <option value="Produkcja pszczół">Produkcja pszczół</option>
                    <option value="Produkcja matek">Produkcja matek</option>
                    <option value="Inny">Inny</option>
                </select>

                <label class="form__label" for="created"
                    >Data dodania ula do pasieki</label
                >
                <input
                    id="created"
                    name="created"
                    class="form__input"
                    type="date"
                    :placeholder="created"
                    v-model.trim="hives.created"
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
                    v-model="hives.strength"
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
                    v-model="hives.temperament"
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
                    v-model.trim="hives.frames"
                />

                <h2 class="form__header form__header--desc">
                    Informacje o matce
                </h2>

                <label class="form__label" for="isQueen">Matka</label>
                <select
                    class="form__input"
                    name="isQueen"
                    id="isQueen"
                    v-model="hives.isQueen"
                >
                    <option disabled value="">{{ isQueen }}</option>
                    <option value="Tak">Tak</option>
                    <option value="Nie">Nie</option>
                </select>

                <label
                    class="form__label"
                    for="age"
                    v-if="hives.isQueen !== 'Nie'"
                    >Wiek Matki (w latach)</label
                >
                <input
                    id="age"
                    name="age"
                    class="form__input"
                    type="number"
                    :placeholder="age"
                    v-model.trim="hives.age"
                    v-if="hives.isQueen !== 'Nie'"
                />

                <label
                    class="form__label"
                    for="installed"
                    v-if="hives.isQueen !== 'Nie'"
                    >Kiedy matka została wrzucona do ula</label
                >
                <input
                    id="installed"
                    name="installed"
                    class="form__input"
                    type="date"
                    v-model.trim="hives.installed"
                    v-if="hives.isQueen !== 'Nie'"
                    :placeholder="installed"
                    onfocus="(this.type='date')"
                    onblur="(this.type='text')"
                />

                <label
                    class="form__label"
                    for="race"
                    v-if="hives.isQueen !== 'Nie'"
                    >Rasa matki</label
                >
                <select
                    class="form__input"
                    name="race"
                    id="race"
                    v-model="hives.race"
                    v-if="hives.isQueen !== 'Nie'"
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
                    v-if="hives.isQueen !== 'Nie'"
                    >Kolor matki</label
                >
                <select
                    class="form__input"
                    name="queenColor"
                    id="queenColor"
                    v-model="hives.queenColor"
                    v-if="hives.isQueen !== 'Nie'"
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
                    v-if="hives.isQueen !== 'Nie'"
                    >Notatka dotycząca matki</label
                >
                <textarea
                    id="queenNote"
                    name="queenNote"
                    class="form__input"
                    type="text"
                    :placeholder="queenNote"
                    v-model.trim="hives.queenNote"
                    v-if="hives.isQueen !== 'Nie'"
                ></textarea>

                <button
                    class="form__button "
                    type="submit"
                    @click="editHives()"
                    v-if="!isPending"
                >
                    Edytuj ul
                </button>

                <div class="sk-chase" v-if="editHivesStatus === 'PENDING'">
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                </div>

                <p class="success" v-if="editHivesStatus === 'OK'">
                    Pomyślnie edytowano ul 👍
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
        'number',
        'apiary',
        'status',
        'purpose',
        'created',
        'generalNote',
        'strength',
        'temperament',
        'frames',
        'isQueen',
        'age',
        'installed',
        'race',
        'queenColor',
        'queenNote',
    ],

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

            editHivesStatus: null,
            isPending: false,
        };
    },

    computed: {
        ...mapState(['apiaries']),
    },

    created() {
        this.getApiaries();
    },

    methods: {
        getApiaries() {
            this.$store.dispatch('getApiaries');
        },

        editHives() {
            const docId = this.id;

            const hives = {
                number:
                    this.hives.number !== '' ? this.hives.number : this.number,
                apiary:
                    this.hives.apiary !== '' ? this.hives.apiary : this.apiary,
                status:
                    this.hives.status !== '' ? this.hives.status : this.status,
                purpose:
                    this.hives.purpose !== ''
                        ? this.hives.purpose
                        : this.purpose,
                created:
                    this.hives.created !== ''
                        ? this.hives.created
                        : this.created,
                generalNote:
                    this.hives.generalNote !== ''
                        ? this.hives.generalNote
                        : this.generalNote,

                // bees
                strength:
                    this.hives.strength !== ''
                        ? this.hives.strength
                        : this.strength,
                temperament:
                    this.hives.temperament !== ''
                        ? this.hives.temperament
                        : this.temperament,
                frames:
                    this.hives.frames !== '' ? this.hives.frames : this.frames,

                // queen
                isQueen:
                    this.hives.isQueen !== ''
                        ? this.hives.isQueen
                        : this.isQueen,
                age: this.hives.age !== '' ? this.hives.age : this.age,
                installed:
                    this.hives.installed !== ''
                        ? this.hives.installed
                        : this.installed,
                race: this.hives.race !== '' ? this.hives.race : this.race,
                queenColor:
                    this.hives.queenColor !== ''
                        ? this.hives.queenColor
                        : this.queenColor,
                queenNote:
                    this.hives.queenNote !== ''
                        ? this.hives.queenNote
                        : this.queenNote,
            };

            this.$store.dispatch('editHives', { docId, hives }).then(() => {
                this.editHivesStatus = 'PENDING';
                this.isPending = true;

                setTimeout(() => {
                    this.editHivesStatus = 'OK';
                    this.isPending = false;
                }, 1000);
            });

            setTimeout(() => {
                this.editHivesStatus = '';
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
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.edithives {
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
    .edithives {
        .form {
            border: 1px solid #ccc;
            background: white;
            max-width: 768px;
        }
    }
}
</style>

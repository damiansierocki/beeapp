<template>
    <div class="addhives">
        <div class="container">
            <form class="form" @submit.prevent>
                <div class="form__close" @click="$emit('close')">
                    <i class="fas fa-times"></i>
                </div>

                <h2 class="form__header">Dodaj ul</h2>

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
                    placeholder="Wpisz numer ula..."
                    v-model.trim="hives.number"
                />

                <transition
                    enter-active-class="animate__animated animate__shakeX"
                    mode="out-in"
                    appear
                >
                    <p
                        class="error"
                        v-if="
                            !$v.hives.number.required && $v.hives.number.$dirty
                        "
                    >
                        Numer ula musi być wpisany!
                    </p>
                </transition>

                <!-- typ pożywienia -->
                <label class="form__label" for="apiary">Pasieka</label>
                <select
                    class="form__input"
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

                <transition
                    enter-active-class="animate__animated animate__shakeX"
                    mode="out-in"
                    appear
                >
                    <p
                        class="error"
                        v-if="
                            !$v.hives.apiary.required && $v.hives.apiary.$dirty
                        "
                    >
                        Pasieka musi być wybrana!
                    </p>
                </transition>

                <label class="form__label" for="status">Stan ula</label>
                <select
                    class="form__input"
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

                <transition
                    enter-active-class="animate__animated animate__shakeX"
                    mode="out-in"
                    appear
                >
                    <p
                        class="error"
                        v-if="
                            !$v.hives.status.required && $v.hives.status.$dirty
                        "
                    >
                        Stan ula musi być wybrany!
                    </p>
                </transition>

                <label class="form__label" for="purpose">Przeznaczenie</label>
                <select
                    class="form__input"
                    name="purpose"
                    id="purpose"
                    v-model="hives.purpose"
                >
                    <option disabled value="">Wybierz przeznaczenie ula</option>
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
                    v-model.trim="hives.created"
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
                    v-model="hives.temperament"
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
                    <option disabled value="">Czy jest matka w ulu?</option>
                    <option value="Tak">Tak</option>
                    <option value="Nie">Nie</option>
                </select>

                <transition
                    enter-active-class="animate__animated animate__shakeX"
                    mode="out-in"
                    appear
                >
                    <p
                        class="error"
                        v-if="
                            !$v.hives.isQueen.required &&
                                $v.hives.isQueen.$dirty
                        "
                    >
                        Pole wymagane!
                    </p>
                </transition>

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
                    placeholder="Wpisz wiek matki..."
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
                    v-if="hives.isQueen !== 'Nie'"
                    >Notatka dotycząca matki</label
                >
                <textarea
                    id="queenNote"
                    name="queenNote"
                    class="form__input"
                    type="text"
                    placeholder="Wpisz notatkę dotyczącą matki..."
                    v-model.trim="hives.queenNote"
                    v-if="hives.isQueen !== 'Nie'"
                ></textarea>

                <button
                    class="form__button "
                    type="submit"
                    @click="addHives()"
                    v-if="!isPending"
                >
                    Dodaj ul
                </button>

                <div class="sk-chase" v-if="addHivesStatus === 'PENDING'">
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                </div>

                <p class="success" v-if="addHivesStatus === 'OK'">
                    Pomyślnie dodano ul 👍
                </p>
            </form>
        </div>
    </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
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

            addHivesStatus: null,
            isPending: false,
        };
    },

    validations: {
        hives: {
            number: {
                required,
            },

            apiary: {
                required,
            },

            status: {
                required,
            },

            isQueen: {
                required,
            },
        },
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
            this.$v.$touch();

            if (this.$v.$invalid) {
                this.addHivesStatus = 'ERROR';
            } else {
                this.$store
                    .dispatch('addHives', {
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
                    })
                    .then(() => {
                        this.addHivesStatus = 'PENDING';
                        this.isPending = true;

                        setTimeout(() => {
                            this.addHivesStatus = 'OK';
                            this.isPending = false;
                        }, 1000);
                    });

                setTimeout(() => {
                    this.addHivesStatus = '';

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
                }, 1000);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.addhives {
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
    .addhives {
        .form {
            border: 1px solid #ccc;
            background: white;
            max-width: 768px;
        }
    }
}
</style>

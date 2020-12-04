<template>
    <div class="addapiary">
        <div class="container">
            <form class="form" @submit.prevent>
                <div class="form__close" @click="$emit('close')">
                    <i class="fas fa-times"></i>
                </div>

                <h2 class="form__header">Dodaj pasiekę</h2>

                <h2 class="form__header form__header--desc">
                    Informacje Generalne
                </h2>
                <!-- nazwa -->
                <label class="form__label" for="name">Nazwa pasieki</label>
                <input
                    class="form__input"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Wpisz nazwę pasieki"
                    v-model.trim="apiary.name"
                />

                <transition
                    enter-active-class="animate__animated animate__shakeX"
                    mode="out-in"
                    appear
                >
                    <p
                        class="error"
                        v-if="!$v.apiary.name.required && $v.apiary.name.$dirty"
                    >
                        Nazwa pasieki nie może być pusta!
                    </p>
                </transition>

                <!-- Rodzaj pożytku -->
                <label class="form__label" for="forages">Rodzaj pożytku</label>
                <select
                    class="form__input"
                    name="forages"
                    id="forages"
                    v-model="apiary.forages"
                    multiple
                >
                    <option value="Gryka">Gryka</option>
                    <option value="Akacja">Akacja</option>
                    <option value="Lipa">Lipa</option>
                    <option value="Rzepak">Rzepak</option>
                    <option value="Wrzos">Wrzos</option>
                    <option value="Facylia">Facelia</option>
                    <option value="Spadź">Spadź</option>
                    <option value="Wielokwiat">Wielokwiat</option>
                </select>

                <transition
                    enter-active-class="animate__animated animate__shakeX"
                    mode="out-in"
                    appear
                >
                    <p
                        class="error"
                        v-if="
                            !$v.apiary.forages.required &&
                                $v.apiary.forages.$dirty
                        "
                    >
                        Musi być wybrany Rodzaj pożytku!
                    </p>
                </transition>

                <!-- typ pasieki -->
                <label class="form__label" for="type">Typ pasieki</label>
                <select
                    class="form__input"
                    name="type"
                    id="type"
                    v-model="apiary.type"
                >
                    <option disabled value="">Wybierz rodzaj</option>
                    <option value="Stacjonarna">Stacjonarna</option>
                    <option value="Wędrowna">Wędrowna</option>
                    <option value="Inna">Inna</option>
                </select>

                <transition
                    enter-active-class="animate__animated animate__shakeX"
                    mode="out-in"
                    appear
                >
                    <p
                        class="error"
                        v-if="!$v.apiary.type.required && $v.apiary.type.$dirty"
                    >
                        Musi być wybrany typ pasieki!
                    </p>
                </transition>

                <!-- opis -->
                <label class="form__label" for="description">Opis</label>
                <textarea
                    name="description"
                    id="description"
                    class="form__input"
                    type="text"
                    placeholder="Wpisz opis pasieki..."
                    rows="5"
                    v-model.trim="apiary.description"
                >
                </textarea>

                <h2 class="form__header form__header--desc">
                    Informacje o adresie (opcjonalne)
                </h2>

                <!-- Adres -->
                <label for="address" class="form__label">Adres</label>
                <input
                    id="address"
                    name="address"
                    type="text"
                    class="form__input"
                    placeholder="Wpisz adres..."
                    v-model.trim="apiary.address"
                />

                <!-- miejscowość -->
                <label for="city" class="form__label">Miejscowość</label>
                <input
                    id="city"
                    name="city"
                    type="text"
                    class="form__input"
                    placeholder="Wpisz miejscowość..."
                    v-model.trim="apiary.city"
                />

                <!-- Zip -->
                <label for="zip" class="form__label">Zip</label>
                <input
                    id="zip"
                    name="zip"
                    type="text"
                    class="form__input"
                    placeholder="Wpisz zip kod..."
                    v-model.trim="apiary.zip"
                />

                <!-- wojewewództwo -->
                <label class="form__label" for="province">Województwo</label>
                <select
                    class="form__input"
                    name="province"
                    id="province"
                    v-model="apiary.province"
                >
                    <option value="" disabled>Wybierz województwo</option>
                    <option value="Dolnośląskie">Dolnośląskie</option>
                    <option value="Kujawsko-pomorskie"
                        >Kujawsko-pomorskie</option
                    >
                    <option value="Lubelskie">Lubelskie</option>
                    <option value="Lubuskie">Lubuskie</option>
                    <option value="Łódzkie">Łódzkie</option>
                    <option value="Małopolskie">Małopolskie</option>
                    <option value="Mazowieckie">Mazowieckie</option>
                    <option value="Opolskie">Opolskie</option>
                    <option value="Podkarpackie">Podkarpackie</option>
                    <option value="Podlaskie">Podlaskie</option>
                    <option value="Pomorskie">Pomorskie</option>
                    <option value="Śląskie">Śląskie</option>
                    <option value="Świętokrzyskie">Świętokrzyskie</option>
                    <option value="Warmińsko-mazurskie"
                        >Warmińsko-mazurskie</option
                    >
                    <option value="Wielkopolskie">Wielkopolskie</option>
                    <option value="Zachodniopomorskie"
                        >Zachodniopomorskie</option
                    >
                </select>

                <button
                    class="form__button "
                    type="submit"
                    @click="addApiary()"
                    v-if="!isPending"
                >
                    Dodaj pasiekę
                </button>

                <div class="sk-chase" v-if="addApiaryStatus === 'PENDING'">
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                </div>

                <p class="success" v-if="addApiaryStatus === 'OK'">
                    Pomyślnie dodano pasiekę 👍
                </p>
            </form>
        </div>
    </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';

export default {
    data() {
        return {
            apiary: {
                // general
                name: '',
                forages: [],
                type: '',
                description: '',

                // address
                address: '',
                city: '',
                zip: '',
                province: '',
            },

            addApiaryStatus: null,
            isPending: false,
        };
    },

    validations: {
        apiary: {
            name: {
                required,
            },

            forages: {
                required,
            },

            type: {
                required,
            },
        },
    },

    methods: {
        addApiary() {
            this.$v.$touch();

            if (this.$v.$invalid) {
                this.addApiaryStatus = 'ERROR';
            } else {
                this.$store
                    .dispatch('addApiary', {
                        // general
                        name: this.apiary.name,
                        forages: this.apiary.forages,
                        type: this.apiary.type,
                        description: this.apiary.description,

                        // address
                        address: this.apiary.address,
                        city: this.apiary.city,
                        zip: this.apiary.zip,
                        province: this.apiary.province,
                    })
                    .then(() => {
                        this.addApiaryStatus = 'PENDING';
                        this.isPending = true;

                        setTimeout(() => {
                            this.addApiaryStatus = 'OK';
                            this.isPending = false;
                        }, 1000);
                    });

                setTimeout(() => {
                    this.addApiaryStatus = '';

                    // general
                    this.apiary.name = '';
                    this.apiary.forages = [];
                    this.apiary.type = '';
                    this.apiary.description = '';

                    // address
                    this.apiary.address = '';
                    this.apiary.city = '';
                    this.apiary.zip = '';
                    this.apiary.province = '';
                }, 2000);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.addapiary {
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
    .container {
        .form {
            border: 1px solid #ccc;
            background: white;
            max-width: 768px;
        }
    }
}
</style>

<template>
    <div class="editapiary">
        <div class="content">
            <div class="content__header">
                <h2 class="content__title">
                    Edytuj pasiekę 🐝
                </h2>
                <span class="content__close" @click="$emit('close')">
                    <i class="fas fa-times"></i>
                </span>
            </div>

            <form class="content__form" @submit.prevent>
                <div class="content__general">
                    <h3 class="content__title-h3">Informacje generalne</h3>

                    <label class="content__label" for="name">Nazwa</label>
                    <input
                        class="content__input"
                        id="name"
                        name="name"
                        type="text"
                        :placeholder="name"
                        v-model.trim="apiary.name"
                    />

                    <label class="content__label" for="forages"
                        >Typ pożywienia</label
                    >
                    <select
                        class="content__input"
                        name="forages"
                        id="forages"
                        v-model="apiary.forages"
                        multiple
                    >
                        <option disabled value="">{{
                            forages.join(', ')
                        }}</option>
                        <option value="Gryka">Gryka</option>
                        <option value="Akacja">Akacja</option>
                        <option value="Lipa">Lipa</option>
                        <option value="Rzepak">Rzepak</option>
                        <option value="Wrzos">Wrzos</option>
                        <option value="Facylia">Facylia</option>
                    </select>

                    <label class="content__label" for="type">Typ pasieki</label>
                    <select
                        class="content__input"
                        name="type"
                        id="type"
                        v-model="apiary.type"
                    >
                        <option disabled value="">{{ type }}</option>
                        <option value="Stacjonarna">Stacjonarna</option>
                        <option value="Wędrowna">Wędrowna</option>
                        <option value="Inna">Inna</option>
                    </select>

                    <label class="content__label" for="description">Opis</label>
                    <textarea
                        name="description"
                        id="description"
                        class="content__input"
                        type="text"
                        :placeholder="description"
                        rows="5"
                        v-model.trim="apiary.description"
                    >
                    </textarea>
                </div>

                <div class="content__address">
                    <h3 class="content__title-h3">Informacje o adresie</h3>

                    <label for="address" class="content__label">Adres</label>
                    <input
                        id="address"
                        name="address"
                        type="text"
                        class="content__input"
                        :placeholder="address"
                        v-model.trim="apiary.address"
                    />

                    <label for="city" class="content__label">Miejscowość</label>
                    <input
                        id="city"
                        name="city"
                        type="text"
                        class="content__input"
                        :placeholder="city"
                        v-model.trim="apiary.city"
                    />

                    <label for="zip" class="content__label">Zip</label>
                    <input
                        id="zip"
                        name="zip"
                        type="text"
                        class="content__input"
                        :placeholder="zip"
                        v-model.trim="apiary.zip"
                    />

                    <label class="content__label" for="province"
                        >Województwo</label
                    >
                    <select
                        class="content__input"
                        name="province"
                        id="province"
                        v-model="apiary.province"
                    >
                        <option value="" disabled>{{ province }}</option>
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
                </div>

                <button type="submit" class="content__btn" @click="editApiary">
                    Dodaj pasiekę
                </button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'id',
        'name',
        'type',
        'forages',
        'description',
        'address',
        'city',
        'zip',
        'province',
    ],

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
        };
    },

    methods: {
        editApiary() {
            const docId = this.id;
            const apiary = {
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
            };

            if (
                this.apiary.name !== '' &&
                this.apiary.forages !== [] &&
                this.apiary.type !== '' &&
                this.apiary.description !== ''
            ) {
                this.$store.dispatch('editApiary', { docId, apiary });
            } else {
                alert(
                    'Pola ["nazwa", "typ", "typ pożywienia"] muszą być wypełnione!',
                );
            }

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
        },
    },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/colors';

.editapiary {
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

        &__address {
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

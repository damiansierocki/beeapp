<template>
    <div class="addinspections">
        <div class="content">
            <div class="content__header">
                <h2 class="content__title">
                    Dodaj inspekcję 🐝
                </h2>
                <span class="content__close" @click="$emit('close')">
                    <i class="fas fa-times"></i>
                </span>
            </div>

            <form class="content__form" @submit.prevent>
                <h3>Inspekcja</h3>

                <label class="content__label" for="name">Nazwa inspekcji</label>
                <input
                    class="content__input"
                    type="text"
                    placeholder="Wpisz nazwę inspekcji..."
                    v-model.trim="inspections.name"
                />

                <label class="content__label" for="apiary">Pasieka</label>
                <select
                    class="content__input"
                    name="apiary"
                    id="apiary"
                    v-model="inspections.apiary"
                >
                    <option disabled value="">Wybierz pasiekę</option>
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
                    v-model="inspections.hive"
                >
                    <option disabled value="">Wybierz pasiekę</option>
                    <option
                        v-for="hive in hives"
                        :key="hive.id"
                        :value="hive.hiveId"
                        >{{ hive.hiveId }}</option
                    >
                </select>

                <h3 style="margin-top: 1rem">Data</h3>

                <label for="date" class="content__label">Data</label>
                <input
                    class="content__input"
                    type="date"
                    id="date"
                    name="date"
                    v-model="inspections.date"
                />

                <h3 style="margin-top: 1rem">Kondycja</h3>

                <label for="equipment" class="content__label"
                    >Wyposażenie</label
                >
                <select
                    class="content__input"
                    name="equipment"
                    id="equipment"
                    v-model="inspections.equipment"
                >
                    <option disabled value=""
                        >Wybierz poziom wyposażenia</option
                    >
                    <option value="Zły">Zły</option>
                    <option value="Średni">Średni</option>
                    <option value="Dobry">Dobry</option>
                    <option value="Bardzo dobry">Bardzo dobry</option>
                </select>

                <label for="odor" class="content__label">Zapach</label>
                <select
                    class="content__input"
                    name="odor"
                    id="odor"
                    v-model="inspections.odor"
                >
                    <option disabled value="">Wybierz poziom zapachu</option>
                    <option value="Zły">Zły</option>
                    <option value="Normalny">Normalny</option>
                    <option value="Dobry">Dobry</option>
                    <option value="Bardzo dobry">Bardzo dobry</option>
                </select>

                <label for="deadBees" class="content__label"
                    >Martwe pszczoły</label
                >
                <select
                    class="content__input"
                    name="deadBees"
                    id="deadBees"
                    v-model="inspections.deadBees"
                >
                    <option disabled value="">Czy są martwe pszczoły?</option>
                    <option value="Nie">Nie</option>
                    <option value="Tak">Tak</option>
                </select>

                <label for="moisture" class="content__label">Wilgoć</label>
                <select
                    class="content__input"
                    name="moisture"
                    id="moisture"
                    v-model="inspections.moisture"
                >
                    <option disabled value="">Czy jest wilgoć?</option>
                    <option value="Nie">Nie</option>
                    <option value="Tak">Tak</option>
                </select>

                <label for="mold" class="content__label">Pleśń</label>
                <select
                    class="content__input"
                    name="mold"
                    id="mold"
                    v-model="inspections.mold"
                >
                    <option disabled value="">Czy jest pleśń?</option>
                    <option value="Nie">Nie</option>
                    <option value="Tak">Tak</option>
                </select>

                <label for="otherObservation" class="content__label"
                    >Inne obserwacje</label
                >
                <textarea
                    class="content__input"
                    type="text"
                    id="otherObservation"
                    name="otherObservation"
                    v-model="inspections.otherObservation"
                    placeholder="Wpisz jeśli są inne obserwację..."
                ></textarea>

                <button class="content__btn" @click="addInspections()">
                    Dodaj inspekcję
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    data() {
        return {
            inspections: {
                name: "",
                apiary: "",
                hive: "",
                date: "",
                equipment: "",
                odor: "",
                deadBees: "",
                moisture: "",
                mold: "",
                otherObservation: ""
            }
        };
    },

    computed: {
        ...mapState(["apiaries", "hives"])
    },

    created() {
        this.getApiaries();
        this.getHives();
    },

    methods: {
        getApiaries() {
            this.$store.dispatch("getApiaries");
        },

        getHives() {
            this.$store.dispatch("getHives");
        },

        addInspections() {
            this.$store.dispatch("addInspections", {
                name: this.inspections.name,
                apiary: this.inspections.apiary,
                hive: this.inspections.hive,
                date: this.inspections.date,
                equipment: this.inspections.equipment,
                odor: this.inspections.odor,
                deadBees: this.inspections.deadBees,
                moisture: this.inspections.moisture,
                mold: this.inspections.mold,
                otherObservation: this.inspections.otherObservation
            });

            this.inspections.name = "";
            this.inspections.apiary = "";
            this.inspections.hive = "";
            this.inspections.date = "";
            this.inspections.equipment = "";
            this.inspections.odor = "";
            this.inspections.deadBees = "";
            this.inspections.moisture = "";
            this.inspections.mold = "";
            this.inspections.otherObservation = "";
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/colors";

.addinspections {
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

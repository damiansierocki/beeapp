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
                    <option>pasieka 1</option>
                    <option>pasieka 2</option>
                </select>

                <label class="content__label" for="hive">Ul</label>
                <select
                    class="content__input"
                    name="hive"
                    id="hive"
                    v-model="inspections.hive"
                >
                    <option disabled value="">Wybierz pasiekę</option>
                    <option>Ul 1</option>
                    <option>Ul 2</option>
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

                <button class="content__btn">
                    Edytuj inspekcję
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
    }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/editinspections.scss";
</style>

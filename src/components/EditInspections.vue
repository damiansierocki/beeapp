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
                    :placeholder="name"
                    v-model.trim="inspections.name"
                />

                <label class="content__label" for="apiary">Pasieka</label>
                <select
                    class="content__input"
                    name="apiary"
                    id="apiary"
                    v-model="inspections.apiary"
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
                    v-model="inspections.hive"
                >
                    <option disabled value="">{{ hive }}</option>
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
                    <option disabled value="">{{ equipment }}</option>
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
                    <option disabled value="">{{ odor }}</option>
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
                    <option disabled value="">{{ deadBees }}</option>
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
                    <option disabled value="">{{ moisture }}</option>
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
                    <option disabled value="">{{ mold }}</option>
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
                    :placeholder="otherObservation"
                ></textarea>

                <button class="content__btn" @click="editInspections">
                    Edytuj inspekcję
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
        "name",
        "apiary",
        "hive",
        "date",
        "equipment",
        "odor",
        "deadBees",
        "moisture",
        "mold",
        "otherObservation"
    ],

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

    created() {
        this.getHives();
        this.getApiaries();
        this.getInspections();
    },

    computed: {
        ...mapState(["hives", "apiaries"])
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
            };

            if (
                this.inspections.name !== "" &&
                this.inspections.apiary !== "" &&
                this.inspections.hive !== "" &&
                this.inspections.date !== "" &&
                this.inspections.equipment !== "" &&
                this.inspections.odor !== "" &&
                this.inspections.deadBees !== "" &&
                this.inspections.moisture !== "" &&
                this.inspections.mold !== "" &&
                this.inspections.otherObservation !== ""
            ) {
                this.$store.dispatch("editinspections", { docId, inspections });
            } else {
                alert("Wszystkie pola muszą być wypełnione!");
            }

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
@import "../assets/scss/editinspections.scss";
</style>

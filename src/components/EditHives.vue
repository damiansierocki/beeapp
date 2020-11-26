<template>
    <div class="edithives">
        <div class="content">
            <div class="content__header">
                <h2 class="content__title">
                    Edytuj ul 🐝
                </h2>
                <span class="content__close" @click="$emit('close')">
                    <i class="fas fa-times"></i>
                </span>
            </div>

            <form class="content__form" @submit.prevent>
                <label class="content__label" for="type">Status ula</label>
                <select
                    class="content__input"
                    name="status"
                    id="status"
                    v-model="hives.status"
                >
                    <option disabled value="">{{ status }}</option>
                    <option value="żywy">Żywy</option>
                    <option value="martwy">Martwy</option>
                </select>

                <label class="content__label" for="name">ID ula</label>
                <input
                    class="content__input"
                    type="text"
                    :placeholder="hiveId"
                    v-model.trim="hives.hiveId"
                />

                <label class="content__label" for="apiary">Pasieka</label>
                <select
                    class="content__input"
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

                <label class="content__label" for="queen"
                    >Czy jest królowa?</label
                >
                <select
                    class="content__input"
                    name="queen"
                    id="queen"
                    v-model="hives.queen"
                >
                    <option disabled value="">{{ queen }}</option>
                    <option value="Tak">Tak</option>
                    <option value="Nie">Nie </option>
                </select>

                <label class="content__label" for="frames">Ilość ramek</label>
                <input
                    class="content__input"
                    type="text"
                    :placeholder="frames"
                    v-model.trim="hives.frames"
                />

                <button class="content__btn" @click="editHives">
                    Edytuj ul
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    props: ["id", "status", "hiveId", "apiary", "queen", "frames"],

    data() {
        return {
            hives: {
                status: "",
                hiveId: "",
                apiary: "",
                queen: "",
                frames: ""
            }
        };
    },

    computed: {
        ...mapState(["apiaries"])
    },

    created() {
        this.getApiaries();
    },

    methods: {
        getApiaries() {
            this.$store.dispatch("getApiaries");
        },

        editHives() {
            const docId = this.id;

            const hives = {
                status: this.hives.status,
                hiveId: this.hives.hiveId,
                apiary: this.hives.apiary,
                queen: this.hives.queen,
                frames: this.hives.frames
            };

            if (
                this.hives.status !== "" &&
                this.hives.hiveId !== "" &&
                this.hives.apiary !== "" &&
                this.hives.queen !== "" &&
                this.hives.frames !== ""
            ) {
                this.$store.dispatch("editHives", { docId, hives });
            } else {
                alert("Wszystkie pola muszą być wypełnione!");
            }

            this.hives.status = "";
            this.hives.hiveId = "";
            this.hives.apiary = "";
            this.hives.queen = "";
            this.hives.frames = "";
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/edithives.scss";
</style>

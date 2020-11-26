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
                <label class="content__label" for="type">Stan ula</label>
                <select
                    class="content__input"
                    name="status"
                    id="status"
                    v-model="hives.status"
                >
                    <option disabled value="">Wybierz status ula</option>
                    <option value="Żywy">Żywy</option>
                    <option value="Martwy">Martwy</option>
                </select>

                <label class="content__label" for="name">Numer Ula</label>
                <input
                    class="content__input"
                    type="text"
                    placeholder="Wpisz numer ula..."
                    v-model.trim="hives.hiveId"
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

                <label class="content__label" for="queen"
                    >Czy jest matka?</label
                >
                <select
                    class="content__input"
                    name="queen"
                    id="queen"
                    v-model="hives.queen"
                >
                    <option disabled value="">Wybierz czy jest matka</option>
                    <option value="Tak">Tak</option>
                    <option value="Nie">Nie </option>
                </select>

                <label class="content__label" for="frames">Ilość ramek</label>
                <input
                    class="content__input"
                    type="text"
                    placeholder="Wpisz ilość ramek"
                    v-model.trim="hives.frames"
                />

                <button class="content__btn" @click="addHives()">
                    Dodaj ul
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
        ...mapState(["userProfile", "apiaries"])
    },

    created() {
        this.getApiaries();
    },

    methods: {
        getApiaries() {
            this.$store.dispatch("getApiaries");
        },

        addHives() {
            this.$store.dispatch("addHives", {
                status: this.hives.status,
                hiveId: this.hives.hiveId,
                apiary: this.hives.apiary,
                queen: this.hives.queen,
                frames: this.hives.frames
            });

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
@import "../assets/scss/colors";

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

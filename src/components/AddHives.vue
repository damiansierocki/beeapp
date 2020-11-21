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
                <label class="content__label" for="type">Status ula</label>
                <select
                    class="content__input"
                    name="status"
                    id="status"
                    v-model="hives.status"
                >
                    <option disabled value="">Wybierz status ula</option>
                    <option value="żywy">Żywy</option>
                    <option value="martwy">Martwy</option>
                </select>

                <label class="content__label" for="name">ID ula</label>
                <input
                    class="content__input"
                    type="text"
                    placeholder="Wpisz id ula.."
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
                        :value="{ id: apiary.id, apiary: apiary.name }"
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
                    <option disabled value="">Wybierz czy jest królowa</option>
                    <option value="Tak">Tak</option>
                    <option value="Nie">Nie </option>
                </select>

                <label class="content__label" for="queen-color"
                    >Kolor królowej</label
                >
                <select
                    class="content__input"
                    name="queen-color"
                    id="queen-color"
                    v-model="hives.queenColor"
                >
                    <option disabled value="">Wybierz kolor królowej</option>
                    <option value="Czerwony">Czerwony</option>
                    <option value="Niebieski">Niebieski </option>
                    <option value="Zielony">Zielony </option>
                </select>

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
                status: '',
                hiveId: '',
                apiary: '',
                queen: '',
                queenColor: ''
            }
        };
    },

    computed: {
        ...mapState(['userProfile', 'apiaries'])
    },

    created() {
        this.getApiaries();
    },

    methods: {
        getApiaries() {
            this.$store.dispatch('getApiaries');
        },

        addHives() {
            const docId = this.hives.apiary.id;

            const hives = {
                status: this.hives.status,
                hiveId: this.hives.hiveId,
                apiary: this.hives.apiary,
                queen: this.hives.queen,
                queenColor: this.hives.queenColor
            };

            this.$store.dispatch('addHives', {
                docId,
                hives
            });

            this.hives.status = '';
            this.hives.hiveId = '';
            this.hives.apiary = '';
            this.hives.queen = '';
            this.hives.queenColor = '';
        }
    }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/addhives.scss';
</style>

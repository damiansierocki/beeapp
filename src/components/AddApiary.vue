<template>
    <div class="addapiary">
        <div class="content">
            <div class="content__header">
                <h2 class="content__title">
                    Dodaj pasiekę 🐝
                </h2>
                <span class="content__close" @click="$emit('close')">
                    <i class="fas fa-times"></i>
                </span>
            </div>

            <form class="content__form" @submit.prevent>
                <label class="content__label" for="name">Nazwa</label>
                <input
                    class="content__input"
                    type="text"
                    placeholder="Wpisz nazwę pasieki.."
                    v-model.trim="apiary.name"
                />

                <label class="content__label" for="type">Typ pasieki</label>
                <select
                    class="content__input"
                    name="type"
                    id="type"
                    v-model="apiary.type"
                >
                    <option value="1" disabled selected
                        >Wybierz typ pasieki</option
                    >
                    <option value="Pasieka 2">Pasieka 2</option>
                    <option value="Pasieka 3">Pasieka 3</option>
                    <option value="Pasieka 4">Pasieka 4</option>
                </select>

                <label class="content__label" for="description">Opis</label>
                <textarea
                    class="content__input"
                    type="text"
                    placeholder="Wpisz nazwę pasieki.."
                    rows="5"
                    v-model.trim="apiary.description"
                >
                </textarea>

                <button class="content__btn" @click="addApiary()">
                    Dodaj pasiekę
                </button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            apiary: {
                name: '',
                type: '',
                description: ''
            }
        };
    },

    methods: {
        addApiary() {
            this.$store.dispatch('addApiary', {
                name: this.apiary.name,
                type: this.apiary.type,
                description: this.apiary.description
            });

            this.apiary.name = '';
            this.apiary.type = '';
            this.apiary.description = '';
        }
    }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/addapiary.scss';
</style>

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
                <label class="content__label" for="name">Nazwa</label>
                <input
                    class="content__input"
                    type="text"
                    :placeholder="this.name"
                    v-model.trim="apiary.name"
                />

                <label class="content__label" for="type">Typ pasieki</label>
                <select
                    class="content__input"
                    name="type"
                    id="type"
                    v-model="apiary.type"
                >
                    <option value="1" disabled selected>
                        {{ this.type }}
                    </option>
                    <option value="Pasieka 2">Pasieka 2</option>
                    <option value="Pasieka 3">Pasieka 3</option>
                    <option value="Pasieka 4">Pasieka 4</option>
                </select>

                <label class="content__label" for="description">Opis</label>
                <textarea
                    class="content__input"
                    type="text"
                    rows="5"
                    v-model.trim="apiary.description"
                    :placeholder="this.description"
                >
                </textarea>

                <button class="content__btn" @click="editApiary">
                    Edytuj pasiekę
                </button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    props: ["id", "name", "type", "description"],

    data() {
        return {
            apiary: {
                name: "",
                type: "",
                description: ""
            }
        };
    },

    methods: {
        editApiary() {
            const docId = this.id;
            const apiary = {
                name: this.apiary.name,
                type: this.apiary.type,
                description: this.apiary.description
            };

            if (
                this.apiary.name !== "" &&
                this.apiary.type !== "" &&
                this.apiary.description !== ""
            ) {
                this.$store.dispatch("editApiary", { docId, apiary });
            } else {
                alert("Pasieka nie może być pusta");
            }

            this.apiary.name = "";
            this.apiary.type = "";
            this.apiary.description = "";
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/editapiary.scss";
</style>

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
                    <option disabled value="">
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
                alert("Wszystkie pola muszą być wypełnione!");
            }

            this.apiary.name = "";
            this.apiary.type = "";
            this.apiary.description = "";
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/colors";

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

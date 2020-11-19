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
                />

                <label class="content__label" for="type">Typ pasieki</label>
                <select class="content__input" name="type" id="type">
                    <option value="1" disabled selected
                        >Wybierz typ pasieki</option
                    >
                    <option value="2">Pasieka 2</option>
                    <option value="3">Pasieka 3</option>
                    <option value="4">Pasieka 4</option>
                </select>

                <label class="content__label" for="description">Opis</label>
                <textarea
                    class="content__input"
                    type="text"
                    placeholder="Wpisz nazwę pasieki.."
                    rows="5"
                >
                </textarea>

                <button class="content__btn">Dodaj pasiekę</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import '../assets/scss/addapiary.scss';
</style>

<template>
    <div class="addnotes">
        <div class="content">
            <div class="content__header">
                <h2 class="content__title">
                    Dodaj notatkę 🐝
                </h2>
                <span class="content__close" @click="$emit('close')">
                    <i class="fas fa-times"></i>
                </span>
            </div>
            <div class="content__inside">
                <form @submit.prevent>
                    <textarea
                        class="content__textarea"
                        v-model.trim="note.content"
                        rows="6"
                        cols="20"
                        placeholder="Przykładowa notatka.."
                    ></textarea>

                    <span
                        class="content__plus-icon"
                        @click="addNote"
                        :disabled="note.content === ''"
                        ><i class="fas fa-plus-circle"></i
                    ></span>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            note: {
                content: ""
            }
        };
    },

    methods: {
        addNote() {
            this.$store.dispatch("addNote", {
                content: this.note.content
            });
            this.note.content = "";
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/addnotes.scss";
</style>

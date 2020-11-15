<template>
    <div class="editnote">
        <div class="content">
            <div class="content__header">
                <h2 class="content__title">
                    Edytuj notatkę 🐝
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
                        :placeholder="notes.content"
                    ></textarea>

                    <span class="content__plus-icon" @click="editNote"
                        ><i class="fas fa-plus-circle"></i
                    ></span>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    data() {
        return {
            note: {
                content: ""
            }
        };
    },

    computed: {
        ...mapState(["notes"])
    },

    methods: {
        editNote() {
            this.$store.dispatch("editNote", {
                content:
                    this.note.content !== ""
                        ? this.note.content
                        : this.notes.content
            });

            this.note.content = "";
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/editnote.scss";
</style>

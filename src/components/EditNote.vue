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
                        v-model.trim="content"
                        rows="6"
                        cols="20"
                        :placeholder="content"
                    ></textarea>

                    <span
                        class="content__plus-icon"
                        @click="editNote(note.id, content)"
                        ><i class="fas fa-edit"></i
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
            content: ""
        };
    },

    computed: {
        ...mapState(["notes"])
    },

    methods: {
        editNote(docId, content) {
            this.$store.dispatch("editNote", docId, {
                content: this.content
            });

            this.content = "";
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/editnote.scss";
</style>

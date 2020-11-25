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
                        :placeholder="this.noteContent"
                    ></textarea>

                    <span class="content__plus-icon" @click="editNote"
                        ><i class="fas fa-edit"></i
                    ></span>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['docId', 'noteContent'],
    data() {
        return {
            note: {
                content: ''
            }
        };
    },

    methods: {
        editNote() {
            const docId = this.docId;
            const note = { content: this.note.content };

            if (this.note.content !== '') {
                this.$store.dispatch('editNote', { docId, note });
            } else {
                alert('Notatka nie może być pusta');
            }

            this.note.content = '';
        }
    }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/editnote.scss';
</style>

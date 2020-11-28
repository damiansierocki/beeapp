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
                content: '',
            },
        };
    },

    methods: {
        editNote() {
            const { docId } = this;
            const note = { content: this.note.content };

            if (this.note.content !== '') {
                this.$store.dispatch('editNote', { docId, note });
            } else {
                alert('Notatka nie może być pusta');
            }

            this.note.content = '';
        },
    },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/colors';

.editnote {
    position: absolute;
    display: flex;
    top: 60%;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 999;

    .content {
        position: relative;
        margin: auto;
        background-color: $white;
        color: $black;
        width: 80%;
        z-index: 999;
        border-radius: 5px;
        box-shadow: 0 0 5px 0 rgba($greyer, 0.5);
        padding: 2rem;
        text-align: center;
        user-select: text;

        &__close {
            position: absolute;
            top: 0.8rem;
            right: 1rem;
            padding: 0.4rem;

            transition: all 0.2s;
            &:active {
                transform: scale(1.3);
            }
        }

        &__title {
            font-size: 1.5rem;
        }

        &__inside {
            margin-top: 1rem;
        }

        &__plus-icon {
            position: absolute;
            bottom: 0.8rem;
            right: 0.6rem;
            padding: 0.4rem;
            font-size: 1.5rem;

            transition: all 0.2s;
            &:active {
                transform: scale(1.3);
            }
        }

        &__textarea {
            padding: 0.3rem;
        }
    }
}

.disabled {
    opacity: 0.2;
    pointer-events: none;
}

@media (min-width: 480px) {
    .editnote {
        top: 50%;

        .content {
            width: 55%;
        }
    }
}

@media (min-width: 768px) {
    .editnote {
        top: 0;
        .content {
            width: 40%;
        }
    }
}

@media (min-width: 1024px) {
    .editnote {
        .content {
            width: 30%;

            &__close {
                &:hover {
                    cursor: pointer;

                    transition: all 0.2s;
                    &:hover {
                        transform: scale(1.3);
                    }
                }
            }

            &__plus-icon {
                &:hover {
                    cursor: pointer;

                    transition: all 0.2s;
                    &:hover {
                        transform: scale(1.3);
                    }
                }
            }
        }
    }
}
</style>

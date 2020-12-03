<template>
    <div class="notes">
        <div class="container">
            <h3 class="container__title">Notatki</h3>
            <p class="container__add-note" @click="toggleAddNotes">
                Dodaj notatkę <i class="fas fa-plus"></i>
            </p>

            <AddNotes v-if="showAddNotes" @close="toggleAddNotes"></AddNotes>

            <EditNotes
                v-if="showEditNotes"
                @close="toggleEditNotes"
                :docId="selectedNotesDocId"
                :noteContent="selectedNotesContent"
            ></EditNotes>

            <div class="grid" v-if="notes.length">
                <!-- notatki -->
                <ul class="grid__list" v-for="note in notes" :key="note.id">
                    <li class="grid__item">
                        {{ note.content }}

                        <p class="grid__createdAt">
                            {{ note.createdAt | formatDate }}
                        </p>

                        <div class="grid__extras">
                            <div
                                class="grid__edit"
                                @click="toggleEditNotes(note.id, note.content)"
                            >
                                <i class="far fa-edit"></i>
                            </div>

                            <div
                                class="grid__trash"
                                @click="deleteNote(note.id)"
                            >
                                <i class="far fa-trash-alt"></i>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <p class="lack-notes" v-if="!notes.length">Brak notatek 😢</p>
        </div>
    </div>
</template>

<script>
import AddNotes from '@/components/AddNotes';
import EditNotes from '@/components/EditNotes';
import moment from 'moment';
import * as firebase from '../firebase';

export default {
    data() {
        return {
            notes: [],
            note: {
                content: '',
            },

            selectedNotesDocId: '',
            selectedNotesContent: '',

            showAddNotes: '',
            showEditNotes: '',
        };
    },

    components: {
        AddNotes,
        EditNotes,
    },

    filters: {
        formatDate(val) {
            if (!val) {
                return '-';
            }

            const date = val.toDate();
            return moment(date)
                .locale('pl')
                .fromNow();
        },
    },

    created() {
        this.getNotes();
    },

    methods: {
        async getNotes() {
            const notesRef = await firebase.usersCollection
                .doc(firebase.auth.currentUser.uid)
                .collection('notes')
                .orderBy('createdAt', 'desc');

            notesRef.onSnapshot(snap => {
                this.notes = [];
                snap.forEach(doc => {
                    const note = doc.data();
                    note.id = doc.id;
                    this.notes.push(note);
                });
            });
        },

        deleteNote(docId) {
            if (window.confirm('Czy na pewno chcesz usunąć notatkę?')) {
                setTimeout(() => {
                    firebase.usersCollection
                        .doc(firebase.auth.currentUser.uid)
                        .collection('notes')
                        .doc(docId)
                        .delete();
                }, 100);
            }
        },

        toggleAddNotes() {
            this.showAddNotes = !this.showAddNotes;
        },

        toggleEditNotes(docId, noteContent) {
            this.showEditNotes = !this.showEditNotes;

            if (this.showEditNotes) {
                this.selectedNotesDocId = docId;
                this.selectedNotesContent = noteContent;
            } else {
                this.selectedNotesDocId = {};
                this.selectedNotesContent = {};
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.notes {
    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 3rem;

        &__title {
            font-size: 2.5rem;
        }

        &__add-note {
            margin-top: 1rem;
            font-size: 1.5rem;
            cursor: pointer;
        }

        .grid {
            display: grid;
            grid-template-columns: auto;
            width: 100%;
            height: 100%;

            &__list {
                padding: 2rem;
                list-style-type: none;
            }

            &__item {
                font-size: 1.5rem;
            }

            &__createdAt {
                opacity: 0.4;
                margin-top: 1rem;
            }

            &__extras {
                display: flex;
            }

            &__edit {
                padding: 1rem 1rem 1rem 0;
                cursor: pointer;
            }

            &__trash {
                padding: 1rem 1rem 1rem 0;
                margin-left: 1rem;
                cursor: pointer;
            }
        }

        .lack-notes {
            margin-top: 3rem;
            font-size: 2rem;
        }
    }
}

@media (min-width: 768px) {
    .notes {
        .container {
            max-width: 768px;
            margin: 0 auto;
            margin-top: 3rem;

            .grid {
                grid-template-columns: auto auto;
            }
        }
    }
}
</style>

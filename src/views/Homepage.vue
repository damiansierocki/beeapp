<template>
    <div class="homepage">
        <Nav v-if="showIfUserLogged">
            <template v-slot:nav-center__slot>
                <h1 class="nav-center__slot">Strona główna</h1>
            </template>
        </Nav>

        <div class="content">
            <Weather></Weather>

            <div class="info">
                <h3 class="info__title">Informacje</h3>
                <div class="info__all">
                    <div class="info__apiaries">
                        <img
                            class="info__img"
                            src="./../assets/images/apiary.svg"
                            alt="apiary"
                        />
                        <p class="info__number">{{ apiaries.length }}</p>
                        <p class="info__description info__description--red">
                            Pasieki
                        </p>
                    </div>
                    <div class="info__hives">
                        <img
                            class="info__img"
                            src="./../assets/images/hives.svg"
                            alt="hives"
                        />
                        <p class="info__number">{{ hives.length }}</p>
                        <p class="info__description info__description--green">
                            Ule
                        </p>
                    </div>
                    <div class="info__inspections">
                        <img
                            class="info__img"
                            src="./../assets/images/inspections.svg"
                            alt="inspections"
                        />
                        <p class="info__number">0</p>
                        <p class="info__description info__description--blue">
                            Inspekcje
                        </p>
                    </div>
                    <div class="info__notes">
                        <img
                            class="info__img"
                            src="./../assets/images/notes.svg"
                            alt="notes"
                        />
                        <p class="info__number">{{ notes.length }}</p>
                        <p class="info__description info__description--orange">
                            Notatki
                        </p>
                    </div>
                </div>
            </div>

            <transition
                enter-active-class="animate__animated animate__backInUp animate__faster"
                leave-active-class="animate__animated animate__backOutDown animate__faster"
                mode="out-in"
                appear
            >
                <AddNotes
                    v-if="showAddNotes"
                    @close="toggleAddNotes"
                ></AddNotes>
            </transition>

            <transition
                enter-active-class="animate__animated animate__backInUp animate__faster"
                leave-active-class="animate__animated animate__backOutDown animate__faster"
                mode="out-in"
                appear
            >
                <EditNote
                    v-if="showEditNote"
                    @close="toggleEditNote()"
                    :docId="selectedNote"
                    :noteContent="selectedNoteContent"
                ></EditNote>
            </transition>

            <div class="notes">
                <h3 class="notes__title">
                    Notatki
                </h3>
                <span class="notes__plus-icon" @click="toggleAddNotes">
                    <i class="fas fa-plus"></i>
                </span>

                <div class="notes__grid">
                    <ul class="notes__list" v-if="notes.length">
                        <li
                            class="notes__item"
                            v-for="note in notes"
                            :key="note.id"
                        >
                            {{ note.content }}

                            <br />
                            <span class="notes__createdOn">{{
                                note.createdOn | formatDate
                            }}</span>
                            <br />
                            <div class="notes__extras">
                                <span
                                    class="notes__edit"
                                    @click="
                                        toggleEditNote(note.id, note.content)
                                    "
                                    ><i class="far fa-edit"></i
                                ></span>
                                <span
                                    class="notes__delete"
                                    @click="deleteNote(note.id)"
                                    ><i class="far fa-trash-alt"></i
                                ></span>
                            </div>
                        </li>
                    </ul>

                    <ul
                        class="notes__list"
                        style="list-style-type: none"
                        v-else
                    >
                        <li class="notes__item">
                            Nie ma żadnej notatki 😢
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AddNotes from '@/components/AddNotes';
import EditNote from '@/components/EditNote';
import Weather from '@/components/Weather';
import Nav from '@/components/Nav';
import { mapState } from 'vuex';
import moment from 'moment';

export default {
    data() {
        return {
            showAddNotes: false,
            showEditNote: false,
            selectedNote: '',
            selectedNoteContent: ''
        };
    },

    components: {
        Nav,
        AddNotes,
        EditNote,
        Weather
    },

    computed: {
        ...mapState(['userProfile', 'notes', 'apiaries', 'hives']),

        showIfUserLogged() {
            return Object.keys(this.userProfile).length > 1;
        }
    },

    created() {
        this.getNotes();
        this.getApiaries();
        this.getHives();
    },

    filters: {
        formatDate(val) {
            if (!val) {
                return '-';
            }

            let date = val.toDate();
            return moment(date)
                .locale('pl')
                .fromNow();
        }
    },

    methods: {
        toggleEditNote(docId, noteContent) {
            this.showEditNote = !this.showEditNote;

            if (this.showEditNote) {
                this.selectedNote = docId;
                this.selectedNoteContent = noteContent;
            } else {
                this.selectedNote = {};
                this.selectedNoteContent = {};
            }
        },

        toggleAddNotes() {
            this.showAddNotes = !this.showAddNotes;
        },

        getNotes() {
            this.$store.dispatch('getNotes');
        },

        getHives() {
            this.$store.dispatch('getHives');
        },

        getApiaries() {
            this.$store.dispatch('getApiaries');
        },

        deleteNote(docId) {
            this.$store.dispatch('deleteNote', docId);
        }
    }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/homepage.scss';
</style>

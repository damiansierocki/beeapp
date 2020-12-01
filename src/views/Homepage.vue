<template>
    <div class="homepage">
        <Nav v-if="showIfUserLogged">
            <template v-slot:actual-page__slot>
                <p class="actual-page__slot">Strona główna</p>
            </template>
        </Nav>

        <Weather></Weather>

        <Info></Info>

        <Notes></Notes>
    </div>
</template>

<script>
import Nav from '@/components/Nav';
import Weather from '@/components/Weather';
import Info from '@/components/Info';
import Notes from '@/components/Notes';
import { mapState } from 'vuex';
import moment from 'moment';

export default {
    data() {
        return {
            showAddNotes: false,
            showEditNote: false,
            selectedNote: '',
            selectedNoteContent: '',
        };
    },

    components: {
        Nav,
        Weather,
        Info,
        Notes,
    },

    computed: {
        ...mapState(['userProfile', 'apiaries', 'hives', 'inspections']),

        showIfUserLogged() {
            return Object.keys(this.userProfile).length > 1;
        },
    },

    created() {
        this.getApiaries();
        this.getHives();
        this.getInspections();
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

        getInspections() {
            this.$store.dispatch('getInspections');
        },

        getHives() {
            this.$store.dispatch('getHives');
        },

        getApiaries() {
            this.$store.dispatch('getApiaries');
        },

        deleteNote(docId) {
            this.$store.dispatch('deleteNote', docId);
        },
    },
};
</script>

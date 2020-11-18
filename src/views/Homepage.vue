<template>
    <div class="homepage">
        <Nav v-if="showIfUserLogged">
            <template v-slot:nav-center__slot>
                <h1 class="nav-center__slot">Strona główna</h1>
            </template>
        </Nav>

        <div class="content">
            <Weather></Weather>
            <!-- <div class="weather" v-if="showDesktop">
                <div class="weather__content">
                    <div class="weather__left-div">
                        <p class="current-date">
                            <span>{{ currentDateDesktop }}</span>
                        </p>
                        <p class="weather__location">
                            <span>{{ this.weather.location }}</span>
                        </p>
                        <p class="weather__temp-min">
                            Minmalna: <span>{{ this.weather.temp_min }}</span>
                        </p>
                        <p class="weather__temp-max">
                            Maksymalna: <span>{{ this.weather.temp_min }}</span>
                        </p>
                        <div class="weather__current-temp">
                            <p class="weather__temp">
                                <span>{{ this.weather.currentTemp }}</span>
                            </p>
                            <p class="weather__celcius">°C</p>
                        </div>

                        <p class="weather__feels-like">
                            Odczuwalna:
                            <span>{{ this.weather.feels_like }}</span>
                        </p>
                    </div>

                    <div class="weather__center-div">
                        <img class="weather__icon" :src="this.weather.icon" />
                        <p class="weather__description">
                            <span>{{ this.weather.description }}</span>
                        </p>
                    </div>

                    <div class="weather__right-div">
                        <p class="weather__pressure">
                            Ciśnienie: <span>{{ this.weather.pressure }}</span>
                        </p>
                        <p class="weather__wind">
                            Prędkość wiatru:
                            <span>{{ this.weather.wind }}</span>
                        </p>
                        <p class="weather__humidity">
                            Wilgotność: <span>{{ this.weather.humidity }}</span>
                        </p>
                        <p class="weather__sunrise">
                            Wschód słońca:
                            <span>{{ this.weather.sunrise }}</span>
                        </p>
                        <p class="weather__sunset">
                            Zachód słońca:
                            <span>{{ this.weather.sunset }}</span>
                        </p>
                    </div>
                </div>
            </div>

            <div class="weather" v-else>
                <div class="weather__content">
                    <div class="weather__left-div">
                        <p class="current-date">
                            <span>{{ currentDateMobile }}</span>
                        </p>
                        <div class="weather__current-temp">
                            <p class="weather__temp">
                                <span>{{ this.weather.currentTemp }}</span>
                            </p>
                            <p class="weather__celcius">°C</p>
                        </div>

                        <p class="weather__feels-like">
                            Odczuwalna:
                            <span>{{ this.weather.feels_like }}</span>
                        </p>
                    </div>
                    <div class="weather__right-div">
                        <p class="weather__location">
                            <span>{{ this.weather.location }}</span>
                        </p>
                        <div class="weather__icon">
                            <img :src="this.weather.icon" />
                        </div>
                        <p class="weather__description">
                            <span>{{ this.weather.description }}</span>
                        </p>
                    </div>
                </div>
            </div> -->

            <!-- <div class="info">
                <h3 class="info__title">Informacje</h3>
                <div class="info__all">
                    <div class="info__apiaries">
                        <img
                            class="info__img"
                            src="./../assets/images/apiary.svg"
                            alt="apiary"
                        />
                        <p class="info__number">0</p>
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
                        <p class="info__number">0</p>
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
                <div
                    class="notes__container-title-icon"
                    @click="toggleAddNotes"
                >
                    <h3 class="notes__title">Notatki</h3>
                    <span class="notes__plus-icon">
                        <i class="fas fa-plus"></i>
                    </span>
                </div>

                <ul class="notes__list" v-if="notes.length">
                    <li
                        class="notes__item"
                        v-for="note in notes"
                        :key="note.id"
                    >
                        {{ note.content }}

                        <br />
                        <span class="notes__createdOn">{{
                            changeFormatDate(note.createdOn)
                        }}</span>
                        <br />
                        <div class="notes__extras">
                            <span
                                class="notes__edit"
                                @click="toggleEditNote(note.id, note.content)"
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

                <ul class="notes__list" style="list-style-type: none" v-else>
                    <li class="notes__item">
                        Nie ma żadnej notatki 😢
                    </li>
                </ul>
            </div> -->
        </div>
    </div>
</template>

<script>
// import AddNotes from '@/components/AddNotes';
// import EditNote from '@/components/EditNote';
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
        // AddNotes,
        // EditNote,
        Weather
    },

    computed: {
        ...mapState(['userProfile', 'notes']),

        showIfUserLogged() {
            return Object.keys(this.userProfile).length > 1;
        }
    },

    created() {
        this.getNotes();
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

        deleteNote(docId) {
            this.$store.dispatch('deleteNote', docId);
        },

        changeFormatDate(value) {
            if (!value) {
                return '-';
            }

            let date = value.toDate();

            return moment(date)
                .locale('pl')
                .fromNow();
        }
    }
};
</script>

<style lang="scss" scoped>
// @import '../assets/scss/homepage.scss';
</style>

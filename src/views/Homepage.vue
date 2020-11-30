<template>
    <div class="homepage">
        <Nav v-if="showIfUserLogged">
            <template v-slot:actual-page__slot>
                <p class="actual-page__slot">Strona główna</p>
            </template>
        </Nav>

        <!-- <div class="content"> -->

        <Weather></Weather>

        <!--
            <div class="info">
                <h3 class="info__title">Informacje</h3>
                <div class="info__all">
                    <router-link to="/apiaries" class="info__apiaries">
                        <img
                            class="info__img"
                            src="./../assets/images/svgs/apiary.svg"
                            alt="apiary"
                        />
                        <p class="info__number">{{ apiaries.length }}</p>
                        <p class="info__description info__description--red">
                            Pasieki
                        </p>
                    </router-link>
                    <router-link to="/hives" class="info__hives">
                        <img
                            class="info__img"
                            src="./../assets/images/svgs/hives.svg"
                            alt="hives"
                        />
                        <p class="info__number">{{ hives.length }}</p>
                        <p class="info__description info__description--green">
                            Ule
                        </p>
                    </router-link>
                    <router-link to="/inspections" class="info__inspections">
                        <img
                            class="info__img"
                            src="./../assets/images/svgs/inspections.svg"
                            alt="inspections"
                        />
                        <p class="info__number">{{ inspections.length }}</p>
                        <p class="info__description info__description--blue">
                            Inspekcje
                        </p>
                    </router-link>
                    <div class="info__notes">
                        <img
                            class="info__img"
                            src="./../assets/images/svgs/notes.svg"
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
        </div> -->
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
            selectedNoteContent: '',
        };
    },

    components: {
        Nav,
        // AddNotes,
        // EditNote,
        Weather,
    },

    computed: {
        ...mapState([
            'userProfile',
            'notes',
            'apiaries',
            'hives',
            'inspections',
        ]),

        showIfUserLogged() {
            return Object.keys(this.userProfile).length > 1;
        },
    },

    created() {
        this.getNotes();
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
        },
    },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/colors';

.homepage {
    .content {
        color: $black;

        .info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-top: 1.5rem;

            &__all {
                display: grid;
                grid-template-columns: auto auto;
                width: 100%;
                height: 100%;
            }

            &__title {
                margin-top: 0.3rem;
                padding: 1rem;
                font-size: 2rem;
                width: 100%;
                text-align: center;
                user-select: none;
            }

            &__apiaries {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                border-top: 1px solid $black;
                border-bottom: 1px solid $black;
                border-right: 1px solid $black;
                padding: 0.4rem;
                text-decoration: none;
            }

            &__hives {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                border-top: 1px solid $black;
                border-bottom: 1px solid $black;
                padding: 0.4rem;
                text-decoration: none;
            }

            &__inspections {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                border-right: 1px solid $black;
                padding: 0.4rem;
                border-bottom: 1px solid $black;
                text-decoration: none;
            }

            &__notes {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 0.4rem;
                border-bottom: 1px solid $black;
            }

            &__number {
                font-size: 1.5rem;
            }

            &__description {
                margin-top: 0.4rem;
                font-weight: bold;
            }

            &__description--red {
                color: $red;
            }
            &__description--green {
                color: $green;
            }
            &__description--blue {
                color: $blue;
            }
            &__description--orange {
                color: $orange;
            }

            &__img {
                width: 50px;
                height: 50px;
            }
        }

        .notes {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-top: 1.5rem;
            position: relative;

            &__grid {
                display: grid;
                height: 100%;
                width: 100%;
            }

            &__list {
                display: grid;
                grid-template-columns: 1;
                width: 100%;
                height: 100%;
            }

            &__item {
                width: 100%;
                word-break: break-all;

                &:nth-child(even) {
                    background-color: #eee;
                }
            }

            &__title {
                margin-top: 0.3rem;
                padding: 1rem;
                font-size: 2rem;
                width: 100%;
                text-align: center;
                user-select: none;
            }

            &__plus-icon {
                position: absolute;
                padding: 0.4rem;
                top: 1.2%;
                right: 20%;
                user-select: none;
                border-radius: 50%;
                background: #eee;
            }

            &__createdOn {
                opacity: 0.3;
                font-size: 0.7rem;
            }

            &__extras {
                display: flex;
                width: 40%;
                align-items: center;
            }

            &__edit {
                padding: 0.3rem;
                font-size: 1.2rem;
            }

            &__delete {
                font-size: 1.2rem;
                padding: 0.3rem;
            }
        }
    }
}

@media (min-width: 320px) {
    .homepage {
        .content {
            .notes {
                &__plus-icon {
                    right: 23%;
                }
            }
        }
    }
}

@media (min-width: 414px) {
    .homepage {
        .content {
            .notes {
                &__plus-icon {
                    right: 27%;
                }
            }
        }
    }
}

@media (min-width: 540px) {
    .homepage {
        .content {
            .notes {
                &__plus-icon {
                    right: 33%;
                }

                &__list {
                    display: grid;
                    grid-template-columns: auto auto;
                    width: 100%;
                    height: 100%;
                    list-style: none;
                    justify-items: center;
                }

                &__item {
                    width: 210px;
                }
            }
        }
    }
}

@media (min-width: 768px) {
    .homepage {
        .content {
            .info {
                float: left;
                width: 50%;
                height: calc(100vh - 12.4rem);

                &__hives {
                    border-right: 1px solid $black;
                }

                &__notes {
                    border-right: 1px solid $black;
                }
            }

            .notes {
                width: 50%;
                height: calc(100vh - 12.4rem);

                &__grid {
                    height: 100%;
                    width: 100%;
                    display: flex;
                    overflow-y: auto;
                }

                &__list {
                    display: grid;
                    grid-template-columns: auto auto;
                    grid-gap: 1rem;
                    width: 100%;
                    height: 100%;
                    list-style: none;
                    justify-items: center;
                }

                &__item {
                    width: 120px;
                }

                &__edit {
                    cursor: pointer;
                    transition: 0.2s;

                    &:hover {
                        transform: scale(1.3);
                    }
                }

                &__delete {
                    cursor: pointer;
                    transition: 0.2s;

                    &:hover {
                        transform: scale(1.3);
                    }
                }

                &__createdOn {
                    font-size: 0.8rem;
                }

                &__plus-icon {
                    top: 2.5%;
                    right: 29%;
                    transition: 0.2s;
                    cursor: pointer;

                    &:hover {
                        transform: scale(1.3);
                    }
                }
            }
        }
    }
}

@media (min-width: 1024px) {
    .homepage {
        .content {
            .info {
                height: calc(100vh - 12.4rem);
            }

            .notes {
                height: calc(100vh - 12.4rem);

                &__list {
                    display: grid;
                    grid-template-columns: auto auto auto;
                    width: 100%;
                    height: 100%;
                    list-style: none;
                }

                &__item {
                    width: 140px;
                }

                &__plus-icon {
                    top: 2%;
                    right: 31%;
                    transition: 0.2s;
                    cursor: pointer;

                    &:hover {
                        transform: scale(1.3);
                    }
                }
            }
        }
    }
}

@media (min-width: 1280px) {
    .homepage {
        .content {
            .notes {
                &__item {
                    width: 180px;
                }
            }
        }
    }
}

@media (min-width: 1440px) {
    .homepage {
        .content {
            .notes {
                &__item {
                    width: 210px;
                }
            }
        }
    }
}

@media (min-width: 1650px) {
    .homepage {
        .content {
            .notes {
                &__item {
                    width: 240px;
                }
            }
        }
    }
}
</style>

<template>
    <div class="hives">
        <Nav v-if="showIfUserLogged">
            <template v-slot:actual-page__slot>
                <p class="actual-page__slot">Ule</p>
            </template>
        </Nav>

        <transition
            enter-active-class="animate__animated animate__backInDown animate__faster"
            leave-active-class="animate__animated animate__backOutUp animate__faster"
            mode="out-in"
            appear
        >
            <AddHives v-if="showAddHives" @close="toggleAddHives()"> </AddHives>
        </transition>

        <transition
            enter-active-class="animate__animated animate__backInDown animate__faster"
            leave-active-class="animate__animated animate__backOutUp animate__faster"
            mode="out-in"
            appear
        >
            <ViewHives
                v-if="showViewHives"
                @close="toggleViewHives()"
                :id="hive.id"
                :apiary="hive.apiary"
                :number="hive.number"
                :status="hive.status"
                :purpose="hive.purpose"
                :created="hive.created"
                :generalNote="hive.generalNote"
                :strength="hive.strength"
                :temperament="hive.temperament"
                :frames="hive.frames"
                :isQueen="hive.isQueen"
                :age="hive.age"
                :installed="hive.installed"
                :race="hive.race"
                :line="hive.line"
                :queenColor="hive.queenColor"
                :queenNote="hive.queenNote"
            ></ViewHives>
        </transition>

        <transition
            enter-active-class="animate__animated animate__backInDown animate__faster"
            leave-active-class="animate__animated animate__backOutUp animate__faster"
            mode="out-in"
            appear
        >
            <EditHives
                v-if="showEditHives"
                @close="toggleEditHives()"
                :id="hive.id"
                :apiary="hive.apiary"
                :number="hive.number"
                :status="hive.status"
                :purpose="hive.purpose"
                :created="hive.created"
                :generalNote="hive.generalNote"
                :strength="hive.strength"
                :temperament="hive.temperament"
                :frames="hive.frames"
                :isQueen="hive.isQueen"
                :age="hive.age"
                :installed="hive.installed"
                :race="hive.race"
                :line="hive.line"
                :queenColor="hive.queenColor"
                :queenNote="hive.queenNote"
            ></EditHives>
        </transition>

        <div class="container">
            <div class="container__add" @click="toggleAddHives()">
                <p class="container__add-text">
                    Kliknij aby dodać nowy ul
                </p>
                <div class="container__add-icon">
                    <i class="far fa-plus-square"></i>
                </div>
            </div>

            <table class="table" v-if="hives.length">
                <tr class="table__tr">
                    <th class="table__th">Numer Ula</th>
                    <th class="table__th">Nazwa pasieki</th>
                    <th class="table__th">Edytuj</th>
                    <th class="table__th">Usuń</th>
                </tr>

                <tr class="table__tr" v-for="hive in hives" :key="hive.id">
                    <td
                        class="table__td"
                        @click="
                            toggleViewHives(
                                hive.id,
                                hive.apiary,
                                hive.number,
                                hive.status,
                                hive.purpose,
                                hive.created,
                                hive.generalNote,
                                hive.strength,
                                hive.temperament,
                                hive.frames,
                                hive.isQueen,
                                hive.age,
                                hive.installed,
                                hive.race,
                                hive.line,
                                hive.queenColor,
                                hive.queenNote,
                            )
                        "
                    >
                        {{ hive.number }}
                    </td>
                    <td class="table__td table__td--no-pointer">
                        {{ hive.apiary }}
                    </td>
                    <td
                        class="table__td"
                        @click="
                            toggleEditHives(
                                hive.id,
                                hive.apiary,
                                hive.number,
                                hive.status,
                                hive.purpose,
                                hive.created,
                                hive.generalNote,
                                hive.strength,
                                hive.temperament,
                                hive.frames,
                                hive.isQueen,
                                hive.age,
                                hive.installed,
                                hive.race,
                                hive.line,
                                hive.queenColor,
                                hive.queenNote,
                            )
                        "
                    >
                        <i class="far fa-edit"></i>
                    </td>
                    <td class="table__td" @click="deleteHives(hive.id)">
                        <i class="far fa-trash-alt"></i>
                    </td>
                </tr>
            </table>

            <table class="table" v-if="!hives.length">
                <tr class="table__tr">
                    <th class="table__th">Brak uli 😭😭😭</th>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import Nav from '@/components/Nav';
import AddHives from '@/components/AddHives';
import ViewHives from '@/components/ViewHives';
import EditHives from '@/components/EditHives';
import { mapState } from 'vuex';

export default {
    data() {
        return {
            showAddHives: false,

            showViewHives: false,

            showEditHives: false,

            hive: {
                // general
                apiary: '',
                number: '',
                status: '',
                purpose: '',
                created: '',
                generalNote: '',

                // bees
                strength: '',
                temperament: '',
                frames: '',

                // queen
                isQueen: '',
                age: '',
                installed: '',
                race: '',
                line: '',
                queenColor: '',
                queenNote: '',
            },
        };
    },

    components: { Nav, AddHives, ViewHives, EditHives },

    computed: {
        ...mapState(['userProfile', 'hives']),

        showIfUserLogged() {
            return Object.keys(this.userProfile).length > 1;
        },
    },

    created() {
        this.getHives();
    },

    methods: {
        deleteHives(docId) {
            this.$store.dispatch('deleteHives', docId);
        },

        getHives() {
            this.$store.dispatch('getHives');
        },

        toggleAddHives() {
            this.showAddHives = !this.showAddHives;
        },

        toggleEditHives(
            id,
            apiary,
            number,
            status,
            purpose,
            created,
            generalNote,
            strength,
            temperament,
            frames,
            isQueen,
            age,
            installed,
            race,
            line,
            queenColor,
            queenNote,
        ) {
            this.showEditHives = !this.showEditHives;

            if (this.showEditHives) {
                this.hive.id = id;

                // general
                this.hive.apiary = apiary;
                this.hive.number = number;
                this.hive.status = status;
                this.hive.purpose = purpose;
                this.hive.created = created;
                this.hive.generalNote = generalNote;

                // bees
                this.hive.strength = strength;
                this.hive.temperament = temperament;
                this.hive.frames = frames;

                // queen
                this.hive.isQueen = isQueen;
                this.hive.age = age;
                this.hive.installed = installed;
                this.hive.race = race;
                this.hive.line = line;
                this.hive.queenColor = queenColor;
                this.hive.queenNote = queenNote;
            } else {
                this.hive.id = id;

                // general
                this.hive.apiary = {};
                this.hive.number = {};
                this.hive.status = {};
                this.hive.purpose = {};
                this.hive.created = {};
                this.hive.generalNote = {};

                // bees
                this.hive.strength = {};
                this.hive.temperament = {};
                this.hive.frames = {};

                // queen
                this.hive.isQueen = {};
                this.hive.age = {};
                this.hive.installed = {};
                this.hive.race = {};
                this.hive.line = {};
                this.hive.queenColor = {};
                this.hive.queenNote = {};
            }
        },

        toggleViewHives(
            id,
            apiary,
            number,
            status,
            purpose,
            created,
            generalNote,
            strength,
            temperament,
            frames,
            isQueen,
            age,
            installed,
            race,
            line,
            queenColor,
            queenNote,
        ) {
            this.showViewHives = !this.showViewHives;

            if (this.showViewHives) {
                this.hive.id = id;

                // general
                this.hive.apiary = apiary;
                this.hive.number = number;
                this.hive.status = status;
                this.hive.purpose = purpose;
                this.hive.created = created;
                this.hive.generalNote = generalNote;

                // bees
                this.hive.strength = strength;
                this.hive.temperament = temperament;
                this.hive.frames = frames;

                // queen
                this.hive.isQueen = isQueen;
                this.hive.age = age;
                this.hive.installed = installed;
                this.hive.race = race;
                this.hive.line = line;
                this.hive.queenColor = queenColor;
                this.hive.queenNote = queenNote;
            } else {
                this.hive.id = id;

                // general
                this.hive.number = {};
                this.hive.apiary = {};
                this.hive.status = {};
                this.hive.purpose = {};
                this.hive.created = {};
                this.hive.generalNote = {};

                // bees
                this.hive.strength = {};
                this.hive.temperament = {};
                this.hive.frames = {};

                // queen
                this.hive.isQueen = {};
                this.hive.age = {};
                this.hive.installed = {};
                this.hive.race = {};
                this.hive.line = {};
                this.hive.queenColor = {};
                this.hive.queenNote = {};
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &__add {
        font-size: 1.8rem;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2rem;
        cursor: pointer;
        width: 100%;
        border-bottom: 0.5px solid black;
        transition: 0.1s;

        &:hover {
            font-weight: bold;
        }
    }

    &__add-icon {
        margin-left: 2rem;
    }

    .table {
        margin-top: 2rem;
        width: 100%;
        text-align: center;
        font-size: 1.5rem;

        &__tr {
            &:nth-child(even) {
                background: #eee;
            }
        }

        &__td {
            padding: 1rem;
            cursor: pointer;
            font-size: 1.2rem;
            transition: 0.1s;

            &:hover {
                transform: scale(1.1);
                font-weight: bold;
            }

            &--no-pointer {
                cursor: auto;

                &:hover {
                    transform: scale(1);
                    font-weight: 400;
                }
            }
        }
    }
}

@media (min-width: 768px) {
    .hives {
        background-color: white;
        height: 100vh;

        .container {
            max-width: 768px;
            border: 0.5px solid #ccc;
            z-index: 1;
            margin: 0 auto;
            margin-top: 3rem;
            padding: 2rem 3rem;
        }
    }
}
</style>

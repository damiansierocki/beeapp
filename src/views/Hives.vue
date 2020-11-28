<template>
    <div class="hives">
        <Nav v-if="showIfUserLogged">
            <template v-slot:nav-center__slot>
                <h1 class="nav-center__slot">Ule</h1>
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
            <HivesView
                v-if="showHivesView"
                @close="toggleHivesView()"
                :id="hive.id"
                :number="hive.number"
                :apiary="hive.apiary"
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
                :queenColor="hive.queenColor"
                :queenNote="hive.queenNote"
            ></HivesView>
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
                :number="hive.number"
                :apiary="hive.apiary"
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
                :queenColor="hive.queenColor"
                :queenNote="hive.queenNote"
            ></EditHives>
        </transition>

        <div class="content">
            <div class="content__add" @click="toggleAddHives()">
                Kliknij aby dodać ul
                <span class="content__plus-icon"
                    ><i class="fas fa-plus-square"></i
                ></span>
            </div>

            <table class="content__table" v-if="hives.length">
                <tr class="content__table-row">
                    <th class="content__table-column">Numer Ula</th>
                    <th class="content__table-column">Nazwa Pasieki</th>
                    <th class="content__table-column">Edytuj</th>
                    <th class="content__table-column">Usuń</th>
                </tr>
                <tr
                    class="content__table-row"
                    v-for="hive in hives"
                    :key="hive.id"
                >
                    <td
                        class="content__table-column"
                        @click="
                            toggleHivesView(
                                hive.id,
                                hive.number,
                                hive.apiary,
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
                                hive.queenColor,
                                hive.queenNote,
                            )
                        "
                    >
                        {{ hive.number }}
                    </td>
                    <td class="content__table-column">
                        {{ hive.apiary }}
                    </td>
                    <td
                        class="content__table-column"
                        @click="
                            toggleEditHives(
                                hive.id,
                                hive.number,
                                hive.apiary,
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
                                hive.queenColor,
                                hive.queenNote,
                            )
                        "
                    >
                        <i class="fas fa-edit"></i>
                    </td>
                    <td
                        class="content__table-column"
                        @click="deleteHives(hive.id)"
                    >
                        <i class="far fa-trash-alt"></i>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import Nav from '@/components/Nav';
import { mapState } from 'vuex';
import AddHives from '@/components/AddHives';
import HivesView from '@/components/HivesView';
import EditHives from '@/components/EditHives';

export default {
    data() {
        return {
            showAddHives: false,

            showHivesView: false,

            showEditHives: false,

            hive: {
                // general
                number: '',
                apiary: '',
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
                queenColor: '',
                queenNote: '',
            },
        };
    },

    components: { Nav, AddHives, HivesView, EditHives },

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
            number,
            apiary,
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
            queenColor,
            queenNote,
        ) {
            this.showEditHives = !this.showEditHives;

            if (this.showEditHives) {
                this.hive.id = id;

                // general
                this.hive.number = number;
                this.hive.apiary = apiary;
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
                this.hive.queenColor = {};
                this.hive.queenNote = {};
            }
        },

        toggleHivesView(
            id,
            number,
            apiary,
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
            queenColor,
            queenNote,
        ) {
            this.showHivesView = !this.showHivesView;

            if (this.showHivesView) {
                this.hive.id = id;

                // general
                this.hive.number = number;
                this.hive.apiary = apiary;
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
                this.hive.queenColor = {};
                this.hive.queenNote = {};
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/colors';

.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: calc(100vh - 3.2rem);

    &__add {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem;
        width: 100%;
    }

    &__table {
        width: 100%;
        text-align: center;
    }

    &__table-row {
        &:nth-child(even) {
            background-color: #eee;
        }
    }

    &__table-column {
        padding: 1rem;
        cursor: pointer;
    }

    &__inspections-name {
        font-size: 0.9rem;
        color: $orange;
        font-weight: bold;
    }

    &__inspections-hives {
        font-size: 0.9rem;
    }

    &__plus-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
        margin-left: 1rem;
    }
}

@media (min-width: 320px) {
    .content {
        height: calc(100vh - 3.3rem);
    }
}

@media (min-width: 414px) {
    .content {
        height: calc(100vh - 3.45rem);
    }
}

@media (min-width: 768px) {
    .content {
        height: calc(100vh - 3.65rem);
        overflow-y: auto;
    }
}
</style>

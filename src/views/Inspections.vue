<template>
    <div class="inspections">
        <Nav v-if="showIfUserLogged">
            <template v-slot:actual-page__slot>
                <p class="actual-page__slot">Inspekcje</p>
            </template>
        </Nav>

        <transition
            enter-active-class="animate__animated animate__backInDown animate__faster"
            leave-active-class="animate__animated animate__backOutUp animate__faster"
            mode="out-in"
            appear
        >
            <AddInspections
                v-if="showAddInspections"
                @close="toggleAddInspections()"
            ></AddInspections>
        </transition>

        <transition
            enter-active-class="animate__animated animate__backInDown animate__faster"
            leave-active-class="animate__animated animate__backOutUp animate__faster"
            mode="out-in"
            appear
        >
            <ViewInspections
                v-if="showViewInspections"
                @close="toggleViewInspections()"
                :id="inspection.id"
                :purpose="inspection.purpose"
                :apiary="inspection.apiary"
                :hive="inspection.hive"
                :date="inspection.date"
                :strength="inspection.strength"
                :temperament="inspection.temperament"
                :frames="inspection.frames"
                :isQueen="inspection.isQueen"
                :age="inspection.age"
                :installed="inspection.installed"
                :race="inspection.race"
                :queenColor="inspection.queenColor"
                :queenNote="inspection.queenNote"
                :framesWithBees="inspection.framesWithBees"
                :framesWithBrood="inspection.framesWithBrood"
                :framesWithHoney="inspection.framesWithHoney"
                :framesWithPollen="inspection.framesWithPollen"
                :problems="inspection.problems"
                :note="inspection.note"
                :includeWeather="inspection.includeWeather"
                :conditions="inspection.conditions"
                :temperature="inspection.temperature"
                :humidity="inspection.humidity"
                :pressure="inspection.pressure"
                :wind="inspection.wind"
            ></ViewInspections>
        </transition>

        <transition
            enter-active-class="animate__animated animate__backInDown animate__faster"
            leave-active-class="animate__animated animate__backOutUp animate__faster"
            mode="out-in"
            appear
        >
            <EditInspections
                v-if="showEditInspections"
                @close="toggleEditInspections()"
                :id="inspection.id"
                :purpose="inspection.purpose"
                :apiary="inspection.apiary"
                :hive="inspection.hive"
                :date="inspection.date"
                :strength="inspection.strength"
                :temperament="inspection.temperament"
                :frames="inspection.frames"
                :isQueen="inspection.isQueen"
                :age="inspection.age"
                :installed="inspection.installed"
                :race="inspection.race"
                :queenColor="inspection.queenColor"
                :queenNote="inspection.queenNote"
                :framesWithBees="inspection.framesWithBees"
                :framesWithBrood="inspection.framesWithBrood"
                :framesWithHoney="inspection.framesWithHoney"
                :framesWithPollen="inspection.framesWithPollen"
                :problems="inspection.problems"
                :note="inspection.note"
                :includeWeather="inspection.includeWeather"
                :conditions="inspection.conditions"
                :temperature="inspection.temperature"
                :humidity="inspection.humidity"
                :pressure="inspection.pressure"
                :wind="inspection.wind"
            ></EditInspections>
        </transition>

        <div class="container">
            <div class="container__add" @click="toggleAddInspections()">
                <p class="container__add-text">
                    Kliknij aby dodać nową inspekcję
                </p>
                <div class="container__add-icon">
                    <i class="far fa-plus-square"></i>
                </div>
            </div>

            <table class="table" v-if="inspections.length">
                <tr class="table__tr">
                    <th class="table__th">Cel inspekcji</th>
                    <th class="table__th">Data</th>
                    <th class="table__th">Edytuj</th>
                    <th class="table__th">Usuń</th>
                </tr>

                <tr
                    class="table__tr"
                    v-for="inspection in inspections"
                    :key="inspection.id"
                >
                    <td
                        class="table__td"
                        @click="
                            toggleViewInspections(
                                inspection.id,
                                inspection.purpose,
                                inspection.apiary,
                                inspection.hive,
                                inspection.date,
                                inspection.strength,
                                inspection.temperament,
                                inspection.frames,
                                inspection.isQueen,
                                inspection.age,
                                inspection.installed,
                                inspection.race,
                                inspection.queenColor,
                                inspection.queenNote,
                                inspection.framesWithBees,
                                inspection.framesWithBrood,
                                inspection.framesWithHoney,
                                inspection.framesWithPollen,
                                inspection.problems,
                                inspection.note,
                                inspection.includeWeather,
                                inspection.conditions,
                                inspection.temperature,
                                inspection.humidity,
                                inspection.pressure,
                                inspection.wind,
                            )
                        "
                    >
                        {{ inspection.purpose }}
                    </td>
                    <td class="table__td">
                        {{ inspection.date }}
                    </td>
                    <td
                        class="table__td"
                        @click="
                            toggleEditInspections(
                                inspection.id,
                                inspection.purpose,
                                inspection.apiary,
                                inspection.hive,
                                inspection.date,
                                inspection.strength,
                                inspection.temperament,
                                inspection.frames,
                                inspection.isQueen,
                                inspection.age,
                                inspection.installed,
                                inspection.race,
                                inspection.queenColor,
                                inspection.queenNote,
                                inspection.framesWithBees,
                                inspection.framesWithBrood,
                                inspection.framesWithHoney,
                                inspection.framesWithPollen,
                                inspection.problems,
                                inspection.note,
                                inspection.includeWeather,
                                inspection.conditions,
                                inspection.temperature,
                                inspection.humidity,
                                inspection.pressure,
                                inspection.wind,
                            )
                        "
                    >
                        <i class="far fa-edit"></i>
                    </td>
                    <td
                        class="table__td"
                        @click="deleteInspections(inspection.id)"
                    >
                        <i class="far fa-trash-alt"></i>
                    </td>
                </tr>
            </table>

            <table class="table" v-if="!inspections.length">
                <tr class="table__tr">
                    <th class="table__th">Brak inspekcji 😭😭😭</th>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import Nav from '@/components/Nav';
import AddInspections from '@/components/AddInspections';
import ViewInspections from '@/components/ViewInspections';
import EditInspections from '@/components/EditInspections';
import { mapState } from 'vuex';

export default {
    data() {
        return {
            showAddInspections: false,
            showViewInspections: false,
            showEditInspections: false,

            inspection: {
                // general
                purpose: '',
                apiary: '',
                hive: '',
                date: '',

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

                // frames with
                framesWithBees: '',
                framesWithBrood: '',
                framesWithHoney: '',
                framesWithPollen: '',

                // spotted problems
                problems: '',
                note: '',

                // weather
                includeWeather: '',
                conditions: '',
                temperature: '',
                humidity: '',
                pressure: '',
                wind: '',
            },
        };
    },

    components: {
        Nav,
        AddInspections,
        ViewInspections,
        EditInspections,
    },

    created() {
        this.getHives();
        this.getApiaries();
        this.getInspections();
    },

    computed: {
        ...mapState(['userProfile', 'hives', 'apiaries', 'inspections']),

        showIfUserLogged() {
            return Object.keys(this.userProfile).length > 1;
        },
    },

    methods: {
        deleteInspections(docId) {
            this.$store.dispatch('deleteInspections', docId);
        },

        getHives() {
            this.$store.dispatch('getHives');
        },

        getApiaries() {
            this.$store.dispatch('getApiaries');
        },

        getInspections() {
            this.$store.dispatch('getInspections');
        },

        toggleAddInspections() {
            this.showAddInspections = !this.showAddInspections;
        },

        toggleViewInspections(
            id,
            purpose,
            apiary,
            hive,
            date,
            strength,
            temperament,
            frames,
            isQueen,
            age,
            installed,
            race,
            queenColor,
            queenNote,
            framesWithBees,
            framesWithBrood,
            framesWithHoney,
            framesWithPollen,
            problems,
            note,
            includeWeather,
            conditions,
            temperature,
            humidity,
            pressure,
            wind,
        ) {
            this.showViewInspections = !this.showViewInspections;

            if (this.showViewInspections) {
                this.inspection.id = id;
                this.inspection.purpose = purpose;
                this.inspection.apiary = apiary;
                this.inspection.hive = hive;
                this.inspection.date = date;
                this.inspection.strength = strength;
                this.inspection.temperament = temperament;
                this.inspection.frames = frames;
                this.inspection.isQueen = isQueen;
                this.inspection.age = age;
                this.inspection.installed = installed;
                this.inspection.race = race;
                this.inspection.queenColor = queenColor;
                this.inspection.queenNote = queenNote;
                this.inspection.framesWithBees = framesWithBees;
                this.inspection.framesWithBrood = framesWithBrood;
                this.inspection.framesWithHoney = framesWithHoney;
                this.inspection.framesWithPollen = framesWithPollen;
                this.inspection.problems = problems;
                this.inspection.note = note;
                this.inspection.includeWeather = includeWeather;
                this.inspection.conditions = conditions;
                this.inspection.temperature = temperature;
                this.inspection.humidity = humidity;
                this.inspection.pressure = pressure;
                this.inspection.wind = wind;
            } else {
                this.inspection.id = {};
                this.inspection.purpose = {};
                this.inspection.apiary = {};
                this.inspection.hive = {};
                this.inspection.date = {};
                this.inspection.strength = {};
                this.inspection.temperament = {};
                this.inspection.frames = {};
                this.inspection.isQueen = {};
                this.inspection.age = {};
                this.inspection.installed = {};
                this.inspection.race = {};
                this.inspection.queenColor = {};
                this.inspection.queenNote = {};
                this.inspection.framesWithBees = {};
                this.inspection.framesWithBrood = {};
                this.inspection.framesWithHoney = {};
                this.inspection.framesWithPollen = {};
                this.inspection.problems = {};
                this.inspection.note = {};
                this.inspection.includeWeather = {};
                this.inspection.conditions = {};
                this.inspection.temperature = {};
                this.inspection.humidity = {};
                this.inspection.pressure = {};
                this.inspection.wind = {};
            }
        },

        toggleEditInspections(
            id,
            purpose,
            apiary,
            hive,
            date,
            strength,
            temperament,
            frames,
            isQueen,
            age,
            installed,
            race,
            queenColor,
            queenNote,
            framesWithBees,
            framesWithBrood,
            framesWithHoney,
            framesWithPollen,
            problems,
            note,
            includeWeather,
            conditions,
            temperature,
            humidity,
            pressure,
            wind,
        ) {
            this.showEditInspections = !this.showEditInspections;

            if (this.showEditInspections) {
                this.inspection.id = id;
                this.inspection.purpose = purpose;
                this.inspection.apiary = apiary;
                this.inspection.hive = hive;
                this.inspection.date = date;
                this.inspection.strength = strength;
                this.inspection.temperament = temperament;
                this.inspection.frames = frames;
                this.inspection.isQueen = isQueen;
                this.inspection.age = age;
                this.inspection.installed = installed;
                this.inspection.race = race;
                this.inspection.queenColor = queenColor;
                this.inspection.queenNote = queenNote;
                this.inspection.framesWithBees = framesWithBees;
                this.inspection.framesWithBrood = framesWithBrood;
                this.inspection.framesWithHoney = framesWithHoney;
                this.inspection.framesWithPollen = framesWithPollen;
                this.inspection.problems = problems;
                this.inspection.note = note;
                this.inspection.includeWeather = includeWeather;
                this.inspection.conditions = conditions;
                this.inspection.temperature = temperature;
                this.inspection.humidity = humidity;
                this.inspection.pressure = pressure;
                this.inspection.wind = wind;
            } else {
                this.inspection.id = {};
                this.inspection.purpose = {};
                this.inspection.apiary = {};
                this.inspection.hive = {};
                this.inspection.date = {};
                this.inspection.strength = {};
                this.inspection.temperament = {};
                this.inspection.frames = {};
                this.inspection.isQueen = {};
                this.inspection.age = {};
                this.inspection.installed = {};
                this.inspection.race = {};
                this.inspection.queenColor = {};
                this.inspection.queenNote = {};
                this.inspection.framesWithBees = {};
                this.inspection.framesWithBrood = {};
                this.inspection.framesWithHoney = {};
                this.inspection.framesWithPollen = {};
                this.inspection.problems = {};
                this.inspection.note = {};
                this.inspection.includeWeather = {};
                this.inspection.conditions = {};
                this.inspection.temperature = {};
                this.inspection.humidity = {};
                this.inspection.pressure = {};
                this.inspection.wind = {};
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
        }
    }
}

@media (min-width: 768px) {
    .inspections {
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

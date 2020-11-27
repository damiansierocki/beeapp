<template>
    <div class="inspections">
        <Nav v-if="showIfUserLogged">
            <template v-slot:nav-center__slot>
                <h1 class="nav-center__slot">Inspekcje</h1>
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
            <InspectionsView
                v-if="showInspectionsView"
                @close="toggleInspectionsView()"
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
            ></InspectionsView>
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

        <div class="content">
            <div class="content__add" @click="toggleAddInspections()">
                Kliknij aby inspekcję
                <span class="content__plus-icon"
                    ><i class="fas fa-plus-square"></i
                ></span>
            </div>

            <table class="content__table" v-if="inspections.length">
                <tr class="content__table-row">
                    <th class="content__table-column">Cel inspekcji</th>
                    <th class="content__table-column">Data</th>
                    <th class="content__table-column">Pasieka</th>
                    <th class="content__table-column">Ul</th>
                    <th class="content__table-column">Edytuj</th>
                    <th class="content__table-column">Usuń</th>
                </tr>
                <tr
                    class="content__table-row"
                    v-for="inspection in inspections"
                    :key="inspection.id"
                >
                    <td
                        class="content__table-column"
                        @click="
                            toggleInspectionsView(
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
                                inspection.wind
                            )
                        "
                    >
                        {{ inspection.purpose }}
                    </td>

                    <td class="content__table-column">
                        {{ inspection.date }}
                    </td>
                    <td class="content__table-column">
                        {{ inspection.apiary }}
                    </td>
                    <td class="content__table-column">
                        {{ inspection.hive }}
                    </td>
                    <td
                        class="content__table-column"
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
                                inspection.wind
                            )
                        "
                    >
                        <i class="fas fa-edit"></i>
                    </td>
                    <td
                        class="content__table-column"
                        @click="deleteInspections(inspection.id)"
                    >
                        <i class="far fa-trash-alt"></i>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import Nav from "@/components/Nav";
import AddInspections from "@/components/AddInspections";
import InspectionsView from "@/components/InspectionsView";
import EditInspections from "@/components/EditInspections";
import { mapState } from "vuex";

export default {
    data() {
        return {
            showAddInspections: false,
            showInspectionsView: false,
            showEditInspections: false,

            inspection: {
                // general
                purpose: "",
                apiary: "",
                hive: "",
                date: "",

                // bees
                strength: "",
                temperament: "",
                frames: "",

                // queen
                isQueen: "",
                age: "",
                installed: "",
                race: "",
                queenColor: "",
                queenNote: "",

                // frames with
                framesWithBees: "",
                framesWithBrood: "",
                framesWithHoney: "",
                framesWithPollen: "",

                // spotted problems
                problems: "",
                note: "",

                // weather
                includeWeather: "",
                conditions: "",
                temperature: "",
                humidity: "",
                pressure: "",
                wind: ""
            }
        };
    },

    components: {
        Nav,
        AddInspections,
        InspectionsView,
        EditInspections
    },

    created() {
        this.getHives();
        this.getApiaries();
        this.getInspections();
    },

    computed: {
        ...mapState(["userProfile", "hives", "apiaries", "inspections"]),

        showIfUserLogged() {
            return Object.keys(this.userProfile).length > 1;
        }
    },

    methods: {
        deleteInspections(docId) {
            this.$store.dispatch("deleteInspections", docId);
        },

        getHives() {
            this.$store.dispatch("getHives");
        },

        getApiaries() {
            this.$store.dispatch("getApiaries");
        },

        getInspections() {
            this.$store.dispatch("getInspections");
        },

        toggleAddInspections() {
            this.showAddInspections = !this.showAddInspections;
        },

        toggleInspectionsView(
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
            wind
        ) {
            this.showInspectionsView = !this.showInspectionsView;

            if (this.showInspectionsView) {
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
            wind
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
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/colors";

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

    &__apiary-name {
        font-size: 0.9rem;
        color: $orange;
        font-weight: bold;
    }

    &__apiary-hives {
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

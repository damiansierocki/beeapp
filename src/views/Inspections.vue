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
                :name="inspection.name"
                :apiary="inspection.apiary"
                :hive="inspection.hive"
                :date="inspection.date"
                :equipment="inspection.equipment"
                :odor="inspection.odor"
                :deadBees="inspection.deadBees"
                :moisture="inspection.moisture"
                :mold="inspection.mold"
                :otherObservation="inspection.otherObservation"
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
                :name="inspection.name"
                :apiary="inspection.apiary"
                :hive="inspection.hive"
                :date="inspection.date"
                :equipment="inspection.equipment"
                :odor="inspection.odor"
                :deadBees="inspection.deadBees"
                :moisture="inspection.moisture"
                :mold="inspection.mold"
                :otherObservation="inspection.otherObservation"
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
                    <th class="content__table-column">Nazwa inspekcji</th>
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
                                inspection.name,
                                inspection.apiary,
                                inspection.hive,
                                inspection.date,
                                inspection.equipment,
                                inspection.odor,
                                inspection.deadBees,
                                inspection.moisture,
                                inspection.mold,
                                inspection.otherObservation
                            )
                        "
                    >
                        {{ inspection.name }}
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
                                inspection.name,
                                inspection.apiary,
                                inspection.hive,
                                inspection.date,
                                inspection.equipment,
                                inspection.odor,
                                inspection.deadBees,
                                inspection.moisture,
                                inspection.mold,
                                inspection.otherObservation
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
            name,
            apiary,
            hive,
            date,
            equipment,
            odor,
            deadBees,
            moisture,
            mold,
            otherObservation
        ) {
            this.showInspectionsView = !this.showInspectionsView;

            if (this.showInspectionsView) {
                this.inspection.id = id;
                this.inspection.name = name;
                this.inspection.apiary = apiary;
                this.inspection.hive = hive;
                this.inspection.date = date;
                this.inspection.equipment = equipment;
                this.inspection.odor = odor;
                this.inspection.deadBees = deadBees;
                this.inspection.moisture = moisture;
                this.inspection.mold = mold;
                this.inspection.otherObservation = otherObservation;
            } else {
                this.inspection.id = {};
                this.inspection.name = {};
                this.inspection.apiary = {};
                this.inspection.hive = {};
                this.inspection.date = {};
                this.inspection.equipment = {};
                this.inspection.odor = {};
                this.inspection.deadBees = {};
                this.inspection.moisture = {};
                this.inspection.mold = {};
                this.inspection.otherObservation = {};
            }
        },

        toggleEditInspections(
            id,
            name,
            apiary,
            hive,
            date,
            equipment,
            odor,
            deadBees,
            moisture,
            mold,
            otherObservation
        ) {
            this.showEditInspections = !this.showEditInspections;

            if (this.showEditInspections) {
                this.inspection.id = id;
                this.inspection.name = name;
                this.inspection.apiary = apiary;
                this.inspection.hive = hive;
                this.inspection.date = date;
                this.inspection.equipment = equipment;
                this.inspection.odor = odor;
                this.inspection.deadBees = deadBees;
                this.inspection.moisture = moisture;
                this.inspection.mold = mold;
                this.inspection.otherObservation = otherObservation;
            } else {
                this.inspection.id = {};
                this.inspection.name = {};
                this.inspection.apiary = {};
                this.inspection.hive = {};
                this.inspection.date = {};
                this.inspection.equipment = {};
                this.inspection.odor = {};
                this.inspection.deadBees = {};
                this.inspection.moisture = {};
                this.inspection.mold = {};
                this.inspection.otherObservation = {};
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

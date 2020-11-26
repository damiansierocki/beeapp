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
            <EditInspections
                v-if="showEditInspections"
                @close="toggleEditInspections()"
            ></EditInspections>
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
            ></InspectionsView>
        </transition>

        <div class="content">
            <div class="content__add" @click="toggleAddInspections()">
                Kliknij aby inspekcję
                <span class="content__plus-icon"
                    ><i class="fas fa-plus-square"></i
                ></span>
            </div>

            <table class="content__table">
                <tr class="content__table-row">
                    <th class="content__table-column">Nazwa inspekcji</th>
                    <th class="content__table-column">Edytuj</th>
                    <th class="content__table-column">Usuń</th>
                    <th class="content__table-column">Data</th>
                    <th class="content__table-column">Pasieka</th>
                    <th class="content__table-column">Ul</th>
                </tr>
                <tr class="content__table-row">
                    <td
                        class="content__table-column"
                        @click="toggleInspectionsView()"
                    >
                        Nazwa inspekcji
                    </td>
                    <td
                        class="content__table-column"
                        @click="toggleEditInspections()"
                    >
                        <i class="fas fa-edit"></i>
                    </td>
                    <td class="content__table-column">
                        <i class="far fa-trash-alt"></i>
                    </td>
                    <td class="content__table-column">
                        Data
                    </td>
                    <td class="content__table-column">
                        Pasieka
                    </td>
                    <td class="content__table-column">
                        Ul
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
            showEditInspections: false
        };
    },

    components: {
        Nav,
        AddInspections,
        InspectionsView,
        EditInspections
    },

    computed: {
        ...mapState(["userProfile", "hives"]),

        showIfUserLogged() {
            return Object.keys(this.userProfile).length > 1;
        }
    },

    methods: {
        toggleAddInspections() {
            this.showAddInspections = !this.showAddInspections;
        },

        toggleInspectionsView() {
            this.showInspectionsView = !this.showInspectionsView;
        },

        toggleEditInspections() {
            this.showEditInspections = !this.showEditInspections;
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/inspections.scss";
</style>

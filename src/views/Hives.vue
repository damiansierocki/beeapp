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
                :status="hive.status"
                :hiveId="hive.hiveId"
                :apiary="hive.apiary"
                :queen="hive.queen"
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
                :status="hive.status"
                :hiveId="hive.hiveId"
                :apiary="hive.apiary"
                :queen="hive.queen"
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
                    <th class="content__table-column">ID Ula</th>
                    <th class="content__table-column">Edytuj</th>
                    <th class="content__table-column">Usuń</th>
                    <th class="content__table-column">Nazwa Pasieki</th>
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
                                hive.apiary,
                                hive.hiveId,
                                hive.queen,
                                hive.status
                            )
                        "
                    >
                        {{ hive.hiveId }}
                    </td>
                    <td
                        class="content__table-column"
                        @click="
                            toggleEditHives(
                                hive.id,
                                hive.status,
                                hive.hiveId,
                                hive.apiary,
                                hive.queen
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
                    <td class="content__table-column">
                        {{ hive.apiary }}
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import Nav from "@/components/Nav";
import { mapState } from "vuex";
import AddHives from "@/components/AddHives";
import HivesView from "@/components/HivesView";
import EditHives from "@/components/EditHives";

export default {
    data() {
        return {
            showAddHives: false,

            showHivesView: false,

            showEditHives: false,

            hive: {
                id: "",
                apiary: "",
                hiveId: "",
                queen: "",
                status: ""
            }
        };
    },

    components: { Nav, AddHives, HivesView, EditHives },

    computed: {
        ...mapState(["userProfile", "hives"]),

        showIfUserLogged() {
            return Object.keys(this.userProfile).length > 1;
        }
    },

    created() {
        this.getHives();
    },

    methods: {
        deleteHives(docId) {
            this.$store.dispatch("deleteHives", docId);
        },

        getHives() {
            this.$store.dispatch("getHives");
        },

        toggleAddHives() {
            this.showAddHives = !this.showAddHives;
        },

        toggleEditHives(id, status, hiveId, apiary, queen) {
            this.showEditHives = !this.showEditHives;

            if (this.showEditHives) {
                this.hive.id = id;
                this.hive.status = status;
                this.hive.hiveId = hiveId;
                this.hive.apiary = apiary;
                this.hive.queen = queen;
            } else {
                this.hive.id = {};
                this.hive.status = {};
                this.hive.hiveId = {};
                this.hive.apiary = {};
                this.hive.queen = {};
            }
        },

        toggleHivesView(id, status, hiveId, apiary, queen) {
            this.showHivesView = !this.showHivesView;

            if (this.showHivesView) {
                this.hive.id = id;
                this.hive.status = status;
                this.hive.hiveId = hiveId;
                this.hive.apiary = apiary;
                this.hive.queen = queen;
            } else {
                this.hive.id = {};
                this.hive.status = {};
                this.hive.hiveId = {};
                this.hive.apiary = {};
                this.hive.queen = {};
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/hives.scss";
</style>

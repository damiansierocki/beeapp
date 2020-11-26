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
                :frames="hive.frames"
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
                :frames="hive.frames"
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
                                hive.status,
                                hive.hiveId,
                                hive.apiary,
                                hive.queen,
                                hive.frames
                            )
                        "
                    >
                        {{ hive.hiveId }}
                    </td>
                    <td class="content__table-column">
                        {{ hive.apiary }}
                    </td>
                    <td
                        class="content__table-column"
                        @click="
                            toggleEditHives(
                                hive.id,
                                hive.status,
                                hive.hiveId,
                                hive.apiary,
                                hive.queen,
                                hive.frames
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
                status: "",
                hiveId: "",
                apiary: "",
                queen: "",
                frames: ""
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

        toggleEditHives(id, status, hiveId, apiary, queen, frames) {
            this.showEditHives = !this.showEditHives;

            if (this.showEditHives) {
                this.hive.id = id;
                this.hive.status = status;
                this.hive.hiveId = hiveId;
                this.hive.apiary = apiary;
                this.hive.queen = queen;
                this.hive.frames = frames;
            } else {
                this.hive.id = {};
                this.hive.status = {};
                this.hive.hiveId = {};
                this.hive.apiary = {};
                this.hive.queen = {};
                this.hive.frames = {};
            }
        },

        toggleHivesView(id, status, hiveId, apiary, queen, frames) {
            this.showHivesView = !this.showHivesView;

            if (this.showHivesView) {
                this.hive.id = id;
                this.hive.status = status;
                this.hive.hiveId = hiveId;
                this.hive.apiary = apiary;
                this.hive.queen = queen;
                this.hive.frames = frames;
            } else {
                this.hive.id = {};
                this.hive.status = {};
                this.hive.hiveId = {};
                this.hive.apiary = {};
                this.hive.queen = {};
                this.hive.frames = {};
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

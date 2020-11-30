<template>
    <div class="apiaries">
        <Nav v-if="showIfUserLogged">
            <template v-slot:actual-page__slot>
                <p class="actual-page__slot">Pasieki</p>
            </template>
        </Nav>

        <transition
            enter-active-class="animate__animated animate__backInDown animate__faster"
            leave-active-class="animate__animated animate__backOutUp animate__faster"
            mode="out-in"
            appear
        >
            <AddApiary
                v-if="showAddApiary"
                @close="toggleAddApiary()"
            ></AddApiary>
        </transition>

        <transition
            enter-active-class="animate__animated animate__backInDown animate__faster"
            leave-active-class="animate__animated animate__backOutUp animate__faster"
            mode="out-in"
            appear
        >
            <ApiaryView
                v-if="showApiaryView"
                @close="toggleApiaryView()"
                :id="apiary.id"
                :name="apiary.name"
                :forages="apiary.forages"
                :type="apiary.type"
                :description="apiary.description"
                :address="apiary.address"
                :city="apiary.city"
                :zip="apiary.zip"
                :province="apiary.province"
            ></ApiaryView>
        </transition>

        <transition
            enter-active-class="animate__animated animate__backInDown animate__faster"
            leave-active-class="animate__animated animate__backOutUp animate__faster"
            mode="out-in"
            appear
        >
            <EditApiary
                v-if="showEditApiary"
                @close="toggleEditApiary()"
                :id="apiary.id"
                :name="apiary.name"
                :forages="apiary.forages"
                :type="apiary.type"
                :description="apiary.description"
                :address="apiary.address"
                :city="apiary.city"
                :zip="apiary.zip"
                :province="apiary.province"
            >
            </EditApiary>
        </transition>

        <div class="content">
            <div class="content__add" @click="toggleAddApiary()">
                Kliknij aby dodać pasiekę
                <span class="content__plus-icon"
                    ><i class="fas fa-plus-square"></i
                ></span>
            </div>

            <table class="content__table" v-if="apiaries.length">
                <tr class="content__table-row">
                    <th class="content__table-column">Nazwa pasieki</th>
                    <th class="content__table-column">Edytuj</th>
                    <th class="content__table-column">Usuń</th>
                </tr>
                <tr
                    class="content__table-row"
                    v-for="apiary in apiaries"
                    :key="apiary.id"
                >
                    <td
                        class="content__table-column"
                        @click="
                            toggleApiaryView(
                                apiary.id,
                                apiary.name,
                                apiary.forages,
                                apiary.type,
                                apiary.description,
                                apiary.address,
                                apiary.city,
                                apiary.zip,
                                apiary.province,
                            )
                        "
                    >
                        {{ apiary.name }}
                    </td>
                    <td
                        class="content__table-column"
                        @click="
                            toggleEditApiary(
                                apiary.id,
                                apiary.name,
                                apiary.forages,
                                apiary.type,
                                apiary.description,
                                apiary.address,
                                apiary.city,
                                apiary.zip,
                                apiary.province,
                            )
                        "
                    >
                        <i class="fas fa-edit"></i>
                    </td>
                    <td
                        class="content__table-column"
                        @click="deleteApiary(apiary.id)"
                    >
                        <i class="far fa-trash-alt"></i>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import AddApiary from '@/components/AddApiary';
import ApiaryView from '@/components/ApiaryView';
import EditApiary from '@/components/EditApiary';
import Nav from '@/components/Nav';
import { mapState } from 'vuex';

export default {
    data() {
        return {
            showAddApiary: false,

            showApiaryView: false,

            showEditApiary: false,

            apiary: {
                // id: "",

                // general
                name: '',
                forages: '',
                type: '',
                description: '',

                // address
                address: '',
                city: '',
                zip: '',
                province: '',
            },
        };
    },

    components: {
        Nav,
        AddApiary,
        ApiaryView,
        EditApiary,
    },

    computed: {
        ...mapState(['userProfile', 'apiaries', 'hives']),

        showIfUserLogged() {
            return Object.keys(this.userProfile).length > 1;
        },
    },

    created() {
        this.getApiaries();
        this.getHives();
    },

    methods: {
        deleteApiary(docId) {
            this.$store.dispatch('deleteApiary', docId);
        },

        getApiaries() {
            this.$store.dispatch('getApiaries');
        },

        getHives() {
            this.$store.dispatch('getHives');
        },

        toggleAddApiary() {
            this.showAddApiary = !this.showAddApiary;
        },

        toggleApiaryView(
            id,
            name,
            forages,
            type,
            description,
            address,
            city,
            zip,
            province,
        ) {
            this.showApiaryView = !this.showApiaryView;

            if (this.showApiaryView) {
                // general
                this.apiary.id = id;
                this.apiary.forages = forages;
                this.apiary.name = name;
                this.apiary.type = type;
                this.apiary.description = description;

                // address
                this.apiary.address = address;
                this.apiary.city = city;
                this.apiary.zip = zip;
                this.apiary.province = province;
            } else {
                // general
                this.apiary.id = {};
                this.apiary.forages = [];
                this.apiary.name = {};
                this.apiary.type = {};
                this.apiary.description = {};

                // address
                this.apiary.address = {};
                this.apiary.city = {};
                this.apiary.zip = {};
                this.apiary.province = {};
            }
        },

        toggleEditApiary(
            id,
            name,
            forages,
            type,
            description,
            address,
            city,
            zip,
            province,
        ) {
            this.showEditApiary = !this.showEditApiary;

            if (this.showEditApiary) {
                // general
                this.apiary.id = id;
                this.apiary.forages = forages;
                this.apiary.name = name;
                this.apiary.type = type;
                this.apiary.description = description;

                // address
                this.apiary.address = address;
                this.apiary.city = city;
                this.apiary.zip = zip;
                this.apiary.province = province;
            } else {
                // general
                this.apiary.id = {};
                this.apiary.forages = [];
                this.apiary.name = {};
                this.apiary.type = {};
                this.apiary.description = {};

                // address
                this.apiary.address = {};
                this.apiary.city = {};
                this.apiary.zip = {};
                this.apiary.province = {};
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

    &__icon {
        padding: 5px;
        display: flex;
        cursor: pointer;
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

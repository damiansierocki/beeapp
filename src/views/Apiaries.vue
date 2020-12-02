<template>
    <div class="apiaries">
        <Nav v-if="showIfUserLogged">
            <template v-slot:actual-page__slot>
                <p class="actual-page__slot">Pasieki</p>
            </template>
        </Nav>

        <AddApiary v-if="showAddApiary" @close="toggleAddApiary()"></AddApiary>

        <ViewApiary
            v-if="showViewApiary"
            @close="toggleViewApiary()"
            :id="apiary.id"
            :name="apiary.name"
            :forages="apiary.forages"
            :type="apiary.type"
            :description="apiary.description"
            :address="apiary.address"
            :city="apiary.city"
            :zip="apiary.zip"
            :province="apiary.province"
        ></ViewApiary>

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

        <div class="container">
            <div class="container__add" @click="toggleAddApiary()">
                <p class="container__add-text">
                    Kliknij aby dodać nową pasiekę
                </p>
                <div class="container__add-icon">
                    <i class="far fa-plus-square"></i>
                </div>
            </div>

            <table class="table" v-if="apiaries.length">
                <tr class="table__tr">
                    <th class="table__th">Pasieka</th>
                    <th class="table__th">Edytuj</th>
                    <th class="table__th">Usuń</th>
                </tr>

                <tr
                    class="table__tr"
                    v-for="apiary in apiaries"
                    :key="apiary.id"
                >
                    <td
                        class="table__td"
                        @click="
                            toggleViewApiary(
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
                        class="table__td"
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
                        <i class="far fa-edit"></i>
                    </td>
                    <td class="table__td" @click="deleteApiary(apiary.id)">
                        <i class="far fa-trash-alt"></i>
                    </td>
                </tr>
            </table>

            <table class="table" v-if="!apiaries.length">
                <tr class="table__tr">
                    <th class="table__th">Brak pasiek 😭😭😭</th>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import Nav from '@/components/Nav';
import AddApiary from '@/components/AddApiary';
import ViewApiary from '@/components/ViewApiary';
import EditApiary from '@/components/EditApiary';
import { mapState } from 'vuex';

export default {
    data() {
        return {
            showAddApiary: false,
            showEditApiary: false,
            showViewApiary: false,

            apiary: {
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
        ViewApiary,
        EditApiary,
    },

    computed: {
        ...mapState(['userProfile', 'apiaries']),

        showIfUserLogged() {
            return Object.keys(this.userProfile).length > 1;
        },
    },

    created() {
        this.getApiaries();
        this.getHives();
    },

    methods: {
        getApiaries() {
            this.$store.dispatch('getApiaries');
        },

        getHives() {
            this.$store.dispatch('getHives');
        },

        toggleAddApiary() {
            this.showAddApiary = !this.showAddApiary;
        },

        toggleViewApiary(
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
            this.showViewApiary = !this.showViewApiary;
            if (this.showViewApiary) {
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

        deleteApiary(docId) {
            this.$store.dispatch('deleteApiary', docId);
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
    .apiaries {
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

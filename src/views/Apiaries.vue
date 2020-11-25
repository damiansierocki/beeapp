<template>
    <div class="apiaries">
        <Nav v-if="showIfUserLogged">
            <template v-slot:nav-center__slot>
                <h1 class="nav-center__slot">Pasieki</h1>
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
                :type="apiary.type"
                :description="apiary.description"
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
                :type="apiary.type"
                :description="apiary.description"
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

            <ul class="content__list" v-if="apiaries.length">
                <li class="content__item">
                    <p>Nazwa pasieki</p>
                    <p>Edytuj</p>
                    <p>Usuń</p>
                    <p>Ilość Uli</p>
                </li>

                <li
                    class="content__item"
                    v-for="apiary in apiaries"
                    :key="apiary.id"
                >
                    <p
                        class="content__apiary-name"
                        @click="
                            toggleApiaryView(
                                apiary.id,
                                apiary.name,
                                apiary.type,
                                apiary.description
                            )
                        "
                    >
                        {{ apiary.name }}
                    </p>
                    <span
                        class="content__icon"
                        @click="
                            toggleEditApiary(
                                apiary.id,
                                apiary.name,
                                apiary.type,
                                apiary.description
                            )
                        "
                        ><i class="fas fa-edit"></i
                    ></span>
                    <span class="content__icon" @click="deleteApiary(apiary.id)"
                        ><i class="far fa-trash-alt"></i
                    ></span>
                    <p class="content__apiary-hives">0</p>
                </li>
            </ul>
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
                id: '',
                name: '',
                type: '',
                description: ''
            },

            selectedApiary: '',
            selectedApiaryName: '',
            selectedApiaryType: '',
            selectedApiaryDescription: ''
        };
    },

    components: {
        Nav,
        AddApiary,
        ApiaryView,
        EditApiary
    },

    computed: {
        ...mapState(['userProfile', 'apiaries']),

        showIfUserLogged() {
            return Object.keys(this.userProfile).length > 1;
        }
    },

    created() {
        this.getApiaries();
    },

    methods: {
        deleteApiary(docId) {
            this.$store.dispatch('deleteApiary', docId);
        },

        getApiaries() {
            this.$store.dispatch('getApiaries');
        },

        toggleAddApiary() {
            this.showAddApiary = !this.showAddApiary;
        },

        toggleApiaryView(id, name, type, description) {
            this.showApiaryView = !this.showApiaryView;

            if (this.showApiaryView) {
                this.apiary.id = id;
                this.apiary.name = name;
                this.apiary.type = type;
                this.apiary.description = description;
            } else {
                this.apiary.id = {};
                this.apiary.name = {};
                this.apiary.type = {};
                this.apiary.description = {};
            }
        },

        toggleEditApiary(id, name, type, description) {
            this.showEditApiary = !this.showEditApiary;

            if (this.showEditApiary) {
                this.apiary.id = id;
                this.apiary.name = name;
                this.apiary.type = type;
                this.apiary.description = description;
            } else {
                this.apiary.id = {};
                this.apiary.name = {};
                this.apiary.type = {};
                this.apiary.description = {};
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/apiaries.scss';
</style>

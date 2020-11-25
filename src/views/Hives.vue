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
            ></HivesView>
        </transition>

        <div class="content">
            <div class="content__add" @click="toggleAddHives()">
                Kliknij aby dodać ul
                <span class="content__plus-icon"
                    ><i class="fas fa-plus-square"></i
                ></span>
            </div>

            <ul class="content__list" v-if="hives.length">
                <li class="content__item">
                    <p>
                        ID
                    </p>
                    <p>
                        Nazwa pasieki
                    </p>
                </li>
                <li
                    class="content__item"
                    @click="toggleHivesView()"
                    v-for="hive in hives"
                    :key="hive.id"
                >
                    <p class="content__apiary-name">
                        {{ hive.hiveId }}
                    </p>
                    <p class="content__apiary-name">
                        {{ hive.apiary.apiary }}
                    </p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Nav from '@/components/Nav';
import { mapState } from 'vuex';
import AddHives from '@/components/AddHives';
import HivesView from '@/components/HivesView';

export default {
    data() {
        return {
            showAddHives: false,
            showHivesView: false,
            hive: {
                apiary: '',
                hiveId: '',
                queen: '',
                queenColor: '',
                status: ''
            }
        };
    },

    components: { Nav, AddHives, HivesView },

    computed: {
        ...mapState(['userProfile', 'hives']),

        showIfUserLogged() {
            return Object.keys(this.userProfile).length > 1;
        }
    },

    created() {
        this.getHives();
    },

    methods: {
        getHives() {
            this.$store.dispatch('getHives');
        },

        toggleAddHives() {
            this.showAddHives = !this.showAddHives;
        },

        toggleHivesView() {
            this.showHivesView = !this.showHivesView;
        }
    }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/hives.scss';
</style>

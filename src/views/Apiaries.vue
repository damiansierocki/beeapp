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
            ></ApiaryView>
        </transition>

        <div class="content">
            <ul class="content__list">
                <li
                    class="content__item content__item--add"
                    @click="toggleAddApiary()"
                >
                    Kliknij aby dodać pasiekę
                    <span class="content__plus-icon"
                        ><i class="fas fa-plus-square"></i
                    ></span>
                </li>

                <li class="content__item" @click="toggleApiaryView()">
                    <p class="content__apiary-name">
                        Bobrowniki
                    </p>
                    <p class="content__apiary-hives">Ilość uli: 0</p>
                </li>

                <li class="content__item">
                    <p class="content__apiary-name">Nowa Dąbrowa</p>
                    <p class="content__apiary-hives">Ilość uli: 0</p>
                </li>

                <li class="content__item">
                    <p class="content__apiary-name">Krzywnica</p>
                    <p class="content__apiary-hives">Ilość uli: 0</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import AddApiary from '@/components/AddApiary';
import ApiaryView from '@/components/ApiaryView';
import Nav from '@/components/Nav';
import { mapState } from 'vuex';

export default {
    data() {
        return {
            showAddApiary: false,
            showApiaryView: false
        };
    },

    components: {
        Nav,
        AddApiary,
        ApiaryView
    },

    computed: {
        ...mapState(['userProfile']),

        showIfUserLogged() {
            return Object.keys(this.userProfile).length > 1;
        }
    },

    methods: {
        toggleAddApiary() {
            this.showAddApiary = !this.showAddApiary;
        },

        toggleApiaryView() {
            this.showApiaryView = !this.showApiaryView;
        }
    }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/apiaries.scss';
</style>

<template>
    <div class="nav">
        <transition
            enter-active-class="animate__animated animate__backInDown animate__faster"
            leave-active-class="animate__animated animate__backOutUp animate__faster"
            mode="out-in"
            appear
        >
            <About v-if="showAbout" @close="toggleAbout"></About>
        </transition>

        <div class="nav-left">
            <span class="nav-left__icon" @click="toggleLeftMenu">
                <i class="fas fa-bars"></i>
            </span>

            <div class="nav-left__menu" v-if="showLeftMenu">
                <span class="nav-left__close" @click="toggleLeftMenu">
                    <i class="fas fa-times"></i>
                </span>
                <router-link class="nav-left__link" to="/"
                    >Strona główna</router-link
                >
                <router-link class="nav-left__link" to="/apiaries"
                    >Pasieki</router-link
                >
                <router-link class="nav-left__link" to="/hives"
                    >Ule</router-link
                >
            </div>
        </div>

        <div class="nav-center">
            <slot class="nav-center__slot" name="nav-center__slot"></slot>
        </div>

        <div class="nav-right">
            <span class="nav-right__icon" @click="toggleRightMenu">
                <i class="fas fa-caret-down"> </i>
            </span>

            <div class="nav-right__menu" v-if="showRightMenu">
                <h2 class="nav-right__menu-username">
                    {{ userProfile.username }}
                </h2>
                <router-link class="nav-right__link" to="/myaccount"
                    ><i class="fas fa-user-circle right-icon"></i>Moje
                    konto</router-link
                >
                <a class="nav-right__link" @click="toggleAbout"
                    ><i class="fas fa-info-circle right-icon"></i>O aplikacji</a
                >
                <a class="nav-right__link" @click="logout()"
                    ><i class="fas fa-sign-out-alt right-icon"></i>Wyloguj
                    się</a
                >
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import About from '@/components/About';

export default {
    components: {
        About
    },
    data() {
        return {
            showAbout: false,
            showLeftMenu: false,
            showRightMenu: false
        };
    },

    computed: {
        ...mapState(['userProfile'])
    },

    methods: {
        toggleLeftMenu() {
            this.showLeftMenu = !this.showLeftMenu;
        },

        toggleRightMenu() {
            this.showRightMenu = !this.showRightMenu;

            const navLeft = document.querySelector('.nav-left');
            const icon = document.querySelector('.fa-caret-down');

            if (this.showRightMenu) {
                icon.style.transform = 'rotate(180deg)';
                navLeft.classList.add('disabled');
            } else {
                icon.style.transform = 'rotate(0deg)';
                navLeft.classList.remove('disabled');
            }
        },

        toggleAbout() {
            this.showAbout = !this.showAbout;

            const navLeft = document.querySelector('.nav-left');
            const navRight = document.querySelector('.nav-right');
            const icon = document.querySelector('.fa-caret-down');

            if (this.showRightMenu) {
                this.showRightMenu = !this.showRightMenu;
                icon.style.transform = 'rotate(0deg)';
            }

            if (this.showAbout) {
                navLeft.classList.add('disabled');
                navRight.classList.add('disabled');
            } else {
                navLeft.classList.remove('disabled');
                navRight.classList.remove('disabled');
            }
        },

        logout() {
            this.$store.dispatch('logout');
        }
    }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/nav.scss';
</style>

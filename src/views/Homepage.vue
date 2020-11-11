<template>
    <div class="homepage">
        <Nav v-if="showIfUserLogged">
            <template v-slot:nav-center__slot>
                <h1 class="nav-center__slot">Strona główna</h1>
            </template>
        </Nav>

        <div class="content">
            <div class="content__header">
                <h1 class="content__welcome">
                    Witaj użytkowniku !
                </h1>
                <p class="content__paragraph">
                    {{ userProfile.username }}
                </p>
            </div>

            <div class="content__inside">
                <div class="content__item">
                    <p class="content__icon">
                        Pasieki
                        <i class="fas fa-home"></i>
                    </p>
                    <p class="content__paragraph">
                        0
                    </p>
                </div>
                <div class="content__item">
                    <p class="content__icon">
                        Ule
                        <i class="fas fa-archive"></i>
                    </p>
                    <p class="content__paragraph">
                        0
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Nav from "@/components/Nav";
import { mapState } from "vuex";

export default {
    components: {
        Nav
    },
    computed: {
        ...mapState(["userProfile"]),

        showIfUserLogged() {
            return Object.keys(this.userProfile).length > 1;
        }
    }
};
</script>

<style lang="scss" scoped>
.content {
    width: 100vw;
    height: calc(100vh - 51.6px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 10px;

    &__header {
        margin-top: 20px;
    }

    &__welcome {
        font-size: 26px;
        text-align: center;
        margin-bottom: 10px;
    }

    &__paragraph {
        font-size: 20px;
        text-align: center;
    }

    &__inside {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        width: 100vw;
        height: 25vh;
        margin-bottom: 35vh;
    }

    &__item {
        width: 150px;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        border: 1px dashed black;
    }

    &__icon {
        position: absolute;
        top: -30px;
        font-size: 25px;

        .fa-home {
            color: green;
        }

        .fa-archive {
            color: orange;
        }
    }
}

@media (min-width: 768px) {
    .content {
        height: calc(100vh - 62.4px);
    }
}
</style>

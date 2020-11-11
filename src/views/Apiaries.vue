<template>
    <div class="apiaries">
        <Nav v-if="showIfUserLogged">
            <template v-slot:nav-center__slot>
                <h1 class="nav-center__slot">Pasieki</h1>
            </template>
        </Nav>
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

<style lang="scss" scoped></style>

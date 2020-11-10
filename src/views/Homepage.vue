<template>
    <div class="homepage">
        <Nav v-if="showIfUserLogged">
            <template v-slot:active-fields>
                <h1 class="activefield">Strona główna</h1>
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

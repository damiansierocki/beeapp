<template>
    <div class="homepage">
        <Nav v-if="showNav">
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

        showNav() {
            return Object.keys(this.userProfile).length > 1;
        }
    }
};
</script>

<style></style>

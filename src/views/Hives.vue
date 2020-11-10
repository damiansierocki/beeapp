<template>
    <div class="hives">
        <Nav v-if="showIfUserLogged">
            <template v-slot:active-fields>
                <h1 class="activefield">Ule</h1>
            </template>
        </Nav>
        <SideBar v-if="showIfUserLogged"></SideBar>
    </div>
</template>

<script>
import Nav from "@/components/Nav";
import SideBar from "@/components/SideBar";
import { mapState } from "vuex";

export default {
    components: {
        Nav,
        SideBar
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

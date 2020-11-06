<template>
    <div id="app">
        <Nav v-if="showNav"></Nav>
        <router-view />
    </div>
</template>

<script>
import Nav from "@/components/Nav";
import { mapState } from "vuex";
import "animate.css";

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

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

*,
*::before,
*::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Roboto", sans-serif;
}

.login,
.register {
    background-image: url("./assets/background.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}
</style>

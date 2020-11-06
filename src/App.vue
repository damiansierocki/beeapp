<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
import "animate.css";

export default {};
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
    background-size: auto;
}
</style>

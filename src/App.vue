<template>
    <div id="app">
        <transition
            name="custom-classes-transition"
            enter-active-class="animate__animated animate__tada"
            leave-active-class="animate__animated animate__bounceOutRight"
        >
            <router-view />
        </transition>
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
</style>

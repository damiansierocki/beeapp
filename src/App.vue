<template>
    <div id="app">
        <transition
            enter-active-class="animate__animated animate__lightSpeedInLeft animate__faster"
            leave-active-class="animate__animated animate__lightSpeedOutRight animate__faster"
            mode="out-in"
            appear
        >
            <router-view />
        </transition>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

html {
    font-size: 14px;
}

*,
*::before,
*::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Roboto", sans-serif;
}
</style>

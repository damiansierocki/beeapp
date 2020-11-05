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

<style lang="scss"></style>

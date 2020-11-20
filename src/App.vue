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

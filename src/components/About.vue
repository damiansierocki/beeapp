<template>
  <div class="about">
    <div class="content">
      <div class="content__header">
        <h2 class="content__title">
          O aplikacji 🐝
        </h2>
        <span class="content__close" @click="$emit('close')">
          <i class="fas fa-times"></i>
        </span>
      </div>
      <div class="content__inside">
        <p class="content__description">
          Aplikacja internetowa stworzona na potrzeby pracy inżynierskiej pod
          nadzorem
          <span class="promotor">dr inż. Luizy Fabisiak</span>.
        </p>
        <p class="content__description">
          W razie problemów proszę pisać na
          <a class="email" href="mailto:amiansierocki@outlook.com"
            >damiansierocki@outlook.com</a
          >
        </p>
        <p class="content__footer">
          © 2020 beeapp, version 0.1.0 by Damian Sierocki
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import '../assets/scss/about.scss';
</style>

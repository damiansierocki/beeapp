<template>
  <div class="apiaryview">
    <div class="content">
      <div class="content__header">
        <h2 class="content__title">
          Opis pasieki 🐝
        </h2>
        <span class="content__close" @click="$emit('close')">
          <i class="fas fa-times"></i>
        </span>
      </div>

      <div class="info">
        <div class="info__header">
          <h2 class="info__title">Informacje o pasiece</h2>
        </div>
        <div class="info__center">
          <div class="info__name">
            <p class="info__p info__p--title">Nazwa</p>
            <p class="info__p info__p--description">
              {{ this.name }}
            </p>
          </div>

          <div class="info__hives">
            <p class="info__p info__p--title">Ilość uli</p>
            <p class="info__p info__p--description">6</p>
          </div>

          <div class="info__type">
            <p class="info__p info__p--title">Typ</p>
            <p class="info__p info__p--description">
              {{ this.type }}
            </p>
          </div>

          <div class="info__description">
            <p class="info__p info__p--title">Opis</p>
            <p class="info__p info__p--description">
              {{ this.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id', 'name', 'type', 'description'],
  data() {
    return {};
  },

  methods: {
    viewApiary() {
      const id = this.id;
      const name = this.name;
      const type = this.type;
      const description = this.description;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/apiaryview.scss';
</style>

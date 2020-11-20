<template>
  <div class="register">
    <div class="content">
      <form class="form" @submit.prevent>
        <h2 class="form__header">Rejestracja 🐝</h2>
        <label class="form__label" for="username">Nazwa użytkownika</label>
        <input
          class="form__input"
          type="text"
          placeholder="janek123"
          id="username"
          v-model.trim="username"
        />
        <label class="form__label" for="email">Email</label>
        <input
          class="form__input"
          type="text"
          placeholder="jan@kowalski.pl"
          id="email"
          v-model.trim="email"
        />
        <label class="form__label" for="password">Hasło</label>
        <input
          class="form__input"
          type="password"
          id="password"
          placeholder="******"
          v-model.trim="password"
        />
        <div class="form__extras">
          <ul class="form__list">
            <li class="form__item">
              <router-link class="form__link" to="/login"
                >Cofnij do logowania</router-link
              >
            </li>
          </ul>
        </div>
        <button class="btn" @click="signup()">
          Zarejestruj się
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: ''
    };
  },
  methods: {
    signup() {
      this.$store.dispatch('signup', {
        username: this.username,
        email: this.email,
        password: this.password
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/register.scss';
</style>

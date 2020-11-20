<template>
  <div class="myaccount">
    <Nav v-if="showIfUserLogged">
      <template v-slot:nav-center__slot>
        <h1 class="nav-center__slot">Moje konto</h1>
      </template>
    </Nav>

    <div class="content">
      <h1 class="content__title">Edytuj profil 🐝</h1>

      <form class="content__form" @submit.prevent>
        <label for="username" class="content__label">Nazwa użytkownika</label>
        <input
          class="content__input"
          type="text"
          v-model.trim="user.username"
          id="username"
          :placeholder="userProfile.username"
        />

        <label for="email" class="content__label">Email</label>
        <input
          class="content__input"
          type="text"
          v-model.trim="user.email"
          id="email"
          :placeholder="userProfile.email"
        />

        <label for="password" class="content__label">Hasło</label>
        <input
          class="content__input"
          type="text"
          v-model.trim="user.password"
          id="password"
          :placeholder="userProfile.password"
        />

        <div class="content__buttons">
          <button
            class="content__button content__button--cancel"
            @click="cancel()"
          >
            Wyczyść
            <i class="fas fa-window-close"></i>
          </button>
          <button
            class="content__button content__button--save"
            @click="updateProfile()"
          >
            Zapisz
            <i class="fas fa-save"></i>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      user: {
        username: '',
        email: '',
        password: ''
      }
    };
  },

  components: {
    Nav
  },

  computed: {
    ...mapState(['userProfile']),

    showIfUserLogged() {
      return Object.keys(this.userProfile).length > 1;
    }
  },

  methods: {
    cancel() {
      this.user.username = '';
      this.user.email = '';
      this.user.password = '';
    },

    updateProfile() {
      this.$store.dispatch('updateProfile', {
        username:
          this.user.username !== ''
            ? this.user.username
            : this.userProfile.username,
        email:
          this.user.email !== '' ? this.user.email : this.userProfile.email,
        password:
          this.user.password !== ''
            ? this.user.password
            : this.userProfile.password
      });

      this.user.username = '';
      this.user.email = '';
      this.user.password = '';
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/myaccount.scss';
</style>

<template>
    <div id="login">
        <PasswordReset v-if="showPasswordReset" @close="togglePasswordReset()"></PasswordReset>
        <section>
            <div class="content">
                <h1>beeapp 🐝</h1>
                <form @submit.prevent>
                    <h2>Logowanie</h2>
                    <div class="row">
                        <label for="email">Email 📧</label>
                        <input
                            type="text"
                            placeholder="jan@kowalski.pl"
                            id="email"
                            v-model.trim="email"
                        />
                    </div>
                    <div class="row">
                        <label for="password">Hasło 🔑</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="******"
                            v-model.trim="password"
                        />
                    </div>
                    <button class="button" @click="login()">Login</button>
                    <div class="extras">
                        <a @click="togglePasswordReset()">Zapomnniałeś hasła? 😰</a>
                        <router-link class="link" to="/register">Stwórz konto 🦸</router-link>
                    </div>
                </form>
            </div>
        </section>
    </div>
</template>

<script>
import PasswordReset from "@/components/PasswordReset";

export default {
    components: {
        PasswordReset
    },
    data() {
        return {
            email: "",
            password: "",
            showPasswordReset: false
        };
    },
    methods: {
        login() {
            this.$store.dispatch("login", {
                email: this.email,
                password: this.password
            });
        },

        togglePasswordReset() {
            this.showPasswordReset = !this.showPasswordReset;
        }
    }
};
</script>

<style lang="scss" scoped>
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
        "Open Sans", "Helvetica Neue", sans-serif;
}

#login {
    padding-top: 50px;
    background: #f9faff;
    color: #3a3c47;
    line-height: 1.6;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 100vh;
}

.content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
        color: rgb(255, 198, 9);
    }
}

form {
    background: #fff;
    max-width: 360px;
    width: 100%;
    padding: 58px 45px;
    border: 1px solid "##e1e2f0;";
    border-radius: 4px;
    box-shadow: 0 0 5px 0 rgba(42, 45, 48, 0.12);
    transition: all 0.3s ease;

    h2 {
        margin-bottom: 10px;
    }
}

.row {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;

    input {
        flex: 1;
        padding: 13px;
        border: 1px solid #d6d8e6;
        border-radius: 4px;
        font-size: 16px;
        transition: all 0.2s ease-out;

        &:focus {
            outline: none;
            box-shadow: inset 2px 2px 5px 0 rgba(42, 45, 48, 0.12);
        }

        &::placeholder {
            color: #c8cddf;
        }
    }
}

button {
    width: 100%;
    padding: 12px;
    font-size: 18px;
    background: #2b5af5;
    color: #fff;
    border: none;
    border-radius: 100px;
    cursor: pointer;
    transition: background 0.2s ease-out;

    &:hover {
        background: #6fa1ff;
    }
}

.extras {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    cursor: pointer;

    a {
        opacity: 0.5;
        transition: opacity 0.5s ease;

        &:hover {
            opacity: 1;
        }
    }

    .link {
        text-decoration: none;
        color: black;
    }
}

// media queries
@media (max-width: 458px) {
    #form {
        margin: 0;
    }

    form {
        background: #f9faff;
        border: none;
        box-shadow: none;
        padding: 20px 15px;
    }
}
</style>

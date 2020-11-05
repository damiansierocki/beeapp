<template>
    <div class="modal">
        <div class="modal-content">
            <div @click="$emit('close')" class="close">zamknij</div>
            <div v-if="!showSuccess" class="modal-content-inside">
                <h3>Reset Password 🔄</h3>
                <p>Wpisz swój email aby zresetować hasło</p>
                <form @submit.prevent>
                    <input type="email" placeholder="jan@kowalski.pl" v-model.trim="email" />
                </form>
                <p v-if="errorMsg !== ''" class="error">{{ errorMsg }}</p>
                <button @click="resetPassword()" class="button">Reset</button>
            </div>
            <div v-else class="extras">
                <p>Sukces <span>✔</span></p>
                <p>
                    Sprawdź email w celu odnalezienia linka do resetowania hasła
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { auth } from "@/firebase";

export default {
    data() {
        return {
            email: "",
            showSuccess: false,
            errorMsg: ""
        };
    },
    methods: {
        async resetPassword() {
            this.errorMsg = "";

            try {
                await auth.sendPasswordResetEmail(this.email);
                this.showSuccess = true;
            } catch (err) {
                this.errorMsg = err.message;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
        "Open Sans", "Helvetica Neue", sans-serif;
}

.modal {
    display: flex;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(#333, 0.5);

    .modal-content {
        position: relative;
        margin: auto;
        width: 100%;
        max-width: 400px;
        background: #fff;
        padding: 40px;
        border-radius: 5px;
        box-shadow: 0 0 5px 0 rgba(#333, 0.5);
        z-index: 999;

        .close {
            position: absolute;
            top: 10px;
            right: 10px;
            padding: 5px;
            cursor: pointer;
            transition: 0.15s;

            &:hover {
                color: #000;
            }
        }

        h3 {
            margin: 0;
        }

        p {
            margin: 15px 0;
        }

        .error {
            color: tomato;
            font-size: 12px;
        }

        input {
            width: 100%;
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

        button {
            margin-top: 20px;
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
            p:first-child {
                font-weight: bold;
                font-size: 30px;
            }
            span {
                color: green;
                font-size: 30px;
            }
        }
    }
}
</style>

<template>
    <div class="modal">
        <div class="modal-content">
            <div class="close" @click="$emit('close')">zamknij</div>
            <div v-if="!showSuccess" class="modal-content-inside">
                <h3>Reset Password 🔄</h3>
                <p>Wpisz swój email aby zresetować hasło</p>
                <form @submit.prevent>
                    <input
                        type="email"
                        placeholder="jan@kowalski.pl"
                        v-model.trim="email"
                    />
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
        width: 90%;
        max-width: 400px;
        background: #fff;
        padding: 30px;
        border-radius: 5px;
        box-shadow: 0 0 5px 0 rgba(#333, 0.5);
        z-index: 999;

        .close {
            position: absolute;
            top: 10px;
            right: 10px;
            padding: 5px;
            cursor: pointer;

            &:hover {
                color: #000;
                font-weight: bold;
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
            padding: 15px;
            border-radius: 50px;
            border: 0.5px solid black;
            font-size: 0.9rem;
            width: 100%;

            &:focus {
                outline: none;
                box-shadow: inset 2px 2px 5px 0 rgba(42, 45, 48, 0.12);
            }

            &::placeholder {
                color: #c8cddf;
            }
        }

        button {
            margin: 0 auto;
            margin-top: 12px;
            width: 50%;
            box-shadow: 0px 1px 0px 0px #fff6af;
            background: linear-gradient(to bottom, #ffec64 5%, #ff9d00 100%);
            background-color: #ffec64;
            border-radius: 6px;
            border: 1px solid #ffaa22;
            display: block;
            cursor: pointer;
            color: #333333;
            font-size: 15px;
            font-weight: bold;
            padding: 6px 24px;
            text-shadow: 0px 1px 0px #ffee66;

            &:hover {
                background: linear-gradient(
                    to bottom,
                    #ff9d00 5%,
                    #ffec64 100%
                );
                background-color: #ff9d00;
            }

            &:active {
                position: relative;
                top: 1px;
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

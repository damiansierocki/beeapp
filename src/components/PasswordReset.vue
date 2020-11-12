<template>
    <div class="passwordreset">
        <div class="content">
            <div class="content__close" @click="$emit('close')">
                <span>
                    <i class="fas fa-times"></i>
                </span>
            </div>

            <div v-if="!showSuccess" class="content__inside">
                <h3 class="content__h3">
                    Zresetuj hasło 🐝
                </h3>
                <p class="content__p">
                    Wpisz swój email aby zresetować hasło
                </p>
                <form class="content__form" @submit.prevent>
                    <input
                        class="content__input"
                        type="email"
                        placeholder="jan@kowalski.pl"
                        v-model.trim="email"
                    />
                </form>
                <p v-if="errorMsg !== ''" class="content__p content__p--error">
                    {{ errorMsg }}
                </p>
                <button @click="resetPassword()" class="btn">
                    Zresetuj
                </button>
            </div>

            <div v-else class="content__extras">
                <p class="content__p--success">Sukces 👍</p>
                <p class="content__p">
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
.passwordreset {
    display: flex;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(#333, 0.5);

    .content {
        position: relative;
        margin: auto;
        width: 90%;
        max-width: 400px;
        background: #fff;
        padding: 30px;
        border-radius: 5px;
        box-shadow: 0 0 5px 0 rgba(#333, 0.5);
        z-index: 999;

        &__close {
            position: absolute;
            top: 10px;
            right: 10px;
            padding: 5px;
        }

        &__h3 {
            font-size: 20px;
        }

        &__p {
            margin: 15px 0;
        }

        &__input {
            padding: 15px;
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

        &__p--error {
            color: tomato;
            font-size: 12px;
        }

        .btn {
            margin: 0 auto;
            margin-top: 12px;
            width: 50%;
            box-shadow: 0px 1px 0px 0px #fff6af;
            background: linear-gradient(to bottom, #ffec64 5%, #ff9d00 100%);
            background-color: #ffec64;
            border-radius: 6px;
            border: 1px solid #ffaa22;
            display: block;
            color: #333333;
            font-size: 15px;
            font-weight: bold;
            padding: 6px 24px;
            text-shadow: 0px 1px 0px #ffee66;

            &:active {
                position: relative;
                top: 1px;
            }
        }

        &__p--success {
            font-weight: bold;
            font-size: 30px;
            color: green;
        }
    }
}

@media (min-width: 768px) {
    .passwordreset {
        .content {
            width: 90%;
            max-width: 480px;
            padding: 36px;
            z-index: 1;

            &__close {
                top: 12px;
                right: 12px;
                padding: 6px;
                cursor: pointer;

                &:hover {
                    color: #000;
                    font-weight: bold;
                }
            }

            &__h3 {
                font-size: 24px;
            }

            &__p {
                margin: 18px 0;
            }

            &__input {
                padding: 18px;
                font-size: 1.08rem;

                &:focus {
                    outline: none;
                    box-shadow: inset 2px 2px 5px 0 rgba(42, 45, 48, 0.12);
                }

                &::placeholder {
                    color: #c8cddf;
                }
            }

            &__p--error {
                font-size: 12px;
            }

            .btn {
                margin-top: 14.4px;
                width: 60%;
                cursor: pointer;
                font-size: 18px;
                padding: 7.2px 28.8px;

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
                    top: 1.2px;
                }
            }

            &__p--success {
                font-size: 36px;
            }
        }
    }
}
</style>

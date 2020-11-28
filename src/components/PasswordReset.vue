<template>
    <div class="passwordreset">
        <div class="content">
            <div class="content__close" @click="$emit('close')">
                <span>
                    <i class="fas fa-times"></i>
                </span>
            </div>

            <div class="content__inside" v-if="!showSuccess">
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
                <transition
                    enter-active-class="animate__animated animate__shakeX animate__faster"
                    mode="out-in"
                    appear
                >
                    <p
                        v-if="errorMsg !== ''"
                        class="content__p content__p--error"
                    >
                        {{ errorMsg }}
                    </p></transition
                >
                <button @click="resetPassword()" class="btn">
                    Zresetuj
                </button>
            </div>

            <transition
                v-if="showSuccess"
                enter-active-class="animate__animated animate__bounceIn animate__fast"
                mode="out-in"
                appear
            >
                <div class="content__extras">
                    <p class="content__p content__p--success">Sukces 👍</p>
                    <p class="content__p">
                        Sprawdź email w celu odnalezienia linka do resetowania
                        hasła
                    </p>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import { auth } from '@/firebase';

export default {
    data() {
        return {
            email: '',
            showSuccess: false,
            errorMsg: '',
        };
    },
    methods: {
        async resetPassword() {
            this.errorMsg = '';

            try {
                await auth.sendPasswordResetEmail(this.email);
                this.showSuccess = true;

                setTimeout(() => {
                    this.showSuccess = false;
                }, 5000);

                this.email = '';
            } catch (err) {
                this.errorMsg = err.message;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/colors';

.passwordreset {
    display: flex;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba($greyer, 0.5);

    .content {
        position: relative;
        margin: auto;
        width: 100%;
        max-width: 400px;
        background: #fff;
        padding: 2rem;
        border-radius: 5px;
        box-shadow: 0 0 5px 0 rgba($greyer, 0.5);
        z-index: 1;

        &__close {
            position: absolute;
            top: 0.7rem;
            right: 0.7rem;
            padding: 0.5rem;
            font-size: 1.5rem;
        }

        &__h3 {
            font-size: 1.4rem;
        }

        &__p {
            margin: 1rem 0;
            font-size: 0.9rem;
            line-height: 1.6rem;

            &--error {
                color: $error;
                font-size: 0.7rem;
            }

            &--success {
                color: $green;
                font-weight: bold;
                font-size: 2rem;
            }
        }

        &__input {
            padding: 0.7rem;
            border: 0.5px solid $black;
            font-size: 1rem;
            width: 90%;

            &:focus {
                outline: 0;
                -webkit-box-shadow: 0px 10px 13px -7px #000000,
                    5px 5px 15px 5px rgba(0, 0, 0, 0);
                box-shadow: 0px 10px 13px -7px #000000,
                    5px 5px 15px 5px rgba(0, 0, 0, 0);
            }

            &::placeholder {
                color: $base-placeholder;
            }
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
            font-size: 1rem;
            padding: 6px 24px;
            text-shadow: 0px 1px 0px #ffee66;

            &:active {
                position: relative;
                top: 1px;
            }
        }
    }
}

@media (max-width: 319px) {
    .passwordreset {
        .content {
            &__p {
                font-size: 0.8rem;

                &--error {
                    font-size: 0.7rem;
                }

                &--success {
                    font-size: 1.3rem;
                }
            }
        }
    }
}

@media (min-width: 320px) {
    .passwordreset {
        .content {
            width: 95vw;

            &__p {
                font-size: 0.8rem;

                &--error {
                    font-size: 0.8rem;
                }

                &--success {
                    font-size: 1.5rem;
                }
            }
        }
    }
}

@media (min-width: 360px) {
    .passwordreset {
        .content {
            width: 85vw;
        }
    }
}

@media (min-width: 414px) {
    .passwordreset {
        .content {
            width: 75vw;
        }
    }
}

@media (min-width: 540px) {
    .passwordreset {
        .content {
            width: 60vw;

            &__h3 {
                font-size: 1.6rem;
            }

            &__p {
                font-size: 1rem;

                &--error {
                    font-size: 0.85rem;
                }
            }

            &__input {
                padding: 1rem;
            }

            .btn {
                font-size: 1.1rem;
            }
        }
    }
}

@media (min-width: 768px) {
    .passwordreset {
        .content {
            width: 50vw;

            &__close {
                cursor: pointer;
                transition: 0.2s;

                &:hover {
                    transform: scale(1.3);
                    font-weight: bold;
                }
            }

            .btn {
                cursor: pointer;
                transition: 0.2s;
                font-size: 1.2rem;

                &:hover {
                    transform: scale(1.1);
                    font-weight: bold;
                }
            }
        }
    }
}

@media (min-width: 1024px) {
    .passwordreset {
        .content {
            width: 45vw;

            .btn {
                cursor: pointer;
                transition: 0.2s;
                font-size: 1.2rem;

                &:hover {
                    transform: scale(1.1);
                    font-weight: bold;
                }
            }
        }
    }
}

@media (min-width: 1280px) {
    .passwordreset {
        .content {
            width: 30vw;
        }
    }
}

@media (min-width: 1440px) {
    .passwordreset {
        .content {
            width: 25vw;
        }
    }
}
</style>

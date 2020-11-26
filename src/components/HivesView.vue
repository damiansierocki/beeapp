<template>
    <div class="hivesview">
        <div class="content">
            <div class="content__header">
                <h2 class="content__title">
                    Opis ula 🐝
                </h2>
                <span class="content__close" @click="$emit('close')">
                    <i class="fas fa-times"></i>
                </span>
            </div>

            <div class="info">
                <div class="info__header">
                    <h2 class="info__title">Informacje o ulu</h2>
                </div>
                <div class="info__center">
                    <div class="info__status">
                        <p class="info__p info__p--title">Stan ula</p>
                        <p class="info__p info__p--description">
                            {{ this.status }}
                        </p>
                    </div>

                    <div class="info__hive-id">
                        <p class="info__p info__p--title">Numer Ula</p>
                        <p class="info__p info__p--description">
                            {{ this.hiveId }}
                        </p>
                    </div>

                    <div class="info__apiary">
                        <p class="info__p info__p--title">Pasieka</p>
                        <p class="info__p info__p--description">
                            {{ this.apiary }}
                        </p>
                    </div>

                    <div class="info__queen">
                        <p class="info__p info__p--title">Matka</p>
                        <p class="info__p info__p--description">
                            {{ this.queen }}
                        </p>
                    </div>

                    <div class="info__queen">
                        <p class="info__p info__p--title">Ramki</p>
                        <p class="info__p info__p--description">
                            {{ this.frames }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["id", "status", "hiveId", "apiary", "queen", "frames"]
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/colors";

.hivesview {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 999;
    display: flex;

    .content {
        width: 100%;
        background: $white;

        &__header {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-items: center;
            margin-top: 3rem;
        }

        &__title {
            font-size: 2rem;
        }

        &__close {
            position: absolute;
            top: 1%;
            right: 5%;
            padding: 0.5rem;
            font-size: 1.2rem;
        }

        .info {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-items: center;
            margin-top: 3rem;
            background: $base-white;

            &__center {
                display: flex;
                flex-direction: column;
                margin-top: 2rem;
                justify-content: center;
                align-items: center;
            }

            &__status {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            &__hive-id {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            &__apiary {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            &__queen {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            &__queen-color {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            &__p {
                margin-top: 0.4rem;

                &--title {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: $orange;
                    padding: 0.7rem;
                }

                &--description {
                    font-size: 1rem;
                }
            }
        }
    }
}
</style>

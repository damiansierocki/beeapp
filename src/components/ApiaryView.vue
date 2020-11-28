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
                <div class="info__general">
                    <h3 class="info__title-h3">Informacje generalne</h3>

                    <p class="info__p info__p--title">Nazwa</p>
                    <p class="info__p info__p--description">
                        {{ name }}
                    </p>

                    <p class="info__p info__p--title">Typ pożywienia</p>
                    <p class="info__p info__p--description">
                        {{ forages.join(', ') }}
                    </p>

                    <p class="info__p info__p--title">Typ pasieki</p>
                    <p class="info__p info__p--description">
                        {{ type }}
                    </p>

                    <p class="info__p info__p--title">Opis</p>
                    <p class="info__p info__p--description">
                        {{ description }}
                    </p>
                </div>

                <div class="info__address">
                    <h3 class="info__title-h3">Informacje o adresie</h3>

                    <p class="info__p info__p--title">Adres</p>
                    <p class="info__p info__p--description">
                        {{ address }}
                    </p>

                    <p class="info__p info__p--title">Miejscowość</p>
                    <p class="info__p info__p--description">
                        {{ city }}
                    </p>

                    <p class="info__p info__p--title">Zip</p>
                    <p class="info__p info__p--description">
                        {{ zip }}
                    </p>

                    <p class="info__p info__p--title">Województwo</p>
                    <p class="info__p info__p--description">
                        {{ province }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'id',
        'name',
        'type',
        'forages',
        'description',
        'address',
        'city',
        'zip',
        'province',
    ],
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/colors';

.apiaryview {
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

            &__general {
                display: flex;
                flex-direction: column;
                width: 100%;
                justify-content: center;
                align-items: center;
                border: 2px solid $black;
                padding: 1rem;
            }

            &__address {
                display: flex;
                flex-direction: column;
                width: 100%;
                justify-content: center;
                align-items: center;
                border: 2px solid $black;
                padding: 1rem;
            }

            &__title-h3 {
                font-size: 1.8rem;
                font-weight: bold;
                border-bottom: 5px solid $black;
            }

            &__name {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            &__hives {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            &__type {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            &__description {
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

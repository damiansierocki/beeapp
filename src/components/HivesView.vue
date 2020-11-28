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
                <div class="info__general">
                    <h3 class="info__title-h3">Informacje generalne</h3>

                    <p class="info__p info__p--title">Numer Ula</p>
                    <p class="info__p info__p--description">
                        {{ number }}
                    </p>

                    <p class="info__p info__p--title">Pasieka</p>
                    <p class="info__p info__p--description">
                        {{ apiary }}
                    </p>

                    <p class="info__p info__p--title">Stan ula</p>
                    <p class="info__p info__p--description">
                        {{ status }}
                    </p>

                    <p class="info__p info__p--title">Przeznaczenie</p>
                    <p class="info__p info__p--description">
                        {{ purpose }}
                    </p>

                    <p class="info__p info__p--title">
                        Data dodania ula do pasieki
                    </p>
                    <p class="info__p info__p--description">
                        {{ created }}
                    </p>

                    <p class="info__p info__p--title">Notatka odnośnie ula</p>
                    <p class="info__p info__p--description">
                        {{ generalNote }}
                    </p>
                </div>

                <div class="info__bees">
                    <h3 class="info__title-h3">Pszczoły</h3>

                    <p class="info__p info__p--title">Siła pszczół</p>
                    <p class="info__p info__p--description">
                        {{ strength }}
                    </p>

                    <p class="info__p info__p--title">Temperament</p>
                    <p class="info__p info__p--description">
                        {{ temperament }}
                    </p>

                    <p class="info__p info__p--title">Ilość ramek w ulu</p>
                    <p class="info__p info__p--description">
                        {{ frames }}
                    </p>
                </div>

                <div class="info__queen">
                    <h3 class="info__title-h3">Królowa</h3>

                    <p class="info__p info__p--title">Królowa</p>
                    <p class="info__p info__p--description">
                        {{ isQueen }}
                    </p>

                    <p class="info__p info__p--title" v-if="isQueen === 'Tak'">
                        Wiek Królowej (w latach)
                    </p>
                    <p
                        class="info__p info__p--description"
                        v-if="isQueen === 'Tak'"
                    >
                        {{ age }}
                    </p>

                    <p class="info__p info__p--title" v-if="isQueen === 'Tak'">
                        Kiedy królowa została wrzucona do ula
                    </p>
                    <p
                        class="info__p info__p--description"
                        v-if="isQueen === 'Tak'"
                    >
                        {{ installed }}
                    </p>

                    <p class="info__p info__p--title" v-if="isQueen === 'Tak'">
                        Rasa królowej
                    </p>
                    <p
                        class="info__p info__p--description"
                        v-if="isQueen === 'Tak'"
                    >
                        {{ race }}
                    </p>

                    <p class="info__p info__p--title" v-if="isQueen === 'Tak'">
                        Kolor królowej
                    </p>
                    <p
                        class="info__p info__p--description"
                        v-if="isQueen === 'Tak'"
                    >
                        {{ queenColor }}
                    </p>

                    <p class="info__p info__p--title" v-if="isQueen === 'Tak'">
                        Notatka dotycząca królowej
                    </p>
                    <p
                        class="info__p info__p--description"
                        v-if="isQueen === 'Tak'"
                    >
                        {{ queenNote }}
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
        'number',
        'apiary',
        'status',
        'purpose',
        'created',
        'generalNote',
        'strength',
        'temperament',
        'frames',
        'isQueen',
        'age',
        'installed',
        'race',
        'queenColor',
        'queenNote',
    ],
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/colors';

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

            &__general {
                display: flex;
                flex-direction: column;
                width: 100%;
                justify-content: center;
                align-items: center;
                border: 2px solid $black;
                padding: 1rem;
            }

            &__bees {
                display: flex;
                flex-direction: column;
                width: 100%;
                justify-content: center;
                align-items: center;
                border: 2px solid $black;
                padding: 1rem;
            }

            &__queen {
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

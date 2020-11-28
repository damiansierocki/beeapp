<template>
    <div class="inspectionsview">
        <div class="content">
            <div class="content__header">
                <h2 class="content__title">
                    Opis inspekcji 🐝
                </h2>
                <span class="content__close" @click="$emit('close')">
                    <i class="fas fa-times"></i>
                </span>
            </div>

            <div class="info">
                <div class="info__general">
                    <h3 class="info__title-h3">Inspekcja</h3>

                    <p class="info__p info__p--title">Cel inspekcji</p>
                    <p class="info__p info__p--description">
                        {{ purpose }}
                    </p>

                    <p class="info__p info__p--title">Pasieka</p>
                    <p class="info__p info__p--description">
                        {{ apiary }}
                    </p>

                    <p class="info__p info__p--title">Ul</p>
                    <p class="info__p info__p--description">
                        {{ hive }}
                    </p>

                    <p class="info__p info__p--title">Data</p>
                    <p class="info__p info__p--description">
                        {{ date }}
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
                        Wiek królowej (w latach)
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

                <div class="info__frames-with">
                    <h3 class="info__title-h3">Ramki</h3>

                    <p class="info__p info__p--title">Z pszczołami</p>
                    <p class="info__p info__p--description">
                        {{ framesWithBees }}
                    </p>

                    <p class="info__p info__p--title">Z czerwiem</p>
                    <p class="info__p info__p--description">
                        {{ framesWithBrood }}
                    </p>

                    <p class="info__p info__p--title">Z miodem</p>
                    <p class="info__p info__p--description">
                        {{ framesWithHoney }}
                    </p>

                    <p class="info__p info__p--title">Z pyłkiem</p>
                    <p class="info__p info__p--description">
                        {{ framesWithPollen }}
                    </p>
                </div>

                <div class="info__spotted-problems">
                    <h3 class="info__title-h3">
                        Problemy & Notatki
                    </h3>

                    <p class="info__p info__p--title">Napotkane problemy</p>
                    <p class="info__p info__p--description">
                        {{ problems }}
                    </p>

                    <p class="info__p info__p--title">Notatki</p>
                    <p class="info__p info__p--description">
                        {{ note }}
                    </p>
                </div>

                <div class="info__include-weather">
                    <h3 class="info__title-h3">Pogoda</h3>

                    <p class="info__p info__p--title">Warunki pogodowe</p>
                    <p class="info__p info__p--description">
                        {{ includeWeather }}
                    </p>

                    <p
                        class="info__p info__p--title"
                        v-if="includeWeather === 'Tak'"
                    >
                        Warunki pogodowe
                    </p>
                    <p
                        class="info__p info__p--description"
                        v-if="includeWeather === 'Tak'"
                    >
                        {{ conditions }}
                    </p>

                    <p
                        class="info__p info__p--title"
                        v-if="includeWeather === 'Tak'"
                    >
                        Temperatura
                    </p>
                    <p
                        class="info__p info__p--description"
                        v-if="includeWeather === 'Tak'"
                    >
                        {{ temperature }}
                    </p>

                    <p
                        class="info__p info__p--title"
                        v-if="includeWeather === 'Tak'"
                    >
                        Wilgotność
                    </p>
                    <p
                        class="info__p info__p--description"
                        v-if="includeWeather === 'Tak'"
                    >
                        {{ humidity }}
                    </p>

                    <p
                        class="info__p info__p--title"
                        v-if="includeWeather === 'Tak'"
                    >
                        Ciśnienie
                    </p>
                    <p
                        class="info__p info__p--description"
                        v-if="includeWeather === 'Tak'"
                    >
                        {{ pressure }}
                    </p>

                    <p
                        class="info__p info__p--title"
                        v-if="includeWeather === 'Tak'"
                    >
                        Prędkość wiatru
                    </p>
                    <p
                        class="info__p info__p--description"
                        v-if="includeWeather === 'Tak'"
                    >
                        {{ wind }}
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
        'purpose',
        'apiary',
        'hive',
        'date',
        'strength',
        'temperament',
        'frames',
        'isQueen',
        'age',
        'installed',
        'race',
        'queenColor',
        'queenNote',
        'framesWithBees',
        'framesWithBrood',
        'framesWithHoney',
        'framesWithPollen',
        'problems',
        'note',
        'includeWeather',
        'conditions',
        'temperature',
        'humidity',
        'pressure',
        'wind',
    ],
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/colors';

.inspectionsview {
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

            &__name {
                display: flex;
                flex-direction: column;
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

            &__frames-with {
                display: flex;
                flex-direction: column;
                width: 100%;
                justify-content: center;
                align-items: center;
                border: 2px solid $black;
                padding: 1rem;
            }

            &__spotted-problems {
                display: flex;
                flex-direction: column;
                width: 100%;
                justify-content: center;
                align-items: center;
                border: 2px solid $black;
                padding: 1rem;
            }

            &__include-weather {
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

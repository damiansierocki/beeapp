<template>
    <div class="viewinspections">
        <div class="container">
            <div class="container__inside">
                <div class="container__close" @click="$emit('close')">
                    <i class="fas fa-times"></i>
                </div>

                <h2 class="container__header">Inspekcja</h2>

                <h2 class="container__header container__header--desc">
                    Informacje generalne
                </h2>
                <p class="container__label">Cel inspekcji</p>
                <p class="container__text">
                    {{ purpose }}
                </p>

                <p class="container__label">Pasieka</p>
                <p class="container__text">
                    {{ apiary }}
                </p>

                <p class="container__label">Ul</p>
                <p class="container__text">
                    {{ hive }}
                </p>

                <p class="container__label">Data</p>
                <p class="container__text">
                    {{ date }}
                </p>

                <h2 class="container__header container__header--desc">
                    Informacje o pszczołach
                </h2>

                <p class="container__label">Siła pszczół</p>
                <p class="container__text">
                    {{ strength }}
                </p>

                <p class="container__label">Temperament</p>
                <p class="container__text">
                    {{ temperament }}
                </p>

                <p class="container__label">Ilość ramek w ulu</p>
                <p class="container__text">
                    {{ frames }}
                </p>

                <h2 class="container__header container__header--desc">
                    Informacje o matce
                </h2>

                <p class="container__label">Matka</p>
                <p class="container__text">
                    {{ isQueen }}
                </p>

                <p class="container__label">Wiek Matki (w latach)</p>
                <p class="container__text">
                    {{ age }}
                </p>

                <p class="container__label">
                    Kiedy matka została wrzucona do ula
                </p>
                <p class="container__text">
                    {{ installed }}
                </p>

                <p class="container__label">Rasa matki</p>
                <p class="container__text">
                    {{ race }}
                </p>

                <p class="container__label">Kolor matki</p>
                <p class="container__text">
                    {{ queenColor }}
                </p>

                <p class="container__label">Notatka dotycząca matki</p>
                <p class="container__text">
                    {{ queenNote }}
                </p>

                <h2 class="container__header container__header--desc">
                    Informacje o ramkach
                </h2>

                <p class="container__label">Z pszczołami</p>
                <p class="container__text">
                    {{ framesWithBees }}
                </p>

                <p class="container__label">Z czerwiem</p>
                <p class="container__text">
                    {{ framesWithBrood }}
                </p>

                <p class="container__label">Z miodem</p>
                <p class="container__text">
                    {{ framesWithHoney }}
                </p>

                <p class="container__label">Z pyłkiem</p>
                <p class="container__text">
                    {{ framesWithPollen }}
                </p>

                <h2 class="container__header container__header--desc">
                    Problemy & Notatki
                </h2>

                <p class="container__label">Napotkane problemy</p>
                <p class="container__text">
                    {{ problems }}
                </p>

                <p class="container__label">Notatki</p>
                <p class="container__text">
                    {{ note }}
                </p>

                <h2 class="container__header container__header--desc">
                    Informacje o pogodzie
                </h2>

                <p class="container__label">Czy uwzględnić warunki pogodowe?</p>
                <p class="container__text">
                    {{ includeWeather }}
                </p>

                <p class="container__label" v-if="includeWeather === 'Tak'">
                    Warunki pogodowe
                </p>
                <p class="container__text" v-if="includeWeather === 'Tak'">
                    {{ conditions }}
                </p>

                <p class="container__label" v-if="includeWeather === 'Tak'">
                    Temperatura
                </p>
                <p class="container__text" v-if="includeWeather === 'Tak'">
                    {{ temperature }}
                </p>

                <p class="container__label" v-if="includeWeather === 'Tak'">
                    Wilgotność
                </p>
                <p class="container__text" v-if="includeWeather === 'Tak'">
                    {{ humidity }}
                </p>

                <p class="container__label" v-if="includeWeather === 'Tak'">
                    Ciśnienie
                </p>
                <p class="container__text" v-if="includeWeather === 'Tak'">
                    {{ pressure }}
                </p>

                <p class="container__label" v-if="includeWeather === 'Tak'">
                    Prędkość wiatru
                </p>
                <p class="container__text" v-if="includeWeather === 'Tak'">
                    {{ wind }}
                </p>
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
.viewinspections {
    position: absolute;
    z-index: 1;
    display: flex;
    width: 100%;

    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        background: white;
        position: relative;

        &__inside {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            border-radius: 0.2rem;
            padding: 3rem;
            position: relative;
        }

        &__close {
            position: absolute;
            padding: 1rem 2rem;
            font-size: 2rem;
            top: 0;
            right: 0;
            cursor: pointer;
        }

        &__header {
            font-size: 2rem;
            position: relative;
            padding: 2rem 0;

            &--desc {
                font-size: 1.5rem;

                &::after {
                    display: none;
                }
            }

            &::after {
                content: '';
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                width: 100%;
                height: 0.5px;
                background: #000;
            }
        }

        &__label {
            margin: 2rem 0;
            font-size: 1.5rem;
        }

        &__text {
            border: 1px solid #ccc;
            padding: 1rem;
            border-radius: 0.2rem;
            font-size: 1.2rem;
            position: relative;
        }
    }
}

@media (min-width: 768px) {
    .container {
        background-color: white;

        &__inside {
            margin-top: 3rem;
            border: 1px solid #ccc;
            max-width: 768px;
        }
    }
}
</style>

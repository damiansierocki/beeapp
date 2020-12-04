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

                <p class="container__label">Cel inspekcji (inny)</p>
                <p class="container__text">
                    {{ other.length !== 0 ? other : 'Brak' }}
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
                    {{ strength.length !== 0 ? strength : 'Brak' }}
                </p>

                <p class="container__label">Temperament</p>
                <p class="container__text">
                    {{ temperament.length !== 0 ? temperament : 'Brak' }}
                </p>

                <p class="container__label">Ilość ramek w ulu</p>
                <p class="container__text">
                    {{ frames.length !== 0 ? frames : 'Brak' }}
                </p>

                <h2 class="container__header container__header--desc">
                    Informacje o matce
                </h2>

                <p class="container__label">Matka</p>
                <p class="container__text">
                    {{ isQueen.length !== 0 ? isQueen : 'Brak' }}
                </p>

                <p class="container__label">Wiek Matki (w latach)</p>
                <p class="container__text">
                    {{ age.length !== 0 ? age : 'Brak' }}
                </p>

                <p class="container__label">
                    Data podania matki do ula
                </p>
                <p class="container__text">
                    {{ installed.length !== 0 ? installed : 'Brak' }}
                </p>

                <p class="container__label">Rasa matki</p>
                <p class="container__text">
                    {{ race.length !== 0 ? race : 'Brak' }}
                </p>

                <p class="container__label">Linia Matki</p>
                <p class="container__text">
                    {{ line.length !== 0 ? line : 'Brak' }}
                </p>

                <p class="container__label">Kolor matki</p>
                <p class="container__text">
                    {{ queenColor.length !== 0 ? queenColor : 'Brak' }}
                </p>

                <p class="container__label">Notatka dotycząca matki</p>
                <p class="container__text">
                    {{ queenNote.length !== 0 ? queenNote : 'Brak' }}
                </p>

                <h2 class="container__header container__header--desc">
                    Informacje o ramkach
                </h2>

                <p class="container__label">Z pszczołami</p>
                <p class="container__text">
                    {{ framesWithBees.length !== 0 ? framesWithBees : 'Brak' }}
                </p>

                <p class="container__label">Z czerwiem</p>
                <p class="container__text">
                    {{
                        framesWithBrood.length !== 0 ? framesWithBrood : 'Brak'
                    }}
                </p>

                <p class="container__label">Z miodem</p>
                <p class="container__text">
                    {{
                        framesWithHoney.length !== 0 ? framesWithHoney : 'Brak'
                    }}
                </p>

                <p class="container__label">Z pyłkiem</p>
                <p class="container__text">
                    {{
                        framesWithPollen.length !== 0
                            ? framesWithPollen
                            : 'Brak'
                    }}
                </p>

                <h2 class="container__header container__header--desc">
                    Problemy & Notatki
                </h2>

                <p class="container__label">Napotkane problemy</p>
                <p class="container__text">
                    {{ problems.length !== 0 ? problems : 'Brak' }}
                </p>

                <p class="container__label">Notatki</p>
                <p class="container__text">
                    {{ note.length !== 0 ? note : 'Brak' }}
                </p>

                <h2 class="container__header container__header--desc">
                    Informacje o pogodzie
                </h2>

                <p class="container__label">Czy uwzględnić warunki pogodowe?</p>
                <p class="container__text">
                    {{ includeWeather.length !== 0 ? includeWeather : 'Brak' }}
                </p>

                <p class="container__label" v-if="includeWeather === 'Tak'">
                    Warunki pogodowe
                </p>
                <p class="container__text" v-if="includeWeather === 'Tak'">
                    {{ conditions.length !== 0 ? conditions : 'Brak' }}
                </p>

                <p class="container__label" v-if="includeWeather === 'Tak'">
                    Temperatura
                </p>
                <p class="container__text" v-if="includeWeather === 'Tak'">
                    {{ temperature.length !== 0 ? temperature : 'Brak' }}
                </p>

                <p class="container__label" v-if="includeWeather === 'Tak'">
                    Wilgotność
                </p>
                <p class="container__text" v-if="includeWeather === 'Tak'">
                    {{ humidity.length !== 0 ? humidity : 'Brak' }}
                </p>

                <p class="container__label" v-if="includeWeather === 'Tak'">
                    Ciśnienie
                </p>
                <p class="container__text" v-if="includeWeather === 'Tak'">
                    {{ pressure.length !== 0 ? pressure : 'Brak' }}
                </p>

                <p class="container__label" v-if="includeWeather === 'Tak'">
                    Prędkość wiatru
                </p>
                <p class="container__text" v-if="includeWeather === 'Tak'">
                    {{ wind.length !== 0 ? wind : 'Brak' }}
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
        'other',
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
        'line',
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
            transition: 0.1s;

            &:hover {
                transform: scale(1.1);
            }
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
            border: 1px solid #ccc;
            max-width: 768px;
        }
    }
}
</style>

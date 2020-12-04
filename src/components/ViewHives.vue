<template>
    <div class="viewhives">
        <div class="container">
            <div class="container__inside">
                <div class="container__close" @click="$emit('close')">
                    <i class="fas fa-times"></i>
                </div>

                <h2 class="container__header">Twój ul</h2>

                <h2 class="container__header container__header--desc">
                    Informacje generalne
                </h2>

                <p class="container__label">Pasieka</p>
                <p class="container__text">
                    {{ apiary }}
                </p>

                <p class="container__label">Numer ula</p>
                <p class="container__text">
                    {{ number }}
                </p>

                <p class="container__label">Stan ula</p>
                <p class="container__text">
                    {{ status }}
                </p>

                <p class="container__label">Przeznaczenie</p>
                <p class="container__text">
                    {{ purpose.length !== 0 ? purpose : 'Brak' }}
                </p>

                <p class="container__label">Data dodania ula do pasieki</p>
                <p class="container__text">
                    {{ created.length !== 0 ? created : 'Brak' }}
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
                    {{ isQueen }}
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

                <p class="container__label">Linia matki</p>
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
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'id',
        'apiary',
        'number',
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
        'line',
        'queenColor',
        'queenNote',
    ],
};
</script>

<style lang="scss" scoped>
.viewhives {
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

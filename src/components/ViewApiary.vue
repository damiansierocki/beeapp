<template>
    <div class="viewapiary">
        <div class="container">
            <div class="container__inside">
                <div class="container__close" @click="$emit('close')">
                    <i class="fas fa-times"></i>
                </div>

                <h2 class="container__header">Twoja pasieka</h2>

                <h2 class="container__header container__header--desc">
                    Informacje generalne
                </h2>
                <!-- nazwa pasieki -->
                <p class="container__label">Nazwa pasieki</p>
                <p class="container__text">
                    {{ name }}
                </p>

                <!-- Rodzaj pożytku -->
                <p class="container__label">Rodzaj pożytku</p>
                <p class="container__text">
                    {{ forages.join(', ') }}
                </p>

                <!-- typ pasieki -->
                <p class="container__label">Typ pasieki</p>
                <p class="container__text">
                    {{ type }}
                </p>

                <!-- opis -->
                <p class="container__label">Opis</p>
                <p class="container__text">
                    {{ description.length !== 0 ? description : 'Brak' }}
                </p>

                <h2 class="container__header container__header--desc">
                    Informacje o adresie
                </h2>

                <!-- adres -->
                <p class="container__label">Adres</p>
                <p class="container__text">
                    {{ address.length !== 0 ? address : 'Brak' }}
                </p>

                <!-- Miejscowość -->
                <p class="container__label">Miejscowość</p>
                <p class="container__text">
                    {{ city.length !== 0 ? city : 'Brak' }}
                </p>

                <!-- Zip -->
                <p class="container__label">Zip</p>
                <p class="container__text">
                    {{ zip.length !== 0 ? zip : 'Brak' }}
                </p>

                <!-- województwo -->
                <p class="container__label">Województwo</p>
                <p class="container__text">
                    {{ province.length !== 0 ? province : 'Brak' }}
                </p>
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
.viewapiary {
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

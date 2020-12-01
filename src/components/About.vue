<template>
    <div class="about">
        <div class="container">
            <div class="container__logo">
                <h2 class="container__header">
                    O aplikacji 🐝
                </h2>

                <div class="container__close" @click="$emit('close')">
                    <i class="fas fa-times"></i>
                </div>
            </div>

            <div class="container__inside">
                <p class="container__description">
                    Aplikacja internetowa stworzona na potrzeby pracy
                    inżynierskiej pod nadzorem
                    <span class="container__promotor"
                        >dr inż. Luizy Fabisiak</span
                    >.
                </p>

                <p class="container__footer">
                    © 2020 beeapp, version 0.1.0 by Damian Sierocki
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #eee;
    width: 100%;
    z-index: 1;
    padding: 2rem;

    &__header {
        font-family: 'Fredericka the Great', cursive;
        font-size: 3rem;
        margin-top: 3rem;
    }

    &__close {
        position: absolute;
        padding: 1rem 2rem;
        font-size: 2rem;
        top: 0;
        right: 0;
        cursor: pointer;
    }

    &__inside {
        margin-top: 1rem;
        padding: 1rem 2rem;
        text-align: justify;
    }

    &__description {
        font-size: 1.5rem;
        line-height: 2.5rem;
    }

    &__promotor {
        font-weight: bold;
    }

    &__footer {
        margin-top: 2rem;
        font-size: 1.2rem;
        font-style: italic;
        text-align: center;
    }
}

@media (min-width: 480px) {
    .container {
        max-width: 480px;
        border-radius: 0.2rem;
        border: 0.5px solid black;
    }
}
</style>

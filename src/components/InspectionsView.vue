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
                <div class="info__header">
                    <h2 class="info__title">Informacje o inspekcji</h2>
                </div>
                <div class="info__center">
                    <h3>Inspekcja</h3>

                    <div class="info__name">
                        <p class="info__p info__p--title">Nazwa inspekcji</p>
                        <p class="info__p info__p--description">{{ name }}</p>
                    </div>

                    <div class="info__apiary">
                        <p class="info__p info__p--title">Pasieka</p>
                        <p class="info__p info__p--description">
                            {{ apiary }}
                        </p>
                    </div>

                    <div class="info__hive">
                        <p class="info__p info__p--title">Ul</p>
                        <p class="info__p info__p--description">
                            {{ hive }}
                        </p>
                    </div>

                    <h3 style="margin-top: 1rem">Data</h3>

                    <div class="info__date">
                        <p class="info__p info__p--title">Data</p>
                        <p class="info__p info__p--description">
                            {{ date }}
                        </p>
                    </div>

                    <h3 style="margin-top: 1rem">Kondycja</h3>

                    <div class="info__equipment">
                        <p class="info__p info__p--title">Wyposażenie</p>
                        <p class="info__p info__p--description">
                            {{ equipment }}
                        </p>
                    </div>
                    <div class="info__odor">
                        <p class="info__p info__p--title">Zapach</p>
                        <p class="info__p info__p--description">
                            {{ odor }}
                        </p>
                    </div>
                    <div class="info__deadBees">
                        <p class="info__p info__p--title">Martwe pszczoły</p>
                        <p class="info__p info__p--description">
                            {{ deadBees }}
                        </p>
                    </div>
                    <div class="info__moisture">
                        <p class="info__p info__p--title">Wilgoć</p>
                        <p class="info__p info__p--description">
                            {{ moisture }}
                        </p>
                    </div>
                    <div class="info__mold">
                        <p class="info__p info__p--title">Pleśń</p>
                        <p class="info__p info__p--description">
                            {{ mold }}
                        </p>
                    </div>
                    <div class="info__otherObservation">
                        <p class="info__p info__p--title">Inne obserwację</p>
                        <p class="info__p info__p--description">
                            {{ otherObservation }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        "id",
        "name",
        "apiary",
        "hive",
        "date",
        "equipment",
        "odor",
        "deadBees",
        "moisture",
        "mold",
        "otherObservation"
    ]
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/colors";

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

            &__apiary {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            &__hive {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            &__date {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            &__equipment {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            &__odor {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            &__deadBees {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            &__moisture {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            &__mold {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            &__otherObservation {
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

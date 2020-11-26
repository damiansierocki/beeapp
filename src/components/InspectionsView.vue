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
                        <p class="info__p info__p--description">
                            Sprawdzenie pszczółek
                        </p>
                    </div>

                    <div class="info__apiary">
                        <p class="info__p info__p--title">Pasieka</p>
                        <p class="info__p info__p--description">
                            Pasieka nr 1
                        </p>
                    </div>

                    <div class="info__hive">
                        <p class="info__p info__p--title">Ul</p>
                        <p class="info__p info__p--description">
                            Ul o id 5
                        </p>
                    </div>

                    <h3 style="margin-top: 1rem">Data</h3>

                    <div class="info__date">
                        <p class="info__p info__p--title">Data</p>
                        <p class="info__p info__p--description">
                            01/10/1997
                        </p>
                    </div>

                    <h3 style="margin-top: 1rem">Kondycja</h3>

                    <div class="info__equipment">
                        <p class="info__p info__p--title">Wyposażenie</p>
                        <p class="info__p info__p--description">
                            Wyposażenie
                        </p>
                    </div>
                    <div class="info__odor">
                        <p class="info__p info__p--title">Zapach</p>
                        <p class="info__p info__p--description">
                            Zapach
                        </p>
                    </div>
                    <div class="info__deadBees">
                        <p class="info__p info__p--title">Martwe pszczoły</p>
                        <p class="info__p info__p--description">
                            Martwe pszczoły
                        </p>
                    </div>
                    <div class="info__moisture">
                        <p class="info__p info__p--title">Wilgoć</p>
                        <p class="info__p info__p--description">
                            Wilgoć
                        </p>
                    </div>
                    <div class="info__mold">
                        <p class="info__p info__p--title">Pleśń</p>
                        <p class="info__p info__p--description">
                            Pleśń
                        </p>
                    </div>
                    <div class="info__otherObservation">
                        <p class="info__p info__p--title">Inne obserwację</p>
                        <p class="info__p info__p--description">
                            Inne obserwację
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../assets/scss/inspectionsview.scss";
</style>

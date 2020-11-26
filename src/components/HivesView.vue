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
                <div class="info__header">
                    <h2 class="info__title">Informacje o ulu</h2>
                </div>
                <div class="info__center">
                    <div class="info__status">
                        <p class="info__p info__p--title">Status</p>
                        <p class="info__p info__p--description">
                            {{ this.status }}
                        </p>
                    </div>

                    <div class="info__hive-id">
                        <p class="info__p info__p--title">ID ula</p>
                        <p class="info__p info__p--description">
                            {{ this.hiveId }}
                        </p>
                    </div>

                    <div class="info__apiary">
                        <p class="info__p info__p--title">Pasieka</p>
                        <p class="info__p info__p--description">
                            {{ this.apiary }}
                        </p>
                    </div>

                    <div class="info__queen">
                        <p class="info__p info__p--title">Królowa</p>
                        <p class="info__p info__p--description">
                            {{ this.queen }}
                        </p>
                    </div>

                    <div class="info__queen">
                        <p class="info__p info__p--title">Ramki</p>
                        <p class="info__p info__p--description">
                            {{ this.frames }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["id", "status", "hiveId", "apiary", "queen", "frames"]
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/hivesview.scss";
</style>

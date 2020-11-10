<template>
    <div class="sidebar">
        <div class="dropmenu">
            <router-link class="link" to="/">Strona główna</router-link>
            <router-link class="link" to="/apiaries">Pasieki</router-link>
            <router-link class="link" to="/hives">Ule</router-link>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.dropmenu {
    display: none;
}

@media (min-width: 768px) {
    .dropmenu {
        width: 15vw;
        height: calc(100vh - 64px);
        padding: 18px;
        display: flex;
        flex-direction: column;
        box-shadow: 1px 1px 10px 1px #000000;
        background-color: #eee;

        .link {
            font-size: 21.6px;
            margin: 12px 0 6px 0;
            text-decoration: none;
            color: black;
            cursor: pointer;

            &:hover {
                font-weight: bold;
            }
        }
    }
}
</style>

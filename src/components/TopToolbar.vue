<template>
    <div class="top-toolbar">
        <h3
            class="top-toolbar__title"
        >
            <router-link
                class="link"
                to="/"
            >
                Clemator's hideout
            </router-link>
        </h3>
    </div>
</template>

<script>
export default {
    name: 'TopToolbar',
};
</script>

<style lang="scss">
.top-toolbar {
    align-items: center;
    background-color: white;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.5);
    box-sizing: border-box;
    display: flex;
    height: 60px;
    justify-content: space-between;
    padding: 10px 15px;
    width: 100%;

    &__title .link {
        color: black;
        text-decoration: none;
    }
}
</style>

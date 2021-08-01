<template>
    <div>
        <top-appbar/>
    </div>
</template>

<script>
import TopAppbar from "./components/TopAppbar.vue";
export default {
    components: { TopAppbar },
};
</script>

<style lang="scss">
html {
    font-family: $font-stack;
}

div {
    margin: 0;
}
</style>

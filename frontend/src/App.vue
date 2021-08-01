<template>
    <div>
        <top-appbar/>
        <side-navbar/>
    </div>
</template>

<script>
import SideNavbar from './components/SideNavbar.vue';
import TopAppbar from "./components/TopAppbar.vue";
export default {
    components: { TopAppbar, SideNavbar },
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

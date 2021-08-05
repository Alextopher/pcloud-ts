<template>
    <div>
        <top-appbar/>
        <div class="row">
            <side-navbar/>
            <div class="router">
                <router-view/>
            </div>
        </div>
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

.router {
    position: absolute;
    top: $navbar-height;
    left: $sidenav-width;
    right: 0;
    margin: 0 $gutter-width;
}
</style>

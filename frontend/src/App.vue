<template>
    <div>
        <top-appbar/>
        <div class="row">
            <side-navbar @showModal="showModal = true"/>
            <div class="router">
                <router-view/>
            </div>
        </div>
        <login-modal v-if="showModal" @close="showModal = false"/>
    </div>
</template>

<script>
import SideNavbar from './components/SideNavbar.vue';
import TopAppbar from "./components/TopAppbar.vue";
import LoginModal from "./components/LoginModal.vue";

export default {
    components: { TopAppbar, SideNavbar, LoginModal },
    data: () => {
        return {
            showModal: false,
        }
    },
};
</script>

<style lang="scss">
@import '@/assets/variables.scss';

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

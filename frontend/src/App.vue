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
import SideNavbar from './components/sidenav/SideNavbar.vue';
import TopAppbar from "./components/TopAppbar.vue";
import LoginModal from "./components/LoginModal.vue";

export default {
    components: { TopAppbar, SideNavbar, LoginModal },
    data: () => {
        return {
            showModal: false,
        }
    },
    mounted () {
        this.$store.dispatch('pullProfile');
    }
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

    @media #{$medium-and-down} {
        left: 0px;
    }

    @media #{$small-and-down} {
        top: $navbar-height-mobile;
    }
}
</style>

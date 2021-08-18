<template>
    <div>
        <ul v-if="profile !== ''" class="sidenav sidenav-fixed">
            <!-- User is logged in -->
            <side-navbar-route :text="profile.username" :icon="'account_circle'" :href="'/profile'"/>
            
            <li><div class="divider"></div></li>
            <side-navbar-route :text="'public'" :icon="'folder_shared'" :href="'/public'"/>
            <side-navbar-route :text="'private'" :icon="'folder'" :href="'/private'"/>
            <side-navbar-route :text="'uploads'" :icon="'upload'" :href="'/uploads'"/>

            <side-navbar-link :icon="'code'" :text="'source'" :href="'https://github.com/Alextopher/pcloud'"/>
        </ul>

        <ul v-else class="sidenav sidenav-fixed">
            <!-- Guest user -->
            <side-navbar-button text="guest" :icon="'account_circle'" @trigger="$emit('showModal')"/>
            <li><div class="divider"></div></li>
            <side-navbar-route :text="'public'" :icon="'folder_shared'" :href="'/public'"/>

            <side-navbar-link :icon="'code'" :text="'source'" :href="'https://github.com/Alextopher/pcloud'"/>
        </ul>
    </div>
</template>

<script>
import SideNavbarRoute from './SideNavbarRoute.vue';
import SideNavbarButton from '../sidenav/SideNavbarButton.vue';
import SideNavbarLink from './SideNavbarLink.vue';

export default {
    components: {
        SideNavbarRoute,
        SideNavbarButton,
        SideNavbarLink
    },
    computed: {
        profile () {
            return this.$store.state.profile;
        }
    },
};
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';
@import "@materializecss/materialize/sass/components/_sidenav.scss";

.sidenav {
    z-index: 0;
    margin-top: $navbar-height;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.sidenav div {
    width: 100%;
}

.sidenav > :first-child {
    margin-top: 20px;
}

.sidenav > :last-child {
    margin-top: auto;
}

.sidenav > .active {
    background-color: rgba(0, 0, 0, 0.05);
}

.divider {
    margin-bottom: 28px !important;
}
</style>
<template>
    <div>
        <ul v-if="profile !== ''" class="sidenav sidenav-fixed">
            <!-- User is logged in -->
            <side-navbar-item :text="profile.username" :icon="'account_circle'" :href="'/profile'"/>
            <li><div class="divider"></div></li>
            <side-navbar-item :text="'public'" :icon="'folder_shared'" :href="'/public'"/>
            <side-navbar-item :text="'private'" :icon="'folder'" :href="'/private'"/>
            <side-navbar-item :text="'uploads'" :icon="'upload'" :href="'/uploads'"/>

            <side-navbar-item :icon="'code'" :text="'source'" :href="'https://github.com/Alextopher/pcloud'"/>
        </ul>

        <ul v-else class="sidenav sidenav-fixed">
            <!-- Guest user -->
            <side-navbar-button text="guest" :icon="'account_circle'" @trigger="$emit('showModal')"/>
            <li><div class="divider"></div></li>
            <side-navbar-item :text="'public'" :icon="'folder_shared'" :href="'/public'"/>

            <side-navbar-item :icon="'code'" :text="'source'" :href="'https://github.com/Alextopher/pcloud'"/>
        </ul>
    </div>
</template>

<script>
import SideNavbarItem from './SideNavbarItem.vue';
import SideNavbarButton from './SideNavbarButton.vue';

export default {
    components: {
        SideNavbarItem,
        SideNavbarButton
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
<template>
    <div>
        <ul v-if="profile == null" class="sidenav sidenav-fixed">
            <!-- User is logged in -->
            <side-navbar-item :text="'admin'" :icon="'account_circle'" :href="'/profile'"/>
            <div class="row"><li><div class="divider"></div></li></div>
            <side-navbar-item :text="'public'" :icon="'folder_shared'" :href="'/public'"/>
            <side-navbar-item :text="'private'" :icon="'folder'" :href="'/private'"/>
            <side-navbar-item :text="'uploads'" :icon="'upload'" :href="'/uploads'"/>

            <side-navbar-item :icon="'code'" :text="'source'" :href="'https://github.com/Alextopher/pcloud'"/>
        </ul>

        <ul v-else class="sidenav sidenav-fixed">
            <!-- Guest user -->
            <side-navbar-item :text="'guest'" :icon="'account_circle'" :href="'/profile'"/>
            <div class="row"><li><div class="divider"></div></li></div>
            <side-navbar-item :text="'public'" :icon="'folder_shared'" :href="'/public'"/>

            <side-navbar-item :icon="'code'" :text="'source'" :href="'https://github.com/Alextopher/pcloud'"/>
        </ul>
    </div>
</template>

<script>
import SideNavbarItem from './SideNavbarItem.vue';

export default {
    components: {
        SideNavbarItem
    },
};
</script>

<style lang="scss" scoped>
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
</style>
<template>
    <ul class="sidenav sidenav-fixed">
        <div v-if="profile != null">
            <!-- User is logged in -->
            <side-navbar-item :icon="'account_circle'" :href="'/profile'"/>
        </div>
        <div v-else>
            <!-- Guest user -->
            <side-navbar-item style="float: bottom;" :icon="'account_circle'" :href="'/profile'"/>
        </div>
    </ul>
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
$sidenav-width: 256px;
@import "@materializecss/materialize/sass/components/_sidenav.scss";

.sidenav {
    z-index: 0;
    margin-top: $navbar-height;
}
</style>
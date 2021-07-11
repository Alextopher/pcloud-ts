<template>
  <ul class="sidenav sidenav-fixed" style="z-index: 0">
    <side-nav-item :class="{active : isActive('/profile')}" :icon="'account_circle'" :text="'mahonec'" :href="'/profile'"></side-nav-item>
    <div class="row">
      <li><div class="divider"></div></li>
    </div>
    <side-nav-item :class="{active : isActive('/')}" :icon="'folder_shared'" :text="'public'" :href="'/'"></side-nav-item>
    <side-nav-item :class="{active : isActive('/private')}" :icon="'folder'" :text="'private'" :href="'/private'"></side-nav-item>
    <side-nav-item :class="{active : isActive('/uploads')}" :icon="'upload'" :text="'uploads'" :href="'/uploads'"></side-nav-item>

    <side-nav-item :icon="'code'" :text="'source'" :href="'https://github.com/Alextopher/pcloud'"></side-nav-item>
  </ul>
</template>

<script>
import SideNavItem from "./SideNavItem.vue";

export default {
  name: "SideNav",
  components: { SideNavItem },
  data: () => ({
    isActive: function(page) {
      if (page === '/') {
        return !(this.isActive('/profile') || this.isActive('/private') || this.isActive('/uploads'));
      } else {
        return this.$route.path.startsWith(page);
      }
    }
  }),
};
</script>

<style scoped>
    .sidenav {
        display: flex;
        flex-direction: column;

        height: calc(100% - 64px);

        z-index: inherit;
        top: 64px;
        width: 16.6666666667%;
        padding: 0;
    }

    .sidenav div {
        width: 100%;
    }

    .sidenav > :first-child {
        margin-top: 20px;
    }

    .sidenav > :last-child {
        justify-content: flex-end;
        margin-top: auto;
    }

    .sidenav > .active {
      background-color: rgba(0, 0, 0, 0.05);
    }
</style>
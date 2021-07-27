<template>
  <div>
    <head>
      <!--Import Google Icon Font-->
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
    </head>
    <top-nav> </top-nav>
    <div class="row">
      <div class="col s2">
        <side-nav> </side-nav>
      </div>
      <div class="col s10">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import TopNav from "./components/TopNav.vue";
import SideNav from "./components/SideNav.vue";

export default {
  name: "App",
  components: {
    TopNav,
    SideNav,
  },

  mounted() {
    let materialize = document.createElement("script");
    materialize.setAttribute(
      "src",
      "/js/materialize.min.js"
    );
    document.head.appendChild(materialize);
  },
};
</script>

<style>
</style>
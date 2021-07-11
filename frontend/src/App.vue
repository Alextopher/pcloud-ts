<template>
  <head>
    <!--Import Google Icon Font-->
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    />
  </head>
  <top-nav> </top-nav>
  <side-nav> </side-nav>
  <div class="row">
    <div class="col s10 offset-s2">
      <router-view/>
    </div>
  </div>
</template>

<script>
import TopNav from './components/TopNav.vue';
import SideNav from './components/SideNav.vue';

export default {
    name: "App",
    components: {
        TopNav,
        SideNav,
    },

    mounted() {
        let materialize = document.createElement('script')
        materialize.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js')
        document.head.appendChild(materialize)
    }
};
</script>

<style>
@import 'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css';
</style>
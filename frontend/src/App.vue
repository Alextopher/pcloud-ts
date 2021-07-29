<template>
  <div>
    <!-- <button id="show-modal" @click="showModal = true">Show Modal</button> -->
    <top-nav> </top-nav>
    <div class="row">
      <div class="col s2">
        <side-nav @showModal="showModal = true"/>
      </div>
      <div class="col s10">
          <router-view/>
      </div>
    </div>
    <login-modal v-if="showModal" @close="showModal = false"/>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

import TopNav from "./components/TopNav.vue";
import SideNav from "./components/SideNav.vue";

export default {
  name: "App",
  components: {
    TopNav,
    SideNav,
    LoginModal: defineAsyncComponent(() => import('./components/LoginModal.vue'))
  },
  data: () => {
    return {
      showModal: false,
    }
  },
  mounted() {
    let materialize = document.createElement("script");
    materialize.setAttribute(
      "src",
      "/js/materialize.min.js"
    );
    document.head.appendChild(materialize);

    this.getProfile()
  },
  methods: {
    // Get user information about the current user
    getProfile() {
      this.$store.dispatch('pullProfile');
    }
  }
};
</script>
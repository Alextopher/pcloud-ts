<template>
  <div>
    <!-- <button id="show-modal" @click="showModal = true">Show Modal</button> -->
    <top-nav> </top-nav>
    <div class="row">
      <div class="col s2">
        <side-nav :profile="profile" @showModal="showModal = true"/>
      </div>
      <div class="col s10">
        <router-view @reload="getProfile()"/>
      </div>
    </div>
    <login-modal v-if="showModal" @reload="getProfile(); showModal = false" @close="showModal = false"/>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

import TopNav from "./components/TopNav.vue";
import SideNav from "./components/SideNav.vue";
import axios from 'axios';

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
      profile: null,
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
      axios.get('/api/user/me').then(response => {
        this.profile = response.data;
        console.log(response.data);
      }).catch(() => {
        this.profile = null;
      }) 
    }
  }
};
</script>
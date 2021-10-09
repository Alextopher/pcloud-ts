<template>
  <div v-if="profile == ''" class="router-signed-out">
    <h2>Logged Out, please sign in and then try again</h2>
  </div>
  <div v-else class="router">
    <div class="user">
      Logged in as: <b>{{ profile.username }}</b>
    </div>
    <button @click="signout">sign out</button>
    <br />
    <hr />
    <input type="text" placeholder="old password" />
    <br />
    <input type="text" placeholder="new password" />
    <br />
    <input type="text" placeholder="confirm new password" />
    <br />
    <button @click="signout">change password</button>
    <hr />
    <b> SSH-KEYS: </b>
    <br />
    <keys />
  </div>
</template>

<script>
import { post } from "axios";
import Keys from "../components/profile/Keys.vue";

export default {
  components: {
    Keys,
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    },
  },
  methods: {
    signout() {
      post("/api/auth/signout").then(() => {
        this.$router.push("/public");
        this.$store.dispatch("pullProfile");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.router-signed-out {
  top: 0px;
  left: 0px;
  margin: 0 $gutter-width;
}

.router {
  top: 16px;
  left: 0px;
  margin: 0 $gutter-width;
}

.user {
  font-size: 20px;
}
</style>

<template>
  <div class="mask">
    <div class="wrapper">
      <div class="container">
        <input v-model="username" type="text" placeholder="username" />
        <input
          v-on:keyup="loginOnEnter"
          v-model="password"
          type="password"
          placeholder="password"
        />
        <button ref="submit" type="submit" @click="login()">Login</button>
        <button @click="$emit('close')" style="float:right">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import { post } from "axios";

export default {
  name: "LoginModal",
  data: () => {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    loginOnEnter(e) {
      if (e.keyCode === 13) this.login();
      console.log(e);
    },

    login() {
      post("/api/auth/login", {
        username: this.username,
        password: this.password,
      })
        .then(() => {
          this.$store.dispatch("pullProfile");
          this.$emit("close");
        })
        .catch(() => {
          this.$emit("close");
        });
    },
  },
  mounted() {
    this.$refs["submit"].focus();
  },
};
</script>

<style scoped>
.mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.wrapper {
  display: table-cell;
  vertical-align: middle;
}

.container {
  display: table;
  vertical-align: middle;
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

input {
  width: 100%;
  margin-top: 5px;
}

button {
  margin-top: 10px;
}
</style>

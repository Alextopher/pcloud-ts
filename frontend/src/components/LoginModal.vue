<template>
    <div class="mask">
        <div class="wrapper">
            <div class="container">
                <input v-model="username" type="text" placeholder="username">
                <input v-model="password" type="password" placeholder="password">
                <button @click="login()"> Login </button>
                <button @click="$emit('close')" style="float:right"> Cancel </button>
            </div>
        </div>
    </div>        
</template>

<script>
import axios from 'axios';

export default {
    name: "LoginModal",
    methods: {
        login() {
            axios.post('/api/auth/login', {
                username: this.username,
                password: this.password
            }).then(() => {
                this.username = "";
                this.password = "";
                this.$store.dispatch('pullProfile');
                this.$router.push({ name: 'profile' });
                this.$emit('close');
            }).catch(() => {
                this.$emit('close');
            });
        }
    }
}
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
        border: solid;
    }

    button {
        margin-top: 10px;
    }
</style>
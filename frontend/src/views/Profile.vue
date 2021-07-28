<template>
    <div>
        <button @click="signout"> Sign Out </button>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    methods: {
        signout() {
            axios.post('/api/auth/signout').then(() => {
                this.$router.push('/public');
                this.$emit("reload");
            });
        }
    }
}
</script>

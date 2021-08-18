<template>
    <div class="router">
        <button @click="signout"> sign out </button>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    methods: {
        signout() {
            axios.post('/api/auth/signout').then(() => {
                this.$router.push('/public');
                this.$store.dispatch('pullProfile');
            });
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';

.router {
    left: 0px;
    margin: 0 $gutter-width;
}
</style>

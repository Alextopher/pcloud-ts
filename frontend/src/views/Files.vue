<template>
    <div>
        <breadcrumbs></breadcrumbs>
        <ul>
            <li v-for="file in files" :key="file">
                <file :file="file"></file>
            </li>
        </ul>
    </div>
</template>

<script>
import Breadcrumbs from '../components/Breadcrumbs.vue'
import File from '../components/File.vue'
import axios from "axios"


export default {
    components: { 
        Breadcrumbs,
        File
    },
    data () {
        return {
            loading: false,
            error: false,
            files: null
        }
    },
    created () {
        // fetch the data when the view is created and the data is
        this.fetchData()
    },
    watch: {
        '$route': 'fetchData'
    },
    methods: {
        fetchData() {
            this.loading = true;
            this.files = null;
            const folder = this.$route.path;

            axios.get('http://localhost:3000/api' + folder).then(response => {
                this.files = response.data;
                this.loading = false;
            }).catch(e => {
                this.error = true;
                console.error(e);
            })
        }
    }
}
</script>

<style scoped>

</style>
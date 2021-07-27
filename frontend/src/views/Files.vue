<template>
    <div>
        <breadcrumbs></breadcrumbs>
        <ul class="collection">
            <file v-for="file in files" :key="file" :file="file"></file>
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
                console.log(response.data);
            }).catch(e => {
                console.error(e);
                this.error = true;
                // Mock data for testing
                this.files = [{"name":"file1.txt","stats":{"size":14,"mtime":"2021-07-23T01:38:39.547Z","birthtime":"2021-07-23T01:38:39.547Z","isFile":true,"isDirectory":false}},{"name":"test.txt","stats":{"size":11,"mtime":"2021-07-23T00:36:04.158Z","birthtime":"2021-07-23T00:35:58.560Z","isFile":true,"isDirectory":false}}];
            })
        }
    }
}
</script>

<style scoped>

</style>
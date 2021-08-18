<template>
    <div>
        <breadcrumbs @reload="fetchData()"/>
        <div class="router">
            <div v-if="error">
                <h2>Folder not found</h2>
            </div>
            <ul v-else class="collection">
                <!-- Header  -->
                <li class="collection-item">
                    <div class="row" style="margin: auto">
                        <div class="col s8">
                            Name
                        </div>
                        <div class="col s1">
                            Size
                        </div>
                        <div class="col s3">
                            Last Modified
                        </div>
                    </div>
                </li>
                <file v-for="file in files" :key="file" :file="file"></file>
                <!-- Footer for logged in users  -->
                <li class="collection-item">
                    <div class="row" style="margin: auto">
                        <div class="col s8">
                            Name
                        </div>
                        <div class="col s1">
                            Size
                        </div>
                        <div class="col s3">
                            Last Modified
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Breadcrumbs from '../components/Breadcrumbs.vue'
import File from '../components/File.vue'
import axios from "axios"

export default {
    components: { 
        File,
        Breadcrumbs
    },
    data () {
        return {
            loading: false,
            error: false,
            files: null
        }
    },
    created () {
        // fetch the data when the view is created and the data is needed
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

            axios.get('/api' + folder).then(response => {
                this.files = response.data;
                this.loading = false;
            }).catch(() => {
                this.error = true;
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';
@import "@materializecss/materialize/sass/components/_global.scss";
@import "@materializecss/materialize/sass/components/_grid.scss";

.row {
    margin-bottom: 0;
}

.router {
    left: 0px;
    margin: 0 $gutter-width;
}

.collection > :last-child {
    border-top: 1px solid #e0e0e0;
}
</style>
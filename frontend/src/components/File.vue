<template v-if="file.stats.isDirectory">
    <a v-if="!file.stats.isDirectory" :href="href"> 
        <li class="collection-item">
            <div class="row" style="margin: auto">
                <div class="col s8">
                    {{file.name + (file.stats.isDirectory ? '/' : '')}}
                </div>
                <div class="col s1">
                    {{file.stats.isDirectory ? '----' : humanFileSize(file.stats.size)}}
                </div>
                <div class="col s3">
                    {{file.stats.mtime}}
                </div>
            </div>
        </li>
    </a>
    <router-link v-else :to="href">
        <li class="collection-item">
            <div class="row" style="margin: auto">
                <div class="col s8">
                    {{file.name + (file.stats.isDirectory ? '/' : '')}}
                </div>
                <div class="col s1">
                    {{file.stats.isDirectory ? '----' : humanFileSize(file.stats.size)}}
                </div>
                <div class="col s3">
                    {{file.stats.mtime}}
                </div>
            </div>
        </li>
    </router-link>
</template>

<script>
export default {
    props: {
        file: {
            name: String,
            stats: {
                size: Number,
                mtime: Date,
                birthtime: Date,
                isFile: Boolean,
                isDirectory: Boolean
            }
        }
    },
    computed: {
        href() {
            if (this.file.stats.isDirectory) {
                return this.$route.path + '/' + this.file.name
            } else {
                return '/api' + this.$route.path + '/' + this.file.name + '?download=true'
            }
        }
    },
    methods: {
        humanFileSize(size) {
            var i = Math.floor( Math.log(size) / Math.log(1024) );
            return ( size / Math.pow(1024, i) ).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';
@import "@materializecss/materialize/sass/components/_global.scss";
@import "@materializecss/materialize/sass/components/_grid.scss";
a {
    text-decoration: none;
    color:rgba(0,0,0, 0.87) !important;
}

li:hover {
    background-color: rgba(0, 0, 0, 0.1);
}

.gray {
    border: 2px dotted black;
}
</style>
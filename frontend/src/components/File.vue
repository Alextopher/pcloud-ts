<template>
    <a :href="href"> 
        <li class="collection-item">
            <div class="row" style="margin: auto">
                <div class="col s8">
                    {{file.name + (file.stats.isDirectory ? '/' : '')}}
                </div>
                <div class="col s1">
                    {{humanFileSize(file.stats.size)}}
                </div>
                <div class="col s3">
                    {{file.stats.mtime}}
                </div>
            </div>
        </li>
    </a>
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

<style scoped>
    a {
        text-decoration: none;
        color: inherit;
    }

    li:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }

    .gray {
        border: 2px dotted black;
    }
</style>
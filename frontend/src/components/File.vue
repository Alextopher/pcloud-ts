<template>
    <a :href="'api' + $route.path + '/' + file.name"> 
        <li class="collection-item">
            <div class="row">
                <div class="col s8 gray">
                    {{file.name}}
                </div>
                <div class="col s1 gray">
                    {{humanFileSize(file.stats.size)}}
                </div>
                <div class="col s3 gray">
                    {{file.stats.mtime}}
                </div>
            </div>
        </li>
    </a>
</template>

<script>
export default {
    name: "file",
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
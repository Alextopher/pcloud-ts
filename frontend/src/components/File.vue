<template>
    <li class="collection-item">
        <a :href="$route.path + '/' + file.name"> 
            {{file.name}} | {{file.stats.size}} | {{file.stats.birthtime}}
        </a>
    </li>
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
}
</script>

<style scoped>
    a {
        text-decoration: none;
        color: inherit;
    }

    li {
      background-color: rgba(0, 0, 0, 0.1);
    }
</style>
<template>
    <p> {{file.name}} | {{file.stats.size}} | {{file.stats.birthtime}} </p>    
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
            }
        }
    },

}
</script>
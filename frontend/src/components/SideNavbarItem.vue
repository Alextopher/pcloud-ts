<template>
    <div class="row nomargin">
        <li>
            <a :href="href">
                <i class="material-icons">{{icon}}</i>
                <span style="margin: auto">{{text}}</span>
            </a>
        </li>
    </div>
</template>

<script>
export default {
    props: {
        icon: String,
        text: String,
        href: String
    }
}
</script>

<style scoped>
    .nomargin {
        margin-left: 0 !important;
        margin-right: 0 !important;
    }
</style>
<template>
    <div class="row nomargin">
        <li>
            <a @click="$emit('trigger')">
                <i class="material-icons">{{icon}}</i>
                <span style="margin: auto">{{text}}</span>
            </a>
        </li>
    </div>
</template>

<script>
export default {
    name: "SideNavButton",
    props: {
        icon: String,
        text: String,
    }
}
</script>

<style scoped>
    .nomargin {
        margin-left: 0 !important;
        margin-right: 0 !important;
    }

    a {
        cursor: pointer;
    }
</style>
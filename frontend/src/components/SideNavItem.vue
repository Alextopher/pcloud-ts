<template>
    <div class="row">
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
    name: "SideNavItem",
    props: {
        icon: String,
        text: String,
        href: String
    }
}
</script>

<style scoped>

</style>
<template>
    <div class="row">
        <nav class="col s12">
            <div class="nav-wrapper">
                <div style="padding-left: 10px;">
                    <a :href="ref" v-for="[ref, item] in breadcrumbs" :key="item" class="breadcrumb">
                        {{item}}
                    </a>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: "breadcrumbs",
    computed: {
        breadcrumbs() {
            let chapters = [this.$route.name, ...this.$route.params.chapters];
            return chapters.map((v, i) => ['/' + chapters.slice(0,i+1).join('/'), v])
        }
    }
}
</script>
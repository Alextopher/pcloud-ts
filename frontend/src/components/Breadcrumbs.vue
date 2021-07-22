<template>
    <div class="row">
        <nav class="col s12">
            <div class="nav-wrapper">
                <div style="padding-left: 10px;">
                    <a :href=" '.'.repeat($route.params.chapters.length - index - 1)" v-for="(item, index) in $route.params.chapters" :key="item" class="breadcrumb">
                        {{item}}
                    </a>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: "breadcrumbs"
}
</script>
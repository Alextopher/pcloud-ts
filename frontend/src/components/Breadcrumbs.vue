<template>
    <div class="row">
        <nav class="col s12">
            <div class="nav-wrapper">
                <div style="padding-left: 10px;">
                    <a :href="ref" v-for="[ref, item] in $route.params.chapters.map((v, i) => ['/' + $route.params.chapters.slice(0,i+1).join('/'), v])" :key="item" class="breadcrumb">
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
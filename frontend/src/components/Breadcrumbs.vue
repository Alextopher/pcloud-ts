<template>
    <div class="row">
        <nav class="col s12">
            <div class="nav-wrapper">
                <div style="padding-left: 10px;">
                    <a href="#!" class="breadcrumb" v-for="item in $route.params.chapters" :key="item">{{item}}</a>
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
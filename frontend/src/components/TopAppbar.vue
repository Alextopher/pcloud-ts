<template>
    <nav>
        <div class="navbar-wrapper">
            <div class="navbar-fixed">
                <div class="brand-logo">
                    <a :href="logo.href"> {{ logo.title }} </a>
                </div>
                <ul>
                    <li v-for="item in items" :key="item" :class="{ active: item.active }" style="float: right;">
                        <a :href="item.href">
                            {{ item.title }}
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    // eslint-disable-next-line
    data () {
        return {
            logo: {
                title: "mahoney.best",
                href: "http://mahoney.best"
            },
            items: [
                { title: "pcloud", href: "/", active: true },
            ],
        };
    },
};
</script>

<style lang="scss" scoped>
@import "@materializecss/materialize/sass/components/_navbar.scss";

.brand-logo {
    margin-left: $gutter-width;
}

li {
    float: right;
}

.active {
    background-color: rgba(0,0,0,.1);
}
</style>
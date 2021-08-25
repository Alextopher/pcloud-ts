<template>
  <nav>
    <div class="navbar-wrapper">
      <div class="navbar-fixed">
        <div class="brand-logo">
          <a :href="logo.href"> {{ logo.title }} </a>
        </div>
        <ul>
          <li
            v-for="item in items"
            :key="item"
            :class="{ active: item.active }"
            style="float: right;"
          >
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
  data() {
    return {
      logo: {
        title: "mahoney.best",
        href: "http://mahoney.best",
      },
      items: [{ title: "pcloud", href: "/", active: true }],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";
@import "@materializecss/materialize/sass/components/_variables";
@import "@materializecss/materialize/sass/components/_navbar.scss";

nav {
  position: fixed;
  @media #{$small-and-down} {
    position: absolute;
  }
  z-index: 1;

  @extend .z-depth-1;
  .brand-logo {
    margin-left: $gutter-width;
    float: right;
  }

  ul {
    @media #{$small-and-down} {
      display: none;
    }

    li {
      float: right;

      &.active {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
  }
}
</style>

<template>
  <div class="row nomargin">
    <li>
      <a @click="$emit('trigger')">
        <i class="material-icons">{{ icon }}</i>
        <span style="margin: auto">{{ text }}</span>
      </a>
    </li>
  </div>
</template>

<script>
export default {
  props: {
    icon: String,
    text: String,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";
@import "@materializecss/materialize/sass/components/_sidenav.scss";

.nomargin {
  margin-left: 0 !important;
  margin-right: 0 !important;
}
</style>

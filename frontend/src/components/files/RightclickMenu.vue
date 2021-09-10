<template>
  <div class="menu" ref="menu"></div>
</template>

<script lang="ts">
export default {
  props: {
    left: { type: Number, required: true },
    top: { type: Number, required: true },
  },
  mounted() {
    // let menu = this.$refs["menu"] as HTMLElement;
    // menu.style.left = this.left;
    // menu.style.top = this.top;
  },
};
</script>

<style lang="scss" scoped>
.menu {
  background: gray;
  z-index: 100;
}
</style>

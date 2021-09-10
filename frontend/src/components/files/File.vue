<template v-if="file.stats.isDirectory">
  <a v-if="!file.stats.isDirectory" :href="href">
    <li class="collection-item">
      <div class="container">
        <div class="name">
          {{ file.name }}
        </div>
        <div class="size">
          {{ humanFileSize(file.stats.size) }}
        </div>
        <div class="mtime">
          {{ file.stats.mtime }}
        </div>
      </div>
    </li>
  </a>
  <router-link v-else :to="href">
    <li class="collection-item">
      <div class="container">
        <div class="name">
          {{ file.name + "/" }}
        </div>
        <div class="size">
          {{ "-----" }}
        </div>
        <div class="mtime">
          {{ file.stats.mtime }}
        </div>
      </div>
    </li>
  </router-link>
</template>

<script>
export default {
  props: {
    file: {
      name: String,
      stats: {
        size: Number,
        mtime: Date,
        birthtime: Date,
        isFile: Boolean,
        isDirectory: Boolean,
      },
    },
  },
  computed: {
    href() {
      if (this.file.stats.isDirectory) {
        return this.$route.path + "/" + this.file.name;
      } else {
        return (
          "/api" + this.$route.path + "/" + this.file.name + "?download=true"
        );
      }
    },
  },
  methods: {
    humanFileSize(size) {
      var i = Math.floor(Math.log(size) / Math.log(1024));
      return (
        Math.round(size / Math.pow(1024, i)) +
        " " +
        ["B", "kB", "MB", "GB", "TB"][i]
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";
@import "@materializecss/materialize/sass/components/_global.scss";
@import "@materializecss/materialize/sass/components/_grid.scss";
a {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.87) !important;
}

li:hover {
  background-color: rgba(0, 0, 0, 0.1) !important;
}

.container {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  margin: 0px;

  div {
    &.name {
      flex-grow: 1;
    }

    &.size {
      position: relative;
      width: 10%;
      min-width: 50px;
    }

    &.mtime {
      @media #{$small-and-down} {
        display: none;
      }
      width: 20%;
      min-width: 210px;
    }
  }
}
</style>

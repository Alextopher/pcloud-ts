<template>
  <div>
    <breadcrumbs @reload="fetchData()" />
    <div class="router">
      <div v-if="error">
        <h2>Folder not found</h2>
      </div>
      <ul v-else class="collection">
        <!-- Header  -->
        <li class="collection-item">
          <div class="container">
            <div class="name">
              Name
            </div>
            <div class="size">
              Size
            </div>
            <div class="mtime">
              Last Modified
            </div>
          </div>
        </li>
        <file v-for="file in files" :key="file" :file="file"></file>
      </ul>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from "../components/Breadcrumbs.vue";
import File from "../components/File.vue";
import axios from "axios";

export default {
  components: {
    File,
    Breadcrumbs,
  },
  data() {
    return {
      loading: false,
      error: false,
      files: null,
    };
  },
  created() {
    // fetch the data when the view is created and the data is needed
    this.fetchData();
  },
  watch: {
    $route: "fetchData",
  },
  methods: {
    fetchData() {
      this.loading = true;
      this.files = null;
      const folder = this.$route.path;

      axios
        .get("/api" + folder)
        .then((response) => {
          this.files = response.data.sort((a, b) => {
            return a.stats.isDirectory < b.stats.isDirectory;
          });
          this.error = false;
          this.loading = false;
        })
        .catch(() => {
          this.error = true;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";
@import "@materializecss/materialize/sass/components/_global.scss";
@import "@materializecss/materialize/sass/components/_grid.scss";

.row {
  margin-bottom: 0;
}

.router {
  left: 0px;
  margin: 0 $gutter-width;
}

.collection {
  overflow: scroll;
  > :last-child {
    border-top: 1px solid #e0e0e0;
  }
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

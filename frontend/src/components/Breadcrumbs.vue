<template>
  <div class="row">
    <nav class="col s12">
      <div class="nav-wrapper">
        <div style="padding-left: 10px">
          <router-link
            :to="ref"
            v-for="[ref, item] in breadcrumbs"
            :key="item"
            class="breadcrumb"
          > {{ item }} </router-link>
          <div v-if="profile" style="float: right">
            <button @click="onPickFile">Upload file</button>
            <input
              type="file"
              style="display: none"
              ref="fileInput"
              accept="image/*"
              @change="onFilePicked"
            />
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "breadcrumbs",
  computed: {
    breadcrumbs() {
      let chapters = [this.$route.name, ...this.$route.params.chapters];
      return chapters.map((v, i) => [
        "/" + chapters.slice(0, i + 1).join("/"),
        v,
      ]);
    },
    profile() {
      return this.$store.state.profile;
    }
  },
  methods: {
    onPickFile() {
      this.$refs.fileInput.click();
    },
    async onFilePicked(event) {
        let form = new FormData();
        form.append("upload", event.target.files[0]);
        axios.post('/api' + this.$route.path, form, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        this.$emit('reload');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';
@import "@materializecss/materialize/sass/components/_navbar.scss";
@import "@materializecss/materialize/sass/components/_grid.scss";

.breadcrumb {
    color: white;
}
</style>
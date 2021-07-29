<template>
  <div class="row">
    <nav class="col s12">
      <div class="nav-wrapper">
        <div style="padding-left: 10px">
          <a
            :href="ref"
            v-for="[ref, item] in breadcrumbs"
            :key="item"
            class="breadcrumb"
          > {{ item }} </a>
          <div style="float: right">
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
  },
  methods: {
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
        let form = new FormData();
        form.append("upload", event.target.files[0]);
        axios.post('/api' + this.$route.path)
            .then(console.log)
            .catch(console.log)

        console.log(event);
    },
  },
};
</script>

<style scoped>
    .breadcrumb {
        color: white;
    }
</style>
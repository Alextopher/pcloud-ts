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
          >
            {{ item }}
          </router-link>
          <div v-if="profile" style="float: right">
            <button @click="onPickFolder">upload folder</button>
            <button @click="onPickFile">upload files</button>
            <input
              type="file"
              style="display: none"
              ref="fileInput"
              @change="onFilePicked"
              multiple
            />
            <input
              type="file"
              style="display: none"
              ref="folderInput"
              @change="onFolderPicked"
              webkitdirectory
              directory
            />
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import axios from "axios";
import JSZip from "jszip";

export default {
  name: "breadcrumbs",
  data: () => {
    return {
      zipPercent: 0,
    };
  },
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
    },
  },
  methods: {
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      // Upload each file as a seperate request
      let requests = [];
      for (let file of event.target.files) {
        let form = new FormData();
        form.set("upload", file);
        let request = axios.post("/api" + this.$route.path, form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        requests.push(request);
      }

      // Wait for all requests to finish
      Promise.all(requests).finally(() => this.$emit("reload"));
    },
    onPickFolder() {
      this.$refs.folderInput.click();
    },
    onFolderPicked(event) {
      var zip = new JSZip();
      for (let i = 0; i < event.target.files.length; i++) {
        let file = event.target.files[i];
        zip.file(file.webkitRelativePath, file.arrayBuffer());
      }

      let name =
        event.target.files[0].webkitRelativePath.split("/")[0] + ".zip";

      console.log("Done reading files");
      zip
        .generateAsync({ type: "blob", compression: "DEFLATE" }, (metadata) => {
          if (Math.floor(metadata.percent) > this.zipPercent) {
            this.zipPercent = Math.floor(metadata.percent);
            console.log(this.zipPercent);
          }
        })
        .then((blob) => {
          let file = new File([blob], name);
          console.log(file);

          let form = new FormData();
          form.set("upload", file);
          let request = axios.post("/api" + this.$route.path, form, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          request.finally(() => this.$emit("reload"));
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";
@import "@materializecss/materialize/sass/components/_navbar.scss";
@import "@materializecss/materialize/sass/components/_grid.scss";

.breadcrumb {
  color: white;
  position: sticky;
}

button {
  margin-left: 10px;
}
</style>

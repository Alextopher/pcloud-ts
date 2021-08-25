// store.ts
import { createStore } from "vuex";
import axios from "axios";

// define your typings for the store state
export interface State {
  profile: string;
}

export default createStore<State>({
  state: {
    profile: "",
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
  },
  actions: {
    pullProfile() {
      axios
        .get("/api/user/me")
        .then((response) => this.commit("setProfile", response.data))
        .catch(() => this.commit("setProfile", ""));
    },
  },
  modules: {},
});

// store.ts
import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import axios from 'axios'

// define your typings for the store state
export interface State {
  profile: string
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

export default createStore<State>({
  state: {
    profile: ""
  },
  mutations: {
    setProfile(state, profile) {
      console.log(profile);
      state.profile = profile;
    }
  },
  actions: {
    pullProfile() {
      axios.get('/api/user/me')
        .then(response => this.commit('setProfile', response.data))
        .catch(() => this.commit('setProfile', null));
    }
  },
  modules: {
  },
})

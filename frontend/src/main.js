import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from './router'
import '../public/css/materialize.min.css'

// Create a new store instance.
const store = createStore({
    state() {
        return {
            profile: null
        }
    },
    mutations: {
        setProfile(state, profile) {
            console.log(profile);
            state.profile = profile;
        }
    },
    actions: {
        pullProfile() {
            import('axios')
                .then(axios => axios.get('/api/user/me'))
                .then(response => this.commit('setProfile', response.data))
                .catch(() => this.commit('setProfile', null));
        }
    }
})

createApp(App).use(router).use(store).mount('#app')

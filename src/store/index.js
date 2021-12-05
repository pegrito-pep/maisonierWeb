import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate'

import locale from './modules/locale'

  const persistedState = createPersistedState({
    key: 'vuejs-vue-i18n',
    paths: ['locale']
  })

Vue.use(Vuex);

const state = {
    user: {
        avatar: null,
        nom: null,
        devise:null
    },
}

export default new Vuex.Store({
    modules: {
        locale
      },
      plugins: [persistedState],
    state,
    getters: {
        user(state) {
            return state.user
        }
    },
    mutations: {
        user_data(state, user) {
            state.user.nom = user.nom
            state.user.prenom = user.prenom
            state.user.email = user.email
            state.user.tel = user.tel
        },
        user(state, user) {
            state.user = user
        }
    },
    actions: {
        user(context, user) {
            context.commit('user', user)
        }
    },
});
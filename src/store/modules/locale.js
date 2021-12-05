export default {
  namespaced: true,
  state: {
    locale: 'fr'
  },
  mutations: {
    setLocale(state, locale) {
      state.locale = locale
    }
  }
}
